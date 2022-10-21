<template>
  <div class="security-card mb-5">
    <h2 class="title-pack text-4xl mb-3 mt-0">{{ title }}</h2>

    <div class="card-wrapper">
      <div class="card-description p-2 border-1 border-round" v-for="place in places" :key="place.id">
        <div class="title-pack">{{ place.name }}</div>
        <div class="des-pack">{{ place.direction }}</div>
        <div class="pl-du">
          <div>{{ place.phone_number }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  places: Array,
});
</script>

<style scoped>
.security-card {
  padding: 20px;
  border-radius: 5px;
  background-color: #161d2f;
  width: 100%;
  height: 180px;
}

.card-wrapper {
  display: flex;
  gap: 20px;
}

.card-description {
  text-align: left;
}

.title-pack {
  color: #ffffff;
  font-size: 20px;
  padding-bottom: 5px;
}

.des-pack {
  color: #ffffff;
  font-size: 16px;
  font-weight: lighter;
}

.pl-du {
  color: #ffffff;
  font-size: 14px;
}
</style>
