<template>
  <!-- VERTICAL NAVBAR -->
  <div class="home">
    <Navbar />

    <div class="filters">
      <h2 class="title1">Filters</h2>
      <div class="prices">
        <h3 class="title2">Price</h3>
        <input
          v-model="price_filter"
          v-on:change="show_package_filters()"
          type="range"
          id="price"
          name="price"
          min="300"
          max="5000"
          class="filter-range"
        />
        <div class="pric-ran">
          <div>300</div>
          <div>5000</div>
        </div>
        <p>Price: {{ price_filter }}</p>
      </div>

      <div class="conftime">
        <h3 class="title2">Configuration Time</h3>
        <input
          v-model="time_filter"
          v-on:change="show_package_filters()"
          type="range"
          id="time"
          name="time"
          min="3"
          max="30"
          class="filter-range"
        />
        <div class="tim-ran">
          <div>immediate</div>
          <div>24h</div>
        </div>
        <p>Time: {{ time_filter }}</p>
      </div>

      <div class="type">
        <h3 class="title2">Type of tour</h3>
        <form class="forms">
          <input type="checkbox" value="In group" />
          <label for="In group" class="textform">In group</label><br />
          <input type="checkbox" value="Private" />
          <label for="Private" class="textform">Private</label><br />
        </form>
      </div>

      <div>
        <h3 class="title2">Categories</h3>
        <form class="forms">
          <input type="checkbox" value="Private" />
          <label for="Private" class="textform">Standard</label><br />
          <input type="checkbox" value="Private" />
          <label for="Private" class="textform">Specials</label><br />
          <input type="checkbox" value="Private" />
          <label for="Private" class="textform">Itinerant trips</label><br />
          <input type="checkbox" value="Private" />
          <label for="Private" class="textform">Stay trips</label><br />
          <input type="checkbox" value="Private" />
          <label for="Private" class="textform">Generals</label><br />
          <input type="checkbox" value="Private" />
          <label for="Private" class="textform">Specific</label><br />
          <input type="checkbox" value="Private" />
          <label for="Private" class="textform">Local programs</label><br />
          <input type="checkbox" value="Private" />
          <label for="Private" class="textform">Regional programs</label><br />
        </form>
      </div>
    </div>

    <div class="content">
      <div class="content-filter">
        <p class="content-filter-title">Sort by</p>
        <button class="option-button">Choose an option:</button>
      </div>

      <template v-for="myPackage in packages">
        <PackageCard
          :id="myPackage.id"
          :name="myPackage.name"
          :description="myPackage.description"
          :price="myPackage.total"
          :place="myPackage.location"
          :duration="myPackage.duration"
          :img_url="myPackage.img"
        />
      </template>

      {{ JSON.stringify(packages.value) }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import PackageCard from "../components/PackageCard.vue";
import { PackageService } from "../services/Package.service";

const packageService = new PackageService();

// lifecyle hooks
onMounted(() => {
  packageService.getPackages().then((response) => {
    packages.value = response.data;
  });
});

const packages = ref([]);
const price_filter = ref(5000);
const time_filter = ref(30);

const show_package_filters = () => {
  const price_value = price_filter.value.toString();
  const time_value = time_filter.value.toString();

  PackageService.getPackages(price_value, time_value).then((response) => {
    packages.value = response;
  });
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: row;
  gap: 41px;
}
.filters {
  background-color: #161d2f;
  border-radius: 5px;
  width: 315px;
  height: 800px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 20px;
}
.content {
  width: 769px;
  height: 743px;
  display: flex;
  flex-direction: column;
  gap: 33px;
}
.content-filter {
  border-radius: 5px;
  background-color: #161d2f;
  width: 100%;
  height: 74px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
}
.content-filter-title {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  display: block;
}
.option-button {
  box-sizing: border-box;
  width: 178px;
  height: 34px;
  background: #fc4747;
  border-radius: 9px;
  border: 0px;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 18px;
  display: block;
  margin-right: 10px;
}
.title1 {
  color: #ffffff;
  text-align: center;
}
.title2 {
  border-bottom: 2px solid #fc4747;
  text-align: left;
  color: #ffffff;
}
.filter-range {
  height: 1px;
  margin: 10px 0;
  width: 80%;
}
.pric-ran {
  font-size: 12px;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  gap: 230px;
  padding-left: 2px;
}
.tim-ran {
  font-size: 12px;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  gap: 195px;
  padding-left: 2px;
}
.forms {
  text-align: left;
}
.textform {
  color: #ffffff;
}
.filter-range {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 1px; /* Specified height */
  background: #5a698f; /* Grey background */
  outline: none; /* Remove outline */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
}
.filter-range::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 18px; /* Set a specific slider handle width */
  height: 18px; /* Slider handle height */
  border-radius: 100%;
  background: #fc4747; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
</style>
