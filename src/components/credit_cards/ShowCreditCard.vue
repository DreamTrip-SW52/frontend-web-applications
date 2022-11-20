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
    <!-- <div class="flex gap-2">
      <span>CVV code: </span>
      <span>{{ transformCvv() }}</span>
    </div> -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { CreditCard, CreditCardConstructor } from '@/interfaces/CreditCard';

const props = defineProps({
  creditCard: {
    type: CreditCardConstructor,
    required: true,
  },
});
let showCard = props.creditCard;

onMounted(() => {
  console.log(
    '🚀 ~ file: ShowCreditCard.vue ~ line 32 ~ onMounted ~ props.creditCard',
    props.creditCard
  );
});

function transformNumber() {
  let mask = ' **** **** **';
  return (
    showCard.cardNumber.substring(0, 4) +
    mask +
    showCard.cardNumber.substring(
      showCard.cardNumber.length - 2,
      showCard.cardNumber.length
    )
  );
}

function transformCvv() {
  return showCard.securityCode[0] + '**';
}
</script>

<style scoped>
.grid {
  display: grid;
}
</style>
