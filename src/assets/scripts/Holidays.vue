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
        <section v-if="items.length">
            <ul class="holidays">
                <staggered-fade>
                    <li v-for="(item, index) in items" :key="index" v-bind:data-index="index" class="holiday" v-bind:class="{ 'holiday--small': !item.content }">
                        <router-link v-bind:to="'/holidays/' + item.slug" v-if="item.content">
                            <h1 class="holiday__title">{{ item.title }}</h1>
                        </router-link>
                        <h2 v-else class="holiday__title">{{ item.title }}</h2>
                    </li>
                </staggered-fade>
            </ul>
        </section>
        <transition name="fade">
            <section v-if="items.length && showAllLoaded" class="container align-text-center all-loaded">
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

      window.onscroll = throttle((ev) => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
          if(this.nextPage !== null) {
            this.fetchData(this.nextPage);
          } else {
            setTimeout(() => {
              this.showAllLoaded = true;
            }, 1000);
          }
        }
      }, 300);
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
            each(response.data.data, (item) => {
              this.items.push(item);
            });
          }

          // set next and prev page
          this.nextPage = response.data.paginator.next_page;
          this.prevPage = response.data.paginator.prev_page;

          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {
          this.nextPage = null;
          this.prevPage = null;

          this.sharedState.setLoadingAction(false);
          flash.showError('Sorry, there was problem loading trips. 😳');
        });
      },
    },
  };
</script>

<style lang="scss">
  .holidays {
    text-align: center;
  }

  .holiday {
    width: 100%;
    display: block;
    transition: all $animation-speed $animation;
    background-color: $col-background-dark;
    border-bottom: 1px solid lighten($col-background-dark, 10%);

    .holiday__title {
      color: lighten($col-background-dark, 10%);
    }

    a {
      padding: ($base-spacing-unit * 2.5) 0;
      text-decoration: none;
      display: block;

      .holiday__title {
        color: $col-text-light;
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
