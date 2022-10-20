<template>
  <div class="flex flex-column gap-6 mt-4">
    <section id="about">
      <div class="text-center mb-4">
        <i class="pi pi-info-circle"></i>
        <span>About</span>
      </div>
      <ul class="flex flex-column flex-wrap gap-2">
        <li>{{ transportData?.typeOfTrip }}</li>
        <li>{{ details?.from?.tag }} -> {{ details?.to?.tag }}</li>
      </ul>
    </section>
    <section id="flight-details">
      <div class="text-center mb-4">
        <i class="pi pi-info-circle"></i>
        <span>Flight Details</span>
      </div>
      <!-- cards -->
      <div class="flex flex-column gap-3">
        <!-- render the flight cards -->
        <FlightCard
          v-for="flight in transportData?.details"
          :key="flight.id"
          :source="flight"
        ></FlightCard>
      </div>
      <!-- cards end -->
      <div class="mt-5">
        <p class="text-right text-2xl font-medium">
          Total: S/. {{ transportData?.price }}
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

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

onMounted(() => {
  transportService
    .getTransportByTypeAndId(props.type, props.id)
    .then((response) => {
      transportData.value = response.data;
      details.value = response.data.details[0];
    });
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
