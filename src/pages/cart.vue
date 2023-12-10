<template>
  <div class="wrapper">
    <div class="container">
      <h1 class="wording">以下是你購物車內的商品</h1>
      <h2 class="result">
        購物車共有 {{ cartStore.cartData?.length || 0 }} 堂課程
      </h2>
      <div v-if="cartStore.cartData?.length > 0" class="result-cards">
        <CartComponent
          v-for="item in cartStore.cartData"
          :id="item._id"
          :key="item?._id"
          :image-url="item.cover"
          :level="item.level"
          :title="item.title"
          :teacher="item.instructorName"
          :time="item.time"
          :course-num="Number(item.total)"
          :discount-price="item.discountPrice"
          :price="item.price"
          :tag-names="item.tagNames"
        />
      </div>
      <div v-else style="text-align: center">目前購物車裡沒有課程～</div>
      <div
        v-if="cartStore.cartData?.length > 0"
        class="column flex-end"
        style="margin: 1rem 0"
      >
        <div class="d-flex flex-between" style="min-width: 40%; padding: 1rem">
          <div>小計</div>
          <div>${{ cartStore.totalPrice.toLocaleString() }}</div>
        </div>
        <div
          v-if="cartStore.couponPrice"
          class="d-flex flex-between"
          style="min-width: 40%; padding: 1rem"
        >
          <div>優惠價格</div>
          <div>- ${{ cartStore.couponPrice.toLocaleString() }}</div>
        </div>
        <div class="d-flex flex-between" style="min-width: 40%; padding: 1rem">
          <div>總計</div>
          <div v-if="cartStore.discountedPrice">
            ${{ cartStore.discountedPrice.toLocaleString() }}
          </div>
          <div v-else>${{ cartStore.totalPrice.toLocaleString() }}</div>
        </div>
        <div class="d-flex flex-between coupon" style="padding: 1rem">
          <div>優惠券折抵</div>
          <!-- bvCyXjGL -->
          <div v-if="cartStore.couponValue">
            <tag
              style="margin: 16px 0"
              closable
              @close="cartStore.deleteCoupon"
              >{{ cartStore.couponLabel }}</tag
            >
          </div>
          <input
            v-else
            :value="cartStore.couponValue"
            style="max-width: 250px"
            type="text"
            placeholder="請輸入優惠券碼"
            @update:value="cartStore.addCoupon"
          />
        </div>
        <button
          style="
            background: #ed888c;
            color: #fff;
            padding: 0.5em;
            border-radius: 0.5rem;
            box-shadow: none;
          "
          @click="createOrder"
        >
          下一步
          <v-icon icon="mdi-arrow-right" size="16" color="#fffff">
            <ArrowRightAltSharp />
          </v-icon>
        </button>
      </div>

      <div style="margin: 40px 0">
        <div class="mb-2 flex-between align-items-center">
          <h4 class="sub-title">你可能會喜歡</h4>
        </div>
        <swiper
          :modules="[Autoplay]"
          class="swiper"
          :space-between="20"
          :slides-per-view="1.2"
          :centered-slides="false"
          :breakpoints="{
            '768': {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            '1024': {
              slidesPerView: 3.5,
              spaceBetween: 30,
            },
          }"
        >
          <swiper-slide
            v-for="(course, index) in cartStore.youMightLike"
            :key="index"
            class="slide"
            @click="router.push(`/courseIntro/${course._id}`)"
          >
            <CourseCard-416-451
              :image-url="course.cover"
              :title="course.title"
              :teacher="course.instructorName"
              :price="course.price"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ArrowRightAltSharp } from "@vicons/material";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Autoplay } from "swiper";
import { useRouter } from "vue-router";
import CartComponent from "@/components/CartComponent.vue";
import { useCartStore } from "@/stores/cart";
const router = useRouter();

const cartStore = useCartStore();

onMounted(async () => {
  if (
    localStorage.getItem("accessToken") !== "" &&
    localStorage.getItem("fromVisitorCart") === "true"
  ) {
    localStorage.removeItem("fromVisitorCart");
  }
  await cartStore.getCartData();
});

const createOrder = async () => {
  const order = await cartStore.createOrder();
  console.log("order: ", order);

  router.push("/order");
};
</script>

<style lang="scss" scoped>
input {
  width: 20rem;
  height: 2rem;
  padding: 1rem;
  border: 1px solid green;
  border-radius: 5px;
}

.wrapper {
  width: 100%;
  height: 100%;
}

.container {
  max-width: 1328px;
  height: fit-content;
  margin: 0 auto;
  padding: 1rem;
}

.result {
  padding: 1rem;
}

.result-cards {
  padding: 1rem;
}

.pagination {
  margin-top: 3rem;
  width: 100%;
  height: 100%;
  padding: 3rem;
  display: flex;
  justify-content: center;
}

.sub-title {
  font-weight: 900;
  font-size: 48px;
}
.mb-4 {
  margin-bottom: 4rem;
}

.align-items-center {
  align-items: center;
}
.column {
  flex-direction: column;
}
.full-width {
  width: 100%;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-end {
  display: flex;
  align-items: flex-end;
}
.flex-between {
  display: flex;
  justify-content: space-between;
}
.mb-2 {
  margin-bottom: 2rem;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
<style>
.n-base-select-menu .n-base-select-option .n-base-select-option__check {
  opacity: 0;
}

.coupon {
  width: 40%;
  @media (max-width: 768px) {
    width: 60%;
    margin-left: 0;
  }
}
</style>
