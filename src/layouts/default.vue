<script setup lang="ts">
import { alertDataType } from "@/components/AlertComponent.vue";

const alertData = ref<alertDataType>({
  status: undefined,
  content: "",
  visible: false,
});
provide("alertData", alertData);
</script>
<template>
  <div>
    <AlertComponent :alert-data="alertData" />
    <header v-if="$route.path !== '/login'">header</header>
    <slot />
    <footer v-if="$route.path !== '/login'">footer</footer>
  </div>
</template>
