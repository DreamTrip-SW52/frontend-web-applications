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
              value="bus"
              v-model="formData.transport"
            />
            <label for="transport1">Bus</label>
          </div>
          <div class="field-radiobutton">
            <RadioButton
              inputId="transport2"
              name="transport"
              value="flights"
              v-model="formData.transport"
            />
            <label for="transport2">Flight</label>
          </div>
          <div class="field-radiobutton">
            <RadioButton
              inputId="transport2"
              name="transport"
              value="trains"
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
        <div v-for="result in resultTransports">
          <div
            class="card-container text-white flex justify-content-between p-4 align-items-center"
          >
            <div v-for="item in result.details">
              <div class="flex gap-4 align-items-center">
                <i class="pi pi-box"></i>
                <p>{{ item.name }}</p>
              </div>
              <div class="flex gap-4">
                <div class="text-center">
                  <span>{{ item.from.abbr }}</span>
                  <p class="font-light text-md">
                    {{ item.from.tag }}
                  </p>
                </div>
                <img
                  src="../../assets/double-arrow-right.svg"
                  alt=""
                  v-if="item.type === 'go'"
                />
                <img
                  src="../../assets/double-arrow-left.svg"
                  alt=""
                  v-if="item.type === 'back'"
                />
                <div class="text-center">
                  <span>{{ item.to.abbr }}</span>
                  <p class="font-light text-md">{{ item.to.tag }}</p>
                </div>
              </div>
            </div>
            <div>
              <span class="text-xl font-medium">S/.{{ result.price }}</span>
            </div>
            <Button label="Select" @click="save(result.id)" />
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
import moment from "moment";

// emits
const emit = defineEmits(["nextPage"]);

// refs
const filteredTransports = ref({});
const resultTransports = ref([]);
const displayDialog = ref(false);
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

// functions
const nextPage = () => emit("nextPage", { pageIndex: 0 });
const openDialog = () => (displayDialog.value = true);
const save = (id) => {
  const typeOfTransport = formData.value.transport;
  transportService
    .getTransportByTypeAndId(typeOfTransport, id)
    .then((response) => {
      const transport = response.data;
      const travelAgencyId = transport.travelAgencyId;
      const locationId = transport.locationId;
      localStorage.setItem("travelAgencyId", JSON.stringify(travelAgencyId));
      localStorage.setItem("locationId", JSON.stringify(locationId));
    });
};
const parseProxy = (proxy) => JSON.parse(JSON.stringify(proxy));
const find = () => {
  const typeOfTransport = formData.value.transport;
  const typeOfTrip = formData.value.typeOfTrip;
  const classT = formData.value.classT[0].value;
  const date = formData.value.date;
  const departFrom = formData.value.departFrom[0].value;
  const goingTo = formData.value.goingTo[0].value;

  transportService
    .filterTransport(typeOfTransport, typeOfTrip, classT, date)
    .then((response) => {
      resultTransports.value = [];

      filteredTransports.value = response.data;
      filteredTransports.value.forEach(function (element) {
        if (
          element.details[0].from.tag === departFrom &&
          element.details[0].to.tag === goingTo
        )
          resultTransports.value.push(element);
      });
    });
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
