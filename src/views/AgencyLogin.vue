<template>
  <div class="login">
    <div>
      <div class="title-log">Login</div>
    </div>

    <div>
      <form id="form-login">
        <InputText
          type="email"
          placeholder="Email address"
          class="input text-white"
          :class="errors.email.error && 'p-invalid'"
          v-model="email"
        />
        <small class="p-error" v-if="errors.email.error">{{
          errors.email.message
        }}</small>
        <br /><br />
        <InputText
          type="password"
          placeholder="Password"
          class="input text-white"
          :class="errors.password.error && 'p-invalid'"
          v-model="password"
        />
        <small class="p-error" v-if="errors.password.error">{{
          errors.password.message
        }}</small>
        <br /><br />
        <div>
          <button
            type="submit"
            class="initial-button-log-in"
            @click="handleLogin"
          >
            Login to your account
          </button>
        </div>
      </form>
    </div>

    <Dialog header="Header" :visible="display">
      Content
      <Button label="OK" @click="closeModal" class="p-button-text" />
    </Dialog>

    <div class="login-to-signup">
      Don't have an account?
      <router-link to="/agency/signup" class="link">Sign up</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuthLoginErrors } from "../utils/authUtils";
import { TravelAgencyService } from "../services/TravelAgency.service";

const travelAgencyService = new TravelAgencyService();

const router = useRouter();

const email = ref("");
const password = ref("");

let errors = ref({
  email: {
    error: false,
    message: "",
  },
  password: {
    error: false,
    message: "",
  },
});

const display = false;
const handleLogin = async (e) => {
  e.preventDefault();

  const loginErrors = getAuthLoginErrors(email.value, password.value);

  errors.value = loginErrors;

  if (!loginErrors?.email?.error && !loginErrors?.password?.error) {
    const { data } = await travelAgencyService.loginWithEmailAndPassword(
      email.value,
      password.value
    );

    if (data) {
      console.log("data", data);
      localStorage.setItem("currentUser", JSON.stringify(data.id));
      router.push("/agency/mypackages");
    } else {
      console.log("Travel Agency not found");
      alert("Incorrect Data");
    }
  }
};
</script>

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

.initial-button-log-in {
  background-color: #fc4747;
  padding-left: 25px;
  padding-right: 25px;
  border: 0px;
  border-radius: 10px;
  /* width: 336px; */
  /* width: ; */
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
