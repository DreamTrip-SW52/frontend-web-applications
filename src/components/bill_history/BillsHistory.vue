<template>
  <div class="bill-history-card mb-5">
    <h2 class="title-pack text-4xl mb-3 mt-0">Another bills</h2>

    <div class="card-wrapper">
      <p v-if="bills?.length === 0">You don't have new bills</p>
      <BillRecord
        v-else
        v-for="bill in bills"
        :key="bill.id"
        :bill="bill"
        @delete="handleDelete(bill.id)"
      />
    </div>

    <div class="form-wrapper mt-4">
      <InputText v-model="newBill.name" placeholder="Name" />
      <InputText v-model="newBill.amount" placeholder="Amount" />
      <Button label="Add new bill" @click="addNewBill" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import BillRecord from "./BillRecord.vue";
import { CurrentTravelService } from "../../services/CurrentTravel.service";

const currentTravelService = new CurrentTravelService();

defineProps({
  bills: Array,
});
const emit = defineEmits(["update"]);

const userId = JSON.parse(localStorage.getItem("currentUser"));
const newBill = reactive({
  name: "",
  amount: "",
});

const addNewBill = async () => {
  await currentTravelService.createNewBill(userId, newBill);
  updateData();
  newBill.name = "";
  newBill.amount = "";
};

const handleDelete = async (billId) => {
  await currentTravelService.deleteBill(userId, billId);
  updateData();
};

const updateData = () => emit("update");
</script>

<style scoped>
.bill-history-card {
  padding: 20px;
  border-radius: 5px;
  background-color: #161d2f;
  width: 100%;
  /* height: 180px; */
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-description {
  text-align: left;
}

.title-pack {
  color: #ffffff;
  font-size: 20px;
  padding-bottom: 5px;
}

.des-pack {
  color: #ffffff;
  font-size: 16px;
  font-weight: lighter;
}

.pl-du {
  color: #ffffff;
  font-size: 14px;
}

.form-wrapper {
  display: flex;
  gap: 10px;
}
</style>
