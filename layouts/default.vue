<template>
  <div class="main" :class="this.$store.getters.theme">
    <app-header />
    <div class="content">
      <nuxt/>
    </div>
    <footer class="footer"></footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import AppHeader from '~/components/Header.vue';

@Component({
  components: {
    AppHeader,
  },
})
export default class Default extends Vue {}
</script>

<style lang="scss">
html {
  font-family: $sans-serif-font-family;
  font-size: $font-size-base;
  font-weight: $font-weight-base;
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
