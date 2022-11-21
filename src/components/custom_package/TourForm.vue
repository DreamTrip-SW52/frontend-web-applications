<template>
  <div v-for="tour in resultTour">
    <div
      class="card-container text-white flex justify-content-between p-4 align-items-center"
    >
      <div>
        <span>Details</span>
        <ScrollPanel style="width: 350px; height: 150px">
          <p class="line-height-4">
            {{ tour.details }}
          </p>
          <ScrollTop
            target="parent"
            :threshold="100"
            class="custom-scrolltop"
            icon="pi pi-arrow-up"
          />
        </ScrollPanel>
      </div>
      <div class="flex flex-column">
        <div>
          <span>Price</span>
          <p class="text-xl font-medium mt-0">S/.{{ tour.price }}</p>
        </div>
        <Button label="Select" @click="save(tour.id)" />
      </div>
    </div>
  </div>
  <br /><br />
  <div id="buttons" class="grid grid-nogutter justify-content-between">
    <Button
      label="Prev"
      @click="prevPage()"
      icon="pi pi-angle-left"
      iconPos="left"
    />
    <Button
      label="Next"
      @click="nextPage()"
      icon="pi pi-angle-right"
      iconPos="right"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { TourService } from "../../services/Tour.service";

// emits
const emit = defineEmits(["prevPage", "nextPage"]);

// refs
const resultTour = ref([]);

const tourService = new TourService();

// lifecycle hooks
onMounted(async () => {
  const travelAgencyId = localStorage.getItem("travelAgencyId");
  const locationId = localStorage.getItem("locationId");

  const response = await tourService.getToursByLocationId(locationId);
  resultTour.value = response.data;

  // tourService.filterTour(travelAgencyId, locationId).then((response) => {
  //   resultTour.value = response.data;
  // });
});

// classes

// functions
const prevPage = () => emit("prevPage", { pageIndex: 2 });

const nextPage = () => emit("nextPage", { pageIndex: 2 });

const save = (id) => {
  localStorage.setItem("accommodationSelected", JSON.stringify(id));
};
</script>

<style scoped>
.card-container {
  background-color: #161d2f;
  border-radius: 8px;
}

.max-w-30-ch {
  max-width: 40ch;
}
</style>
