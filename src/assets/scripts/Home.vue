<template>
    <div class="page">
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col col--xs-12 col--sm-2 col--md-2 col--lg-2">
                        <div class="avatar" v-on:mouseover="showCaption = true" v-on:mouseleave="showCaption = false">
                            <img :src="'images/avatar.jpg'" alt="Lukas Juhas">
                        </div>
                        <transition name="slide-fade">
                            <div v-if="showCaption" class="avatar-caption">
                                <p>That's me in Venice</p>
                            </div>
                        </transition>
                    </div>
                    <div class="col col--xs-12 col--sm-10 col--md-7 col--lg-7">
                        <article class="large-content">
                            <p>I'm Lukas Juhas and my main purpose on this planet is to enjoy life by&nbsp;<router-link to="/code">writing code</router-link>,&nbsp;<router-link to="/trips">traveling</router-link>, making music, collecting&nbsp;<router-link to="/records">records</router-link>&nbsp;and taking <a href="https://instagram.com/lukasjuhas" target="_blank" rel="noopener">photographs</a>. Currently living and working in London as Full-stack Web Developer at <a href="https://benchmark.co.uk/" target="_blank" rel="noopener">Benchmark</a>.</p>

                            <p>Say hello <a href="mailto:lukas@itsluk.as">lukas@itsluk.as</a>, <a href="https://twitter.com/itslukasjuhas" target="_blank" rel="noopener">@itslukasjuhas</a>.</p>

                            <p>If you are looking for Wordpress plugins I wrote you can visit <a href="https://plugins.itsluk.as/" target="_blank" rel="noopener">dedicated site</a> for these.</p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
        <transition name="fade">
            <section v-if="showLatestTripSection" class="section section--latest-trip">
                <div class="container">
                    <div class="row">
                        <div class="col col--xs-12 col--sm-12 col--md-12 col--lg-12">
                            <h2>Check out latest trip or <router-link to="/trips" class="link">see them all</router-link></h2>
                            <transition name="fade">
                                <div v-if="item" class="trips">
                                    <trip-item class="trip--borderless" :item="item"></trip-item>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </section>
        </transition>
        <transition name="fade">
            <section v-if="photos" class="section section--photo-feed">
                <staggered-fade class="photo-feed">
                    <div v-for="(photo, index) in photos" :key="index" v-bind:data-index="index" class="photo-feed__panel">
                        <img v-lazy="photo.thumb" :alt="photo.caption" :title="photo.caption">
                    </div>
                </staggered-fade>
                <div class="row">
                    <div class="col col--xs-12 col--sm-12 col--md-12 col--lg-12 align-text-center">
                        <a href="https://instagram.com/lukasjuhas" class="see-more" target="_blank" rel="noopener">see more</a>
                    </div>
                </div>
            </section>
        </transition>
    </div>
</template>

<script>
  import store from './store';
  import each from 'lodash/each';
  import flash from './helpers/flash';
  import StaggeredFade from './transitions/StaggeredFade.vue';
  import TripItem from './components/TripItem.vue';

  export default {
    name: 'home',

    components: {
      StaggeredFade,
      TripItem,
    },

    data() {
      return {
        sharedState: store,
        item: null,
        photos: null,
        showCaption: false,
        showLatestTripSection: true,
      }
    },

    mounted() {
      document.documentElement.classList.add('gradient');
    },

    created() {
      this.fetchData();
      this.fetchPhotos();
    },

    methods: {
      fetchData(path = 'trips?limit=1&content=true') {
        this.sharedState.setLoadingAction(true);

        axios.get(path).then((response) => {
          if(response.data.data !== null) {
            each(response.data.data, (item) => {
              this.item = item;
            });
          }

          if(response.data.error) {
            this.showLatestTripSection = false;
          }

          // set next and prev page
          this.nextPage = response.data.paginator.next_page;
          this.prevPage = response.data.paginator.prev_page;

          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {
          this.nextPage = null;
          this.prevPage = null;

          this.showLatestTripSection = false;
          this.sharedState.setLoadingAction(false);
          flash.showError('Sorry, there was problem loading latest journey.');
        });
      },

      fetchPhotos() {
        this.sharedState.setLoadingAction(true);

        axios.get('instagram').then((response) => {
          if(response.data !== null) {
            each(response.data, (photo) => {
              this.photos = photo;
            });
          }

          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {
          this.sharedState.setLoadingAction(false);
          flash.showError('Sorry, there was problem loading instagram photos.');
        });
      },
    }
  };
</script>

<style lang="scss">
  .large-content {
    font-size: 18px;
  }

  .avatar {
    width: 100%;
    height: auto;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: $base-spacing-unit;

    img {
      width: 100%;
      height: auto;
      vertical-align: top;
    }
  }

  .avatar-caption {
    font-style: italic;
    font-size: 12px;
    text-align: center;
  }

  .section--latest-trip {
    min-height: 291px;
    padding: $base-spacing-unit 0;
    background-color: $col-background-dark;

    .trips {
      margin: 0;
    }
  }

  .section--photo-feed {
    margin-top: ($base-spacing-unit * 3);
  }

  .photo-feed {
    column-count: 2;
    column-gap: 0;
    max-width: 1200 + $base-spacing-unit;
    padding: 0 ($base-spacing-unit / 2);
    margin: 0 auto;

    @include resp-max($breakpoint-sm) {
      column-count: 1;
    }
  }

  .photo-feed__panel {
    break-inside: avoid;
    padding: $base-spacing-unit / 2;
  }

  .see-more {
    margin-top: $base-spacing-unit;
    display: inline-block;
  }

</style>
