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
    <header>header</header>
    <slot />
    <footer>footer</footer>
  </div>
</template>
