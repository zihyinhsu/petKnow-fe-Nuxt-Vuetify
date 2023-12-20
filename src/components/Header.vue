<script setup lang="ts">
import petKnowLogoDesktop from "@/assets/logo/petknowLogo-140-64.svg";
defineProps<{
  showSearch: boolean;
}>();
const showSubMenu = ref(false);
const router = useRouter();
const searchText = ref("");
const search = () => {
  if (searchText.value.trim() !== "") {
    router.push(`/search?q=${encodeURIComponent(searchText.value)}`);
  }
};
const toggleSubMenu = (showMenu: boolean) => {
  showSubMenu.value = !showMenu;
  return showSubMenu.value;
};
</script>

<template>
  <nav id="navbar">
    <div class="container">
      <!-- Logo -->
      <nuxt-link to="/">
        <petKnowLogoDesktop alt="logo" class="logo" />
      </nuxt-link>

      <!-- Search box -->
      <div v-if="showSearch" class="lg-show search-box">
        <v-text-field
          v-model="searchText"
          label="搜尋"
          variant="solo-filled"
          prepend-inner-icon="mdi-magnify"
          hide-details
          flat
          @keyup.enter="search"
        >
        </v-text-field>
      </div>

      <!-- nav items -->
      <div class="lg-show nav-items">
        <nuxt-link to="/mycourse">我開的課</nuxt-link>
        <nuxt-link to="/myclass">我的課堂</nuxt-link>
        <v-btn to="/cart" icon="mdi-cart" variant="plain"></v-btn>
        <v-btn
          to="/becoming-teacher"
          append-icon="mdi-arrow-right-thin"
          flat
          class="btn lg-btn"
        >
          成為講師
        </v-btn>
      </div>

      <!-- mobile nav items -->
      <div class="sm-show">
        <div class="nav-items" :class="{ 'sub-nav-open': showSubMenu }">
          <v-btn to="/cart" icon="mdi-cart" variant="plain"></v-btn>
          <v-btn
            icon="mdi-menu"
            variant="plain"
            @click="toggleSubMenu(showSubMenu)"
          ></v-btn>
        </div>

        <!-- mobile sub nav items -->
        <div
          class="sm-show nav-items sub-nav-items"
          :class="{ 'sub-nav-open': showSubMenu }"
        >
          <nuxt-link to="/profile">個人資料</nuxt-link>
          <nuxt-link to="/myclass">我的課堂</nuxt-link>
          <nuxt-link to="/mycourse">我開的課</nuxt-link>
          <nuxt-link to="/mycourse">購買記錄</nuxt-link>
          <nuxt-link to="/becoming-teacher" class="btn"> 成為講師 </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>
