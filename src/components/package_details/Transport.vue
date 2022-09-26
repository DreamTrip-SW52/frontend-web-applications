<template>
  <div class="flex flex-column gap-6 mt-4">
    <section id="about">
      <div class="text-center mb-4">
        <i class="pi pi-info-circle"></i>
        <span>About</span>
      </div>
      <ul class="flex flex-column flex-wrap gap-2">
        <li>{{ props?.source?.about?.type }}</li>
        <li>
          {{ props?.source?.about?.from }} ➡️
          {{ props?.source?.about?.to }}
        </li>
      </ul>
    </section>
    <section id="flight-details">
      <div class="text-center mb-4">
        <i class="pi pi-info-circle"></i>
        <span>Flight Details</span>
      </div>
      <!-- cards -->
      <div class="flex flex-column gap-3" >
        <!-- render the flight cards -->
        <FlightCard
          v-for="flight in props?.source?.details"
          :key="flight.id"
          :source="flight"
        ></FlightCard>
      </div>
      <!-- cards end -->
      <div class="mt-5">
        <p class="text-right text-2xl font-medium">
          Total: S/. {{ getTotal() }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, defineProps } from 'vue';
import FlightCard from './FlightCard.vue';

const getTotal = () => {
  return props.source.details.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);
};

const props = defineProps({
  source: {
    required: true,
  },
});
</script>

<style scoped>
span {
  font-size: 24px;
  text-transform: uppercase;
  font-weigth: light;
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
