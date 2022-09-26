<template>
  <!-- {{ $route.params.id }} -->

  <main class="grid w-full ml-4" v-if="packageData !== {}">
    <section id="center" class="col-8">
      <header>
        <span class="primary text-lg font-medium">DreamTrip</span> /
        <span class="text-lg font-medium">{{ packageData.name }}</span>
      </header>

      <section class="inner-container">
        <h2 class="text-center my-4 font-light">{{ packageData.name }}</h2>

        <div class="flex justify-content-center gap-6 my-4">
          <div class="text-center">
            <i class="pi pi-map-marker icons"></i>
            <p>{{packageData.location}}</p>
          </div>
          <div class="text-center">
            <i class="pi pi-clock icons"></i>
            <p>{{packageData.duration}}</p>
          </div>
          <div class="text-center">
            <i class="pi pi-user icons"></i>
            <p>{{packageData.capacity}} people</p>
          </div>
          <div class="text-center">
            <i class="pi pi-calendar icons"></i>
            <p>{{packageData.disponibility}}</p>
          </div>
        </div>
        <!-- Carrousel -->

        <Carousel
          :value="packageData.images"
          :numVisible="1"
          :numScroll="3"
          :responsiveOptions="responsiveOptions"
        >
          <template #header> </template>
          <template #item="slotProps">
            <div class="image-container">
              <img :src="slotProps.data.src" class="w-full" />
            </div>
          </template>
        </Carousel>

        <!-- FinCarrousel -->

        <div class="px-0 md:px-4 lg:mx-8">
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
              <Accommodations :source="packageData.accommodations" />
            </div>
            <div v-if="breadcrumbView === 'tours'">
              <Tour :source="packageData.tour" />
            </div>
            <div v-if="breadcrumbView === 'transports'">
              <Transport :source="packageData.transport" />
            </div>
          </div>
        </div>
      </section>
    </section>

    <section id="right" class="col-4 p-2 flex flex-column gap-8 white">
      <div class="text-center calendar-container flex flex-column gap-4 p-4">
        <h2>Booking online</h2>
        <h2>S/.{{ packageData.total }}</h2>
        <div class="text-left">
					<p>Choose a date</p>
					<p>Available day</p>
				</div>
        <Calendar v-model="calendar" :inline="true" />
        <div class="text-center">
					<Button label="Buy" style="width: 8rem" />
				</div>
      </div>
      <div class="review-container p-4">
        <h2 class="text-center">Package Reviews</h2>
				<div class="text-center">
					<h3 class="text-4xl font-medium">{{averageReviews}}</h3>
					<div class="flex justify-content-center">
						<Rating :modelValue="averageReviews" :readonly="true" :cancel="false"/>
					</div>
				</div>
        <div class="text-right my-2"><Button label="Write review" class="p-button-text underline white" /></div>
        <!-- reseñas -->
        
        <ul class="list-none flex flex-column gap-4">
            <li v-for="review in packageData.reviews">
								<Rating :modelValue="review.rating" :readonly="true"  :cancel="false" />
                <br>
                For {{review.author}} the {{review.date}}
                <br>
                <span class="font-light">{{review.comment}}</span>
            </li>
        </ul>
          
        <div class="text-right my-2"><Button label="See more" class="p-button-text underline white" /></div>
      </div>

      <!-- {{ JSON.stringify(packageData, null, 4) }} -->
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue';
import Accommodations from '../components/package_details/Accommodations.vue';
import Transport from '../components/package_details/Transport.vue';
import Tour from '../components/package_details/Tour.vue';

// Services
import { PackageService } from '../services/Package.service';
/** Static **/

// Breadcrumb
const home = { icon: 'pi pi-home', to: '/' };
const items = [
  {
    label: 'ACCOMMODATIONS',
    onClick: () => (breadcrumbView.value = 'accomodations'),
  },
  { label: 'TRANSPORTS', onClick: () => (breadcrumbView.value = 'transports') },
  { label: 'TOURS', onClick: () => (breadcrumbView.value = 'tours') },
];

const props = defineProps({
  id: {
    type: String,
    required: true,
    default: '1',
  },
});

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
const packageData = ref({});
const averageReviews = ref(0);

// Rating
const getRating = (data) => {
	let total = 0;
	
	data?.reviews.forEach((review) => {
		total += review.rating;
	});

	const result = Math.floor(total / data?.reviews?.length)
	averageReviews.value = result;
};

/*** LifeCycle Hooks ***/

onMounted(() => {
  PackageService.getPackage(props.id).then((response) => {
    packageData.value = response;
		getRating(response)
  });
	
});
</script>

<style scoped>
header {
  background: #5a698f;
  padding: 14px 0 14px 48px;
}
.primary {
  color: #fc4747;
}

.white {
	color:white;
}

@media (min-width: 1024px) {
  .inner-container {
    padding: 0px 120px;
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

.calendar-container,.review-container {
	background: #161D2F;
}

</style>
