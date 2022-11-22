<template>
  <form id="add-credit-card">
    <div class="fields">
      <div class="field">
        <div>
          <label for="card-number">Card number</label>
          <InputText
            @change="resetFormErrors()"
            v-model="cardNumber"
            required="true"
            id="card-number"
            v-mask="cardMask"
            placeholder="0000 0000 0000 0000"
          />
        </div>
      </div>
      <div class="field flex-row two-rem-gap">
        <div>
          <label>Date of expiry</label>

          <div class="flex-row expired-date">
            <div class="expired-month">
              <InputText
                @change="resetFormErrors()"
                v-model="month"
                :minlength="2"
                required="true"
                id="month"
                v-mask="monthMask"
                placeholder="00"
              />
            </div>
            <div class="expired-year">
              <InputText
                @change="resetFormErrors()"
                v-model="year"
                :minlength="4"
                required="true"
                id="year"
                v-mask="yearMask"
                placeholder="0000"
              />
            </div>
          </div>
        </div>
        <div>
          <label>Security code</label>
          <div class="flex-row align-items-center security-code">
            <InputText
              @change="resetFormErrors()"
              v-model="cvv"
              required
              class="cvv"
              id="cvv"
              placeholder="000"
              v-mask="cvvMask"
            />
            <span
              v-tooltip.right="{ value: securityCodeHelp, class: 'help-cvv' }"
              class="help-cvv"
            >
              <i class="pi pi-question-circle" />
            </span>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="errors">
          <small class="p-error" v-for="error of formErrors">
            {{ error.message && error?.message }}</small
          >
        </div>
      </div>
    </div>
    <div class="actions">
      <Button type="submit" @click="onSubmit()">Add card</Button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { CreditCardsService } from "@/services/CreditCards.service";
import { TravelerService } from "@/services/Traveler.service";
import { TravelAgencyService } from "@/services/TravelAgency.service";

const props = defineProps({
  id: {
    type: Number,
    default: localStorage.getItem("currentUser"),
    required: true,
  },
  creditCards: {
    type: Array,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
});
const emitEvents = defineEmits();

//values for validate year
const MIN_YEAR = 2022;
const MAX_YEAR = 2030;
//value for valid visa credit card length
const MIN_CARD_LENGTH = 16;
const CARD_LIMIT = 3;

const creditCardsService = new CreditCardsService();
const travelerService = new TravelerService();
const agencyService = new TravelAgencyService();

let formErrors = ref([]);

const securityCodeHelp =
  "Security code is cvv code. Numbers on the back of the credit card.";
const cvvMask = ref("{{999}}");
const cardMask = ref("{{9999}} {{9999}} {{9999}} {{9999}}");
const monthMask = ref("{{00}}");
const yearMask = ref("{{0000}}");

let cardNumber = ref("");
let month = ref("");
let year = ref("");
let cvv = ref("");

function onSubmit() {
  const cardNumber = document.getElementById("card-number");
  const month = document.getElementById("month");
  const year = document.getElementById("year");
  const cvv = document.getElementById("cvv");

  if (props.creditCards.length >= CARD_LIMIT) {
    formErrors.value = [
      {
        message:
          "You have reached the limit of cards to be registered (" +
          CARD_LIMIT +
          ")",
      },
    ];
    return;
  }

  if (!validateForm(cardNumber, month, year, cvv)) return;

  const creditCard = getStorableCreditCard(
    cardNumber.value,
    month.value,
    year.value,
    cvv.value
  );

  if (!validateCreditCard(creditCard)) return;

  addCreditCard(creditCard);
  emitEvents("add-card", creditCard);
}

//receive html elements
function validateForm(cardNumber, month, year, cvv) {
  if (
    cardNumber.value === "" ||
    month.value === "" ||
    year.value === "" ||
    cvv.value === ""
  )
    formErrors.value = [{ message: "Please, fill all fields." }];
  else if (!validateCardNumber(cardNumber.value))
    formErrors.value = [{ message: "Insert a valid credit card number." }];
  else if (!validateMonth(month.value))
    formErrors.value = [{ message: "Insert a valid month." }];
  else if (!validateYear(year.value))
    formErrors.value = [{ message: "Insert a valid year." }];
  else if (!validateCvv(cvv.value))
    formErrors.value = [{ message: "Insert a valid cvv code." }];
  return formErrors.value.length === 0;
}

//receive object
function validateCreditCard(creditCard) {
  for (let item of props.creditCards) {
    console.log("item", item);
    console.log("card", creditCard);
    if (
      item.cardNumber === creditCard.cardNumber &&
      item.securityCode === creditCard.securityCode &&
      item.expirationDate === creditCard.expirationDate
    ) {
      formErrors.value = [{ message: "This credit card already exist." }];
      return false;
    }
  }
  return true;
}

//receive object
async function addCreditCard(card) {
  card.userType = props.userType;

  let userName;

  if (card.userType === "traveller") {
    const user = await travelerService.getById(props.id);
    userName = user.data.name;
  } else {
    const user = await agencyService.getById(props.id);
    userName = user.data.name;
  }

  function collapseCardNumber(cardNumber) {
    return cardNumber.replace(/\s/g, "");
  }

  let mappedCard = {
    holderName: userName,
    cardNumber: collapseCardNumber(card.cardNumber),
    expirationDate: card.expirationDate,
  };

  if (card.userType === "traveller") {
    mappedCard = {
      ...mappedCard,
      travelerId: props.id,
    };

    await creditCardsService.createTravelerCard(mappedCard);
  } else {
    mappedCard = {
      ...mappedCard,
      agencyId: props.id,
    };
    await creditCardsService.createAgencyCard(mappedCard);
  }
}
//receive string values
function getStorableCreditCard(cardNumber, month, year, cvv) {
  return {
    id: 0,
    userId: props.id,
    cardNumber: cardNumber,
    expirationDate: month + "/" + year,
    securityCode: cvv,
  };
}

function validateMonth(month) {
  return month > 0 && month <= 12;
}

function validateYear(year) {
  return year > MIN_YEAR && year < MAX_YEAR;
}

function validateCvv(cvv) {
  return cvv.length > 2;
}

function validateCardNumber(cardNumber) {
  return cardNumber.length >= MIN_CARD_LENGTH;
}

function resetFormErrors() {
  formErrors.value = [];
}
</script>

<style scoped>
.flex-row {
  display: flex;
}

.actions {
  margin-top: 1rem;
  display: flex;
  gap: 3rem;
  justify-content: center;
}

.expired-date {
  gap: 5px;
}
.expired-date > div input {
  max-width: 4rem;
}

.security-code {
  gap: 0.5rem;
}

.help-cvv,
select {
  cursor: pointer;
}

.help-cvv {
  color: #fc4747;
  border-radius: 50%;
}

.two-rem-gap {
  gap: 2rem;
}

#add-credit-card {
  max-width: 360px;
}

.field > div {
  display: grid;
}

.cvv {
  max-width: 6rem;
}

.errors {
}
</style>
