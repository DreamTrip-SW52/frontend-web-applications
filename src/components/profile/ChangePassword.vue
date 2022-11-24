<template>
  <div>
    <form id="password-form">
      <div class="fields">
        <div class="field">
          <div v-for="field of passwordFields">
            <label :for="field.label"> {{ field.title }}</label>
            <InputText
              :id="field.label"
              :placeholder="field.placeholder"
              :type="field.type"
              :required="field.requerid"
              v-model="field.value"
              :minlength="8"
              :value="field.value"
              @keydown="resetPasswordErrors"
            />
          </div>
          <div id="errors">
            <small class="p-error" v-for="error of passwordErrors">
              {{ error.message && error?.message }}</small
            >
          </div>
        </div>
      </div>
      <div class="actions">
        <Button type="submit" @click="changePassword()">Change password</Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { FormFields } from "@/interfaces/FormField";
import { ref, onMounted } from "vue";
import { TravelAgencyService } from "../../services/TravelAgency.service";
import { TravelerService } from "../../services/Traveler.service";

const emitEvents = defineEmits();
let passwordFields = FormFields;
let passwordErrors = ref([]);

const agencyService = new TravelAgencyService();
const travelerService = new TravelerService();

const props = defineProps({
  id: {
    type: Number,
    default: localStorage.getItem("currentUser"),
    required: true,
  },
  isAgency: {
    type: Boolean,
    required: true,
  },
});

passwordFields = [
  {
    label: "password",
    title: "New password",
    value: "",
    disable: true,
    placeholder: "Enter new password",
    requerid: true,
    type: "password",
  },
  {
    label: "confirmPassword",
    title: "Confirm Password",
    value: "",
    disable: true,
    placeholder: "Confirm new password",
    requerid: true,
    type: "password",
  },
];

async function changePassword(type) {
  validatePassword();
  if (passwordErrors.value.length === 0 && props.id !== undefined) {
    if (props.isAgency) {
      // obtener a la agencia por el id
      const agency = await agencyService.getById(props.id);
      // cambiar la contraseña
      agency.data.password = passwordFields[0].value;
      // actualizar la agencia
      await agencyService.update(props.id, agency.data);
    } else {
      // obtener al viajero por el id
      const traveler = await travelerService.getById(props.id);
      // cambiar la contraseña
      traveler.data.password = passwordFields[0].value;
      // actualizar al viajero
      await travelerService.update(props.id, traveler.data);
    }
    assignNewPassword();
  }
}

function assignNewPassword() {
  resetPasswordValues();
}

function resetPasswordValues() {
  for (let field of passwordFields) {
    field.value = "";
    field.value = "";
  }
}

function validatePassword() {
  for (let field of passwordFields) {
    if (field.value === "") {
      passwordErrors.value = [{ message: "Please, fill all fields" }];
      return;
    } else if (field.value.length < 8) {
      passwordErrors.value = [
        { message: "Password must be large than 8 characters." },
      ];
    }
  }
  if (passwordFields[0].value !== passwordFields[1].value)
    passwordErrors.value = [{ message: "Not same password" }];
}

function resetPasswordErrors() {
  passwordErrors.value = [];
}
</script>

<style scoped>
form,
.field,
.fields,
.field div {
  display: grid;
}

.field > div {
  gap: 0.5rem;
}

.actions {
  display: flex;
  gap: 3rem;
  justify-content: center;
}

#errors {
  margin: 0;
}
</style>
