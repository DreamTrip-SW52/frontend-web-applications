<template>
  <div class="signup">
    <div>
      <div class="title-log">Signup</div>
    </div>

    <div>
      <form id="form-signup">
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
        <InputText
          type="password"
          placeholder="Repeat Password"
          class="input text-white"
          :class="errors.confirmPassword.error && 'p-invalid'"
          v-model="confirmPassword"
        />
        <small class="p-error" v-if="errors.confirmPassword.error">{{
          errors.confirmPassword.message
        }}</small>
        <br /><br />
        <div>
          <button
            type="submit"
            class="initial-button-log-in"
            @click="handleRegister"
          >
            Create an Account
          </button>
        </div>
      </form>
    </div>

    <div class="signup-to-signup">
      Already have an account?
      <router-link to="/login" class="link">Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuthRegisterErrors } from "../utils/authUtils";
import { TravelerService } from "../services/Traveler.service";
import { useRouter } from "vue-router";

const travellerService = new TravelerService();
const router = useRouter();

const handleRegister = async (e) => {
  e.preventDefault();

  const registerErrors = getAuthRegisterErrors(
    email.value,
    password.value,
    confirmPassword.value
  );

  errors.value = registerErrors;

  if (
    registerErrors.email.error ||
    registerErrors.password.error ||
    registerErrors.confirmPassword.error
  )
    return;

  const { data } = await travellerService.getAll();

  console.log("data", data);

  if (data.find((traveller) => traveller.email === email.value)) {
    errors.value.email.error = true;
    errors.value.email.message = "Email already exists";
    return;
  }

  if (
    !registerErrors?.email?.error &&
    !registerErrors?.password?.error &&
    !registerErrors?.confirmPassword?.error
  ) {
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);

    router.push("/additionaldata");
  }
};

const errors = ref({
  email: {
    error: false,
    message: "",
  },
  password: {
    error: false,
    message: "",
  },
  confirmPassword: {
    error: false,
    message: "",
  },
});
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
</script>

<style scoped>
.signup {
  background-color: #161d2f;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 350px;
  row-gap: 25px;
  padding: 32px;
  justify-content: space-between;
}

#form-signup {
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

#form-signup input:focus {
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
  height: 48px;
  font-size: 15px;
  font-weight: 300;
}

.link {
  color: #fc4747;
}

.signup-to-signup {
  font-size: 15px;
  font-weight: 300;
}
</style>
