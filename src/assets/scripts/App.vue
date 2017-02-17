<template>
    <div id="app">
        <navigation ref="navigation"></navigation>
        <router-link to="/">
            <svg class="logo"><use xlink:href="#logo"></use></svg>
        </router-link>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  name: 'app',

  components: {
    Navigation,
  },

  watch: {
    '$route' () {
      // remove dark mode
      document.body.classList.remove('dark');

      // close nav
      this.$refs['navigation'].open = false;
    }
  },
};
</script>

<style lang="scss">
  @import '../src/assets/styles/config/variables';

  .logo {
    width: 100px;
    height: 100px;
    position: absolute;
    top: $base-spacing-unit;
    left: $base-spacing-unit;
    transition: all $animation-speed $animation;

    .dark & {
      fill: $col-text-light;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity $animation-speed;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
