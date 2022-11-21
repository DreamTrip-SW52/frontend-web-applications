<template>
  <main class="px-6">
    <header>
      <h1 class="text-4xl text-center mt-8 text-white">Accomodation</h1>
    </header>
    <form class="flex flex-column align-items-center py-4 gap-4 mt-4">
      <section class="mt-2 flex flex-column justify-content-center text-white">
        <div id="main-form" class="flex justify-content-center">
          <div id="price" class="flex flex-column">
            <label>Price</label>
            <div class="mb-3 flex justify-content-between">
              <span>S/.{{ price[0] }}</span>
              <span>S/.{{ price[1] }}</span>
            </div>
            <Slider v-model="price" :range="true" :min="50" :max="1000" />
            <div class="flex mt-2 justify-content-between">
              <span>min </span>
              <span>max </span>
            </div>
          </div>
          <div id="services" class="flex flex-column">
            <label>Services</label>
            <MultiSelect
              v-model="selectedServices"
              :options="services"
              optionLabel="service"
              placeholder="Select Services"
              display="comma"
            />
          </div>
        </div>
        <div class="mt-8 flex justify-content-center">
          <Button class="submit-btn" label="FIND" type="button" @click="find" />
          <Dialog
            v-model:visible="displayDialog"
            :modal="true"
            :style="{ width: '80vw' }"
          >
            <div v-for="result in resultAccommodation">
              <div
                class="card-container text-white flex justify-content-between p-4 align-items-center"
              >
                <div>
                  <ScrollPanel style="width: 350px; height: 150px">
                    <p class="line-height-4">
                      {{ result.details }}
                    </p>
                    <ScrollTop
                      target="parent"
                      :threshold="100"
                      class="custom-scrolltop"
                      icon="pi pi-arrow-up"
                    />
                  </ScrollPanel>
                </div>
                <!-- <div clas="flex flex-row">
                  <span>Services</span>
                  <ul v-for="service in result.services">
                    <li>{{ service }}</li>
                  </ul>
                </div> -->
                <div>
                  <span class="text-xl font-medium">S/.{{ result.price }}</span>
                </div>
                <Button label="Select" @click="save(result.id)" />
              </div>
            </div>
          </Dialog>
        </div>
      </section>

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
    </form>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { AccommodationService } from '../../services/Accommodation.service';

onMounted(() => {
  const locationId = localStorage.getItem('locationId');
  if (locationId === null) {
    alert('Please select a transport first');
  }
});

// emits
const emit = defineEmits(['prevPage', 'nextPage']);

// classes
const accommodationService = new AccommodationService();

// refs
const displayDialog = ref(false);
const price = ref([50, 200]);
const selectedServices = ref([]);
const resultAccommodation = ref([]);

const services = ref([
  { service: 'WiFi', value: 'WiFi' },
  { service: 'Room Service', value: 'Room Service' },
  { service: 'Restaurant', value: 'Restaurant' },
  { service: 'Bar', value: 'Bar' },
  { service: 'Entertaiment Zone', value: 'Entertaiment Zone' },
  { service: 'Swimming Pool', value: 'Swimming Pool' },
  { service: 'Spa', value: 'Spa' },
  { service: 'Parking', value: 'Parking' },
  { service: 'Air conditioning', value: 'Air conditioning' },
]);

// functions
const prevPage = () => emit('prevPage', { pageIndex: 1 });

const nextPage = () => emit('nextPage', { pageIndex: 1 });

const openDialog = () => (displayDialog.value = true);

const save = (id) =>
  localStorage.setItem('accommodationSelected', JSON.stringify(id));

const parseSelectedServices = (services) => {
  const parsedServices = [];
  services.forEach((service) => {
    parsedServices.push(service.value);
  });
  return parsedServices;
};

const find = async () => {
  // const travelAgencyId = localStorage.getItem("travelAgencyId");
  const locationId = localStorage.getItem('locationId');
  const response = await accommodationService.filterAccommodation(
    locationId,
    price.value[0],
    price.value[1]
  );
  console.log(
    '🚀 ~ file: AccommodationForm.vue ~ line 151 ~ find ~ response',
    response.data
  );
  resultAccommodation.value = response.data;

  openDialog();
};
</script>

<style scoped>
h1 {
  font-weight: 500;
}

label {
  margin-bottom: 8px;
}

#buttons {
  margin-top: 40px;
  width: 80%;
}

#main-form {
  width: 100%;
  gap: 80px;
}

.submit-btn {
  background-color: #fc4747;
  border-color: #fc4747;
  width: 100px;
}

.p-slider-horizontal,
.p-inputtext {
  width: 14rem;
}
.p-slider-vertical {
  height: 14rem;
}

.p-multiselect {
  width: clamp(14rem, 100%, 20rem);
  color: #000;
}

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
</style>
