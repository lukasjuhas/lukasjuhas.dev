<template>
    <transition name="fade">
        <router-link to="/" v-show="show">
            <svg class="logo"><use xlink:href="#logo"></use></svg>
        </router-link>
    </transition>
</template>

<script>
  import throttle from 'lodash/throttle';
  
  export default {
    data() {
      return {
        show: true,
      }
    },

    created() {
      let lastScrollTop = 0;

      window.onscroll = throttle((ev) => {
        const st = window.pageYOffset || document.documentElement.scrollTop;

        if ((st > 75) && st > lastScrollTop) {
          this.show = false;
        } else {
          this.show = true;
        }

        lastScrollTop = st;
      }, 300);
    },
  }
</script>

<style lang="scss">
  .logo {
    width: 50px;
    height: 50px;
    position: fixed;
    z-index: 1000;
    top: $base-spacing-unit;
    left: $base-spacing-unit;
    transition: all $animation-speed $animation;
    opacity: 1;

    .dark & {
      fill: $col-text-light;
    }

    .error &,
    .warning &,
    .success & {
      opacity: 0;
    }
  }
</style>
