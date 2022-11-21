<template>
  <div class="pay-view">
    <header>
      <h1 class="title-pay-package">Buy Package</h1>
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
    </div>
    <Button class="pay-buttom" label="Pay" @click="createPackage()" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { PackageService } from "../services/Package.service";
import { TravelerService } from "../services/Traveler.service";
import { TransportService } from "../services/Transport.service";

import PayMethods from "@/components/pay/PayMethods.vue";

const router = useRouter();

const packageService = new PackageService();
const travelerService = new TravelerService();
const transportService = new TransportService();

const traveler = ref({});
const location = ref({});

onMounted(() => {});

const createPackage = async () => {
  const responseTraveler = await travelerService.getById(
    localStorage.getItem("currentUser")
  );
  traveler.value = responseTraveler.data;

  const responseLocation = await transportService.getLocationById(
    localStorage.getItem("locationId")
  );
  location.value = responseLocation.data;

  let customPackageData = {
    name: "Package of " + traveler.value.name,
    price: 0,
    travelerId: localStorage.getItem("currentUser"),
    locationId: localStorage.getItem("locationId"),
    rentCarId: localStorage.getItem("rentCarId"),
    accommodationId: localStorage.getItem("accommodationId"),
    tourId: localStorage.getItem("tourId"),
    roundTripId: localStorage.getItem("roundTripId"),
    oneWayId: localStorage.getItem("oneWayId"),
  };

  // complete data for package
  console.log(
    "🚀 ~ file: BuyPackage.vue ~ line 77 ~ createPackage ~ packageData.value",
    packageData.value
  );

  const responsePackage = await packageService.createCustomPackage(
    customPackageData.value
  );
  console.log("Custom Package created", responsePackage);

  const responsePurchasedPackage = await packageService.purchasedPackage({
    packageId: null,
    customPackageId: 1,
    active: 0,
    travelerId: traveler.value.id,
  });
  console.log("Purchase package added", responsePurchasedPackage);

  alert("Package purchased succesfully");

  // router.push('/home');
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
  justify-content: center;
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
