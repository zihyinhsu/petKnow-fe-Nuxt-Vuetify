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
  <client-only v-if="props.alertData.visible">
    <Transition>
      <div class="alert-position">
        <v-alert
          v-if="props.alertData.visible"
          :type="props.alertData.status"
          :text="props.alertData.content"
        />
      </div>
    </Transition>
  </client-only>
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

.alert-position {
  width: auto;
  position: absolute;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}
</style>
