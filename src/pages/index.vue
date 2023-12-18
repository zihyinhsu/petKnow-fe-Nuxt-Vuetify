<script setup lang="ts">
const alertData: any = inject("alertData");
const { count } = useAddCount();

const title = ref("2022 iThome 鐵人賽");

function showAlert() {
  alertData.value = {
    status: "error",
    content: "測試",
    visible: true,
  };
  console.log("asdf", alertData.value);
}
</script>

<template>
  <div>
    <Home />
    <v-btn
      depressed
      color="info"
      prepend-icon="mdi-cloud-upload"
      @click="showAlert"
      >{{ title }} {{ count }}</v-btn
    >

    <FooterBtn />
  </div>
</template>
