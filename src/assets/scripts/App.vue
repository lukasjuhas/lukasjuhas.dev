<template>
    <transition name="fade">
        <div id="app" class="main" v-if="show">
            <navigation ref="navigation"></navigation>
            <router-link to="/">
                <svg class="logo"><use xlink:href="#logo"></use></svg>
            </router-link>
            <preloader></preloader>
            <flash></flash>
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
  import doc from './helpers/doc';
  import flash from './helpers/flash';
  import Navigation from './components/Navigation.vue';
  import Preloader from './components/Preloader.vue';
  import Flash from './components/Flash.vue';

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
      Flash,
    },

    watch: {
      '$route' (to, from) {
        doc.updateTitle(to.name);
        flash.hideError();

        // remove dark mode
        document.documentElement.classList.remove('dark');

        // remove gradient
        document.documentElement.classList.remove('gradient');

        // close nav
        this.$refs['navigation'].open = false;
      }
    },
  };
</script>

<style lang="scss">
  @import '../src/assets/styles/config/variables';

  .content {
    padding: ($base-spacing-unit * 5) 0;
  }

  .page__title {
    margin-bottom: $base-spacing-unit;
    font-size: 28px;
    font-weight: 700;
  }

  .section {
    margin-bottom: $base-spacing-unit * 2;
  }

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

  .fade-enter-active, .fade-leave-active {
    transition: opacity $animation-speed;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  .slide-fade-enter-active {
    transition: all $animation-speed ease;
  }

  .slide-fade-leave-active {
    transition: all $animation-speed cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX($base-spacing-unit);
    opacity: 0;
  }
</style>
