<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import UserService from "@/api/UserService";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const gatchaUsername = route.params.username;
const userInfo = reactive({
  data: {},
});
onMounted(async () => {
  try {
    const response = await UserService.findUsername(gatchaUsername);
    userInfo.data = response[0];
    console.log(userInfo.data.username);
  } catch (error) {
    console.error("Failed to fetch user: ", error);
  }
});
</script>

<template>
  <div class="mt-8 flex items-center justify-center">
    <div
      class="inline-flex flex-col items-center bg-gray-300 px-8 py-2 rounded-xl"
    >
      <span class="font-bold text-xl">{{ userInfo.data.username }}'s</span>
      <span class="font-bold text-xl">Gatcha</span>
    </div>
  </div>

  <!-- <div class="flex mx-8 my-10 rounded-lg">
    <div class="px-4 flex items-center justify-center">
      <i class="pi pi-map-marker"></i>
    </div>
    <div class="px-4 flex items-center justify-center">
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
  </div> -->
  <div class="flex items-center justify-center m-8">
    <img src="../assets/images/machine.jpeg" alt="" />
  </div>

  <div class="flex items-center justify-center m-8">
    <button class="bg-yellow-400 rounded-xl p-4">
      <i class="pi pi-dollar"></i>
      <p class="inline p-2 text-lg">300</p>
    </button>
  </div>

  <div class="rounded-xl bg-gray-300 h-100 flex justify-center">
    <p class="font-bold m-4">View More</p>
  </div>
</template>
<!-- should probably just create a div that centers everything 
 check this later -->
