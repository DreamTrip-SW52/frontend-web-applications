<template>
  <div class="container">
    <div class="profile-image">
      <img
        v-if="user.photo !== undefined && user.photo !== ''"
        :src="user.photo"
        alt="profile image"
      />
      <i v-else class="pi pi-user" style="font-size: 7rem"></i>
    </div>
    <form id="profile-form">
      <div class="fields">
        <div v-for="field of formFields" class="field">
          <div v-if="normalField(field.label)" :class="field.label">
            <label :for="field.label"> {{ field.title }}</label>
            <InputText
              :id="field.label"
              :placeholder="field.placeholder"
              :type="field.type"
              :required="field.requerid"
              :disabled="field.editable ? !changeValues : true"
              v-model="field.value"
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
        <Button type="submit" @click="onSubmit" v-if="changeValues"
          >Save</Button
        >
      </div>
    </form>
    <div class="fields">
      <div class="field">
        <div>
          <small>
            <span
              class="change-password-link"
              @click="hidePassword = !hidePassword"
              v-if="hidePassword"
              >Change password?</span
            >
            <span
              class="change-password-link"
              @click="hidePassword = !hidePassword"
              v-else
              >Cancel</span
            >
          </small>
        </div>
        <ChangePassword
          v-on:change-password="assignNewPassword"
          v-if="!hidePassword"
        />
      </div>
    </div>

    <div class="fields">
      <div class="field">
        <div>
          <small>
            <span
              class="change-password-link"
              @click="hideCreditCards = !hideCreditCards"
              v-if="hideCreditCards"
              >Show credit cards?</span
            >
            <span
              class="change-password-link"
              @click="hideCreditCards = !hideCreditCards"
              v-else
              >Hide</span
            >
          </small>
        </div>
        <div
          class="credit-card"
          v-if="!hideCreditCards"
          v-for="(card, index) of creditCards"
        >
          <div class="flex gap-8">
            <span>Card #{{ index + 1 }}</span>
            <small
              ><span @click="removeCard(index, card)" class="click-link"
                >remove card</span
              ></small
            >
          </div>
          <ShowCreditCard :credit-card="card" />
        </div>
      </div>
    </div>

    <div class="fields">
      <div class="field">
        <div>
          <small>
            <span
              class="click-link"
              @click="hideCreditForm = !hideCreditForm"
              v-if="hideCreditForm"
              >Add new credit card?</span
            >
            <span
              class="click-link"
              @click="hideCreditForm = !hideCreditForm"
              v-else
              >Cancel</span
            >
          </small>
        </div>
        <div>
          <CreditCardForm
            v-on:add-card="addedCard"
            :user-type="AGENCY"
            :credit-cards="creditCards"
            :id="user.id"
            v-if="!hideCreditForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Agency, IAgency } from "@/interfaces/Agency";
import { TravelAgencyService } from "@/services/TravelAgency.service";
import { ref } from "vue";
import { FormFields } from "@/interfaces/FormField";
import ChangePassword from "@/components/profile/ChangePassword.vue";
import { CreditCards } from "@/interfaces/CreditCard";
import { CreditCardsService } from "@/services/CreditCards.service";
import ShowCreditCard from "@/components/credit_cards/ShowCreditCard.vue";
import CreditCardForm from "@/components/credit_cards/AddCreditCardForm.vue";

const props = defineProps({
  id: {
    type: String,
    default: localStorage.getItem("currentUser"),
    required: true,
  },
  user: {
    type: Agency,
    required: false,
  },
});

const AGENCY = "agency";

let user = ref(IAgency);
let creditCards = ref(CreditCards);
const userApiService = new TravelAgencyService();
const cardsApiService = new CreditCardsService();

let changeValues = ref(false);
let hidePassword = ref(true);
let hideCreditCards = ref(true);
let hideCreditForm = ref(true);

let formFields = FormFields;
formFields = [
  {
    label: "name",
    title: "Company Name",
    value: "",
    disable: true,
    placeholder: "Example Name",
    requerid: true,
    type: "text",
    editable: true,
  },
  {
    label: "ruc",
    title: "Company Ruc",
    value: "",
    disable: true,
    placeholder: "Company Ruc",
    requerid: true,
    type: "text",
    editable: false,
  },
  {
    label: "email",
    title: "Email",
    value: "",
    disable: true,
    placeholder: "example@example",
    requerid: true,
    type: "email",
  },
];

if (props.user === undefined) {
  const userResponse = await userApiService.getById(props.id);
  user = userResponse.data;
  const cardsResponse = await cardsApiService.getByUser(user.id, AGENCY);
  creditCards.value = cardsResponse.data;
}

function assignNewPassword(password) {
  user.password = password;
  userApiService.update(user.id, user).then();
  hidePassword.value = !hidePassword.value;
}

function normalField(label) {
  return label !== "password" && label !== "email" && label !== "type";
}

function onSubmit() {
  changeValues.value = false;
  setStorableUser();
  userApiService.update(user.id, user).then();
}

function setStorableUser() {
  for (let field of formFields) {
    if (field.value !== "") user[field.label] = field.value;
  }
}

function removeCard(index, card) {
  creditCards.value.splice(index, 1);
  hideCreditCards.value = !hideCreditCards.value;
  cardsApiService.delete(card.id).then();
}

function addedCard(card) {
  creditCards.value.push(card);
  hideCreditForm.value = !hideCreditForm.value;
}
</script>

<style scoped>
.container {
  min-width: 50rem;
}

.container > form,
.field,
.fields,
.field div,
.profile-image {
  display: grid;
}

.fields,
.profile-image {
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
}

.field,
.profile-image {
  width: 100%;
}

.field div {
  width: 90%;
  margin: 0.8rem auto 0 auto;
}

.change-password-link,
.click-link {
  color: #3b82f6;
  text-decoration: underline;
}
.change-password-link:hover,
.click-link {
  cursor: pointer;
}

.actions {
  display: flex;
  gap: 3rem;
  justify-content: center;
}

.profile-image,
.profile-image > img {
  height: 10rem;
}

.profile-image {
  grid-template-columns: 1fr;
}
</style>
