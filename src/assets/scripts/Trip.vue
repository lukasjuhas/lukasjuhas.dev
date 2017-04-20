<template>
    <div class="page">
        <transition name="fade">
            <div class="trip-container">
                <div v-if="item" class="container">
                    <h1 class="page__title">{{ item.title }}</h1>
                    <div class="page__content page__content--serif">
                        <div class="row">
                            <div class="col col--xs-12 col--sm-12 col--md-7 col--lg-7" v-html="item.content"></div>
                        </div>
                        <div class="row">
                            <div class="col col--xs-12 col--sm-12 col--md-12 col--lg-12">
                                <staggered-fade v-if="photos.length" class="photos">
                                    <div v-for="(photo, index) in photos" class="photo" :class="'photo--' + photo.parity + ' photo--' + photo.orientation" :data-offset="photo.offset" :key="index" v-bind:data-index="index">
                                        <div class="photo__image-container" :style="'flex: 0 0 ' + photo.width + 'px;width: ' + photo.width + 'px; height: ' + photo.height + 'px; z-index: ' + (photos.length - index) + '; transform: translate(' + (photo.parity === 'even' ? '-' : '' ) + photo.offsetX + 'px, ' + (photo.parity === 'even' ? '-' : '' ) + photo.offsetY + 'px)'">
                                            <div class="photo__info">
                                                <div class="photo__info__content">
                                                    <ul class="list list--photo-info">
                                                        <li v-if="photo.data.Make && photo.data.Model" title="Camera">
                                                            <svg class="photo__info__icon"><use xlink:href="#camera"></use></svg> {{ photo.data.Make }} {{ photo.data.Model }}
                                                        </li>
                                                        <li v-if="photo.data.ExposureTime" title="Exposure">
                                                            <svg class="photo__info__icon"><use xlink:href="#exposure"></use></svg> {{ photo.data.ExposureTime }}
                                                        </li>
                                                        <li v-if="photo.data.FNumber" title="Apreture">
                                                            <svg class="photo__info__icon"><use xlink:href="#fnumber"></use></svg> 𝑓/{{ photo.data.FNumber }}
                                                        </li>
                                                        <li v-if="photo.data.FocalLength" title="Focal Length">
                                                            <svg class="photo__info__icon"><use xlink:href="#lens"></use></svg> {{ photo.data.FocalLength }}
                                                        </li>
                                                        <li v-if="photo.data.ISOSpeedRatings" title="ISO">
                                                            <svg class="photo__info__icon"><use xlink:href="#iso"></use></svg> {{ photo.data.ISOSpeedRatings }}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <img class="photo__image" v-lazy="photo.url" :alt="photo.title" />
                                        </div>
                                        <div class="photo__caption" :style="'max-width:' + photo.width + 'px; transform: translate(' + (photo.parity === 'even' ? '-' : '' ) + (photo.offsetX - baseSpacingUnit) + 'px, ' + (photo.parity === 'even' ? '-' : '' ) + (photo.offsetY + baseSpacingUnit) + 'px)'" v-html="photo.caption"></div>
                                    </div>
                                </staggered-fade>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col--xs-12 col--sm-12 col--md-12 col--lg-12 align-text-center">
                                <router-link to="/trips" class="link link--all-trips">All trips</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  /* eslint no-param-reassign: ["error", {
    "props": true, "ignorePropertyModificationsFor": ["photo"] }]*/
  import each from 'lodash/each';
  import store from './store';
  import helpers from './helpers/helpers';
  import StaggeredFade from './transitions/StaggeredFade.vue';


  export default {
    name: 'trip',

    components: {
      StaggeredFade,
    },

    props: {
      slug: {
        type: String,
        required: true,
        default: null,
      },
    },

    data() {
      return {
        sharedState: store,
        item: null,
        baseSpacingUnit: 26,
        photos: [],
      };
    },

    mounted() {
      document.documentElement.classList.add('light');
    },

    created() {
      this.fetchData();
    },

    methods: {
      fetchData() {
        this.sharedState.setLoadingAction(true);

        axios.get(`trips/${this.slug}`).then((response) => {
          each(response.data.data.photos, (photo, index) => {
            photo.offsetX = this.random(10, 75);
            photo.offsetY = this.random(10, 50);
            photo.parity = (index && 1) ? 'odd' : 'even';

            this.photos.push(photo);
          });

          this.item = response.data.data;
          this.sharedState.setLoadingAction(false);

          helpers.updateTitle(this.item.title);
        })
        .catch((error) => {
          this.sharedState.setLoadingAction(false);

          if (error.response.status === 404) {
            this.sharedState.state.router.replace('/404');
          }
        });
      },

      random(min, max) {
        let random = max - min;
        random += 1;
        random += min;
        return Math.floor(Math.random() * random);
      },
    },
  };
</script>

<style lang="scss">
  @mixin responsive-photo {
    display: block;
    margin-bottom: $base-spacing-unit;
    @include clearfix();

    .photo__image-container {
      // not the best, but sometimes we have to go easier route.
      transform: translate(0, 0) !important;
      height: auto !important;
      margin-bottom: $base-spacing-unit;
    }

    .photo__caption {
      // not the best, but sometimes we have to go easier route.
      transform: translate(0, 0) !important;
      display: inline-block;
    }
  }

  .trip-container {
    width: $grid-max-width + 150; // grid + offsetX range for photo
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
  .photos {
    margin-top: $base-spacing-unit * 3;

    img {
      max-width: 100%;
      height: auto;
    }
  }

  .photo {
    position: relative;
    display: flex;
  }

  .photo__caption {
    align-self: center;
    font-family: $serif-font-family;
    font-weight: $serif-font-weight;
  }

  .photo--odd {
    flex-direction: row-reverse;
    text-align: right;

    .photo__caption {
      right: inherit;
      left: 0;
    }
  }

  .photo--landscape {
    @include resp-max($breakpoint-lg) {
      @include responsive-photo();
    }
  }

  .photo--square {
    @include resp-max($breakpoint-md) {
      @include responsive-photo();
    }
  }

  .photo--portrait {
    @include resp-max($breakpoint-sm) {
      @include responsive-photo();
    }
  }

  .photo__image-container {
    position: relative;
    display: inline-block;
    background: $col-background-dark;
    background: linear-gradient(135deg, $col-background-dark 0%, $col-brand 100%);
    z-index: 20;
    max-width: 100%;

    &:hover {
      .photo__info {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .photo__info {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    display: flex;
    right: 0;
    left: 0;
    height: 25%;
    bottom: 0;
    z-index: 25;
    font-size: 14px;
    color: $col-text-light;
    background: linear-gradient(0deg, $col-brand 15%, transparent 100%);
    transition: all $animation-speed linear;

    .photo__info__content {
      align-self: flex-end;
      padding: ($base-spacing-unit / 2) 0;
    }
  }

  .photo__info__icon {
    fill: $col-text-light;
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
  }

  .list--photo-info {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;
      margin: 0 ($base-spacing-unit / 2);
      line-height: 20px;
    }
  }

  .link {
    &.link--all-trips {
      margin-top: $base-spacing-unit * 5;
      display: inline-block;
    }
  }
</style>
