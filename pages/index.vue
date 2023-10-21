<script setup lang="ts">
import { useRafFn } from "@vueuse/core";

const { count } = useAddCount();

useRafFn(() => {
  if (count.value < 16) {
    count.value += 1;
  }
});

const title = ref("2022 iThome 鐵人賽");
</script>

<template>
  <div>
    <Home />
    <v-btn depressed color="info" prepend-icon="mdi-cloud-upload"
      >{{ title }} {{ count }}</v-btn
    >

    <FooterBtn />
  </div>
</template>
