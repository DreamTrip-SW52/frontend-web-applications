<template>
  <div class="initial">
    <div class="title-initial">DreamTrip</div>

    <div class="slogan">Create your dream trip</div>

    <div class="space-1">
      <router-link v-if="isAgency" to="/agency/signup">
        <button class="initial-button-sign-up">Sign up</button>
      </router-link>
      <router-link v-else to="/signup">
        <button class="initial-button-sign-up">Sign up</button>
      </router-link>
    </div>

    <div class="space-2">
      <router-link v-if="isAgency" to="/agency/login">
        <button class="initial-button-log-in">Login</button>
      </router-link>
      <router-link v-else to="/login">
        <button class="initial-button-log-in">Login</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const router = useRoute();
// print the current route

const isAgencyFn = () => {
  return router.path.includes('agency');
};

const isAgency = isAgencyFn();
</script>

<style scoped>
.initial {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title-initial {
  font-size: 96px;
  color: #ffffff;
  margin: 20px;
}

.slogan {
  font-size: 32px;
  color: #ffffff;
  opacity: 0.7;
  margin: 40px;
}

.initial-button-sign-up {
  background-color: #fc4747;
  padding-left: 100px;
  padding-right: 100px;
  border: 0px;
  border-radius: 10px;
}

.initial-button-log-in {
  background-color: #fc4747;
  padding-left: 105px;
  padding-right: 105px;
  border: 0px;
  border-radius: 10px;
}

.space-1 {
  margin-top: 80px;
}

.space-2 {
  margin-top: 20px;
}
</style>

<script>
export default {
  name: 'Initial',
};
</script>
