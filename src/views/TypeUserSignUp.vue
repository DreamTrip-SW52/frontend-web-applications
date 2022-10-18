<template>
  <div class="typeusersignup">
    <div class="title-typeusersignup">DreamTrip</div>

    <div class="caption-sign-up">Sign Up</div>

    <div class="space-1">
      <router-link to="/signup">
        <button class="typeusersignup-button-sign-up-travellers">
          Travellers
        </button>
      </router-link>
    </div>

    <div class="space-2">
      <router-link to="/signup">
        <button class="typeusersignup-button-sign-up-agent">
          Travel agency
        </button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.typeusersignup {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title-typeusersignup {
  font-size: 96px;
  color: #ffffff;
  margin: 20px;
}

.caption-sign-up {
  font-size: 32px;
  color: #ffffff;
  opacity: 0.7;
  margin: 40px;
}

.typeusersignup-button-sign-up-travellers {
  background-color: #fc4747;
  padding-left: 120px;
  padding-right: 120px;
  border: 0px;
  border-radius: 10px;
}

.typeusersignup-button-sign-up-agent {
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
  name: 'TypeUserSignUp',
};
</script>
