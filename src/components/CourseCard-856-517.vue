<script setup lang="ts">
const props = defineProps({
  imageUrl: String,
  level: String,
  title: String,
  info: String,
  teacher: String,
  time: Number,
  courseNum: Number,
  price: String,
});
const formatPrice = props.price?.toLocaleString();
console.log(props);
</script>
<template>
  <div class="course-card">
    <div>
      <img :src="imageUrl" alt="course-img" class="card-img" />
    </div>
    <div class="card-content">
      <span>屬於{{ level }}課程</span>
      <p class="time">共計 {{ time }} 小時｜{{ courseNum }} 堂講座</p>
      <h3 class="title">{{ title }}</h3>
      <p class="info">{{ info }}</p>
      <p class="teacher">by {{ teacher }}</p>
      <p class="price">NT${{ formatPrice }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.course-card {
  width: 856px;
  height: 517px;
  border-radius: 0px 0px 0px 80px;
  overflow: hidden;
  display: flex;

  p {
    margin-bottom: 0;
  }

  .card-img {
    width: 517px;
    height: 100%;
    object-fit: cover;
  }

  .card-content {
    padding: 2rem 2.5rem;
    width: 36%;
    height: 100%;

    .time {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 1rem;
    }

    .title {
      font-weight: 900;
      font-size: 32px;
      line-height: 38.4px;
      margin-bottom: 1rem;
    }

    .info,
    .teacher {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 1rem;
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
