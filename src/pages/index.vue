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
        <!-- <SearchButton
          :text="'搜尋'"
          @click="$router.push(`/search/${searchStore.searchKeyword}`)"
        /> -->
      </div>
    </div>
    <div v-if="isLogin" class="user-recommend-section">
      <div class="container">
        <div class="just-for-you-section">
          <h3 class="en-title mb-2 d-flex align-items-center">JUST FOR YOU</h3>
          <p class="mb-4">{{ user.nickName }}，開始學習</p>
          <swiper
            class="swiper"
            :space-between="20"
            :slides-per-view="1.2"
            :centered-slides="false"
            :breakpoints="{
              '768': {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              '1024': {
                slidesPerView: 3.5,
                spaceBetween: 30,
              },
            }"
          >
            <swiper-slide
              v-for="(item, index) in learningList"
              :key="index"
              class="slide"
              style="cursor: pointer"
              @click="router.push(`/courseIntro/${item._id}`)"
            >
              <CourseCard-416-160
                :image-url="item.imageUrl"
                :tag="item.tag"
                :title="item.title"
                :info="item.info"
                :time="item.time"
                :is-buy="item.isBuy"
              />
            </swiper-slide>
          </swiper>
        </div>
        <div class="next-step-section-pc">
          <h3 class="en-title mb-2 d-flex align-items-center">NEXT STEP</h3>
          <p class="cn-title mb-9">為您挑選</p>
          <SearchButton
            :text="'立即上課'"
            @click="router.push('/courseIntro/6493d9c4127ca634f0eeb6f7')"
          />

          <div class="course-card-section">
            <CourseCard-856-517
              :image-url="'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'"
              :level="'初階'"
              :title="'犬種的選擇與飼養準備'"
              :info="'一門旨在幫助有意養狗的人們瞭解如何選擇適合自己和家庭的犬種，並準備迎接新成員的課程。這個課程將提供有關不同犬種的特點、飼養要求和必備準備工作的相關知識和技巧。'"
              :teacher="'葉芳馨'"
              :time="16"
              :course-num="52"
              :price="'6,736'"
            />
          </div>
        </div>
        <div class="next-step-section-phone">
          <h3 class="en-title mb-2 d-flex align-items-center">NEXT STEP</h3>
          <p class="cn-title position-absolute z-index-top">為您挑選</p>
          <div class="course-card-section flex-center mb-2">
            <CourseCard-351-697
              :image-url="courseCardImg"
              :level="'初階'"
              :title="'寵物攝影達人：捕捉寵物最佳畫面與構圖技巧'"
              :info="'學會寵物攝影的專業技巧，捕捉最佳畫面與構圖技巧，讓你的寵物照片更加生動、有趣與吸睛。'"
              :teacher="'陳曉明'"
              :time="16"
              :course-num="52"
              :price="1600"
            />
          </div>
          <div class="flex-center">
            <button
              class="search-btn-phone"
              @click="router.push('/courseIntro/6493d9c4127ca634f0eeb6f7')"
            >
              <p>立即上課</p>
              <v-icon class="arrow-icon" size="32" color="#000000">
                <ArrowRightAltSharp />
              </v-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useSearchStore } from "@/stores/search";
// import SearchButton from "@/components/SearchButton.vue";
// const searchStore = useSearchStore();

import { useRouter } from "vue-router";
import { ArrowRightAltSharp } from "@vicons/material";
// import { useUserStore } from "@/stores/user";
import courseCardImg from "@/assets/landing-page/course-card-img.png";
// const userStore = useUserStore();
const isLogin = ref(true);
const router = useRouter();
// const accessToken = ref<string | null>("");
const user = ref<{
  nickName: string;
}>({ nickName: "親愛的" });

// async function getUser() {
//   if (!accessToken.value) {
//     console.log("no token");
//     return;
//   }
//   const userData = await userStore.getUserData();
//   user.value.nickName = userData.nickname || "親愛的";
// }

// onMounted(() => {
//   // console.log("mounted process.client", process.client);
//   accessToken = ref<string | null>(localStorage.getItem("accessToken"));
//   // console.log("accessToken.value: ", accessToken.value);
//   // getUser();
//   if (accessToken.value) isLogin.value = true;
//   // isLogin.value = true; // workaround
// });

// 開始學習（寫死）
const learningList = ref([
  {
    imageUrl:
      "https://images.unsplash.com/photo-1532971731140-1d7cccc06c3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tag: "寵物行為問題解決指南",
    info: "1.觀察行為模式",
    time: 8,
    title: "第一節：問題行為評估",
    _id: "6493d9c4127ca634f0eebac9",
    isBuy: true,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1491485880348-85d48a9e5312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    tag: "寵物洗澡技巧與注意事項",
    info: "1.選擇洗澡地點",
    time: 15,
    title: "第一章：準備工作",
    _id: "6493d9c4127ca634f0eebaa6",
    isBuy: true,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1598134493179-51332e56807f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tag: "狗狗解悶遊戲指南",
    info: "1.狗狗解悶遊戲對健康的影響",
    time: 13,
    title: "第一章：遊戲的重要性",
    _id: "6493d9c2127ca634f0eeafb6",
    isBuy: true,
  },
]);
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
.user-recommend-section {
  width: 100%;
  height: 100%;
  padding: 4rem 0;
  .just-for-you-section {
    padding-bottom: 8rem;
    p {
      font-weight: 900;
      font-size: 48px;
      line-height: 57.6px;
    }
  }
  .next-step-section-pc {
    @media (max-width: 768px) {
      display: none;
    }
    .course-card-section {
      position: absolute;
      top: 0;
      right: 0;
      z-index: -2;
    }
  }
  .next-step-section-phone {
    display: none;
    @media (max-width: 768px) {
      display: block;
      .search-btn-phone {
        width: 269px;
        padding: 40.5px 0;
        display: flex;
        justify-content: center;
        border: 4px solid #020202;
        border-radius: 999px;
        background-color: transparent;

        p {
          font-weight: 900;
          font-size: 24px;
          line-height: 28.8px;
          margin-right: 1rem;
        }
      }
    }
  }
}

.course-list-section {
  padding: 8rem 0;
  .arrow-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    margin-left: 20px;
    border: 4px solid #020202;
    border-radius: 50%;

    @media (max-width: 768px) {
      width: 48px;
      height: 48px;
      margin-left: 143px;
    }
    @media (hover: hover) {
      &:hover,
      &:hover svg {
        border-color: #ed888c;
        color: #ed888c;
        cursor: pointer;
      }
    }
  }
  .show-more-btn {
    color: #020202;
    font-weight: 900;
    display: flex;
    align-items: center;
    i {
      margin-left: 8px;
    }
    @media (hover: hover) {
      &:hover,
      &:hover svg {
        color: #ed888c;
        cursor: pointer;
      }
    }
  }
}
.carousel-section {
  padding-top: 8rem;
  padding-bottom: 0;
  .carousel-img {
    width: 100%;
    height: 640px;
    object-fit: contain;
  }
}

.faq-section {
  padding: 8rem 0;
}

.topics-section {
  background-color: #f8f8f8;
  padding: 8rem 2rem;
  @media (max-width: 768px) {
    padding: 8rem 2rem;
  }
  .topic-scrollbar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 100%;

    .topic-button {
      width: 210px;
      height: 10%;
      padding: 40px 20px;
      border: 4px solid #020202;
      border-radius: 999px;
      background-color: transparent;
      margin-right: 5%;
      margin-bottom: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-weight: 900;
        font-size: 24px;
        line-height: 120%;
      }

      @media (max-width: 768px) {
        width: 192px;
        height: 80px;
        padding: 28px 0;
      }
    }
  }
}

:deep() {
  .en-title {
    font-weight: 900;
    font-size: 32px;
    line-height: 38.4px;

    &:before {
      content: "";
      display: inline-block;
      width: 16px;
      height: 16px;
      background: #ed888c;
      margin-right: 24px;
    }

    @media (max-width: 768px) {
      font-weight: 900;
      font-size: 20px;
      line-height: 24px;
    }
  }

  .cn-title {
    font-weight: 900;
    font-size: 120px;
    line-height: 144px;

    @media (max-width: 768px) {
      font-weight: 900;
      font-size: 48px;
      line-height: 57.6px;
    }
  }

  .sub-title {
    font-weight: 900;
    font-size: 48px;
  }
  .mb-4 {
    margin-bottom: 4rem;
  }

  .mb-2 {
    margin-bottom: 2rem;
  }

  .mb-9 {
    margin-bottom: 9rem;
  }

  .position-absolute {
    position: absolute;
  }

  .z-index-top {
    z-index: 3;
  }

  .d-flex {
    display: flex;
  }

  .align-items-center {
    align-items: center;
  }
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex-between {
    display: flex;
    justify-content: space-between;
  }
}
</style>
