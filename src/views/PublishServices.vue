<template>
  <Navbar />
  <div>
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
              class="w-full text-base"
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
              class="w-full text-base"
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
              class="w-full text-base"
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
              class="w-full text-right pr-3 text-base"
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
              class="w-full text-right pr-3 text-base"
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
            <input
              class="text-right pr-3 text-base"
              id="price"
              type="number"
              v-model="packageData.price"
            />
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
                class="text-base"
                id="transportGoName"
                type="text"
                v-model="transportData.name"
              />
            </div>
            <br />
            <div class="flex justify-content-between align-items-center">
              <label for="price">Price</label>
              <input
                class="text-right pr-3 text-base"
                id="price"
                type="text"
                v-model="transportDataRoundTrip.price"
                v-if="tripSelected === 'Round trip'"
              />
              <input
                class="text-right pr-3 text-base"
                id="price"
                type="text"
                v-model="transportDataOneWay.price"
                v-if="tripSelected === 'One way'"
              />
            </div>
          </div>
        </div>
        <br />
        <div class="complete-width text-center actions">
          <div class="errors">
            <div class="accommodation-error" v-for="error of errors">
              <small> {{ error.message }} on {{ error.on }}</small>
            </div>
          </div>
          <Button @click="submit" label="Submit" />
        </div>
      </div>
      <Divider />
      <div class="w-full">
        <h2 class="mb-8 text-center text-6xl">ADD-ONS</h2>
        <div class="flex flex-column gap-2">
          <label for="packageSelected">Choose a package</label>
          <MultiSelect
            class="w-3"
            id="packageSelected"
            v-model="packageSelected"
            display="chip"
            :options="agencyPackages"
            :optionLabel="(p) => p.name"
            :optionValue="(p) => p.id"
            placeholder="Packages"
            dropdownIcon="pi pi-chevron-down"
            :showToogleAll="false"
            :selectionLimit="1"
          />
        </div>
        <div v-if="packageSelected.length > 0">
          <h2 class="mb-8 text-center">Package Add-ons</h2>
          <div class="grid">
            <section id="accommodation">
              <Fieldset
                legend="Accommodation"
                :toggleable="true"
                style="background-color: #161d2f"
                class="text-white"
              >
                <h2>{{ ACCOMMODATION }}</h2>
                <div class="flex flex-column gap-3">
                  <div
                    v-for="field of accommodationFields"
                    class="flex gap-4 justify-content-between align-items-center"
                  >
                    <label :for="field.label">{{ field.title }}</label>
                    <div v-if="field.type !== 'calendar'">
                      <InputText
                        :id="field.label"
                        :required="field.requerid"
                        v-model="field.value"
                        :type="field.type"
                        v-mask="field.mask"
                      />
                    </div>
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
                </div>
                <Button
                  @click="addAccommodation"
                  label="Add"
                  class="mt-8 w-full"
                />
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
                <div class="flex flex-column gap-3">
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
                </div>
                <Button @click="addTour" label="Add" class="mt-8 w-full" />
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
                <div class="flex flex-column gap-3">
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
                </div>
                <Button @click="addCar" label="Add" class="mt-8 w-full" />
              </Fieldset>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { ref, onMounted } from "vue";
import { FormFields } from "@/interfaces/FormField";
import { Accommodation } from "@/interfaces/Accomodation";
import { Tour } from "@/interfaces/Tour";
import { RentCar } from "@/interfaces/RentCar";
import { PackageService } from "../services/Package.service";
import { AccommodationService } from "../services/Accommodation.service";
import { TransportService } from "../services/Transport.service";
import { CarService } from "../services/Car.service";
import { TourService } from "../services/Tour.service";
import moment from "moment";

// Services
const packageService = new PackageService();
const accommodationService = new AccommodationService();
const tourService = new TourService();
const transportService = new TransportService();
const carService = new CarService();

// const's
const PRICE_MASK = ref("{{0000}}");
const TEXT_MASK = allCharacterMask(600);
const CAPACITY_MASK = "{{000}}";
const TODAY_DATE = new Date();
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

// para agregar add-ons al package
const agencyPackages = ref([]);
const packageSelected = ref([]);

const getMappedFields = (fields) => {
  return fields.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.label]: curr.value,
    };
    console.log(arr);
  }, {});
};

/*
	1. Primero obtenemos los paquetes de la agencia con el id de la agencia que esta logeada
	2. Esto para poder agregar los add-ons al paquete, comenzando con que tiene que seleccionar un paquete previo a agregarle los add-ons
	3. Luego de seleccionar el paquete, se despliegan los add-ons que se pueden agregar al paquete
	4. Se agregan los add-ons al paquete
	5. Se guarda el paquete con los add-ons
*/
onMounted(() => {
  // Paso 1
  const userId = localStorage.getItem("currentUser");
  packageService
    .getByTravelAgencyId(userId)
    .then((res) => {
      agencyPackages.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

// create a function that displays a success message using VueSweetalert2
const successMessage = (message) => {
  Swal.fire({
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

const addAccommodation = () => {
  const mappedAccommodationFields = accommodationFields.value.reduce(
    (acc, curr) => {
      return {
        ...acc,
        [curr.label]: curr.value,
      };
    },
    {}
  );
  mappedAccommodationFields.packageId = packageSelected.value[0];
  mappedAccommodationFields.price = Number(mappedAccommodationFields.price);
  accommodationService
    .create(mappedAccommodationFields)
    .then((res) => {
      console.log(res);
      successMessage("Accommodation added");
    })
    .catch((err) => {
      console.log(err);
    });
};

const addTour = () => {
  const mappedTourFields = tourFields.value.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.label]: curr.value,
    };
  }, {});
  mappedTourFields.packageId = packageSelected.value[0];
  mappedTourFields.price = Number(mappedTourFields.price);

  tourService
    .create(mappedTourFields)
    .then((res) => {
      console.log(res);
      successMessage("Tour added");
    })
    .catch((err) => {
      console.log(err);
    });
};

const addCar = () => {
  const mappedRentCarFields = rentCarFields.value.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.label]: curr.value,
    };
  }, {});
  mappedRentCarFields.packageId = packageSelected.value[0];
  mappedRentCarFields.price = Number(mappedRentCarFields.price);
  mappedRentCarFields.capacity = Number(mappedRentCarFields.capacity);

  carService
    .create(mappedRentCarFields)
    .then((res) => {
      console.log(res);
      successMessage("Car added");
    })
    .catch((err) => {
      console.log(err);
    });
};

//for accommodation information
let accommodationFields = ref(FormFields);
const accommodationLabel = "accommodation-";
accommodationFields.value = [
  {
    label: "details",
    title: "Details",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: "checkIn",
    title: "Check in",
    value: "",
    requerid: true,
    placeholder: "",
    type: "calendar",
  },
  {
    label: "checkOut",
    title: "Check out",
    value: "",
    requerid: true,
    placeholder: "",
    type: "calendar",
  },
  {
    label: "location",
    title: "Location",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: "price",
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
    label: "details",
    title: "Details",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: "location",
    title: "Location",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: "meetingPoint",
    title: "Meeting point",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: "price",
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
    label: "name",
    title: "Name",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: "brand",
    title: "Brand",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: "address",
    title: "Address",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: TEXT_MASK,
  },
  {
    label: "capacity",
    title: "Capacity",
    value: "1",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: CAPACITY_MASK,
  },
  {
    label: "price",
    title: "Price",
    value: "",
    requerid: true,
    placeholder: "",
    type: "text",
    mask: PRICE_MASK,
  },
  {
    label: "pickUpHour",
    title: "Pick up hour",
    value: "",
    requerid: true,
    placeholder: "",
    type: "calendar",
  },
  {
    label: "dropOffHour",
    title: "Drop off hour",
    value: "",
    requerid: true,
    placeholder: "",
    type: "calendar",
  },
  {
    label: "photo",
    title: "Photo",
    value: "",
    requerid: true,
    placeholder: "Photo",
    type: "text",
    mask: TEXT_MASK,
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

//submit button
async function submit() {
  try {
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
    const responsePackage = await packageService.createPackage(
      packageData.value
    );

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
    Swal.fire({
      title: "Success!",
      text: "Package created successfully",
      icon: "success",
      confirmButtonText: "Ok",
    });
  } catch (err) {
    Swal.fire({
      title: "Error!",
      text: "Something went wrong",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
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
.p-divider {
  background-color: #eee;
  height: 1px;
}
</style>
