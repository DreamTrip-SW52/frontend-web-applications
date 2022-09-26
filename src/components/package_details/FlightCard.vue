<template>
  <div class="card-container" v-if="props?.source !== []">
    <div class="flex gap-4 align-items-center">
      <!-- icon -->
      <i class="pi pi-box"></i>
      <!-- name -->
      <p>
        Fake <br />
        Airlines {{ props?.source?.id }}
      </p>
    </div>
    <div class="flex gap-4">
      <!-- details -->
      <div class="text-center">
        <span>{{props?.source?.from?.abbr}}</span>
        <p class="font-light text-md">{{props?.source?.from?.tag}}</p>
      </div>
      <img src="../../assets/double-arrow-right.svg" alt="" v-if="props?.source.type === 'go'" />
			<img src="../../assets/double-arrow-left.svg" alt="" v-if="props?.source.type === 'back'" />
      <div class="text-center">
        <span>{{props?.source?.to?.abbr}}</span>
        <p class="font-light text-md">{{props?.source?.from?.tag}}</p>
      </div>
    </div>
    <div>
      <!-- price -->
      <span class="text-xl font-medium">S/.{{props?.source?.price}}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps } from 'vue';

const props = defineProps({
  source: {
    required: true,
  },
});
</script>

<style scoped>
span {
  font-size: 18px;
  text-transform: uppercase;
  font-weigth: medium;
  margin-left: 10px;
}
.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #161d2f;
  padding: 25px 50px;
}
</style>
