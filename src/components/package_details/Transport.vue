<template>
  <!-- <pre>TransportData: {{ transportData }}</pre>
  <pre>Details:{{ details }}</pre>
  <pre>Transport {{ transport }}</pre>
  <pre>TransportClass {{ transportClass }}</pre>
  <prev>LocationGo {{ locationGo }}</prev>
  <prev>LocationBack {{ locationBack }}</prev> -->
  <div class="flex flex-column gap-6 mt-4">
    <section id="about">
      <div class="text-center mb-4">
        <i class="pi pi-info-circle"></i>
        <span>About</span>
      </div>
      <ul class="flex flex-column flex-wrap gap-2">
        <li>{{ details?.typeOfTrip }}</li>
        <li>{{ locationGo?.department }} -> {{ locationBack?.department }}</li>
      </ul>
    </section>
    <section id="flight-details">
      <div class="text-center mb-4">
        <i class="pi pi-info-circle"></i>
        <span>Transport Details</span>
      </div>
      <!-- cards -->
      <div class="flex flex-column gap-3">
        <!-- render the flight cards -->
        <FlightCard
          :key="transport.id"
          :typeOfTrip="details.typeOfTrip"
          :details="transport"
          :go="locationGo"
          :back="locationBack"
          :transportData="transportData"
        ></FlightCard>
      </div>
      <!-- cards end -->
      <div class="mt-5">
        <p class="text-right text-2xl font-medium">
          Total: S/. {{ details?.price }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import FlightCard from './FlightCard.vue';
import { TransportService } from '../../services/Transport.service';

const transportService = new TransportService();
const transportData = ref({});
const details = ref({});
const transport = ref({});
const transportClass = ref({});
const locationGo = ref({});
const locationBack = ref({});

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const getLocationByTripGo = async () => {
  const tripGoId = details.value.tripGoId;
  const location = await transportService.getTripGoById(tripGoId);
  const locationName = await transportService.getLocationById(
    location.data.locationId
  );
  locationGo.value = locationName.data;
};

const getLocationByTripBack = async () => {
  const tripBackId = details.value.tripBackId;
  const location = await transportService.getTripBackById(tripBackId);
  const locationName = await transportService.getLocationById(
    location.data.locationId
  );
  locationBack.value = locationName.data;
};

onMounted(async () => {
  const packageId = props.id;

  const transportDetails = await transportService.getTransportById(packageId);

  transportData.value = transportDetails.data;

  const isRoundTrip = await transportService.getRoundTripByPackageId(packageId);
  const isOneWay = await transportService.getOneWayByPackageId(packageId);

  isRoundTrip.data
    ? (details.value = {
        ...isRoundTrip.data,
        typeOfTrip: 'Round Trip',
      })
    : (details.value = {
        ...isOneWay.data,
        typeOfTrip: 'One Way',
      });

  const transportD = await transportService.getTransportById(
    details.value.transportId
  );
  transport.value = transportD.data;

  const transportClassD = await transportService.getTransportClassById(
    details.value.transportClassId
  );
  transportClass.value = transportClassD.data;

  await getLocationByTripGo();
  await getLocationByTripBack();
});
</script>

<style scoped>
span {
  font-size: 24px;
  text-transform: uppercase;
  font-weight: light;
  margin-left: 10px;
}
i {
  font-size: 20px;
}
ul {
  max-width: 100%;
}

li {
  list-style-type: circle;
}
</style>
