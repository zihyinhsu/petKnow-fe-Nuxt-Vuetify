<script setup lang="ts">
import petKnowLogoDesktop from "@/assets/logo/petknowLogo-856-393.svg";
</script>
<template>
  <footer id="footer">
    <div class="container">
      <!-- Logo -->
      <nuxt-link to="/">
        <petKnowLogoDesktop alt="logo" class="logo" />
      </nuxt-link>
      <!-- info list -->
      <ul class="info">
        <li><nuxt-link to="/">關於我們</nuxt-link></li>
        <li><nuxt-link to="/">加入我們</nuxt-link></li>
        <li><nuxt-link to="/">隱私權政策</nuxt-link></li>
      </ul>
      <ul class="social">
        <li>
          <nuxt-link to="/"><v-icon icon="mdi-facebook" /></nuxt-link>
        </li>
        <li>
          <nuxt-link to="/"><v-icon icon="mdi-instagram" /></nuxt-link>
        </li>
        <li>
          <nuxt-link to="/"><v-icon icon="mdi-linkedin" /></nuxt-link>
        </li>
        <li>
          <nuxt-link to="/"><v-icon icon="mdi-youtube" /></nuxt-link>
        </li>
      </ul>
      <span class="copyright">
        Copyright © 2023 Company Name All rights reserved.
      </span>
    </div>
  </footer>
</template>
