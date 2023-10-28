<script lang="ts" setup>
import { useDateFormat, useNow } from "@vueuse/core";

const formatter = ref("YYYY-MM-DD HH:mm:ss");
const formatted = useDateFormat(useNow(), formatter);
</script>

<template>
  <div>Component: Home : {{ formatted }}</div>
</template>

<style scoped></style>
