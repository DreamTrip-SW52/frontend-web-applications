<template>
  <div class="flex flex-column gap-4 mt-4" v-if="props.source !== {}">
    <section id="details">
      <div class="text-center mb-4">
        <i class="pi pi-info-circle"></i>
        <span>Details</span>
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
        <li class="col-6">{{ service.name }}</li>
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
            {{ moment(accommodationData?.checkIn).format("LL") }}
          </li>
          <li>
            Check out:
            {{ moment(accommodationData?.checkOut).format("LL") }}
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.130064287063!2d-76.80698528519432!3d-11.325202791950533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91063f2a1c794e93%3A0xef50cc8630d532e8!2sCOMPLEJO%20ARQUEOL%C3%93GICO%20DE%20RUPAC!5e0!3m2!1ses-419!2spe!4v1669271632010!5m2!1ses-419!2spe"
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
import moment from "moment";

const accommodationService = new AccommodationService();
const accommodationData = ref({});

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

onMounted(async () => {
  const accommodation = await accommodationService.getAccommodationByPackageId(
    props.id
  );

  let resultado = {
    ...accommodation.data,
  };

  const services = await accommodationService.getServicesPerAccommodation(
    accommodation.data.id
  );

  const servicesPerAccommodations = await services.data.map(async (service) => {
    return accommodationService
      .getServiceByServiceId(service.serviceId)
      .then((response) => {
        return {
          name: response.data.name,
        };
      });
  });

  // hacer un Promise.all para obtener los servicios
  const servicesPerAccommodationsResult = await Promise.all(
    servicesPerAccommodations
  );

  resultado.services = servicesPerAccommodationsResult;

  accommodationData.value = resultado;
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
