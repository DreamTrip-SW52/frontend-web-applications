<template>
  <Navbar />
  <div class="custom-package ml-8">
    <div class="card">
      <Steps :model="items" :readonly="true" />
    </div>
    <router-view
      v-slot="{ Component }"
      @prevPage="prevPage($event)"
      @nextPage="nextPage($event)"
    >
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const items = ref([
  {
    label: "Transport",
    to: "./",
  },
  {
    label: "Accommodation",
    to: "./accommodation",
  },
  {
    label: "Tour",
    to: "./tour",
  },
  {
    label: "Rent Car",
    to: "./rent",
  },
  {
    label: "BuyPackage",
    to: "buypackage/:id",
  },
]);

const formObject = ref({});

const nextPage = (event) => {
  router.push(items.value[event.pageIndex + 1].to);
};
const prevPage = (event) => {
  router.push(items.value[event.pageIndex - 1].to);
};
</script>

<style scoped>
.card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.custom-package {
  min-width: 800px;
}
</style>
