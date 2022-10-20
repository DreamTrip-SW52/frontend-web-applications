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
      <div clas="flex flex-row">
        <span>Oustandings</span>
        <ul v-for="item in tour.oustanding">
          <li>{{ item }}</li>
        </ul>
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
import { onMounted, ref } from 'vue';
import { TourService } from '../../services/Tour.service';

// emits
const emit = defineEmits(['prevPage', 'nextPage']);

// refs
const resultTour = ref([]);

// lifecycle hooks
onMounted(() => {
  const travelAgencyId = localStorage.getItem('travelAgencyId');
  const locationId = localStorage.getItem('locationId');
  tourService.filterTour(travelAgencyId, locationId).then((response) => {
    resultTour.value = response.data;
  });
});

// classes
const tourService = new TourService();

// functions
const prevPage = () => emit('prevPage', { pageIndex: 2 });
const nextPage = () => emit('nextPage', { pageIndex: 2 });
const openDialog = () => (displayDialog.value = true);
const parseProxy = (proxy) => JSON.parse(JSON.stringify(proxy));
const save = (id) => {
  localStorage.setItem('accommodationSelected', JSON.stringify(id));
};
</script>

<style scoped>
.card-container {
  background-color: #161d2f;
  border-radius: 8px;
}

/* .line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
} */

.max-w-30-ch {
  max-width: 40ch;
}
</style>
