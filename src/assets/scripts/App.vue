<template>
    <div id="app">
        <navigation></navigation>
        <!-- <router-link to="/">
            <div class="logo">
                <img src="./images/logo.svg">
            </div>
        </router-link> -->
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
      document.body.classList.remove('dark');
    }
  }
};
</script>

<style lang="scss">
  @import '../src/assets/styles/config/variables';

  .fade-enter-active, .fade-leave-active {
    transition: opacity $animation-speed;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
