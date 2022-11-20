<template>
  <Navbar />
  <div class="mx-8">
    <h1 class="text-white text-center">Economic Follow</h1>

    <PackageCard
      :id="currentTravelPackage?.id"
      :name="currentTravelPackage.name"
      :description="currentTravelPackage.description"
      :price="currentTravelPackage.price"
      :place="currentTravelPackage.locationAddress"
      :duration="currentTravelPackage.duration"
      :img_url="currentTravelPackage.image"
    />

    <BillsHistory :bills="bills.data" @update="fetchInitialData" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import PackageCard from '../components/PackageCard.vue';
import BillsHistory from '../components/bill_history/BillsHistory.vue';
import { CurrentTravelService } from '../services/CurrentTravel.service';
import { PackageService } from '../services/Package.service';

const currentTravelService = new CurrentTravelService();
const packageService = new PackageService();
const currentTravelPackage = ref([]);
const currentTravel = ref({});
const bills = ref([]);

const userId = JSON.parse(localStorage.getItem('currentUser'));

const fetchInitialData = async () => {
  currentTravel.value = await currentTravelService.getCurrentTravelByTravelerId(
    userId
  );

  bills.value = await currentTravelService.getBillsByTravelerId(userId);
  console.log(
    '🚀 ~ file: EconomicFollow.vue ~ line 42 ~ fetchInitialData ~ bills.value',
    bills.value
  );

  const { data } = await packageService.getById(
    JSON.parse(JSON.stringify(currentTravel.value.data)).packageId
  );
  currentTravelPackage.value = data;
};

onMounted(async () => {
  await fetchInitialData();
});
</script>

<style scoped></style>
