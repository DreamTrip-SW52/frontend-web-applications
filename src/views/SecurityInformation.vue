<template>
  <Navbar />
  <div class="mx-8">
    <h1 class="text-white text-center">Security Information</h1>

    <SecurityCard
      title="Police stations"
      :places="currentTravelPackage?.security?.police_stations"
    />
    <SecurityCard title="Hospitals" :places="currentTravelPackage?.security?.hospitals" />
    <SecurityCard title="Clinics" :places="currentTravelPackage?.security?.clinics" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import SecurityCard from '../components/SecurityCard.vue';
import { CurrentTravelService } from '../services/CurrentTravel.service';

const currentTravelPackage = ref([]);
const currentTravelService = new CurrentTravelService();

onMounted(async () => {
  const userId = JSON.parse(localStorage.getItem('currentUser'));

  const { data } = await currentTravelService.getByTravelerId(userId);
  currentTravelPackage.value = data;
});
</script>

<style scoped></style>
