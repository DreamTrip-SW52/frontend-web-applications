<template>
  <suspense>
    <template #default>
      <div class="profile-container">
        <div class="nav-bar">
          <Navbar />
        </div>
        <div class="profile">
          <ProfileCard :id="id" />
        </div>
      </div>
    </template>
    <template #fallback>Loading...</template>
  </suspense>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import ProfileCard from '@/components/profile/ProfileCard.vue'
const id = localStorage.getItem('currentUser');
</script>

<style scoped>
.profile-container {
  color: #fff;
  display: flex;
}
.nav-bar {

}
</style>