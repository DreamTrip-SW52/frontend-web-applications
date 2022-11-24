<template>
  <main class="px-6 mt-6">
    <header>
      <h1 class="text-4xl text-center text-white">Transport</h1>
    </header>
    <form class="flex flex-column align-items-center py-4 gap-4 mt-4">
      <section
        id="radio-buttons"
        class="flex justify-content-between align-items-center gap-4 mt-2 w-full text-white"
      >
        <div class="flex align-self-start gap-4">
          <div class="radio-btn">
            <input
              type="radio"
              id="round-trip"
              name="trip"
              value="Round trip"
              v-model="formData.typeOfTrip"
            />
            <label class="ml-2" for="round-trip">Round Trip</label>
          </div>
          <div class="radio-btn">
            <input
              type="radio"
              id="one-way"
              name="trip"
              value="One way"
              v-model="formData.typeOfTrip"
            />
            <label class="ml-2" for="one-way">One Way</label>
          </div>
        </div>
        <div class="flex align-self-start gap-4">
          <div class="field-radiobutton">
            <RadioButton
              inputId="transport1"
              name="transport"
              value="BUS"
              v-model="formData.transport"
            />
            <label for="transport1">Bus</label>
          </div>
          <div class="field-radiobutton">
            <RadioButton
              inputId="transport2"
              name="transport"
              value="FLIGHT"
              v-model="formData.transport"
            />
            <label for="transport2">Flight</label>
          </div>
          <div class="field-radiobutton">
            <RadioButton
              inputId="transport2"
              name="transport"
              value="TRAIN"
              v-model="formData.transport"
            />
            <label for="transport3">Train</label>
          </div>
        </div>
      </section>
      <section class="grid mt-2 align-self-start w-full">
        <div class="flex flex-column col-6">
          <MultiSelect
            :options="departments"
            :selectionLimit="1"
            v-model="formData.departFrom"
            optionLabel="department"
            placeholder="Depart From"
          />
        </div>
        <div class="flex flex-column col-6">
          <MultiSelect
            :options="departments"
            :selectionLimit="1"
            v-model="formData.goingTo"
            optionLabel="department"
            placeholder="Going To"
          />
        </div>
      </section>
      <section class="grid align-self-start w-full">
        <div class="flex flex-column col-6">
          <Calendar
            inputId="range"
            v-model="formData.date"
            selectionMode="range"
            placeholder="Select Date"
            :manualInput="false"
            :minDate="new Date()"
          />
        </div>
        <div class="flex flex-column col-6">
          <MultiSelect
            v-model="formData.classT"
            :options="classes"
            display="chip"
            optionLabel="classT"
            placeholder="Select class"
            dropdownIcon="pi pi-chevron-down"
            :showToogleAll="false"
            :selectionLimit="1"
          />
        </div>
      </section>
      <Button
        class="submit-btn mt-4"
        label="FIND"
        type="button"
        @click="find"
      />
      <Dialog
        v-model:visible="displayDialog"
        :modal="true"
        :style="{ width: '50vw' }"
      >
        <div v-if="resultTrips.length === 0">
          <p>No results</p>
        </div>
        <div v-else>
          <div v-for="result in resultTrips">
            <div
              class="card-container text-white flex justify-content-between p-4 align-items-center"
            >
              <ul class="flex gap-6">
                <li class="text-lg font-medium">
                  Company Name: {{ result.transportName }}
                </li>
                <li class="text-lg font-medium">
                  Class: {{ result.transportClassName.toCapital }}
                </li>
                <li class="text-lg font-medium">
                  Price: S/.{{ result.price }}
                </li>
              </ul>
              <Button label="Select" @click="save(result)" />
            </div>
          </div>
        </div>
      </Dialog>
      <div id="buttons" class="grid grid-nogutter justify-content-between">
        <div></div>
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
import { TransportService } from "../../services/Transport.service";
import { PackageService } from "../../services/Package.service";

// emits
const emit = defineEmits(["nextPage"]);

// refs
const resultTrips = ref([]);

const displayDialog = ref(false);

const classes = ref([
  { classT: "Express", value: "EXPRESS" },
  { classT: "Normal", value: "NORMAL" },
  { classT: "VIP", value: "VIP" },
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
const formData = ref({
  transport: "",
  classT: "",
  typeOfTrip: "",
  departFrom: "",
  goingTo: "",
  date: [],
});
// classes
const transportService = new TransportService();
const packageService = new PackageService();

// functions
const nextPage = () => emit("nextPage", { pageIndex: 0 });

const openDialog = () => (displayDialog.value = true);

const save = async (result) => {
  const response = await packageService.getById(result.packageId);
  localStorage.setItem("locationId", JSON.stringify(response.data.locationId));

  const typeOfTrip = formData.value.typeOfTrip;

  if (typeOfTrip === "One Way") {
    localStorage.setItem("oneWayId", JSON.stringify(result.id));
  } else {
    localStorage.setItem("roundTripId", JSON.stringify(result.id));
  }
  alert("Transport selected, you can go to the next section");
};

const getData = async (transportCard) => {
  const transport = await transportService.getTransportById(
    transportCard.transportId
  );
  const transportName = transport.data.name;

  const transportClass = await transportService.getTransportClassById(
    transportCard.transportClassId
  );
  const transportClassName = transportClass.data.name;

  return { transportName, transportClassName };
};

const find = async () => {
  const typeOfTransport = formData.value.transport;
  const typeOfTrip = formData.value.typeOfTrip;
  const classT = formData.value.classT[0].value;
  const date = formData.value.date;
  const departFrom = formData.value.departFrom[0].value;
  const goingTo = formData.value.goingTo[0].value;

  let departureDate = JSON.stringify(date[0]);
  let returnDate = JSON.stringify(date[1]);
  departureDate = departureDate.substring(1, departureDate.length - 3);
  returnDate = returnDate.substring(1, returnDate.length - 3);
  let response = null;

  if (typeOfTrip.value === "One Way") {
    response = await transportService.getOneWayByFilters(
      goingTo,
      departureDate,
      returnDate,
      classT,
      typeOfTransport
    );
  } else {
    response = await transportService.getRoundTripByFilters(
      departFrom,
      goingTo,
      departureDate,
      returnDate,
      classT,
      typeOfTransport
    );
  }

  // make a promise all to resolve the data
  const promises = response.data.map(async (data) => {
    const { transportName, transportClassName } = await getData(data);
    return {
      ...data,
      transportName,
      transportClassName,
    };
  });

  const results = await Promise.all(promises);
  console.log(
    "🚀 ~ file: TransportForm.vue ~ line 301 ~ find ~ results",
    results
  );

  resultTrips.value = results;

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
  margin-top: 20px;
  width: 80%;
}

.navigation-item {
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.radio-btn {
  background: #fff;
  border-radius: 8px;
  color: #000;
  padding: 12px 24px;
}

.submit-btn {
  background-color: #fc4747;
  border-color: #fc4747;
  width: 100px;
}

.input-btn {
  background: #fff;
  border-radius: 8px;
  color: #000;
  padding: 16px 24px;
}

.p-multiselect {
  width: clamp(100px, 100%, 100%);
  color: #000;
}

.card-container {
  background-color: #161d2f;
  border-radius: 8px;
}
</style>
