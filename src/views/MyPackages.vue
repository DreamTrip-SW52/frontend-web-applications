<template>
  <Navbar />
  <div class="mx-8">
    <h1 class="text-white">My Packages</h1>
    <div v-if="loading">
      <div class="box">
        <div class="loader"></div>
      </div>
    </div>
    <div v-for="myPackage in packages" class="flex flex-column gap-4" v-else>
      <PackageCard
          :id="myPackage.id"
          :name="myPackage.name"
          :description="myPackage.description"
          :price="myPackage.total"
          :place="myPackage.locationAddress"
          :duration="myPackage.duration"
          :img_url="myPackage.image"
          :type_of_button="'statistics'"
      />
      <br />
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import PackageCard from "../components/PackageCard.vue";
import {onMounted, ref} from "vue";
import { PackageService } from "@/services/Package.service";

const packages = ref([]);
const loading = ref(true);
const packageService = new PackageService();

onMounted(async () => {
  try{
    let userId = localStorage.getItem("currentUser");
    const response = await packageService.getByTravelAgencyId(userId);
    packages.value = response.data;
    loading.value = false;
  }catch(e) {
    console.log(e);
  }

});
</script>

<style scoped>
  .box {
    min-width: 1200px;
    height: 100px;
    display: grid;
    place-items: center;
  }

  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
  }
</style>
