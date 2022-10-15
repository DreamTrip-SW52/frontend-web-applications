<template >
  <Navbar />
  <div class="mx-8">
    <h1 class="text-white">My Packages</h1>
    <div v-for="myPackage in packages" class="flex flex-column">
      <PackageCard
          :id="myPackage.id"
          :name="myPackage.name"
          :description="myPackage.description"
          :price="myPackage.total"
          :place="myPackage.location"
          :duration="myPackage.duration"
          :img_url="myPackage.images[0].src"
          :type_of_button="'statistics'"
      />
      <br>
    </div>
  </div>

</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import PackageCard from '../components/PackageCard.vue';
import {onMounted, ref} from "vue";
import {PackageService} from "@/services/Package.service";

const packages = ref([]);
const packageService = new PackageService();

onMounted(() => {
  packageService.getPackages().then((response) => {
    packages.value = response.data;
  });
});
</script>

<style scoped>
</style>