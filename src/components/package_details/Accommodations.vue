<template>
  <div class="flex flex-column gap-4 mt-4" v-if="props.source !== {}">
    <section id="details">
      <div class="text-center mb-4">
        <i class="pi pi-info-circle"></i>
        <span>Details</span>
        <!-- {{ JSON.stringify(props.source) }} -->
      </div>
      <div>
        <p>
          {{ accommodationData?.details }}
        </p>
      </div>
    </section>
    <section id="services">
      <div class="text-center mb-4">
        <i class="pi pi-info-circle"></i>
        <span>Services</span>
      </div>
      <ul
        v-for="service in accommodationData?.services"
        :key="service.name"
        class="grid"
      >
        <li class="col-6">{{ service }}</li>
      </ul>
    </section>
    <section id="conditions">
      <div class="text-center mt-4">
        <i class="pi pi-info-circle"></i>
        <span>Conditions</span>
      </div>
      <div>
        <h4 class="mb-2">SCHEDULE</h4>
        <ul class="flex flex-column gap-2">
          <li>
            Check in:
            {{ accommodationData?.conditions?.schedule?.["check-in"] }}
          </li>
          <li>
            Check out:
            {{ accommodationData?.conditions?.schedule?.["check-out"] }}
          </li>
        </ul>
      </div>
    </section>
    <section id="location">
      <div class="text-center mb-4">
        <i class="pi pi-info-circle"></i>
        <span>Location</span>
      </div>
      <div>
        <iframe
          :src="accommodationData?.location"
          width="100%"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { AccommodationService } from "../../services/Accommodation.service";

const accommodationService = new AccommodationService();
const accommodationData = ref({});

const props = defineProps({
  id: {
    type: Number,
    required: true,
    default: 1,
  },
});

onMounted(() => {
  accommodationService
    .getAccommodationByPackageId(props.id)
    .then((response) => {
      const res = response.data;
      accommodationData.value = res[0];
      console.log(accommodationData.value);
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
