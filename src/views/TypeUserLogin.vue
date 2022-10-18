<template>
  <div class="typeuserlogin">
    <div class="title-typeuserlogin">DreamTrip</div>

    <div class="caption-login">Login</div>

    <div class="space-1">
      <router-link to="/login">
        <button class="typeuserlogin-button-login-travellers">
          Travellers
        </button>
      </router-link>
    </div>

    <div class="space-2">
      <router-link to="/login">
        <button class="typeuserlogin-button-login-agent">Travel agency</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.typeuserlogin {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title-typeuserlogin {
  font-size: 96px;
  color: #ffffff;
  margin: 20px;
}

.caption-login {
  font-size: 32px;
  color: #ffffff;
  opacity: 0.7;
  margin: 40px;
}

.typeuserlogin-button-login-travellers {
  background-color: #fc4747;
  padding-left: 120px;
  padding-right: 120px;
  border: 0px;
  border-radius: 10px;
}

.typeuserlogin-button-login-agent {
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
  name: 'TypeUserLogin',
};
</script>
