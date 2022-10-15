<template>
  <div class="package-card">
    <div class="">
      <img class="card-image" :src="img_url" alt="travel" />
    </div>

    <div class="card-description">
      <div class="title-pack">{{ name }}</div>
      <div class="des-pack">{{ description }}</div>
      <div class="pl-du">
        <div>{{ place }}</div>
        <div>{{ duration }}</div>
      </div>
    </div>

    <div class="card-action">
      <div>Since:</div>
      <div class="card-price">{{ price }}</div>
      <div v-if="type_of_button=='see-details'">
        <router-link :to="`/package/${id}`">
          <button class="card-button">See Details</button>
        </router-link>
      </div>
      <div v-if="type_of_button=='statistics'">
        <router-link :to="`/statistics/${id}`">
          <button class="card-button">Statistics</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  name: String,
  description: String,
  place: String,
  duration: String,
  price: String,
  img_url: String,
  type_of_button: String,
});
</script>

<style scoped>
.package-card {
  border-radius: 5px;
  background-color: #161d2f;
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
}

.card-description {
  padding: 10px;
  text-align: left;
}

.title-pack {
  color: #ffffff;
  font-size: 20px;
  padding-bottom: 5px;
}

.des-pack {
  color: #ffffff;
  font-size: 12px;
  padding-bottom: 10px;
  font-weight: lighter;
}

.pl-du {
  color: #ffffff;
  font-size: 10px;
  display: flex;
  flex-direction: row;
  gap: 50px;
}

.card-action {
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 24px;
  color: #ffffff;
}

.card-price {
  font-size: 32px;
  font-weight: 500;
}

.card-image {
  height: 100%;
  border-radius: 5px;
  width: 150px;
  object-fit: cover;
}

.card-button {
  font-size: 14px;
  font-weight: 500;
}
</style>
