<template>
  <Navbar />
  <div class="mx-8 flex flex-column">
    <Card class="card">
      <template #title class="text-white"> Rating </template>
      <template #content>
        <Rating :model-value="stars" :cancel="false" :readonly="true" />
      </template>
    </Card>
    <br />
    <Card class="card">
      <template #title class="text-white"> Quantity of Reviews </template>
      <template #content>
        {{ reviewInfo.length }}
      </template>
    </Card>
    <br />
    <Card class="card">
      <template #title class="text-white"> Quantity of Views </template>
      <template #content>
        <!-- {{ views }} -->
      </template>
    </Card>
    <br />
    <Card class="card">
      <template #title class="text-white">
        Quantity of Purchased Tickets
      </template>
      <template #content>
        <!-- {{ purchasedTickets }} -->
      </template>
    </Card>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { PackageService } from "@/services/Package.service";
import { ReviewService } from "@/services/Review.service";

// const props = defineProps({
//   id: {
//     type: Number,
//     required: true,
//   },
// });

const packageService = new PackageService();
const reviewService = new ReviewService();

const reviewInfo = ref({});
const stars = ref(0);
// const views = ref(0);
// const purchasedTickets = ref(0);

const router = useRouter();

// Rating
const getRating = (data) => {
  let total = 0;

  data.forEach((review) => {
    total += review.rating;
  });

  stars.value = Math.floor(total / data.length);
  console.log(
    "🚀 ~ file: Statistics.vue ~ line 69 ~ getRating ~ stars.value",
    stars.value
  );
};

onMounted(() => {
  const params = router.currentRoute.value.params;
  reviewService.getReviewByPackageId(params.id).then((response) => {
    reviewInfo.value = response.data;
    getRating(JSON.parse(JSON.stringify(reviewInfo.value)));
  });
});
</script>

<style scoped>
.card {
  background-color: #161d2f;
  width: 30vw;
  height: 23vh;
}
</style>
