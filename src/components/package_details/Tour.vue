<template>
  <div class="flex flex-column gap-4 mt-4">
    <section id="details">
      <div class="text-center mb-4">
        <i class="pi pi-info-circle"></i>
        <span>Tour Details</span>
      </div>
      <div>
        <p>{{ props?.source?.details }}</p>
      </div>
      <div class="flex flex-wrap justify-content-between">
        <div class="mt-4 px-4">
          <h4 class="mb-2 tag">OUTSTANDING OF TOUR</h4>
          <ul class="grid" v-for="item in props?.source?.outstanding">
            <li class="col-6">{{ item }}</li>
          </ul>
        </div>
        <div class="mt-4 px-4">
          <h4 class="mb-2 tag">IT INCLUDES</h4>
          <ul class="grid" v-for="item in props?.source?.['it-includes']">
            <li class="col-6">{{ item }}</li>
          </ul>
        </div>
      </div>
    </section>
    <section id="location">
      <div class="text-center mb-4">
        <i class="pi pi-info-circle"></i>
        <span>Location</span>
      </div>
      <div>
        <iframe
          :src="props?.source?.location"
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
          :src="props?.source?.['meeting-point']"
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
import { onMounted } from "vue";

const props = defineProps({
  source: {
    required: true,
  },
});

onMounted(() => {});
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
