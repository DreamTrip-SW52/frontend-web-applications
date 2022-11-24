<template>
  <div class="flex flex-column gap-4 mt-4">
    <section id="details">
      <div class="text-center mb-4">
        <i class="pi pi-info-circle"></i>
        <span>Tour Details</span>
      </div>
      <div>
        <p>{{ tourData?.details }}</p>
      </div>
    </section>
    <section id="location">
      <div class="text-center mb-4">
        <i class="pi pi-info-circle"></i>
        <span>Location</span>
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d85528.70035805301!2d-74.54722722438427!3d-8.380035352593556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a3bb14fcebe5db%3A0xf1d5209b3409b6c2!2sBosque%20Nacional%20Alexander%20Von%20Humboldt%2C%2025000!5e0!3m2!1ses-419!2spe!4v1669271978142!5m2!1ses-419!2spe"
          width="100%"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
    <section id="meeting-Point">
      <div class="text-center mb-4">
        <i class="pi pi-info-circle"></i>
        <span>Meeting Point</span>
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d85528.70035805301!2d-74.54722722438427!3d-8.380035352593556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a3bb14fcebe5db%3A0xf1d5209b3409b6c2!2sBosque%20Nacional%20Alexander%20Von%20Humboldt%2C%2025000!5e0!3m2!1ses-419!2spe!4v1669271978142!5m2!1ses-419!2spe"
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
import { TourService } from "../../services/Tour.service";

const tourService = new TourService();
const tourData = ref({});

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

onMounted(async () => {
  const tour = await tourService.getTourByPackageId(props.id);
  console.log("🚀 ~ file: Tour.vue ~ line 79 ~ onMounted ~ tour", tour.data);
  tourData.value = tour.data;
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

.tag {
  font-size: 18px;
  font-weight: medium;
  color: #fff;
}
</style>
