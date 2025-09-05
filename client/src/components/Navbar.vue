l
<script setup>
import { ref } from "vue";
// import { RouterLink, useRoute } from "vue-router";
const toggleNav = ref(false);

const openBurgerMenu = () => {
  toggleNav.value = !toggleNav.value;
};
</script>

<template>
  <nav class="flex flex-row justify-between">
    <button class="m-4">
      <div><img src="../assets/icons/back.svg" alt="" /></div>
    </button>
    <!--  -->
    <button @click="openBurgerMenu" class="m-4">
      <img src="../assets/icons/dehaze.svg" alt="" />
    </button>
  </nav>
  <div v-if="toggleNav" class="">
    <div
      class="bg-[#000000] text-center p-3 text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000]"
    >
      Home
    </div>
    <div
      class="bg-[#000000] text-center p-3 text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000]"
    >
      Second
    </div>
    <div
      class="bg-[#000000] text-center p-3 text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000]"
    >
      Third
    </div>
  </div>
</template>
