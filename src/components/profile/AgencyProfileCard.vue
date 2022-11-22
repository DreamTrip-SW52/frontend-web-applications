<template>
  <div class="container">
    <div class="profile-image">
      <img
        v-if="user?.photo !== undefined && user?.photo !== ''"
        :src="user?.photo"
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
              v-model="user[field.label]"
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
          :isAgency="false"
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
          v-if="!hideCreditCards && cards"
          v-for="(card, index) of cards"
        >
          <div class="flex gap-8">
            <span>Card # {{ index + 1 }}</span>
            <small
              ><span @click="removeCard(index, card)" class="click-link"
                >remove card</span
              ></small
            >
          </div>
          <ShowCreditCard :creditCard="card" />
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
            :credit-cards="cards"
            :id="user.id"
            v-if="!hideCreditForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { TravelAgencyService } from "@/services/TravelAgency.service";
import { CreditCards } from "@/interfaces/CreditCard";
import { CreditCardsService } from "@/services/CreditCards.service";
import CreditCardForm from "@/components/credit_cards/AddCreditCardForm.vue";
import ChangePassword from "@/components/profile/ChangePassword.vue";
import ShowCreditCard from "@/components/credit_cards/ShowCreditCard.vue";

const AGENCY = "agency";
const router = useRoute();

const props = defineProps({
  id: {
    type: String,
    default: localStorage.getItem("currentUser"),
    required: false,
  },
});

let user = ref({
  id: "",
  name: "",
  lastname: "",
  email: "",
  password: "",
  dni: "",
  photo: "",
  phone: "",
});

let cards = ref(CreditCards);
let hideCreditForm = ref(true);
let changeValues = ref(false);
let hidePassword = ref(true);
let hideCreditCards = ref(true);

let formFields = [
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
    label: "ruc",
    title: "Ruc",
    value: "",
    disable: true,
    placeholder: "12345678910",
    requerid: true,
    type: "text",
    editable: true,
  },
  {
    label: "type",
    title: "Agency Type",
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

const userApiService = new TravelAgencyService();
const cardsApiService = new CreditCardsService();

onMounted(async () => {
  if (props.id) {
    const { data } = await userApiService.getById(props.id);
    user.value = data;

    const response = await cardsApiService.getByAgencyId(props.id);

    cards.value = response.data;
  }
});

function normalField(label) {
  return label !== "password" && label !== "email" && label !== "type";
}

function onSubmit() {
  changeValues.value = false;
  setStorableUser();
  userApiService.update(props.id, user.value);
}

function setStorableUser() {
  for (let field of formFields) {
    if (field.value !== "") user[field.label] = field.value;
  }
  console.log(user);
}

function addedCard(card) {
  cards.value.push(card);
  hideCreditForm.value = !hideCreditForm.value;
}

function assignNewPassword(password) {
  user.password = password;
  userApiService.update(user.id, user).then();
  hidePassword.value = !hidePassword.value;
}

function removeCard(index, card) {
  cards.value.splice(index, 1);
  hideCreditCards.value = !hideCreditCards.value;
  cardsApiService.deleteByTravelerId(card.id).then();
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
