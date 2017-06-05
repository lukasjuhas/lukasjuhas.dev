<template>
    <transition name="slide-fade-bottom">
        <div id="app" class="main" v-if="show">
            <div class="overlay"></div>
            <navigation ref="navigation"></navigation>
            <logo ref="logo"></logo>
            <preloader></preloader>
            <flash></flash>
            <div class="content">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
            <transition name="fade">
                <footer class="footer">
                    <div class="row">
                        <div class="col col--xs-12 col--sm-12 col--md-6 col--lg-6">
                            <button v-if="authorised" type="button" name="button" class="button button--primary button--small" @click="logout">Logout</button>
                        </div>
                        <div class="col col--xs-12 col--sm-12 col--md-6 col--lg-6">
                            <div class="copy">&copy; 2009 - {{ year }} Lukas Juhas. All Rights Reserved.</div>
                        </div>
                    </div>
                </footer>
            </transition>
        </div>
    </transition>
</template>

<script>
  import throttle from 'lodash/throttle';
  import store from './store';
  import helpers from './helpers/helpers';
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
        year: new Date().getFullYear(),
      };
    },

    mounted() {
      this.show = true;
      this.handleLogo();
    },

    computed: {
      /**
       * check if user is authorised
       */
      authorised() {
        return this.sharedState.state.token !== false || '';
      },
    },

    components: {
      Logo,
      Navigation,
      Preloader,
      Flash,
    },

    watch: {
      /**
       * watch route changes
       */
      $route(to) {
        helpers.updateTitle(to.name);
        flash.hide();

        // remove light mode
        document.documentElement.classList.remove('light');

        // remove gradient
        document.documentElement.classList.remove('gradient');

        // close nav
        this.$refs.navigation.open = false;

        // handle logo and force show
        this.handleLogo(true);
      },
    },

    methods: {
      /**
       * handle logo on scroll
       * @type boolean
       */
      handleLogo(forceShow = false) {
        // This is important when changing routes to "force" show on logo so if
        // the route is changed, logo appears instead of being hidden as it might
        // have been before changing the route.
        if (forceShow) {
          this.$refs.logo.show = true;
        }

        let lastScrollTop = 0;

        // make sure this runs last
        setTimeout(() => {
          window.addEventListener('scroll', throttle(() => {
            const st = window.pageYOffset || document.documentElement.scrollTop;

            // offset 75px
            if ((st > 75) && st > lastScrollTop) {
              this.$refs.logo.show = false;
            } else {
              this.$refs.logo.show = true;
            }

            lastScrollTop = st;
          }, 300));
        }, 100);
      },

      /**
       * handle logout
       */
      logout() {
        axios.post('logout', { token: this.sharedState.state.token }).then((response) => {
          if (!response.data.error) {
            this.sharedState.clearAuthTokenAction();
            this.sharedState.state.router.go('/');
          }
        });
      },
    },
  };
</script>

<style lang="scss">
  @import './../src/assets/styles/config/variables';

  .page__title {
    margin-bottom: $base-spacing-unit;
    font-size: 28px;
    font-weight: $font-weight-bold;
  }

  .page__content {

  }

  .page__content--serif {
    font-family: $serif-font-family;
    font-weight: $serif-font-weight;
  }

  .section {
    margin-bottom: $base-spacing-unit * 2;
  }

  .footer {
    padding: $base-spacing-unit;
    font-size: 10px;

    .gradient & {
      color: $col-text-light;
    }

    @include resp-max($breakpoint-sm) {
      text-align: center;

      .col:first-of-type {
        margin-bottom: $base-spacing-unit;
      }

      .copy {
        text-align: center;
      }
    }
  }

  .copy {
    text-align: right;
    opacity: .5;
  }

  /**
   * Vue Animations
   */
  // opacity
  .fade-enter-active, .fade-leave-active {
    transition: opacity $animation-speed;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  // opacity
  .fade-slow-enter-active, .fade-slow-leave-active {
    transition: opacity $animation-speed-slow;
  }

  .fade-slow-enter, .fade-slow-leave-active {
    opacity: 0
  }


  // slide fade
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

  // slide fade from bottom
  .slide-fade-bottom-enter-active {
    transition: all $animation-speed-slow ease-in-out;
  }

  .slide-fade-bottom-leave-active {
    transition: all $animation-speed-slow cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-bottom-enter, .slide-fade-bottom-leave-to {
    transform: translateY($base-spacing-unit);
    opacity: 0;
  }

  /*
  * Lazy loading
  */
  img{
    transition: all $animation-speed $animation;

    &[lazy=loading]{
      opacity: 0;
      visibility: hidden;
    }

    &[lazy=loaded]{
      opacity: 1;
      visibility: visible;
    }
  }
</style>
