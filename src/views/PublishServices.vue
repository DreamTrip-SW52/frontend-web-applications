<template>
  <Navbar />
  <div>
    <!-- <pre>{{ JSON.stringify(packageData, null, 4) }}</pre> -->
    <!-- <pre>{{ JSON.stringify(transport, null, 4) }}</pre> -->
    <!-- <pre>{{ JSON.stringify(trip, null, 4) }}</pre> -->
    <pre>{{ JSON.stringify(transportData, null, 4) }}</pre>

    <header class="text-center">
      <h1 class="text-white">Create Package</h1>
    </header>
    <main class="mx-8 grid gap-8">
      <div class="column">
        <h2>Package Information</h2>
        <form class="grid">
          <div class="col-4 flex-column gap-8 align-items-center">
            <label for="name" class="align-self-start">Name</label>
            <input
              class="w-full"
              id="name"
              type="text"
              v-model="packageData.name"
            />
          </div>
          <br />
          <div class="col-4 flex-column gap-2 align-items-center">
            <label for="description" class="align-self-start"
              >Description</label
            >
            <input
              class="w-full"
              id="description"
              type="text"
              v-model="packageData.description"
            />
          </div>
          <br />
          <div class="col-4 flex-column gap-2 align-items-center">
            <label for="locationAddress" class="align-self-start"
              >Location Address</label
            >
            <input
              class="w-full"
              id="locationAddress"
              type="text"
              v-model="packageData.locationAddress"
            />
          </div>
          <br />
          <div
            class="col-4 flex-column gap-2 justify-content-between align-items-center"
          >
            <label for="capacity" class="align-self-start">Capacity</label>
            <input
              class="w-full"
              id="capacity"
              type="number"
              v-model="packageData.capacity"
            />
          </div>
          <br />
          <div
            class="col-4 flex-column gap-2 justify-content-between align-items-center"
          >
            <label for="duration" class="align-self-start">Duration</label>
            <input
              class="w-full"
              id="duration"
              type="number"
              v-model="packageData.duration"
            />
          </div>
          <br />
          <div
            class="col-4 flex-column gap-2 justify-content-between align-items-center"
          >
            <label for="typeOfPackage" class="align-self-start"
              >Type of Package</label
            >
            <MultiSelect
              class="w-full"
              id="typeOfPackage"
              v-model="typePackage"
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
          <div
            class="col-4 flex flex-column gap-2 justify-content-between align-items-center"
          >
            <label for="price">Price</label>
            <input id="price" type="number" v-model="packageData.price" />
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
          <div
            v-if="tripSelected === 'One way' || tripSelected === 'Round trip'"
          >
            <br />
            <div class="flex justify-content-between align-items-center">
              <label for="class">Class</label>
              <MultiSelect
                id="class"
                v-model="transportDataRoundTrip.transportClassId"
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
                v-model="transportDataOneWay.transportClassId"
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
            <div class="flex justify-content-between align-items-center">
              <label for="transportGoName">Transport Name</label>
              <input
                id="transportGoName"
                type="text"
                v-model="transportData.name"
              />
            </div>
            <br />
            <div class="flex justify-content-between align-items-center">
              <label for="price">Price</label>
              <input
                id="price"
                type="text"
                v-model="transportDataRoundTrip.price"
                v-if="tripSelected === 'Round trip'"
              />
              <input
                id="price"
                type="text"
                v-model="transportDataOneWay.price"
                v-if="tripSelected === 'One way'"
              />
            </div>
          </div>
        </div>
        <br />
      </div>
      <section id="accommodation">
        <Fieldset
          legend="Accommodation"
          :toggleable="true"
          style="background-color: #161d2f"
          class="text-white"
        >
          <h2>{{ ACCOMMODATION }}</h2>
          <div
            v-for="field of accommodationFields"
            class="flex gap-4 justify-content-between align-items-center"
          >
            <label :for="field.label">{{ field.title }}</label>
            <InputText
              :id="field.label"
              v-if="field.type !== 'calendar'"
              :required="field.requerid"
              v-model="field.value"
              :type="field.type"
              v-mask="field.mask"
            />
            <div v-else>
              <Calendar
                v-if="!checkField(field)"
                :id="field.label"
                v-model="field.value"
                selection-mode="single"
                :min-date="TODAY_DATE"
                :manual-input="false"
                @date-select="checkInSelect"
              />
              <Calendar
                v-else-if="checkField(field) && selectCheckIn"
                :id="field.label"
                v-model="field.value"
                selection-mode="single"
                :min-date="nextDate"
                :disabled-dates="[nextDate]"
                :manual-input="false"
              />
              <InputText v-else disabled />
            </div>
          </div>
        </Fieldset>
      </section>
      <section id="tour">
        <Fieldset
          legend="Tour"
          :toggleable="true"
          style="background-color: #161d2f"
          class="text-white"
        >
          <h2>{{ TOUR }}</h2>
          <div
            v-for="field of tourFields"
            class="flex gap-4 justify-content-between align-items-center"
          >
            <label :for="field.label">{{ field.title }}</label>
            <InputText
              :id="field.label"
              :required="field.requerid"
              v-model="field.value"
              :type="field.type"
              v-mask="field.mask"
            />
          </div>
        </Fieldset>
      </section>
      <section id="rent-car">
        <Fieldset
          legend="Rent Car"
          :toggleable="true"
          style="background-color: #161d2f"
          class="text-white"
        >
          <h2>{{ RENT_CAR }}</h2>
          <div
            v-for="field of rentCarFields"
            class="flex gap-4 justify-content-between align-items-center"
          >
            <label :for="field.label">{{ field.title }}</label>
            <InputText
              v-mask="field.mask"
              v-if="field.type !== 'calendar'"
              :id="field.label"
              :required="field.requerid"
              v-model="field.value"
              :type="field.type"
            />
            <Calendar
              v-else
              :time-only="true"
              hour-format="12"
              :id="field.label"
              v-model="field.value"
            />
          </div>
        </Fieldset>
      </section>
    </main>
    <div class="complete-width text-center actions">
      <div class="errors">
        <div class="accommodation-error" v-for="error of errors">
          <small> {{ error.message }} on {{ error.on }}</small>
        </div>
      </div>
      <Button @click="submit" label="Submit" />
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { ref } from "vue";
import { FormFields } from "@/interfaces/FormField";
import { Accommodation } from "@/interfaces/Accomodation";
import { Tour } from "@/interfaces/Tour";
import { RentCar } from "@/interfaces/RentCar";
import { PackageService } from "../services/Package.service";
import { AccommodationService } from "../services/Accommodation.service";
import { TransportService } from "../services/Transport.service";
import moment from "moment";

// Services
const packageService = new PackageService();
const accommodationService = new AccommodationService();
const transportService = new TransportService();

// const's
const PRICE_MASK = ref("{{0000}}");
const TEXT_MASK = allCharacterMask(600);
const CAPACITY_MASK = "{{000}}";
const TODAY_DATE = new Date();
const MINIMUM_CHECK_DAYS = 1;
const ACCOMMODATION = "Accommodation";
const TOUR = "Tour";
const RENT_CAR = "Rent Car";

//variables
let accommodation = Accommodation;
let tour = Tour;
let rentCar = RentCar;
let errors = ref([]);
let selectCheckIn = ref(false);
let nextDate = ref(TODAY_DATE);

//for accommodation information
let accommodationFields = ref(FormFields);
const accommodationLabel = "accommodation-";
accommodationFields.value = [
  {
    label: accommodationLabel + "details",
    title: "Details",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: accommodationLabel + "check-in",
    title: "Check in",
    value: "",
    requerid: true,
    placeholder: "",
    type: "calendar",
  },
  {
    label: accommodationLabel + "check-out",
    title: "Check out",
    value: "",
    requerid: true,
    placeholder: "",
    type: "calendar",
  },
  {
    label: accommodationLabel + "locationAddress",
    title: "Location",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: accommodationLabel + "price",
    title: "Price",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: PRICE_MASK,
  },
];

function allCharacterMask(size) {
  let mask = "{{";
  for (let i = 0; i < size; ++i) mask += "*";

  mask += "}}";
  return mask;
}

function checkInSelect(date) {
  selectCheckIn.value = true;
  nextDate.value = date;
}

function checkField(field) {
  return field.label === accommodationLabel + "check-out";
}

//for tour information
let tourFields = ref(FormFields);
const tourLabel = "tour-";

tourFields.value = [
  {
    label: tourLabel + "details",
    title: "Details",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: tourLabel + "location",
    title: "Location",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: tourLabel + "meeting-point",
    title: "Meeting point",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: tourLabel + "price",
    title: "Price",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: PRICE_MASK,
  },
];

//for rent car information
let rentCarFields = ref(FormFields);
const rentCarLabel = "rent-car-";
rentCarFields.value = [
  {
    label: rentCarLabel + "name",
    title: "Name",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: rentCarLabel + "brand",
    title: "Brand",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: rentCarLabel + "address",
    title: "Address",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: rentCarLabel + "capacity",
    title: "Capacity",
    value: "1",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: CAPACITY_MASK,
  },
  {
    label: rentCarLabel + "price",
    title: "Price",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: PRICE_MASK,
  },
  {
    label: rentCarLabel + "pick-up",
    title: "Pick up hour",
    value: "",
    requerid: true,
    placeholder: "",
    type: "calendar",
  },
  {
    label: rentCarLabel + "drop-off",
    title: "Drop off hour",
    value: "",
    requerid: true,
    placeholder: "",
    type: "calendar",
  },
];

//util functions
function formatDate(format, date) {
  return moment(String(date)).format(format);
}

function firstLetterUpper(string) {
  let value = string;
  if (value.length > 1) value = value[0].toUpperCase();
  value += string.substring(1, string.length);
  return value;
}

function fromKebabToLowerCamelCase(kebabValue) {
  let separator = String(kebabValue).split("-");
  let property = "";
  for (let i = 0; i < separator.length; ++i) {
    if (i > 0) property += firstLetterUpper(separator[i]);
    else property += separator[i];
  }
  return property;
}

//functions for set
function setStorableObject(
  formFields,
  separatorLabel,
  hasDateValues,
  formatDateValue
) {
  let separator = [];
  let property = "";
  let object = {};
  for (let field of formFields) {
    separator = field.label.split(separatorLabel);
    property = separator.pop();

    if (hasDateValues && field.type === "calendar" && field.value !== "") {
      if (!formatDateValue) formatDateValue = "DD/MM/YYYY";
      field.value = formatDate(formatDateValue, field.value);
    }

    if (property.includes("-")) property = fromKebabToLowerCamelCase(property);

    object[property] = field.value;
  }

  return object;
}

function setStorableAccommodation() {
  accommodation = setStorableObject(
    accommodationFields.value,
    accommodationLabel,
    true
  );
  console.log("accommodation", accommodation);
}

function setStorableTour() {
  tour = setStorableObject(tourFields.value, tourLabel);
  console.log("tour", tour);
}

function setStorableRentCar() {
  rentCar = setStorableObject(
    rentCarFields.value,
    rentCarLabel,
    true,
    "h:mm A"
  );
  console.log("rent car", rentCar);
}

//functions for validate data
function validateFillFields(formFields, on) {
  for (let field of formFields) {
    if (field.value === "") {
      errors.value.push({
        type: "not-fill",
        message: "Please, fill all fields",
        on: on,
      });
      return;
    }
  }
}

function validateAccommodationCheckDates() {
  let checkIn = accommodationFields.value[1].value;
  let checkOut = accommodationFields.value[2].value;
  if (moment(checkIn).isSameOrAfter(checkOut))
    errors.value.push({
      type: "value-error",
      message: "Error with dates",
      on: ACCOMMODATION,
    });
}

function validateRentCarHours() {
  let pickUp = rentCarFields.value[6].value;
  let dropOff = rentCarFields.value[7].value;
  if (pickUp !== "" && dropOff !== "") {
    if (moment(pickUp).isSameOrAfter(dropOff))
      errors.value.push({
        type: "value-error",
        message: "Error with hors",
        on: RENT_CAR,
      });
  }
}

//submit button
async function submit() {
  /* PACKAGE */
  packageData.value.agencyId = localStorage.getItem("currentUser");
  packageData.value.category = parseMultiSelectIntoValue(
    parseProxy(typePackage.value)
  )[0];

  locationTo.value = parseMultiSelectIntoValue(parseProxy(locationTo.value));
  locationFrom.value = parseMultiSelectIntoValue(
    parseProxy(locationFrom.value)
  );

  const responseLocationTo = await transportService.getLocationByDepartment(
    locationTo.value
  );
  locationToObject.value = responseLocationTo.data;

  packageData.value.locationId = locationToObject.value.id;

  const responseLocationFrom = await transportService.getLocationByDepartment(
    locationFrom.value
  );
  locationFromObject.value = responseLocationFrom.data;

  // create package
  const responsePackage = await packageService.createPackage(packageData.value);

  /* TRANSPORT */
  transportData.value.type = parseMultiSelectIntoValue(
    parseProxy(transport.value)
  )[0];

  // create transport
  const responseTransport = await transportService.createTransport(
    transportData.value
  );

  /* TRIPS GO */

  const responseTripsGo = await transportService.createTripsGo({
    locationId: locationToObject.value.id,
  });

  /* TRIPS BACK */

  const responseTripsBack = await transportService.createTripsBack({
    locationId: locationFromObject.value.id,
  });

  /* TRIP */

  let departureDate = JSON.stringify(tripDate.value[0]);
  let returnDate = JSON.stringify(tripDate.value[1]);
  departureDate = departureDate.substring(1, departureDate.length - 3);
  returnDate = returnDate.substring(1, returnDate.length - 3);

  if (tripSelected.value === "One way") {
    /* ONE WAY */
    transportDataOneWay.value.departureDate = departureDate;
    transportDataOneWay.value.returnDate = returnDate;
    transportDataOneWay.value.transportId = responseTransport.data.id;
    transportDataOneWay.value.tripGoId = responseTripsGo.data.id;
    transportDataOneWay.value.packageId = responsePackage.data.id;
    transportDataOneWay.value.transportClassId = parseMultiSelectIntoValue(
      parseProxy(transportDataOneWay.value.transportClassId)
    )[0];

    const responseOneWay = await transportService.createOneWay(
      transportDataOneWay.value
    );
  } else {
    /* ROUND TRIP */
    transportDataRoundTrip.value.departureDate = departureDate;
    transportDataRoundTrip.value.returnDate = returnDate;
    transportDataRoundTrip.value.transportId = responseTransport.data.id;
    transportDataRoundTrip.value.tripGoId = responseTripsGo.data.id;
    transportDataRoundTrip.value.tripBackId = responseTripsBack.data.id;
    transportDataRoundTrip.value.packageId = responsePackage.data.id;
    transportDataRoundTrip.value.transportClassId = parseMultiSelectIntoValue(
      parseProxy(transportDataRoundTrip.value.transportClassId)
    )[0];

    const responseRoundTrip = await transportService.createRoundTrip(
      transportDataRoundTrip.value
    );
  }

  //reset errors
  // errors.value = [];
  //start validate
  // validateFillFields(accommodationFields.value, ACCOMMODATION);
  // validateFillFields(tourFields.value, TOUR);
  // validateFillFields(rentCarFields.value, RENT_CAR);

  // validateAccommodationCheckDates();
  // validateRentCarHours();

  //validate errors
  // if (errors.value.length !== 0) return;

  //start set objects
  // setStorableAccommodation();
  // setStorableTour();
  // setStorableRentCar();
  alert("Package created successfully");
}

// Data
const packageData = ref({
  name: "",
  description: "",
  locationAddress: "",
  category: "",
  capacity: 0,
  duration: 1,
  price: 0,
  image:
    "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  agencyId: 0,
  locationId: 0,
  views: 0,
  sales: 0,
});

const transportDataOneWay = ref({
  departureDate: "",
  returnDate: "",
  price: 0,
  tripGoId: 0,
  transportClassId: 0,
  packageId: 0,
  transportId: 0,
});

const transportDataRoundTrip = ref({
  departureDate: "",
  returnDate: "",
  price: 0,
  tripGoId: 0,
  tripBackId: 0,
  transportClassId: 0,
  packageId: 0,
  transportId: 0,
});

const transportData = ref({
  name: "",
  type: "",
});

const locationToObject = ref({});
const locationFromObject = ref({});
const tripDate = ref([]);
// inputs
const transport = ref("");
const trip = ref("");
const tripSelected = ref("");
const locationFrom = ref("");
const locationTo = ref("");
const typePackage = ref("");

// Multiselect data

const typeOfPackage = ref([
  { type: "Standard", value: "STANDARD" },
  { type: "Special", value: "SPECIAL" },
  { type: "Itinerant trips", value: "ITINERANT TRIPS" },
  { type: "Stay trips", value: "STAY TRIPS" },
  { type: "General", value: "GENERAL" },
  { type: "Specific", value: "SPECIFIC" },
  { type: "Local programs", value: "LOCAL PROGRAMS" },
  { type: "Regional programs", value: "REGIONAL PROGRAMS" },
]);

const transports = ref([
  { transport: "Bus", value: "BUS" },
  { transport: "Flight", value: "FLIGHT" },
  { transport: "Train", value: "TRAIN" },
]);

const typeOfTrip = ref([
  { trip: "Round Trip", value: "Round trip" },
  { trip: "One Way", value: "One way" },
]);

const classes = ref([
  { classT: "VIP", value: "1" },
  { classT: "Express", value: "2" },
  { classT: "Normal", value: "3" },
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
.tour,
.accommodation,
.rent-car {
  display: grid;
  grid-template-columns: 1fr;
}
.errors {
  margin-bottom: 1rem;
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

.errors {
  color: red;
}
</style>
