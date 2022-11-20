<template>
  <div class="card-container">
    <div class="flex gap-4 align-items-center">
      <!-- icon -->
      <i class="pi pi-box"></i>
      <!-- name -->
      <p>
        {{ transportData.name }} <br />
        <span class="tag">{{ transportData.type }}</span>
      </p>
    </div>
    <div class="flex gap-4">
      <!-- details -->
      <div class="text-center">
        <span>{{ props?.go?.abbr }}</span>
        <p class="font-light text-md">{{ props?.go?.department }}</p>
      </div>
      <img
        src="../../assets/double-arrow-right.svg"
        alt=""
      />
      <img
        src="../../assets/double-arrow-left.svg"
        alt=""
        v-if="props?.typeOfTrip === 'Round Trip'"
      />
      <div class="text-center" v-if="props?.typeOfTrip === 'Round Trip'">
        <span>{{ props?.back?.abbr }}</span>
        <p class="font-light text-md">{{ props?.back?.department }}</p>
      </div>
      <div class="text-center" v-if="props?.typeOfTrip === 'One Way'">
        <span>{{ props?.go?.abbr }}</span>
        <p class="font-light text-md">{{ props?.go?.department }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  details: {
    required: false,
  },
  go: {
    required: false,
  },
  back: {
    required: false,
  },
  typeOfTrip: {
    type: String,
    required: false,
  },
  transportData: {
    required: false,
  },
});
</script>

<style scoped>
span {
  font-size: 18px;
  text-transform: uppercase;
  font-weight: medium;
  margin-left: 10px;
}
.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #161d2f;
  padding: 18px 36px;
}

.tag {
	background: #f5f5f5;
	color: #161d2f;
	padding: 5px 10px;
	border-radius: 5px;
	font-size: 12px;
	text-transform: uppercase;
	font-weight: medium;
}

</style>
