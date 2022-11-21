<template>
  <main class="px-6">
    <header>
      <h1 class="text-4xl text-center mt-8 text-white">Rent Car</h1>
    </header>
    <form
      class="flex flex-column align-items-center py-4 gap-4 mt-4 text-white"
    >
      <section class="mt-2 flex flex-column justify-content-center">
        <div id="main-form" class="flex justify-content-center">
          <div id="price" class="flex flex-column">
            <label>Price</label>
            <div class="mb-3 flex justify-content-between">
              <span>min {{ formData.price[0] }}</span>
              <span class="mr-4">max {{ formData.price[1] }}</span>
            </div>
            <Slider
              v-model="formData.price"
              :range="true"
              :min="50"
              :max="1000"
            />
          </div>
          <div id="capacity" class="flex flex-column">
            <label>Capacity</label>
            <div class="mb-3 flex justify-content-between">
              <span>min {{ formData.capacity[0] }}</span>
              <span class="mr-4">max {{ formData.capacity[1] }}</span>
            </div>
            <Slider
              v-model="formData.capacity"
              :range="true"
              :min="4"
              :max="8"
            />
          </div>
          <div id="brands" class="flex flex-column">
            <label>Brands</label>
            <MultiSelect
              v-model="formData.brand"
              :options="brands"
              optionLabel="brand"
              placeholder="Select Brand"
              display="comma"
              :selectionLimit="1"
            />
          </div>
        </div>
        <div class="mt-8 flex justify-content-center">
          <Button class="submit-btn" label="FIND" type="button" @click="find" />
          <Dialog
            v-model:visible="displayDialog"
            :modal="true"
            :style="{ width: '50vw' }"
          >
            <div v-for="result in resultCars">
              <div
                class="card-container text-white flex justify-content-between p-4 align-items-center"
              >
                <div v-if="result.photo">
                  <img :src="result.photo" alt="Car Photo" />
                </div>
                <div v-else>
                  <img src="https://via.placeholder.com/150" alt="Car photo" />
                </div>
                <ul>
                  <li class="text-xl font-medium">
                    Price: S/.{{ result.price }}
                  </li>
                  <li class="text-xl font-medium">
                    Pickup Address: {{ result.address }}
                  </li>
                  <li class="text-xl font-medium">Brand: {{ result.brand }}</li>
                </ul>
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
import { ref } from "vue";
import { CarService } from "../../services/Car.service";

// emits
const emit = defineEmits(["prevPage", "nextPage"]);

// refs
const filteredCar = ref([]);
const resultCars = ref([]);
const displayDialog = ref(false);
const formData = ref({
  price: [50, 200],
  capacity: [4, 5],
  brand: "",
});
const brands = ref([
  { brand: "Toyota", value: "TOYOTA" },
  { brand: "Suzuki", value: "SUZUKI" },
  { brand: "Chevrolet", value: "CHEVROLET" },
  { brand: "Honda", value: "HONDA" },
  { brand: "BMW", value: "BMW" },
  { brand: "KIA", value: "KIA" },
  { brand: "Nissan", value: "NISSAN" },
  { brand: "Hyundai", value: "HYUNDAI" },
]);

// classes
const carService = new CarService();

// functions
const prevPage = () => emit("prevPage", { pageIndex: 3 });

const nextPage = () => emit("nextPage", { pageIndex: 3 });

const openDialog = () => (displayDialog.value = true);

const parseProxy = (proxy) => JSON.parse(JSON.stringify(proxy));

const save = (id) => {
  localStorage.setItem("carSelected", JSON.stringify(id));
};

const parseMultiSelectIntoValue = (items) => {
  const newItems = [];
  items.forEach((item) => {
    newItems.push(item.value);
  });
  return newItems;
};

const find = async () => {
  const locationId = localStorage.getItem("locationId");
  const price = parseProxy(formData.value.price);
  const capacity = parseProxy(formData.value.capacity);
  const brand = parseMultiSelectIntoValue(parseProxy(formData.value.brand))[0];

  const response = await carService.filterCar(
    locationId,
    price[0],
    price[1],
    capacity[0],
    capacity[1],
    brand
  );

  resultCars.value = response.data;

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

img {
  width: 150px;
  height: 100px;
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

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
