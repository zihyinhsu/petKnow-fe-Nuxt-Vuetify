<script setup lang="ts">
const props = defineProps({
  imageUrl: String,
  tag: String,
  title: String,
  info: String,
  time: Number,
});
console.log(props);
</script>
<template>
  <div class="couse-card">
    <div class="card-img">
      <img
        :src="imageUrl"
        alt="course-img"
        style="
          height: 160px;
          width: 100%;
          object-fit: cover;
          object-position: 50% 40%;
        "
      />
    </div>
    <div class="card-content">
      <span>{{ tag }}</span>
      <h3 class="title">{{ title }}</h3>
      <p class="info">{{ info }}</p>
      <p class="time">作業・{{ time }}分鐘</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.couse-card {
  width: 100%;
  min-height: 160px;
  background-color: white;
  overflow: hidden;
  display: flex;

  .card-img {
    width: 50%;
    height: 100%;
    border-radius: 0px 0px 80px 0px;
    overflow: hidden;
  }

  .card-content {
    width: 53%;
    height: 100%;
    padding: 0 1.5rem;

    span {
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 0.75rem;
    }

    .title {
      font-weight: 900;
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 1.5rem;
    }

    .info {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 1.3rem;
    }

    .time {
      font-weight: 700;
      font-size: 14px;
      line-height: 21px;
    }
  }
}
</style>
