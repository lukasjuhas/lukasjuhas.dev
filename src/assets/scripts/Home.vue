<template>
    <div class="page">
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col col--xs-12 col--sm-2 col--md-2 col--lg-2">
                        <div class="avatar" v-on:mouseover="showCaption = true" v-on:mouseleave="showCaption = false">
                            <picture>
                                <source srcset="images/avatar.webp" type="image/webp">
                                <img src="images/avatar.jpg" alt="Lukas Juhas">
                            </picture>
                        </div>
                        <transition name="slide-fade">
                            <div v-if="showCaption" class="avatar-caption">
                                <p>That's me in Venice</p>
                            </div>
                        </transition>
                    </div>
                    <div class="col col--xs-12 col--sm-10 col--md-7 col--lg-7">
                        <article class="large-content">
                            <p>I'm Lukas Juhas and my main purpose on this planet is to enjoy life by&nbsp;<router-link to="/code">writing code</router-link>, traveling and taking <a href="https://instagram.com/lukasjuhas" target="_blank" rel="noopener">photographs</a>. Currently living and working in London as Full-stack Web Developer at <a href="https://www.sn-ap.com/" target="_blank" rel="noopener">Sn-ap</a>.</p>

                            <p>Say hello <a href="mailto:lukas@itsluk.as">lukas@itsluk.as</a>, <a href="https://twitter.com/itslukasjuhas" target="_blank" rel="noopener">@itslukasjuhas</a>.</p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
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
  import each from 'lodash/each';
  import store from './store';
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
        photos: [],
        showCaption: false,
        showLatestTripSection: true,
      };
    },

    mounted() {
      document.documentElement.classList.add('gradient');
    },

    created() {
      // this.fetchData();
      this.fetchPhotos();
    },

    methods: {
      fetchPhotos() {
        this.sharedState.setLoadingAction(true);

        axios.get('recent-photos').then((response) => {
          if (response.statusText === 'OK') {
            each(response.data, (photo) => {
              this.photos.push(photo);
            });
          }

          this.sharedState.setLoadingAction(false);
        });
      },
    },
  };
</script>

<style lang="scss">
  .large-content {
    font-size: 18px;
  }

  .avatar {
    width: 100%;
    height: auto;
    margin-bottom: $base-spacing-unit;
    overflow: hidden;
    border-radius: 50%;

    img {
      width: 100%;
      height: auto;
      vertical-align: top;
    }
  }

  .avatar-caption {
    font-size: 12px;
    font-style: italic;
    text-align: center;
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
    min-height: 200px; // to help lazyload
  }

  .see-more {
    margin-top: $base-spacing-unit;
    display: inline-block;
  }

</style>
