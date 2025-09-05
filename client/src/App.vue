<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <section class="md:mx-150">
    <Navbar />
    <RouterView />
  </section>
</template>
