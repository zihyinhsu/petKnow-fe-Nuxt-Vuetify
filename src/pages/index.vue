<template>
  <div class="wrapper">
    <div class="hero-section">
      <div class="hero-img"></div>
      <div class="scroll-arrow">
        <img src="@/assets/landing-page/scroll-arrow.png" alt="scroll-arrow" />
      </div>
      <div class="container">
        <h2 class="mb-2">
          掌握養寵必備知識 共創寵物相伴<br />
          美好時光
        </h2>
        <SearchButton
          :text="'搜尋'"
          @click="$router.push(`/search/${searchStore.searchKeyword}`)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from "@/stores/search";
import SearchButton from "@/components/SearchButton.vue";
const searchStore = useSearchStore();
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
}

.container {
  max-width: 1328px;
  height: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}
.hero-section {
  width: 100%;
  height: 100%;
  padding: 4rem 0 8rem 0;
  position: relative;

  @media (max-width: 768px) {
    padding: 4rem 0 22rem 0;
  }
  .scroll-arrow {
    position: absolute;
    width: 55px;
    height: 21px;
    left: 38%;
    bottom: 14%;

    @media (max-width: 768px) {
      left: 4%;
      bottom: 18%;
    }
  }
  .hero-img {
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 100%;
    background-image: url("@/assets/landing-page/hero-img-1168-968.png");
    background-position: bottom;
    background-size: cover;

    @media (max-width: 768px) {
      width: 73%;
      background-image: url("@/assets/landing-page/hero-img-269-812.png");
    }
  }

  h2 {
    font-weight: 900;
    font-size: 160px;
    line-height: 192px;

    @media (max-width: 768px) {
      font-weight: 900;
      font-size: 48px;
      line-height: 57.6px;
    }
  }
}
</style>
