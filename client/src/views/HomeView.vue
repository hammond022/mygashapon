<script setup>
import { ref } from "vue";
import UserService from "@/api/UserService";

const inputUserId = ref("");

const userInfo = ref([]);

async function findUserId() {
  if (!inputUserId.value) return;
  try {
    userInfo.value = await UserService.getUser(inputUserId.value);
    console.log(userInfo.value);
  } catch (error) {
    console.error("Failed to fetch user: ", error);
  }
}
</script>

<template>
  <h1>HOME</h1>
  <div>
    <label for="find-userId">Enter User ID HERE</label>
    <input
      type="text"
      id="find-userId"
      v-model="inputUserId"
      placeholder="Enter user ID"
    />
    <button v-on:click="findUserId">GET</button>
  </div>

  <div class="userInfo"></div>
</template>
