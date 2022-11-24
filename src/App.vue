<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";

const router = useRouter();

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = localStorage.getItem("currentUser");
    if (user) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  padding: 2rem;
}
</style>
