<template>
  <Navbar />
  <div>
    <div class="text-center">
      <h1 class="text-white">Create Package</h1>
    </div>
    <div class="mx-8 grid gap-8">
      <div class="column">

        <h2>Package Information</h2>
        <form class="flex flex-column">
          <div class="flex justify-content-between align-items-center">
            <label for="name">Name</label>
            <input id="name" type="text" v-model="packageData.name" />
          </div>
          <br />
          <div class="flex justify-content-between align-items-center">
            <label for="description">Description</label>
            <input id="description" type="text" v-model="packageData.description" />
          </div>
          <br />
          <div class="flex justify-content-between align-items-center">
            <label for="location">Location</label>
            <input id="location" type="text" v-model="packageData.location" />
          </div>
          <br />
          <div class="flex justify-content-between align-items-center">
            <label for="capacity">Capacity</label>
            <input id="capacity" type="number" v-model="packageData.capacity" />
          </div>
          <br />
          <div class="flex justify-content-between align-items-center">
            <label for="duration">Duration</label>
            <input id="duration" type="number" v-model="packageData.duration" />
          </div>
          <br />
          <div class="flex justify-content-between align-items-center">
            <label for="typeOfPackage">Type of Package</label>
            <MultiSelect
                id="typeOfPackage"
                v-model="packageData.type"
                :options="typeOfPackage"
                display="chip"
                optionLabel="type"
                placeholder="Type"
                dropdownIcon="pi pi-chevron-down"
                :showToogleAll="false"
                :selectionLimit="1"
            />
          </div>
          <br />
          <div class="flex justify-content-between align-items-center">
            <label for="total">Total</label>
            <input id="total" type="number" v-model="packageData.total" />
          </div>
        </form>
        <h2>Transport Information</h2>
        <div>
          <div class="flex justify-content-between align-items-center">
            <label for="transports">Choose the transport</label>
            <MultiSelect
                id="transports"
                v-model="transport"
                :options="transports"
                display="chip"
                optionLabel="transport"
                placeholder="Transport"
                dropdownIcon="pi pi-chevron-down"
                :showToogleAll="false"
                :selectionLimit="1"
            />
          </div>
          <br />
          <div class="flex justify-content-between align-items-center">
            <label for="typeOfTrip">Type of trip</label>
            <MultiSelect
                id="typeOfTrip"
                v-model="trip"
                :options="typeOfTrip"
                display="chip"
                optionLabel="trip"
                placeholder="Type of trip"
                dropdownIcon="pi pi-chevron-down"
                :showToogleAll="false"
                :selectionLimit="1"
                @change="selectTrip($event)"
            />
          </div>
          <br />
          <div v-if="tripSelected === 'Round trip' || tripSelected === 'One way'">
            <div class="flex justify-content-between align-items-center">
              <label for="passengers">Passengers</label>
              <input
                  id="passengers"
                  type="number"
                  v-model="transportDataRoundTrip.passengers"
                  v-if="tripSelected === 'Round trip'"
              />
              <input
                  id="passengers"
                  type="number"
                  v-model="transportDataOneWay.passengers"
                  v-if="tripSelected === 'One way'"
              />
            </div>
            <br />
            <div class="flex justify-content-between align-items-center">
              <label for="class">Class</label>
              <MultiSelect
                  id="class"
                  v-model="transportDataRoundTrip.class"
                  :options="classes"
                  display="chip"
                  optionLabel="classT"
                  placeholder="Class"
                  dropdownIcon="pi pi-chevron-down"
                  :showToogleAll="false"
                  :selectionLimit="1"
                  v-if="tripSelected === 'Round trip'"
              />
              <MultiSelect
                  id="class"
                  v-model="transportDataOneWay.class"
                  :options="classes"
                  display="chip"
                  optionLabel="classT"
                  placeholder="Class"
                  dropdownIcon="pi pi-chevron-down"
                  :showToogleAll="false"
                  :selectionLimit="1"
                  v-if="tripSelected === 'One way'"
              />
            </div>
            <br />
            <div class="flex justify-content-between align-items-center">
              <label for="class">Select the dates</label>
              <Calendar
                  inputId="range"
                  v-model="tripDate"
                  selectionMode="range"
                  placeholder="Date"
                  :manualInput="false"
                  :minDate="new Date()"
              />
            </div>
            <br />
            <div class="flex justify-content-between align-items-center">
              <label for="from">From</label>
              <MultiSelect
                  id="from"
                  v-model="locationFrom"
                  :options="departments"
                  display="chip"
                  optionLabel="department"
                  placeholder="Department"
                  :showToogleAll="false"
                  :selectionLimit="1"
              />
            </div>
            <br />
            <div class="flex justify-content-between align-items-center">
              <label for="to">To</label>
              <MultiSelect
                  id="to"
                  v-model="locationTo"
                  :options="departments"
                  display="chip"
                  optionLabel="department"
                  placeholder="Department"
                  :showToogleAll="false"
                  :selectionLimit="1"
              />
            </div>
            <br />
            <h2>Transport to Go</h2>
            <div class="flex justify-content-between align-items-center">
              <label for="transportGoName">Transport Name</label>
              <input
                  id="transportGoName"
                  type="text"
                  v-model="transportDataRoundTrip.details[0].name"
                  v-if="tripSelected === 'Round trip'"
              />
              <input
                  id="transportGoName"
                  type="text"
                  v-model="transportDataOneWay.details[0].name"
                  v-if="tripSelected === 'One way'"
              />
            </div>
            <br />
            <div class="flex justify-content-between align-items-center">
              <label for="priceGo">Price</label>
              <input
                  id="priceGo"
                  type="text"
                  v-model="transportDataRoundTrip.details[0].price"
                  v-if="tripSelected === 'Round trip'"
              />
              <input
                  id="priceGo"
                  type="text"
                  v-model="transportDataOneWay.details[0].price"
                  v-if="tripSelected === 'One way'"
              />
            </div>
            <div v-if="tripSelected === 'Round trip'">
              <h2>Transport to Back</h2>
              <div class="flex justify-content-between align-items-center">
                <label for="transportBackName">Transport Name</label>
                <input
                    id="transportBackName"
                    type="text"
                    v-model="transportDataRoundTrip.details[1].name"
                />
              </div>
              <br />
              <div class="flex justify-content-between align-items-center">
                <label for="priceBack">Price</label>
                <input
                    id="priceBack"
                    type="text"
                    v-model="transportDataRoundTrip.details[1].price"
                />
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
      <div class="column">
        <div class="accommodation gap-2">
          <h2>Accommodation</h2>
          <div v-for="field of accommodationFields" class="flex gap-4 justify-content-between align-items-center">
            <label  :for="field.label">{{ field.title }}</label>
            <InputText :id="field.label" v-if="field.type !== 'calendar'"
                       :required="field.requerid" v-model="field.value"
                       :type="field.type" v-mask="field.mask"  />
            <Calendar :id="field.label" v-else input-id="single"
                      v-model="field.value" selection-mode="single"
                      :manual-input="false" :min-date="TODAY_DATE" />
          </div>
        </div>
        <div class="tour gap-2">
          <h2>Tour</h2>
          <div v-for="field of tourFields" class="flex gap-4 justify-content-between align-items-center">
            <label :for="field.label">{{ field.title }}</label>
            <InputText :id="field.label" :required="field.requerid" v-model="field.value" :type="field.type" v-mask="field.mask"  />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="rent-car gap-2">
          <h2>Rent car</h2>
          <div v-for="field of rentCarFields" class="flex gap-4 justify-content-between align-items-center">
            <label :for="field.label">{{ field.title }}</label>
            <InputText v-mask="field.mask" v-if="field.type !== 'calendar'" :id="field.label" :required="field.requerid" v-model="field.value" :type="field.type"  />
            <Calendar v-else :time-only="true" hour-format="12" :id="field.label" v-model="field.value"  />
          </div>
        </div>
      </div>

    </div>
    <div class="complete-width text-center">
      <Button label="Submit" />
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { ref } from "vue";
import {FormFields} from "@/interfaces/FormField";


//for accommodation information
const PRICE_MASK = ref('{{0000}}')
const TEXT_MASK = allCharacterMask(600);
const CAPACITY_MASK = '{{000}}'

const TODAY_DATE = new Date();
let accommodationFields = ref(FormFields);
accommodationFields.value = [
  {
    label: 'details',
    title: 'Details',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'text',
    mask: TEXT_MASK
  },
  {
    label: 'check-in',
    title: 'Check in',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'calendar'
  },
  {
    label: 'check-out',
    title: 'Check out',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'calendar'
  },
  {
    label: 'location',
    title: 'Location',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'text',
    mask: TEXT_MASK
  },
  {
    label: 'price',
    title: 'Price',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'text',
    mask: PRICE_MASK
  }
]

function allCharacterMask(size) {
  let mask = '{{'
  for(let i = 0; i < size; ++i)
    mask += '*';

  mask += '}}';
  return mask;
}

//for tour information
let tourFields = ref(FormFields);
tourFields.value = [
  {
    label: 'details',
    title: 'Details',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'text',
    mask: TEXT_MASK
  },
  {
    label: 'location',
    title: 'Location',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'text',
    mask: TEXT_MASK
  },
  {
    label: 'meeting-point',
    title: 'Meeting point',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'text',
    mask: TEXT_MASK
  },
  {
    label: 'price',
    title: 'Price',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'text',
    mask: PRICE_MASK
  }
]

//for rent car information
let rentCarFields = ref(FormFields);

rentCarFields.value = [
  {
    label: 'name',
    title: 'Name',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'text',
    mask: TEXT_MASK
  },
  {
    label: 'brand',
    title: 'Brand',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'text',
    mask: TEXT_MASK
  },
  {
    label: 'address',
    title: 'Address',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'text',
    mask: TEXT_MASK
  },
  {
    label: 'capacity',
    title: 'Capacity',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'text',
    mask: CAPACITY_MASK
  },
  {
    label: 'photo',
    title: 'Photo',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'text',
    mask: TEXT_MASK
  },
  {
    label: 'price',
    title: 'Price',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'text',
    mask: PRICE_MASK
  },
  {
    label: 'pick-up',
    title: 'Pick up hour',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'calendar'
  },
  {
    label: 'drop-off',
    title: 'Drop off hour',
    value: '',
    requerid: true,
    placeholder: '',
    type: 'calendar'
  }
]

//mask validation function
function putNumberMask() {

}

//
const packageData = ref({
  name: "",
  description: "",
  location: "",
  capacity: 0,
  duration: 1,
  typeOfPackage: "",
  total: 0,
  img: "",
});

const transportDataOneWay = ref({
  passengers: 1,
  class: "",
  departDate: "",
  returnDate: "",
  price: 0,
  locationId: 0,
  details: [
    {
      type: "go",
      name: "",
      price: 0,
      from: {
        tag: "",
        abbr: "",
      },
      to: {
        tag: "",
        abbr: "",
      },
    },
  ],
});

const transportDataRoundTrip = ref({
  passengers: 1,
  class: "",
  departDate: "",
  returnDate: "",
  price: 0,
  locationId: 0,
  details: [
    {
      type: "go",
      name: "",
      price: 0,
      from: {
        tag: "",
        abbr: "",
      },
      to: {
        tag: "",
        abbr: "",
      },
    },
    {
      type: "back",
      name: "",
      price: 0,
      from: {
        tag: "",
        abbr: "",
      },
      to: {
        tag: "",
        abbr: "",
      },
    },
  ],
});

const transport = ref("");
const trip = ref("");
const tripSelected = ref("");
const tripDate = ref([]);
const locationFrom = ref("");
const locationTo = ref("");

// Multiselect data

const typeOfPackage = ref([
  { type: "Standard", value: "Standard" },
  { type: "Special", value: "Special" },
  { type: "Itinerant trips", value: "Itinerant trips" },
  { type: "Stay trips", value: "Stay trips" },
  { type: "General", value: "General" },
  { type: "Specific", value: "Specific" },
  { type: "Local programs", value: "Local programs" },
  { type: "Regional programs", value: "Regional programs" },
]);

const transports = ref([
  { transport: "Bus", value: "bus" },
  { transport: "Flight", value: "flights" },
  { transport: "Train", value: "trains" },
]);

const typeOfTrip = ref([
  { trip: "Round Trip", value: "Round trip" },
  { trip: "One Way", value: "One way" },
]);

const classes = ref([
  { classT: "Express", value: "express" },
  { classT: "Commercial", value: "commercial" },
  { classT: "VIP", value: "vip" },
]);

const departments = ref([
  { department: "Amazonas", value: "Amazonas" },
  { department: "Ancash", value: "Ancash" },
  { department: "Apurimac", value: "Apurimac" },
  { department: "Arequipa", value: "Arequipa" },
  { department: "Ayacucho", value: "Ayacucho" },
  { department: "Cajamarca", value: "Cajamarca" },
  { department: "Callao", value: "Callao" },
  { department: "Cuzco", value: "Cuzco" },
  { department: "Huancavelica", value: "Huancavelica" },
  { department: "Huanuco", value: "Huanuco" },
  { department: "Ica", value: "Ica" },
  { department: "Junin", value: "Junin" },
  { department: "La Libertad", value: "La Libertad" },
  { department: "Lambayeque", value: "Lambayeque" },
  { department: "Lima", value: "Lima" },
  { department: "Loreto", value: "Loreto" },
  { department: "Madre de Dios", value: "Madre de Dios" },
  { department: "Moquegua", value: "Moquegua" },
  { department: "Pasco", value: "Pasco" },
  { department: "Piura", value: "Piura" },
  { department: "Puno", value: "Puno" },
  { department: "San Martin", value: "San Martin" },
  { department: "Tacna", value: "Tacna" },
  { department: "Tumbes", value: "Tumbes" },
  { department: "Ucayali", value: "Ucayali" },
]);

// Multiselect methods

const parseProxy = (proxy) => JSON.parse(JSON.stringify(proxy));

const parseMultiSelectIntoValue = (items) => {
  const newItems = [];
  items.forEach((item) => {
    newItems.push(item.value);
  });
  return newItems;
};

const selectTrip = (e) => {
  const ans = parseMultiSelectIntoValue(parseProxy(trip.value))[0];

  tripSelected.value = ans;
};

const save = () => {};
</script>

<style scoped>
.tour, .accommodation, .rent-car {
  display: grid;
  grid-template-columns: 1fr;
}
input {
  background: #fff;
  border-radius: 6px;
  border: 1px solid #ced4da;
  height: 6vh;
  color: black;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
