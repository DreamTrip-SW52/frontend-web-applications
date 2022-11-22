<template>
  <div class="grid">
    <div class="flex gap-2">
      <span>Number: </span>
      <span>{{ transformNumber() }}</span>
    </div>
    <div class="flex gap-2">
      <span>Expired date: </span>
      <span>{{ showCard.expirationDate }}</span>
    </div>
  </div>
</template>

<script setup>
import { CreditCardConstructor } from "@/interfaces/CreditCard";

const props = defineProps({
  creditCard: {
    type: CreditCardConstructor,
    required: true,
  },
});

let showCard = props.creditCard;

function transformNumber() {
  let mask = " **** **** **";
  return (
    showCard.cardNumber.substring(0, 4) +
    mask +
    showCard.cardNumber.substring(
      showCard.cardNumber.length - 2,
      showCard.cardNumber.length
    )
  );
}
</script>

<style scoped>
.grid {
  display: grid;
}
</style>
