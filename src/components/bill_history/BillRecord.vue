<template>
  <div class="card-description p-2 px-4 border-1 border-round">
    <div class="bill">
      <div class="title-pack">{{ bill.name }}</div>
      <div class="des-pack">{{ bill.amount }}</div>
    </div>

    <Button class="p-button-danger" label="Delete" @click="$emit('delete')" />
  </div>
</template>

<script setup>
import BillRecord from './BillRecord.vue';

defineProps({
  bill: Object,
});
</script>

<style scoped>
.card-description {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.title-pack {
  color: #ffffff;
  font-size: 20px;
}

.bill {
  display: flex;
  gap: 10px;
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
</style>
