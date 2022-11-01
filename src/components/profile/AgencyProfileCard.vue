<template>
  <div class="container">
    <div class="profile-image">
      <img v-if="user.photo !== undefined && user.photo !== ''" :src="user.photo" alt="profile image" />
      <img v-else src="../../assets/avatar.png" alt="profile image">
    </div>
    <form id="profile-form">
      <div class="fields">
        <div v-for="field of formFields" class="field">
          <div v-if="normalField(field.label)" :class="field.label">
            <label :for="field.label"> {{ field.title }}</label>
            <InputText
                :id="field.label" :placeholder="field.placeholder" :type="field.type"
                :required="field.requerid" :disabled="field.editable ? !changeValues : true" v-model="field.value"
                :value="user[field.label]"
            />
          </div>
        </div>

      </div>
      <div class="actions">
        <Button type="button" @click="changeValues = !changeValues">
          <span v-if="!changeValues">Edit information</span>
          <span v-if="changeValues">Cancel</span>
        </Button>
        <Button type="submit" @click="onSubmit" v-if="changeValues" >Save</Button>
      </div>
    </form>
    <div class="fields">
      <div class="field">
        <div>
          <small>
            <span class="change-password-link" @click="hidePassword = !hidePassword" v-if="hidePassword">Change password?</span>
            <span class="change-password-link" @click="hidePassword = !hidePassword" v-else>Cancel</span>
          </small>
        </div>
        <ChangePassword v-on:change-password="assignNewPassword" v-if="!hidePassword" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {Agency, IAgency} from '@/interfaces/Agency';
import {TravelAgencyService} from "@/services/TravelAgency.service";
import {ref} from "vue";
import {FormFields} from "@/interfaces/FormField";
import ChangePassword from '@/components/profile/ChangePassword.vue';

const props = defineProps({
  id: {
    type: String,
    default: localStorage.getItem('currentUser'),
    required: true
  },
  user: {
    type: Agency,
    required: false
  }
})

let user = ref(IAgency);
const userApiService = new TravelAgencyService();

let changeValues = ref(false);
let hidePassword = ref(true);

let formFields = FormFields;
formFields = [
  {
    label: 'name',
    title: 'Company Name',
    value: '',
    disable: true,
    placeholder: 'Example Name',
    requerid: true,
    type: 'text',
    editable: true
  },
  {
    label: 'ruc',
    title: 'Company Ruc',
    value: '',
    disable: true,
    placeholder: 'Company Ruc',
    requerid: true,
    type: "text",
    editable: false
  },
  {
    label: 'email',
    title: 'Email',
    value: '',
    disable: true,
    placeholder: 'example@example',
    requerid: true,
    type: 'email'
  }
]

if(props.user === undefined){
  const userResponse = await userApiService.getById(props.id);
  user = userResponse.data;
}

function assignNewPassword(password){
  user.password = password;
  userApiService.update(user.id, user).then();
  hidePassword.value = !hidePassword.value;
}

function normalField(label){
  return label !== 'password' && label !== 'email' && label !== 'type';
}

function onSubmit() {
  changeValues.value = false;
  setStorableUser();
  userApiService.update(user.id, user).then();
}

function setStorableUser() {
  for(let field of formFields){
    if(field.value !== '')
      user[field.label] = field.value
  }
}

</script>

<style scoped>
.container {
  min-width: 50rem;
}

.container > form, .field, .fields, .field div, .profile-image {
  display: grid;
}

.fields, .profile-image {
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
}

.field, .profile-image {
  width: 100%;
}

.field div {
  width: 90%;
  margin: 0.8rem auto 0 auto;
}

.change-password-link {
  color:  #3b82f6;
  text-decoration: underline;
}
.change-password-link:hover {
  cursor: pointer;
}

.actions {
  display: flex;
  gap: 3rem;
  justify-content: center;
}

.profile-image, .profile-image > img {
  height: 10rem;
}

.profile-image {
  grid-template-columns: 1fr;
}
</style>