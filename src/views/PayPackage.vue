<template>
  <div class="pay-view">
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

      {{ JSON.stringify(packageData.value) }}
    </div>
    <router-link to="/home">
      <Button class="pay-buttom" @click="pay(packageData.sales)" label="Pay" />
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { PackageService } from "../services/Package.service";
import PayMethods from "@/components/pay/PayMethods.vue";

const router = useRouter();
const packageData = ref({});
const packageService = new PackageService();

// lifecyle hooks
onMounted(() => {
  const params = router.currentRoute.value.params;
  packageService.getPackageById(params.id).then((response) => {
    packageData.value = response.data;
    console.log(
      "🚀 ~ file: PayPackage.vue ~ line 56 ~ packageService.getPackageById ~ packageData.value",
      packageData.value
    );
  });
});

const pay = (packageSales) => {
  const params = router.currentRoute.value.params;
  const sales = packageSales + 1;
  packageService.increaseSalesById(params.id, sales).then((response) => {
    console.log(response);
  });
};
</script>

<style scoped>
.pay-view {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.pay-package {
  display: flex;
  flex-direction: row;
  gap: 70px;
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
  height: 100%;
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
  padding-left: 2vw;
}

.total {
  background-color: #5a698f;
  border-radius: 5px;
  width: 300px;
  height: 60px;
  margin-top: 60px;
}

.total-title {
  font-size: 24px;
  color: #ffffff;
  text-align: right;
  padding-top: 20px;
  padding-right: 10px;
}

.pay-buttom {
  width: 168px;
  height: 48px;
  margin-left: 200px;
}
</style>
