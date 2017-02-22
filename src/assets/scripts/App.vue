<template>
    <transition name="fade">
        <div id="app" class="main" v-if="show">
            <navigation ref="navigation"></navigation>
            <router-link to="/">
                <svg class="logo"><use xlink:href="#logo"></use></svg>
            </router-link>
            <preloader></preloader>
            <transition name="fade">
                <div class="content">
                    <router-view></router-view>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
  import store from './store';
  import Navigation from './components/Navigation.vue';
  import Preloader from './components/Preloader.vue';

  export default {
    name: 'app',

    data() {
      return {
        sharedState: store,
        show: false,
      }
    },

    mounted() {
      this.show = true;
    },

    components: {
      Navigation,
      Preloader,
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
    position: fixed;
    top: $base-spacing-unit;
    left: $base-spacing-unit;
    transition: all $animation-speed $animation;
    mix-blend-mode: inherit;

    .dark & {
      fill: $col-text-light;
      mix-blend-mode: difference;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity $animation-speed;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
