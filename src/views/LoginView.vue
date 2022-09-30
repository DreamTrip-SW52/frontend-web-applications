<template>
  <div style="margin-bottom: 15px">
    <img src="../assets/logo-bluedark.png" />
  </div>
  <div class="login">
    <div>
      <div class="title-log">Login</div>
    </div>

    <div>
      <form method="get" id="form-login">
        <input
          type="text"
          placeholder="Email address"
          class="input"
        /><br /><br />
        <input type="text" placeholder="Password" class="input" /><br /><br />
      </form>
    </div>

    <div>
      <router-link to="/home">
        <button type="submit" form="form-login" class="button-log-in">
          Login to your account
        </button>
      </router-link>
    </div>

    <div class="login-to-signup">
      Don't have an account?
      <router-link to="/signup" class="link">Sign up</router-link>
    </div>
  </div>
</template>

<style scoped>
.login {
  background-color: #161d2f;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 350px;
  row-gap: 25px;
  padding: 32px;
  justify-content: space-between;
}

#form-login {
  padding-top: 20px;
}

.title-log {
  color: #ffffff;
  font-size: 32px;
  text-align: left;
}

.input {
  border: 0px;
  background-color: #161d2f;
  text-align: left;
  border-bottom: 1px solid #5a698f;
  width: 100%;
  padding-bottom: 13px;
}

#form-login input:focus {
  outline: none;
}

.input::placeholder {
  color: #ffffff;
  opacity: 0.5;
}

.button-log-in {
  background-color: #fc4747;
  padding-left: 25px;
  padding-right: 25px;
  border: 0px;
  border-radius: 10px;
  width: 280px;
  height: 48px;
  font-size: 15px;
  font-weight: 300;
}

.link {
  color: #fc4747;
}

.login-to-signup {
  font-size: 15px;
  font-weight: 300;
}
</style>
