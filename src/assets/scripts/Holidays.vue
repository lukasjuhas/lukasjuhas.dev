<template>
    <div class="page">
        <section class="container">
            <h1 class="page__title">Every Month's Holiday</h1>
            <div class="row">
                <div class="col col--xs-12 col--sm-12 col--md-7 col--lg-7">
                    <p>It all started on my birthday in October 2014 when as a present I got weekend trip to Paris. Since then we travelled almost every month at least once.</p>

                    <p>Although it's not as regular as before, we still would like to carry on with this and even catch up on missed months.</p>

                    <p>You could label this as my travel diary. I tried all kind of ways to store and represent these trips but then, if you can't find the right thing, do it yourself.</p>

                    <p>Check out some of our trips below.</p>
                </div>
            </div>
        </section>
        <transition name="fade">
            <section class="section section--holidays" v-if="items.length">
                <div class="container">
                    <div class="holiday__separator">
                        <h4>Upcoming</h4>
                    </div>
                    <staggered-fade class="holidays" tag="ul">
                        <holiday-item v-for="item in upcoming" :item="item" :key="item.index" :data-index="item.index"></holiday-item>
                    </staggered-fade>
                    <div class="holiday__separator">
                        <h4>Past</h4>
                    </div>
                    <staggered-fade class="holidays" tag="ul">
                        <holiday-item v-for="item in past" :item="item" :key="item.index" :data-index="item.index"></holiday-item>
                    </staggered-fade>
                  </div>
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
  import filter from 'lodash/filter';
  import store from './store';
  import throttle from 'lodash/throttle';
  import each from 'lodash/each';
  import StaggeredFade from './transitions/StaggeredFade.vue';
  import flash from './helpers/flash';
  import HolidayItem from './components/HolidayItem.vue';

  export default {
    name: 'holidays',

    components: {
      StaggeredFade,
      HolidayItem,
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

    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    },

    computed: {
      /**
       * Upcoming trips
       */
      upcoming() {
        return filter(this.items, (o) => { return o.upcoming; });
      },

      /**
       * Past trips
       * @return [type]
       */
      past() {
        return filter(this.items, (o) => { return !o.upcoming; });
      },
    },

    methods: {
      /**
       * Fetch Trips
       * @param {String}
       */
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

      /**
       * Handle scroll
       */
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
  .section--holidays {
    margin-top: $base-spacing-unit * 3;
  }

  .holidays {
    text-align: center;
    overflow: hidden;
    margin: $base-spacing-unit 0 ($base-spacing-unit * 3);
  }

  .holiday {
    width: 100%;
    display: block;
    transition: all $animation-speed $animation;
    background-color: $col-background-dark;
    border-bottom: 1px solid lighten($col-background-dark, 10%);
    position: relative;

    .holiday__title {
      color: lighten($col-background-dark, 10%);
      opacity: 1;
      transition: opacity $animation-speed ease-in-out;
    }

    a {
      padding: ($base-spacing-unit * 2.5) 0;
      text-decoration: none;
      display: block;
      transition: transform $animation-speed ease-in-out, padding $animation-speed-fast linear;
      position: relative;
      overflow: hidden;
      height: 175px;

      .holiday__image {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 2px;
        transform: translateY(-50%);
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        display: block;
        transition: height $animation-speed-fast ease-in-out, filter $animation-speed-fast linear;

        &:before {
          content: ' ';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: $col-background-dark;
          opacity: 0;
          transition: opacity $animation-speed-fast linear;
        }
      }

      .holiday__title,
      .holiday__title--secondary,
      .holiday__date {
        color: $col-text-light;
        position: relative;
        z-index: 50;
        text-shadow: 1px 1px 3px $col-text;
      }

      .holiday__date {
        transition: height $animation-speed-fast linear, opacity $animation-speed-fast linear;
        height: 0;
        margin: 0;
        overflow: hidden;
        opacity: 0;
      }

      .holiday__title--secondary {
        display: none;
      }

      &:hover {
        padding: $base-spacing-unit 0;
        transform: scale(1.02);

        .holiday__date {
          height: 33px;
          opacity: 1;
        }

        .holiday__title {
          display: none;
        }

        .holiday__title--secondary {
          display: block;
        }

        .holiday__image {
          filter: blur(5px);
          height: 175px;

          &:before {
            opacity: .65;
          }
        }
      }
    }

    &:first-child {
      border-top: 1px solid lighten($col-background-dark, 10%);
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
