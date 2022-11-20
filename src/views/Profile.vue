<template>
<!--  <suspense>-->
<!--    <template #default>-->
      <div class="profile-container">
        <div class="nav-bar">
          <Navbar />
        </div>
        <div class="profile">
          <AgencyProfileCard :id="id" v-if="isAgency" />
          <TravellerProfileCard :id="id" v-else />
        </div>
      </div>
<!--    </template>-->
<!--    <template #fallback>Loading...</template>-->
<!--  </suspense>-->
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import TravellerProfileCard from '@/components/profile/TravellerProfileCard.vue'
import AgencyProfileCard from '@/components/profile/AgencyProfileCard.vue'
import {useRoute} from "vue-router";

const id = localStorage.getItem('currentUser');
const router = useRoute();

const isAgency = router.path.includes('agency');

</script>

<style scoped>
.profile-container {
  color: #fff;
  display: flex;
}
.nav-bar {

}
</style>