<template>
  <main class="grid w-full ml-4 text-white" v-if="packageData !== {}">
    <section id="center" class="col-8">
      <router-link to="/home"
        ><i class="pi pi-arrow-left icons"></i>
      </router-link>
      <header>
        <span class="primary text-lg font-medium">DreamTrip</span> /
        <span class="text-lg font-medium">{{ packageData.name }}</span>
      </header>

      <section class="inner-container">
        <h2 class="text-center my-4 font-light">{{ packageData.name }}</h2>

        <div class="flex justify-content-center gap-6 my-4">
          <div class="text-center">
            <i class="pi pi-map-marker icons"></i>
            <p>{{ packageData.locationAddress }}</p>
          </div>
          <div class="text-center">
            <i class="pi pi-clock icons"></i>
            <p>{{ packageData.duration }} days</p>
          </div>
          <div class="text-center">
            <i class="pi pi-user icons"></i>
            <p>{{ packageData.capacity }} people</p>
          </div>
          <div class="text-center">
            <i class="pi pi-calendar icons"></i>
            <p>{{ packageData.disponibility || '24/7' }}</p>
          </div>
        </div>
        <!-- Carrousel -->

        <Carousel
          :value="imageData"
          :numVisible="1"
          :numScroll="3"
          :responsiveOptions="responsiveOptions"
        >
          <template #header> </template>
          <template #item="slotProps">
            <img
              :src="slotProps.data.src"
              :alt="slotProps.data.alt"
              class="w-full bg-no-repeat"
            />
          </template>
        </Carousel>

        <!-- FinCarrousel -->
        <pre>{{ breadcrumbView }}</pre>

        <div class="px-0 md:px-4">
          <Breadcrumb :model="items">
            <template #item="{ item }">
              <a @click="item.onClick" class="cursor-pointer">{{
                item.label
              }}</a>
            </template>
          </Breadcrumb>
          <!-- accomodation - tour - transport  -->
          <div>
            <div v-if="breadcrumbView === 'accomodations'">
              <Accommodations :id="router.currentRoute.value.params.id" />
            </div>
            <div v-if="breadcrumbView === 'tours'">
              <Tour :id="router.currentRoute.value.params.id" />
            </div>
            <div v-if="breadcrumbView === 'transports'">
              <Transport :id="router.currentRoute.value.params.id" />
            </div>
          </div>
        </div>
      </section>
    </section>

    <section id="right" class="col-4 p-2 flex flex-column gap-8 white">
      <div class="text-center calendar-container flex flex-column gap-4 p-4">
        <h2>Booking online</h2>
        <h2>S/.{{ packageData.price }}</h2>
        <div class="text-left">
          <p>Choose a date</p>
          <p>Available day</p>
        </div>
        <Calendar v-model="calendar" :inline="true" />
        <div class="text-center">
          <router-link
            :to="`/paypackage/${router.currentRoute.value.params.id}`"
          >
            <Button label="Buy" style="width: 8rem" />
          </router-link>
        </div>
      </div>
      <div class="review-container p-4">
        <h2 class="text-center">Package Reviews</h2>
        <div class="text-center">
          <h3 class="text-4xl font-medium">{{ averageReviews }}</h3>
          <div class="flex justify-content-center">
            <Rating
              :modelValue="averageReviews"
              :readonly="true"
              :cancel="false"
            />
          </div>
        </div>

        <!--        {{JSON.stringify(reviews,null,4)}}-->

        <div id="no-review-no-show" v-if="reviews.length > 0">
          <div class="text-right my-2">
            <Button
              label="Write/Modify Review"
              class="p-button-text underline white"
              @click="openDialogWriteReview"
            />
          </div>

          <Dialog v-model:visible="displayDialogWriteReview" :modal="true">
            <div class="flex justify-content-between">
              <p>Rate this travel package</p>
              <Rating v-model="rating" :cancel="false" />
            </div>
            <br />
            <Textarea
              v-model="comment"
              :autoResize="true"
              rows="3"
              cols="60"
              placeholder="Write your comment"
            />
            <br /><br />
            <div class="flex justify-content-between">
              <Button
                label="Cancel"
                class="p-button-danger"
                @click="closeDialogWriteReview"
              />
              <Button label="Submit" @click="writeReview" />
            </div>
          </Dialog>

          <!--
            <Dialog v-model:visible="displayDialogModifyReview" :modal="false">
            <div class="flex justify-content-between">
              <p>Rate this travel package</p>
              <Rating v-model="rating" :cancel="false" />
            </div>
            <br />
            <Textarea
              v-model="comment"
              :autoResize="true"
              rows="3"
              cols="60"
              placeholder= review.comment
            />
            <br /><br />
            <div class="flex justify-content-between">
              <Button
                label="Cancel"
                class="p-button-danger"
                @click="closeDialogModifyReview"
              />
              <Button label="Submit" @click="ModifyReview" />
            </div>
          </Dialog>
          "Write review"
           -->

          <!-- reseñas -->

          <ul class="list-none flex flex-column gap-4">
            <li
              v-for="review in reviews.slice(0, 3)"
              class="pr-6"
              :key="review.id"
            >
              <Rating
                :modelValue="review.stars"
                :readonly="true"
                :cancel="false"
              />
              <br />
              For {{ review.travelerName }} the {{ review.date }}
              <br />
              <span class="font-light">{{ review.comment }}</span>
            </li>
          </ul>

          <div class="text-right my-2">
            <Button
              label="See more"
              class="p-button-text underline white"
              @click="openDialogSeeMore"
            />
          </div>
          <Dialog v-model:visible="displayDialogSeeMore">
            <ul class="list-none flex flex-column gap-4">
              <li v-for="review in reviews" class="pr-6" :key="review.id">
                <Rating
                  :modelValue="review.rating"
                  :readonly="true"
                  :cancel="false"
                />
                <br />
                For {{ review.travelerName }} the {{ review.date }}
                <br />
                <span class="font-light">{{ review.comment }}</span>
              </li>
            </ul>
          </Dialog>
        </div>

        <div v-else>
          <p class="text-center">No reviews yet</p>
          <div class="text-center">
            <Button
              label="Write Review"
              class="p-button-text underline white"
              @click="openDialogWriteReview"
            />

            <Dialog v-model:visible="displayDialogWriteReview" :modal="true">
              <div class="flex justify-content-between">
                <p>Rate this travel package</p>
                <Rating v-model="rating" :cancel="false" />
              </div>
              <br />
              <Textarea
                v-model="comment"
                :autoResize="true"
                rows="3"
                cols="60"
                placeholder="Write your comment"
              />
              <br /><br />
              <div class="flex justify-content-between">
                <Button
                  label="Cancel"
                  class="p-button-danger"
                  @click="closeDialogWriteReview"
                />
                <Button label="Submit" @click="writeReview" />
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onBeforeMount, onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import Accommodations from '../components/package_details/Accommodations.vue';
import Transport from '../components/package_details/Transport.vue';
import Tour from '../components/package_details/Tour.vue';

// Services
import { PackageService } from '../services/Package.service';
import { ReviewService } from '../services/Review.service';
import { ImageService } from '../services/Image.service';
import { TravelerService } from '../services/Traveler.service';

/** Static **/

//Router
const router = useRouter();
const { id } = router.currentRoute.value.params;

const packageService = new PackageService();
const imageService = new ImageService();

const packageData = ref({});
const imageData = ref({});

// Breadcrumb
const items = [
  {
    label: 'ACCOMMODATIONS',
    onClick: () => (breadcrumbView.value = 'accomodations'),
  },
  { label: 'TRANSPORTS', onClick: () => (breadcrumbView.value = 'transports') },
  { label: 'TOURS', onClick: () => (breadcrumbView.value = 'tours') },
];

/** States **/
// accomodations | flights | tours | ...
const breadcrumbView = ref('accomodations');

// Carousel
const responsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: '600px',
    numVisible: 2,
    numScroll: 2,
  },
  {
    breakpoint: '480px',
    numVisible: 1,
    numScroll: 1,
  },
]);

// Calendar
const calendar = ref();

// Rating
const averageReviews = ref(0);

const getRating = () => {
  let total = 0;

  reviews.value.forEach((review) => {
    total += review.rating;
  });

  const result =
    reviews.value.length === 0 ? 0 : Math.floor(total / reviews.value.length);
  averageReviews.value = result;
};

/*** Reviews ***/

// service
const reviewService = new ReviewService();
const travelerService = new TravelerService();

// variables
let validation = null;

// state
const reviews = ref([]);
const comment = ref('');
const rating = ref(0);
const displayDialogWriteReview = ref(false);
let addReviewButtonLabel = ref('');

// function
const openDialogWriteReview = () => (displayDialogWriteReview.value = true);
const closeDialogWriteReview = () => (displayDialogWriteReview.value = false);
const computedText = computed(() => addReviewButtonLabel.value);
const checkUserHasReview = (id) => {
  reviewService.getReviewTravellerByPackageId(id).then((response) => {
    let findID = false;
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].travellerId == localStorage.getItem('currentUser')) {
        findID = true;
      }
    }
    if (findID == true) {
      //alert('error');
      return true;
    } else {
      return false;
    }
  });
};
const writeReview = () => {
  const currentDate = new Date();
  const strDate =
    currentDate.getDate() +
    '/' +
    currentDate.getMonth() +
    '/' +
    currentDate.getFullYear();
  const params = router.currentRoute.value.params;

  const review = {
    packageId: Number,
    // date: String,
    stars: Number,
    comment: String,
    travelerId: Number,
  };

  review.packageId = parseInt(params.id);
  // review.date = strDate;
  review.stars = rating.value;
  review.comment = comment.value;
  review.travelerId = localStorage.getItem('currentUser');

  console.log('Escribiendo el review con datos', review);

  if (validation != null) {
    reviewService.updateReview(validation.id, review);
  } else {
    reviewService.addReview(review);
  }
  closeDialogWriteReview();
};

// See more

const displayDialogSeeMore = ref(false);
const openDialogSeeMore = () => {
  displayDialogSeeMore.value = true;
};

/*** LifeCycle Hooks ***/

onBeforeMount(async () => {
  checkUserHasReview(id)
    ? (addReviewButtonLabel = 'Modify Review')
    : (addReviewButtonLabel = 'Write Review');

  await reviewService.getReviewsByPackageId(id).then(({ data }) => {
    const newReviews = [];

    data.forEach((review) => {
      travelerService.getById(review.travelerId).then(({ data }) => {
        newReviews.push({
          ...review,
          date: new Date().toLocaleDateString(),
          travelerName: data.name,
        });
      });
    });

    reviews.value = newReviews;

    console.log('Reviews', newReviews);
    getRating();
  });
});

onMounted(() => {
  packageService.getById(id).then(({ data }) => (packageData.value = data));

  const images = [];
  for (let i = 0; i < 5; i++) {
    images.push({
      src: `https://images.unsplash.com/photo-1668400121008-6134fd5b104d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`,
      alt: 'Random Image',
    });
  }

  imageData.value = images;
});
</script>

<style scoped>
.return-home {
  color: #fc4747;
}

header {
  background: #5a698f;
  padding: 14px 0 14px 48px;
}
.primary {
  color: #fc4747;
}

.white {
  color: white;
}

@media (min-width: 1024px) {
  .inner-container {
    padding: 0px 80px;
  }
}

.icons {
  color: #fc4747;
  font-size: 32px;
}

.p-breadcrumb {
  background: transparent;
  border: none;
}

.p-breadcrumb-chevron ul li.p-breadcrumb-chevron {
  color: '#fc4747' !important;
}

.image-container {
  height: 300px;
}

.image-container img {
  max-width: 100%;
  height: 100%;
  object-fit: contain;
}

.calendar-container,
.review-container {
  background: #161d2f;
}

.dialog {
  background: #5a698f;
}
</style>
