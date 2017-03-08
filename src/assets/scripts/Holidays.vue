<template>
    <div class="page">
        <section class="container">
            <h1 class="page__title">Every Month's Holiday</h1>
            <div class="row">
                <div class="col col--xs-12 col--sm-12 col--md-7 col--lg-7">
                    <p>It all started on my birthday in October 2014 when as a present I got weekend trip to Paris. Since then we travelled almost every month at least once.</p>
                    <p>Although lately it's not as regular as before, we still would like to carry on with this and even catch up on missed months.</p>
                    <p>Check out some of our trips below.</p>
                </div>
            </div>
        </section>
        <transition name="fade">
            <section v-if="items.length">
                <ul class="holidays">
                    <staggered-fade>
                        <li v-for="item in items" :key="item.index" v-bind:data-index="item.index" class="holiday" v-bind:class="{ 'holiday--small': !item.content }">
                            <router-link v-bind:to="'/holidays/' + item.slug" v-if="item.content">
                                <div class="holiday__image-wrapper">
                                    <img v-if="item.feature" :src="item.feature" :alt="item.title">
                                </div>
                                <h1 class="holiday__title">{{ item.title }}</h1>
                                <div class="holiday__overlay"></div>
                            </router-link>
                            <h2 v-else class="holiday__title">{{ item.title }}</h2>
                        </li>
                    </staggered-fade>
                </ul>
            </section>
        </transition>
        <transition name="fade">
            <section v-if="showAllLoaded" class="container align-text-center all-loaded">
                <p><em>That's it!</em></p>
            </section>
        </transition>
    </div>
</template>

<script>
  import store from './store';
  import throttle from 'lodash/throttle';
  import each from 'lodash/each';
  import StaggeredFade from './transitions/StaggeredFade.vue';
  import flash from './helpers/flash';

  export default {
    name: 'holidays',

    components: {
      StaggeredFade,
    },

    data() {
      return {
        sharedState: store,
        items: [],
        nextPage: null,
        prevPage: null,
        showAllLoaded: false,
      }
    },

    created() {
      this.fetchData();

      window.addEventListener('scroll', throttle(() => {
        this.handleScroll();
      }, 300));
    },

    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    },

    mounted() {
      // enable dark mode on this page
      document.documentElement.className = 'dark';
    },

    methods: {
      fetchData(path = 'trips') {
        this.sharedState.setLoadingAction(true);

        axios.get(path).then((response) => {
          if(response.data.data !== null) {
            each(response.data.data, (item, index) => {
              item.index = index;
              this.items.push(item);
            });
          }

          // set next and prev page
          this.nextPage = response.data.paginator.next_page;
          this.prevPage = response.data.paginator.prev_page;

          // trigger handle scroll in case there is no scroll bar on the page
          // due to short content
          this.handleScroll();

          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {
          this.nextPage = null;
          this.prevPage = null;

          this.sharedState.setLoadingAction(false);
          flash.showError('Sorry, there was problem loading trips. 😳');
        });
      },

      handleScroll() {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
          if(this.nextPage !== null) {
            this.fetchData(this.nextPage);
          } else {
            setTimeout(() => {
              this.showAllLoaded = true;
              window.removeEventListener('scroll', this.handleScroll);
            }, 1000);
          }
        }
      }
    },
  };
</script>

<style lang="scss">
  .holidays {
    text-align: center;
    overflow: hidden;
  }

  .holiday {
    width: 100%;
    display: block;
    transition: all $animation-speed $animation;
    background-color: $col-background-dark;
    border-bottom: 1px solid lighten($col-background-dark, 10%);
    background-size: cover;
    background-position: center;
    position: relative;

    .holiday__overlay {
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      background-color: $col-background-dark;
      opacity: .25;
      transition: opacity $animation-speed ease-in-out;
    }

    .holiday__title {
      color: lighten($col-background-dark, 10%);
      opacity: 1;
      transition: opacity $animation-speed ease-in-out;
    }

    a {
      padding: ($base-spacing-unit * 2.5) 0;
      text-decoration: none;
      display: block;
      transition: transform $animation-speed ease-in-out;
      position: relative;
      overflow: hidden;

      .holiday__image-wrapper {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        overflow: hidden;
      }

      img {
        width: 100%;
        max-width: 100%;
        height: auto;
        transition: all $animation-speed linear;
        z-index: 25;
      }

      .holiday__title {
        color: $col-text-light;
        position: relative;
        z-index: 50;
      }

      &:hover {
        transform: scale(1.02);

        img {
          transform: scale(1.1);
          transition: all 8000ms linear;
        }

        .holiday__title,
        .holiday__overlay {
          opacity: 0;
        }
      }
    }
  }

  .holiday--small {
    padding: ($base-spacing-unit / 2) 0;
  }

  .holiday__title {
    margin: 0;
  }

  .all-loaded {
    margin-top: $base-spacing-unit * 2;
  }
</style>
