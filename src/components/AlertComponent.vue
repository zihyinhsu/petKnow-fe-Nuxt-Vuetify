<script setup lang="ts">
const alertDatas: any = inject("alertData");

export interface alertDataType {
  status: "error" | "success" | "warning" | "info" | undefined;
  content: string;
  visible: boolean;
}
watch(
  () => props.alertData.visible,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        alertDatas.value.visible = false;
      }, 2000);
    }
  }
);
const props = withDefaults(
  defineProps<{
    alertData: alertDataType;
  }>(),
  {
    // 在這裡設定預設值，如果有的話
  }
);
</script>
<template>
  <Transition>
    <div
      v-if="props.alertData.visible"
      style="
        width: 15%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
      "
    >
      <v-alert :type="props.alertData.status" :text="props.alertData.content" />
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
