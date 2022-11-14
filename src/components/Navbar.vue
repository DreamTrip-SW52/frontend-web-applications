<template>
  <!-- VERTICAL NAVBAR -->
  <div class="navbar-container">
    <div class="alignment-container">
      <!-- Logo -->
      <div class="logo"><img src="../assets/logo.png" /></div>
      <div class="icons-container" v-if="isAgency">
        <!-- Rutas -->
        <!-- Create Package -->
        <router-link to="/agency/publishservices">
          <i class="pi pi-home"></i>
        </router-link>
        <!-- My Packages -->
        <router-link to="/agency/mypackages">
          <i class="pi pi-box"></i>
        </router-link>
        <!-- Agency Profile -->
        <router-link to="/agency/profile">
          <i class="pi pi-user"></i>
        </router-link>
        <router-link to="/">
          <i class="pi pi-power-off" @click="removeCredentials"></i>
        </router-link>
      </div>
      <div class="icons-container" v-else>
        <!-- Home -->
        <router-link to="/home">
          <i class="pi pi-home"></i>
        </router-link>
        <!-- Custom Packages -->
        <router-link to="/custom-packages/">
          <i class="pi pi-box"></i>
        </router-link>
        <!-- Economic Follow -->
        <router-link to="/economic-follow">
          <i class="pi pi-chart-bar"></i>
        </router-link>
        <!-- Security Information -->
        <router-link to="/security">
          <i class="pi pi-shield"></i>
        </router-link>
        <!-- Perfil -->
        <router-link to="/profile">
          <i class="pi pi-user"></i>
        </router-link>
        <!-- Sing out -->
        <router-link to="/">
          <i class="pi pi-power-off" @click="removeCredentials"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const router = useRoute();

const isAgencyFn = () => {
  return router.path.includes("agency");
};

const removeCredentials = () => {
  localStorage.removeItem("currentUser");
};

const isAgency = isAgencyFn();

console.log(isAgency);
</script>

<style scoped>
.navbar-container {
  background: #161d2f;
  border-radius: 20px;
  height: 860px;
  min-width: 96px;
  padding: 32px;
}

.alignment-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

.icons-container {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100%;
  margin-top: 76px;
  gap: 1.5rem;
}

.logo {
  width: 32px;
  height: 25.6px;
}

.logo > img {
  max-width: 100%;
  object-fit: cover;
}
</style>
