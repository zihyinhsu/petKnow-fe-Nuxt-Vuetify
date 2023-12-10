<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart.js";
const cartStore = useCartStore();
const router = useRouter();

const props = defineProps<{
  imageUrl: string;
  level?: string;
  title: string;
  teacher: string;
  time?: number;
  price: number;
  courseNum: number;
  discountPrice: number;
  id: string;
  tagNames?: string[];
}>();
const formattedPrice = props.price?.toLocaleString();
const formattedDiscountPrice = props.discountPrice?.toLocaleString();
console.log(props);
</script>
<template>
  <div class="card-course" style="margin-bottom: 40px">
    <div class="card-img cursor-pointer">
      <img
        :src="imageUrl"
        alt="course-img"
        @click="router.push(`/courseIntro/${id}`)"
      />
    </div>
    <div class="flex column" style="width: 100%">
      <div>
        <div class="flex column-sm" style="width: auto">
          <div style="width: 100%">
            <p
              class="title cursor-pointer"
              @click="router.push(`/courseIntro/${id}`)"
            >
              {{ title }}
            </p>
          </div>
          <div class="flex items-md-center column-sm" style="width: auto">
            <p
              v-if="props.discountPrice"
              class="discountPrice"
              style="margin-right: 1rem"
            >
              NT${{ formattedDiscountPrice }}
            </p>
            <p :class="props.discountPrice ? 'price' : 'discountPrice'">
              NT${{ formattedPrice }}
            </p>
            <div style="width: 3rem">
              <button
                class="removeBtn"
                quaternary
                @click="cartStore.deleteCart(String(id))"
              >
                移除
              </button>
            </div>
          </div>
        </div>
        <v-chip
          v-for="(item, index) in props.tagNames"
          :key="index"
          style="margin: 16px 0"
          >{{ item }}</v-chip
        >
      </div>

      <div>
        <hr />
        <div class="flex justify-between">
          <div style="padding: 20px; width: 100%">
            <v-icon icon="mdi-library" /> {{ teacher }}老師
          </div>

          <div style="padding: 20px; width: 100%">
            <v-icon icon="mdi-clock" /> 共計 {{ time }} 小時
          </div>
          <div style="padding: 20px; width: 100%">
            <v-icon icon="mdi-book" /> {{ courseNum }} 堂講座
          </div>
          <div style="padding: 20px; width: 100%">
            <v-icon icon="mdi-pound" /> {{ level }}課程
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  /* TC / Heading03 / Regular */
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 120%;
  font-weight: bold;
  margin-bottom: 16px;
  /* Black/100 */
  color: #020202;
}
.card-course {
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
}
.card-img {
  width: 40%;
  height: 100%;
  border-radius: 0px 0px 80px 0px;
  overflow: hidden;
  margin-right: 20px;
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 16px;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 312px;
    object-position: 50% 50%;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
}
.price {
  text-decoration: line-through;
  height: 38px;
  /* TC / Heading03 / Bold */
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 900;
  font-size: 32px;
  line-height: 120%;
  /* or 38px */
  text-align: right;
  /* Black/100 */
  color: #d3d3d3;

  @media (max-width: 768px) {
    width: 48px;
    height: 29px;
    font-size: 24px;
  }
}
.discountPrice {
  height: 38px;
  /* TC / Heading03 / Bold */
  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 900;
  font-size: 32px;
  line-height: 120%;
  /* or 38px */
  text-align: right;
  /* Black/100 */
  color: #020202;

  @media (max-width: 768px) {
    width: 48px;
    height: 29px;
    font-size: 24px;
    margin-bottom: 16px;
  }
}

.column-sm {
  @media (max-width: 768px) {
    flex-direction: column;
  }
}
.cursor-pointer {
  cursor: pointer;
}
.justify-between {
  justify-content: space-between;
}
.items-center {
  align-items: center;
}
.items-md-center {
  align-items: center;
  @media (max-width: 768px) {
    align-items: start;
  }
}

.column {
  flex-direction: column;
  justify-content: space-between;
}

.removeBtn {
  margin-left: 1rem;
  font-size: 12px;
  width: 3rem;
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
}
</style>
