<script setup lang="ts">
const props = defineProps({
  imageUrl: String,
  level: String,
  title: String,
  info: String,
  teacher: String,
  time: Number,
  courseNum: Number,
  price: Number,
});
const formatPrice = props.price?.toLocaleString();
console.log(props);
</script>
<template>
  <div class="couse-card">
    <div class="card-img">
      <img :src="imageUrl" alt="course-img" />
    </div>
    <div class="card-content">
      <span>屬於{{ level }}初階課程</span>
      <p class="time">共計 {{ time }} 小時｜{{ courseNum }} 堂講座</p>
      <h3 class="title">{{ title }}</h3>
      <p class="info">{{ info }}</p>
      <p class="teacher">by {{ teacher }}</p>
      <p class="price">NT${{ formatPrice }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.couse-card {
  width: 351px;
  height: 691px;

  .card-img {
    width: 100%;
    height: 50%;
    border-radius: 80px 0px 0px 0px;
    overflow: hidden;
  }

  .card-content {
    width: 100%;
    height: 50%;
    padding: 1.5rem;

    span {
      font-weight: 700;
      font-size: 14px;
      line-height: 21px;
    }

    .time {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 0.75rem;
    }

    .title {
      font-weight: 900;
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 0.75rem;
    }

    .info,
    .teacher {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 0.75rem;
    }

    .price {
      font-weight: 900;
      font-size: 32px;
      line-height: 38.4px;
      color: #ed888c;
    }
  }
}
</style>
