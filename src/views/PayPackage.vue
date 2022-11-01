<template>
  <header>
    <h1 class="title-pay-package">Pay</h1>
  </header>
  <div class="pay-package">
    <PayMethods>
      <div class="creditcard-details">
        <h2 class="creditcard-details-title">Package Details</h2>
        <div class="creditcard-card-text">
          <p class="creditcard-text">{{ cardNumber }}</p>
        </div>
        <div class="creditcard-card-text">
          <p class="creditcard-text">{{ expirationDate }}</p>
        </div>
        <div class="creditcard-card-text">
          <p class="creditcard-text">{{ securityCode }}</p>
        </div>
      </div>
    </PayMethods>
    <template v-if="packageData !== {}">
      <div class="package-details">
        <h2 class="package-details-title">Package Details</h2>
        <p class="details">{{ packageData.name }}</p>
        <p class="details">Place: {{ packageData.location }}</p>
        <p class="details">Duration: {{ packageData.duration }} days</p>
        <div class="total">
          <h2 class="total-title">Total: S/.{{ packageData.total }}</h2>
        </div>
      </div>
    </template>

    {{ JSON.stringify(packages.value) }}
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { PackageService } from '../services/Package.service';
import { CreditCards } from '@/interfaces/CreditCard';
import { CreditCardsService } from '@/services/CreditCards.service';
import PayMethods from '@/components/pay/PayMethods.vue';

const packageService = new PackageService();
const packages = ref([]);

// lifecyle hooks
onMounted(() => {
  packageService.getPackages().then((response) => {
    packages.value = response.data;
  });
});
</script>

<style scoped>
.pay-package {
  display: flex;
  flex-direction: row;
  gap: 41px;
}

.title-pay-package {
  text-align: center;
  color: #ffffff;
  font-size: 32px;
}

.creditcard-details {
  display: flex;
  flex-direction: column;
}

.creditcard-card-text {
  background-color: #ffffff;
  border-radius: 10px;
  width: 200px;
  height: 81px;
}

.package-details {
  background-color: #161d2f;
  border-radius: 5px;
  width: 300px;
  height: 600px;
}

.package-details-title {
  text-align: center;
  color: #ffffff;
  font-size: 32px;
}

.details {
  font-size: 18px;
  color: #ffffff;
  text-align: left;
}

.total {
  background-color: #5a698f;
  border-radius: 5px;
  width: 300px;
  height: 60px;
}

.total-title {
  font-size: 24px;
  color: #ffffff;
  text-align: right;
}
</style>
