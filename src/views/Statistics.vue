<template>
  <Navbar/>
  <div class="mx-8 flex flex-column">
    <Card class="card">
      <template #title class="text-white">
        Rating
      </template>
      <template #content>
        <Rating :model-value="stars" :cancel="false" :readonly="true"/>
      </template>
    </Card>
    <br>
    <Card class="card">
      <template #title class="text-white">
        Quantity of Reviews
      </template>
      <template #content>
        {{ reviews }}
      </template>
    </Card>
    <br>
    <Card class="card">
      <template #title class="text-white">
        Quantity of Views
      </template>
      <template #content>
        {{ views }}
      </template>
    </Card>
    <br>
    <Card class="card">
      <template #title class="text-white">
        Quantity of Purchased Tickets
      </template>
      <template #content>
        {{ purchasedTickets }}
      </template>
    </Card>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import {PackageService} from "@/services/Package.service";
import {onMounted, ref} from "vue";

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
const packageService = new PackageService();

const packageInfo = ref({});
const stars = ref(0);
const reviews = ref(0);
const views = ref(0);
const purchasedTickets = ref(0);

// Rating
const getRating = (data) => {
  let total = 0;

  data.reviews.forEach((review) => {
    total += review.rating;
  });

  stars.value = Math.floor(total / data.reviews.length);
};

onMounted(() => {
  packageService.getPackageById(1).then((response) => {
    packageInfo.value = response.data;
    getRating(packageInfo.value);
    reviews.value = packageInfo.value.reviews.length;
  })
})

</script>

<style scoped>
.card {
  background-color: #161D2F;
  width: 30vw;
  height: 23vh;
}
</style>