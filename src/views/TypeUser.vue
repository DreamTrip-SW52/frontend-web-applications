<template>
  <div class="typeuser">
    <div class="title-typeuser">DreamTrip</div>

    <div class="space-1">
      <router-link to="/initial">
        <button class="typeuser-button-travellers">Travellers</button>
      </router-link>
    </div>

    <div class="space-2">
      <router-link to="/agency/initial">
        <button class="typeuser-button-agent">Travel agency</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.typeuser {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title-typeuser {
  font-size: 96px;
  color: #ffffff;
  margin: 20px;
}

.caption- {
  font-size: 32px;
  color: #ffffff;
  opacity: 0.7;
  margin: 40px;
}

.typeuser-button-travellers {
  background-color: #fc4747;
  padding-left: 120px;
  padding-right: 120px;
  border: 0px;
  border-radius: 10px;
}

.typeuser-button-agent {
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
  name: 'TypeUser',
};
</script>
