<template>
  <div class="main">
    <div class="overlay"></div>
    <navigation ref="navigation"></navigation>
    <logo ref="logo"></logo>
    <preloader></preloader>
    <div class="content">
      <nuxt/>
    </div>
    <footer class="footer"></footer>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import Navigation from '~/components/Navigation.vue';
import Preloader from '~/components/Preloader.vue';

export default {
  components: {
    Logo,
    Navigation,
    Preloader,
  },

  // data() {
  //   return {
  //     show: false,
  //   };
  // },

  // mounted() {
  // this.show = true;
  // this.handleLogo();
  // },
};
</script>

<style lang="scss">
html {
  font-family: $sans-serif-font-family;
  font-size: $font-size-base;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  line-height: $line-height-base;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Aleo', serif;
}

a {
  color: $col-text;
  text-decoration: underline;
}

p {
  margin-bottom: $spacing-base;
}
</style>
