<script setup>
// import { RouterLink, useRoute } from "vue-router";
import { onMounted, ref, defineProps } from "vue";

// import { RouterLink, useRoute } from "vue-router";

const props = defineProps({ gatchaOwnerUsername: String });

const gatchaOwner = ref(props.gatchaOwnerUsername);
</script>

<template>
  <h1>test</h1>
  <div class="bg-gray-300">
    <p>{{ gatchaOwner }}</p>
  </div>
</template>
