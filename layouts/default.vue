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
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
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
</style>
