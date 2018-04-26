<template>
    <div class="page">
        <section class="container">
            <h1 class="page__title">"Every Month's Holiday"</h1>
            <div class="row">
                <div class="col col--xs-12 col--sm-12 col--md-7 col--lg-7">
                    <p>It all started on my birthday in October 2014 when as a present from my other half I got weekend trip to Paris. Since then we travelled almost every month at least once.</p>

                    <p>Although it's not as regular as before, we still would like to carry on with this and even catch up on missed months.</p>

                    <p>You could label this as my travel diary. I tried all kind of ways to store and represent these trips but then, if you can't find the right thing, do it yourself.</p>

                    <p>Check out some of our trips below.</p>
                </div>
            </div>
        </section>
        <transition name="fade">
            <section class="section section--trips" v-if="items.length">
                <div class="container">
                    <div class="trip__separator">
                        <h4>Upcoming</h4>
                    </div>
                    <staggered-fade class="trips" tag="ul">
                        <trip-item v-for="item in upcoming" :item="item" :key="item.index" :data-index="item.index"></trip-item>
                    </staggered-fade>
                    <div class="trip__separator">
                        <h4>Past</h4>
                    </div>
                    <staggered-fade class="trips" tag="ul">
                        <trip-item v-for="item in past" :item="item" :key="item.index" :data-index="item.index"></trip-item>
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
  /* eslint no-param-reassign: ["error", {
    "props": true, "ignorePropertyModificationsFor": ["item"] }]*/
  // import filter from 'lodash/filter';
  // import each from 'lodash/each';
  // import throttle from 'lodash/throttle';
  import store from './store';
  import StaggeredFade from './transitions/StaggeredFade.vue';
  import flash from './helpers/flash';
  import TripItem from './components/TripItem.vue';

  export default {
    name: 'trips',

    components: {
      StaggeredFade,
      TripItem,
    },

    data() {
      return {
        sharedState: store,
        items: [],
        nextPage: null,
        prevPage: null,
        showAllLoaded: false,
      };
    },

    created() {
      this.fetchData();

      window.addEventListener('scroll', _.throttle(() => {
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
        return _.filter(this.items, o => o.upcoming);
      },

      /**
       * Past trips
       * @return [type]
       */
      past() {
        return _.filter(this.items, o => !o.upcoming);
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
          if (response.data.data !== null) {
            _.each(response.data.data, (item, index) => {
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
        .catch(() => {
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
          if (this.nextPage !== null) {
            this.fetchData(this.nextPage);
          } else {
            setTimeout(() => {
              this.showAllLoaded = true;
              window.removeEventListener('scroll', this.handleScroll);
            }, 1000);
          }
        }
      },
    },
  };
</script>

<style lang="scss">
  .section--trips {
    margin-top: $base-spacing-unit * 3;
  }

  .trips {
    text-align: center;
    overflow: hidden;
    margin: $base-spacing-unit 0 ($base-spacing-unit * 3);
  }

  .all-loaded {
    margin-top: $base-spacing-unit * 2;
  }
</style>
