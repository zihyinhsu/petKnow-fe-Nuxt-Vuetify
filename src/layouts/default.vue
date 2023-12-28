<script setup lang="ts">
import { alertDataType } from "@/components/AlertComponent.vue";
const route = useRoute();
const showSearch = ref(true);
const alertData = ref<alertDataType>({
  status: undefined,
  content: "",
  visible: false,
});
provide("alertData", alertData);

watch(
  () => route.path !== "/search",
  (isOnSearchPage) => {
    showSearch.value = isOnSearchPage;
  },
  { immediate: true }
);
</script>
<template>
  <div>
    <AlertComponent :alert-data="alertData" />
    <Header v-if="$route.path !== '/login'" :show-search="showSearch" />
    <slot />
    <footer v-if="$route.path !== '/login'">footer</footer>
  </div>
</template>
