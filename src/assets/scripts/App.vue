<template>
    <transition name="fade">
        <div id="app" class="main" v-if="show">
            <navigation ref="navigation"></navigation>
            <logo ref="logo"></logo>
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
  import throttle from 'lodash/throttle';
  import store from './store';
  import doc from './helpers/doc';
  import flash from './helpers/flash';
  import Logo from './components/Logo.vue';
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
      this.handleLogo();
    },

    components: {
      Logo,
      Navigation,
      Preloader,
      Flash,
    },

    watch: {
      '$route' (to, from) {
        doc.updateTitle(to.name);
        flash.hide();

        // remove dark mode
        document.documentElement.classList.remove('dark');

        // remove gradient
        document.documentElement.classList.remove('gradient');

        // close nav
        this.$refs['navigation'].open = false;

        // handle logo and force show
        this.handleLogo(true);
      }
    },

    methods: {
      handleLogo(forceShow = false) {
        // This is important when changing routes to "force" show on logo so if
        // the route is changed, logo appears instead of being hidden as it might
        // have been before changing the route.
        if(forceShow) {
          this.$refs['logo'].show = true;
        }

        let lastScrollTop = 0;

        // make sure this runs last
        setTimeout(() => {
          window.addEventListener('scroll', throttle(() => {
            const st = window.pageYOffset || document.documentElement.scrollTop;

            // offset 75px
            if ((st > 75) && st > lastScrollTop) {
              this.$refs['logo'].show = false;
            } else {
              this.$refs['logo'].show = true;
            }

            lastScrollTop = st;
          }, 300));
        }, 100);
      },
    }
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
    font-weight: $font-weight-bold;
  }

  .section {
    margin-bottom: $base-spacing-unit * 2;
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
