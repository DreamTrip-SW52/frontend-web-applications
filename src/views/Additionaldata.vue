<template>
  <div class="additional-data">
    <div>
      <div class="title-log">Additional data</div>
    </div>

    <div>
      <form id="form-signup">
        <InputText
          type="name"
          placeholder="Name"
          class="input text-white"
          :class="errors.name.error && 'p-invalid'"
          v-model="name"
        />
        <small class="p-error" v-if="errors.name.error">{{
          errors.name.message
        }}</small>
        <br /><br />
        <InputText
          type="lastname"
          placeholder="Last name"
          class="input text-white"
          :class="errors.lastname.error && 'p-invalid'"
          v-model="lastname"
        />
        <small class="p-error" v-if="errors.lastname.error">{{
          errors.lastname.message
        }}</small>
        <br /><br />
        <InputText
          type="phone"
          placeholder="Phone"
          class="input text-white"
          :class="errors.phone.error && 'p-invalid'"
          v-model="phone"
        />
        <small class="p-error" v-if="errors.phone.error">{{
          errors.phone.message
        }}</small>
        <br /><br />
        <InputText
          type="dni"
          placeholder="DNI"
          class="input text-white"
          :class="errors.dni.error && 'p-invalid'"
          v-model="dni"
        />
        <small class="p-error" v-if="errors.dni.error">{{
          errors.dni.message
        }}</small>
        <br /><br />
        <div>
          <button
            type="submit"
            class="initial-button-log-in"
            @click="handleAdditional"
          >
            Add data
          </button>
        </div>
      </form>
    </div>

    <div class="signup-to-signup">
      You already registered your data?
      <router-link to="/login" class="link">Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { IAuthAdditionalDataRegisterErrors } from "../utils/authUtils";
import { TravelerService } from "../services/Traveler.service";

const travellerService = new TravelerService();
const router = useRouter();

const handleAdditional = async (e) => {
  e.preventDefault();

  const registerErrors = IAuthAdditionalDataRegisterErrors(
    name.value,
    lastname.value,
    phone.value,
    dni.value
  );

  errors.value = registerErrors;

  if (
    registerErrors.name?.error ||
    registerErrors.lastname?.error ||
    registerErrors.phone?.error ||
    registerErrors.dni?.error
  )
    return;

  if (
    !registerErrors?.name?.error &&
    !registerErrors?.lastname?.error &&
    !registerErrors?.phone?.error &&
    !registerErrors?.dni?.error
  ) {
    travellerService.create({
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
      name: name.value,
      lastname: lastname.value,
      phone: phone.value,
      dni: dni.value,
      photo: "",
    });

    localStorage.clear();
    router.push("/login");
  }
};

const errors = ref({
  name: {
    name: false,
    message: "",
  },
  lastname: {
    error: false,
    message: "",
  },
  phone: {
    error: false,
    message: "",
  },
  dni: {
    error: false,
    message: "",
  },
});

const name = ref("");
const lastname = ref("");
const phone = ref("");
const dni = ref("");
</script>

<style scoped>
.additional-data {
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
  width: 280px;
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
