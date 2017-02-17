<template>
    <div id="app" class="main">
        <navigation ref="navigation"></navigation>
        <router-link to="/">
            <svg class="logo"><use xlink:href="#logo"></use></svg>
        </router-link>
        <transition name="fade">
            <div class="content">
                <router-view></router-view>
            </div>
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
      document.documentElement.classList.remove('dark');

      // close nav
      this.$refs['navigation'].open = false;
    }
  },
};
</script>

<style lang="scss">
  @import '../src/assets/styles/config/variables';

  .logo {
    width: 50px;
    height: 50px;
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
