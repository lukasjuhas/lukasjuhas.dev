<template>
  <div class="main" :class="this.$store.getters.theme">
    <nuxt-link to="/">
      <logo :show="showLogo"/>
    </nuxt-link>
    <div class="content">
      <nuxt/>
    </div>
    <footer class="footer"></footer>
  </div>
</template>
<script lang="ts">
import throttle from 'lodash/throttle';
import { Component, Vue } from 'nuxt-property-decorator';
import Logo from '~/components/Logo.vue';

@Component({
  components: {
    Logo,
  },
})
export default class Default extends Vue {
  showLogo: boolean = true;

  mounted() {
    this.handleLogo();
  }

  handleLogo(forceShow = false) {
    if (forceShow) {
      this.showLogo = true;
    }

    let lastScrollTop = 0;
    window.addEventListener(
      'scroll',
      throttle(() => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        // offset 75px
        if (st > 75 && st > lastScrollTop) {
          this.showLogo = false;
        } else {
          this.showLogo = true;
        }
        lastScrollTop = st;
      }, 300)
    );
  }
}
</script>

<script lang="ts">
import throttle from 'lodash/throttle';
import { Component, Vue } from 'nuxt-property-decorator';
import Logo from '~/components/Logo.vue';

@Component({
  components: {
    Logo,
  },
})
export default class Default extends Vue {
  showLogo: boolean = true;

  mounted() {
    this.handleLogo();
  }

  handleLogo(forceShow = false) {
    if (forceShow) {
      this.showLogo = true;
    }

    let lastScrollTop = 0;
    window.addEventListener(
      'scroll',
      throttle(() => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        // offset 75px
        if (st > 75 && st > lastScrollTop) {
          this.showLogo = false;
        } else {
          this.showLogo = true;
        }
        lastScrollTop = st;
      }, 300)
    );
  }
}
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
