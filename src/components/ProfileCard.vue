<template>
  <div class="container">
    <div class="profile-image">
      <img v-if="user.photo !== ''" :src="user.photo" alt="profile image" />
      <img  src="../assets/avatar.png" alt="profile image">
    </div>
    <form id="profile-form">
      <div class="fields">
        <div v-for="field of formFields" class="field">
          <div v-if="normalField(field.label)" :class="field.label">
            <label :for="field.label"> {{ field.title }}</label>
            <InputText
                :id="field.label" :placeholder="field.placeholder" :type="field.type"
                :required="field.requerid" :disabled="field.editable ? !changeValues : true" v-model="field.value"
                :value="user[field.label]" :maxlength="field.label === 'phone' ? 9: 200"
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

    <form id="password-form">
      <div class="fields">
        <div class="change-password field" >
          <div>
            <small class="change-password-link" @click="changePassword('hide')" >
              <span v-if="hidePassword">Change password?</span>
              <span v-else>Cancel</span>
            </small>
          </div>
          <div v-if="!hidePassword" v-for="field of passwordFields" >
            <label :for="field.label"> {{ field.title }}</label>
            <InputText
                :id="field.label" :placeholder="field.placeholder" :type="field.type"
                :required="field.requerid" v-model="field.value"
                :minlength="8" :value="field.value" @keydown="resetPasswordErrors"
            />
          </div>
          <div id="errors">
            <small class="p-error" v-for="error of passwordErrors"> {{ error.message && error?.message }}</small>
          </div>
          <div class="actions" v-if="!hidePassword">
            <Button type="submit" @click="changePassword('submit')" >Change password</Button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>


import {IUser, User} from '@/interfaces/User'
import { FormFields } from "@/interfaces/FormField";
import { ref } from "vue";
import {TravellerService} from "@/services/Traveller.service";

const props = defineProps( {
  id: {
    type: String,
    default: localStorage.getItem('currentUser'),
    required: false
  },
  user: {
    type: User,
    required: false
    }
  }
)
let user = ref(IUser);

const userApiService = new TravellerService();
if(props.user === undefined){
  const response = await userApiService.getById(props.id);
  user = response.data;
}

let changeValues = ref(false);
let hidePassword = ref(true);

function onSubmit() {
  changeValues.value = false;
  setStorableUser();
  userApiService.update(user.id, user);
}

function setStorableUser() {
  for(let field of formFields){
    if(field.value !== '')
      user[field.label] = field.value
  }
  console.log(user);
}


function normalField(label){
  return label !== 'password' && label !== 'email' && label !== 'type';
}

let formFields = FormFields;
let passwordFields = FormFields;
let passwordErrors = ref([]);
formFields = [
  { label: 'name',
    title: 'Name',
    value: '',
    disable: true,
    placeholder: 'Example Name',
    requerid: true,
    type: 'text',
    editable: true
  },
  {
    label: 'lastname',
    title: 'Last Name',
    value: '',
    disable: true,
    placeholder: 'Example LastName',
    requerid: true,
    type: 'text',
    editable: true
  },
  {
    label: 'phone',
    title: 'Phone',
    value: '',
    disable: true,
    placeholder: '123456789',
    requerid: true,
    type: 'text',
    editable: true
  },
  {
    label: 'dni',
    title: 'DNI',
    value: '',
    disable: true,
    placeholder: 'User DNI',
    requerid: true,
    type: 'text',
    editable: false
  },
  {
    label: 'type',
    title: 'User Type',
    value: '',
    disable: true,
    placeholder: 'Example user',
    requerid: true,
    type: 'text',
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

passwordFields = [
  {
    label: 'password',
    title: 'New password',
    value: '',
    disable: true,
    placeholder: 'Enter new password',
    requerid: true,
    type: 'password'
  },
  {
    label: 'confirmPassword',
    title: 'Confirm Password',
    value: '',
    disable: true,
    placeholder: 'Confirm new password',
    requerid: true,
    type: 'password'
  }
]

function changePassword(type) {
  if(type === 'submit'){
    validatePassword()
    if(passwordErrors.value.length === 0) {
      assignNewPassword();
      hidePassword.value = !hidePassword.value
    }
  }
  else {
    resetPasswordValues()
    passwordErrors.value = []
    hidePassword.value = !hidePassword.value
  }

}

function assignNewPassword() {
  user.password = passwordFields[0].value;
  userApiService.update(user.id, user).then(() => {
    resetPasswordValues()

  });
}

function resetPasswordValues() {
  for(let field of passwordFields){
    field.value = '';
    field.value = '';
  }
}

function validatePassword() {
  for(let field of passwordFields) {
    if (field.value === '') {
      passwordErrors.value = [{message: 'Please, fill the field'}]
      return
    }
  }
  if(passwordFields[0].value !== passwordFields[1].value)
    passwordErrors.value = [{message: 'Not same password'}]
}
function resetPasswordErrors() {
  passwordErrors.value = [];
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

#errors {
  margin: 0 auto 0 auto;
}

.profile-image, .profile-image > img {
  height: 10rem;

}

.profile-image {
  grid-template-columns: 1fr;
}

</style>