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
              :maxlength="field.label === 'phone' ? 9 : 200"
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
            :user-type="TRAVELLER"
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
import { ITraveller, Traveller } from "@/interfaces/Traveller";
import { FormFields } from "@/interfaces/FormField";
import { ref } from "vue";
import { TravellerService } from "@/services/Traveller.service";
import { CreditCards } from "@/interfaces/CreditCard";
import { CreditCardsService } from "@/services/CreditCards.service";
import CreditCardForm from "@/components/credit_cards/AddCreditCardForm.vue";
import ChangePassword from "@/components/profile/ChangePassword.vue";
import ShowCreditCard from "@/components/credit_cards/ShowCreditCard.vue";

const TRAVELLER = "traveller";

const props = defineProps({
  id: {
    type: String,
    default: localStorage.getItem("currentUser"),
    required: false,
  },
  user: {
    type: Traveller,
    required: false,
  },
});

let user = ref(ITraveller);
let creditCards = ref(CreditCards);
const userApiService = new TravellerService();
const cardsApiService = new CreditCardsService();
if (props.user === undefined) {
  const userResponse = await userApiService.getById(props.id);
  user = userResponse.data;
  const cardsResponse = await cardsApiService.getByUser(user.id, TRAVELLER);
  creditCards.value = cardsResponse.data;
}

let changeValues = ref(false);
let hidePassword = ref(true);
let hideCreditCards = ref(true);

function onSubmit() {
  changeValues.value = false;
  setStorableUser();
  userApiService.update(user.id, user);
}

function setStorableUser() {
  for (let field of formFields) {
    if (field.value !== "") user[field.label] = field.value;
  }
  console.log(user);
}

function normalField(label) {
  return label !== "password" && label !== "email" && label !== "type";
}

let formFields = FormFields;
let hideCreditForm = ref(true);
formFields = [
  {
    label: "name",
    title: "Name",
    value: "",
    disable: true,
    placeholder: "Example Name",
    requerid: true,
    type: "text",
    editable: true,
  },
  {
    label: "lastname",
    title: "Last Name",
    value: "",
    disable: true,
    placeholder: "Example LastName",
    requerid: true,
    type: "text",
    editable: true,
  },
  {
    label: "phone",
    title: "Phone",
    value: "",
    disable: true,
    placeholder: "123456789",
    requerid: true,
    type: "text",
    editable: true,
  },
  {
    label: "dni",
    title: "DNI",
    value: "",
    disable: true,
    placeholder: "Traveller DNI",
    requerid: true,
    type: "text",
    editable: false,
  },
  {
    label: "type",
    title: "Traveller Type",
    value: "",
    disable: true,
    placeholder: "Example user",
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

function addedCard(card) {
  creditCards.value.push(card);
  hideCreditForm.value = !hideCreditForm.value;
}

function assignNewPassword(password) {
  user.password = password;
  userApiService.update(user.id, user).then();
  hidePassword.value = !hidePassword.value;
}

function removeCard(index, card) {
  creditCards.value.splice(index, 1);
  hideCreditCards.value = !hideCreditCards.value;
  cardsApiService.delete(card.id).then();
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
.click-link:hover {
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
