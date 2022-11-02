<template>
  <form id="add-credit-card">
    <div class="fields">
      <div class="field">
        <div>
          <label for="card-number">Card number</label>
          <InputText id="card-number" type="text" v-mask="cardMask" name="cardNumber" placeholder="0000 0000 0000 0000" />
        </div>
      </div>
      <div class="field">
        <div>
          <label>Date of expiry</label>
          <div class="flex-row expired-date">
            <div class="expired-month">
              <select name="month" class="month-select">
                <option value="month">Insert a month</option>
                <option v-for="month in months" :value="month">{{ month }}</option>
              </select>
            </div>
            <div class="expired-year">
              <select name="year" class="year-select">
                <option value="year">Insert a year</option>
                <option v-for="year in years" :value="year">{{ year }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <div>
          <label>Security code</label>
          <div class="flex-row align-items-center security-code" >
            <InputText  class="cvv" name="cvv" type="text" v-mask="cvvMask" />
            <span v-tooltip.right="{ value: securityCodeHelp, class:'help-cvv' }"
                  class="help-cvv">
                    <i class="pi pi-question-circle"/>
                  </span>
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <Button type="submit" @click="onSubmit" >Add card</Button>
    </div>
  </form>

</template>

<script setup>
import {ref} from "vue";
import {TravellerService} from "@/services/Traveller.service";
import { FormFields } from "@/interfaces/FormField";
import {CreditCard} from "@/interfaces/CreditCard";
const props = defineProps({
  id: {
    type: String,
    default: localStorage.getItem('currentUser'),
    required: false
  },
  creditCards: {
    type: Array,
    default: [],
    required: false
  }
})

let creditCard = CreditCard;
const months = createArrayNumber(1, 12);
const years = createArrayNumber(2021, 2030);
const securityCodeHelp = 'Security code is cvv code. Numbers on the back of the credit card.'
const cvvMask = ref('{{999}}')
const cardMask =  ref('{{9999}} {{9999}} {{9999}} {{9999}}')

let expiredMonth = ref("");
let expiredYear = ref("");
let cvvCode = ref("");

function getCreditCards(){
  return []
}

function onSubmit(){

}

function createArrayNumber(first_value, last_value){
  let array = [];
  for(let i = first_value; i <= last_value; ++i)
    array.push(i);

  return array;
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

.security-code {
  gap: 0.5rem;
}

.help-cvv, select {
  cursor: pointer;
}

.help-cvv {
  color: #fc4747;
  border-radius: 50%;
}

select {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,.3);
  box-sizing: border-box;
  outline: none;
  text-decoration: none;
  margin: 0;
}
#add-credit-card {
  max-width: 360px;
}

.field > div {
  display: grid;
}

.cvv {
  max-width: 25%;
}
.p-tooltip {
  color: #000;
}

</style>