<template>
  <Navbar />
  <div class="mx-8">
    <h1 class="text-white text-center">Economic Follow</h1>

    <PackageCard
      :id="currentTravelPackage?.id"
      :name="currentTravelPackage.name"
      :description="currentTravelPackage.description"
      :price="currentTravelPackage.total"
      :place="currentTravelPackage.location"
      :duration="currentTravelPackage.duration"
      :img_url="currentTravelPackage.img"
    />

    <BillsHistory :bills="currentTravel?.new_bills" @update="fetchInitialData" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import PackageCard from '../components/PackageCard.vue';
import BillsHistory from '../components/bill_history/BillsHistory.vue';
import { CurrentTravelService } from '../services/CurrentTravel.service';

const currentTravelService = new CurrentTravelService();
const currentTravelPackage = ref([]);
const currentTravel = ref({});

const userId = JSON.parse(localStorage.getItem('currentUser'));

const fetchInitialData = async () => {
  currentTravel.value = await currentTravelService.getCurrentTravel(userId);
  const { data } = await currentTravelService.getByTravelerId(userId);
  currentTravelPackage.value = data;
};

onMounted(async () => {
  await fetchInitialData();
});
</script>

<style scoped></style>
