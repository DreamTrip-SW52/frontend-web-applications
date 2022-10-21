<template>
  <!-- VERTICAL NAVBAR -->
  <div class="navbar-container">
    <div class="alignment-container">
      <!-- Logo -->
      <div class="logo"><img src="../assets/logo.png" /></div>
      <div class="icons-container" v-if="isAgency">
        <!-- Rutas -->
        <!-- Create Package -->
        <router-link to="/agency/mypackages">
          <i class="pi pi-home"></i>
        </router-link>
        <!-- My Packages -->
        <router-link to="/agency/mypackages">
          <i class="pi pi-box"></i>
        </router-link>
      </div>
      <div class="icons-container" v-else>
        <!-- Home -->
        <router-link to="/home">
          <i class="pi pi-home"></i>
        </router-link>
        <!-- Custom Packages -->
        <router-link to="/custom-packages">
          <i class="pi pi-box"></i>
        </router-link>
      </div>
      <!-- Perfil -->
      <div class="avatar">
        <img src="../assets/avatar.png" />
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
  flex: 1 1 auto;
  flex-direction: column;
  /* justify-content: space-between; */
  height: 100%;
  margin-top: 76px;
  gap: 1.5rem;
}

.avatar {
  width: 32px;
  height: 32px;
}

.avatar > img {
  max-width: 100%;
  border-radius: 50%;
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
