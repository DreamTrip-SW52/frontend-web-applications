<template>
  <Navbar />
  <div class="mx-8">
    <h1 class="text-white text-center">Security Information</h1>

    <SecurityCard title="Police stations" :places="policeStations.data" />
    <SecurityCard title="Hospitals" :places="hospitals.data" />
    <SecurityCard title="Clinics" :places="clinics.data" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../components/Navbar.vue";
import SecurityCard from "../components/SecurityCard.vue";
import { CurrentTravelService } from "../services/CurrentTravel.service";
import { PackageService } from "../services/Package.service";

const policeStations = ref([]);
const hospitals = ref([]);
const clinics = ref([]);
const currentTravelService = new CurrentTravelService();
const packageService = new PackageService();

onMounted(async () => {
  const userId = JSON.parse(localStorage.getItem("currentUser"));

  const currentTravelPackage =
    await currentTravelService.getCurrentTravelByTravelerId(userId);

  const packageTravel = await packageService.getById(
    JSON.parse(JSON.stringify(currentTravelPackage.data.packageId))
  );

  policeStations.value =
    await currentTravelService.getPoliceStationsByLocationId(
      JSON.parse(JSON.stringify(packageTravel.data.locationId))
    );
  hospitals.value = await currentTravelService.getHospitalsByLocationId(
    JSON.parse(JSON.stringify(packageTravel.data.locationId))
  );
  clinics.value = await currentTravelService.getClinicsByLocationId(
    JSON.parse(JSON.stringify(packageTravel.data.locationId))
  );
});
</script>

<style scoped></style>
