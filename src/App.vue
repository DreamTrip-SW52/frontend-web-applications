<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  padding: 2rem;
}
</style>
