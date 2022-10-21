<template>
  <div class="signup">
    <div>
      <div class="title-log">Signup</div>
    </div>

    <div>
      <form id="form-signup">
        <InputText
          type="name"
          placeholder="Company Name"
          class="input"
          :class="errors.name.error && 'p-invalid'"
          v-model="name"
        />
        <small class="p-error" v-if="errors.name.error">{{
          errors.name.message
        }}</small>
        <br /><br />
        <InputText
          type="ruc"
          placeholder="Ruc"
          class="input"
          :class="errors.ruc.error && 'p-invalid'"
          v-model="ruc"
        />
        <small class="p-error" v-if="errors.ruc.error">{{
          errors.ruc.message
        }}</small>
        <br /><br />
        <InputText
          type="email"
          placeholder="Email address"
          class="input"
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
          class="input"
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
          class="input"
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
import { ref } from 'vue';
import { getAuthRegisterErrors } from '../utils/authUtils';
import { TravellerService } from '../services/Traveller.service';
import { useRouter } from 'vue-router';

const travellerService = new TravellerService();
const router = useRouter();

const handleRegister = async (e) => {
  e.preventDefault();
  // // Your login logic here
  const registerErrors = getAuthRegisterErrors(
    email.value,
    password.value,
    confirmPassword.value
  );

  errors.value = registerErrors;

  if (
    registerErrors.name.error ||
    registerErrors.ruc.error ||
    registerErrors.email.error ||
    registerErrors.password.error ||
    registerErrors.confirmPassword.error
  )
    return;

  const { data } = await travellerService.isEmailRepeated(email.value);

  if (Array.isArray(data) && data.length > 0) {
    errors.value.email.error = true;
    errors.value.email.message = 'Email already exists';
    return;
  }

  if (
    !registerErrors?.name?.error &&
    !registerErrors?.ruc?.error &&
    !registerErrors?.email?.error &&
    !registerErrors?.password?.error &&
    !registerErrors?.confirmPassword?.error
  ) {
    travellerService.create({
      name: name.value,
      ruc: ruc.value,
      email: email.value,
      password: password.value,
    });

    router.push('/additionaldata');
  }
};

let errors = ref({
  name: {
    error: false,
    message: '',
  },
  ruc: {
    error: false,
    message: '',
  },
  email: {
    error: false,
    message: '',
  },
  password: {
    error: false,
    message: '',
  },
  confirmPassword: {
    error: false,
    message: '',
  },
});
const name = ref('');
const ruc = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
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
