<template>
  <div class="container">
    <Navbar />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  padding: 2rem;
}
</style>
