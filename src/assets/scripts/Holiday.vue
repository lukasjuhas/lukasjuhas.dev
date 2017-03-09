<template>
    <div class="page">
        <transition name="fade">
            <div v-if="item" class="container">
                <h1 class="page__title">{{ item.title }}</h1>
                <div class="page__content">
                    <div class="row">
                        <div class="col col--xs-12 col--sm-12 col--md-7 col--lg-7" v-html="item.content"></div>
                    </div>
                    <div class="row">
                        <div class="col col--xs-12 col--sm-12 col--md-12 col--lg-12">
                            <staggered-fade v-if="photos.length" classes="photos">
                                <div v-for="(photo, index) in photos" class="photo" :class="'photo--' + photo.parity" :data-offset="photo.offset" :key="index" v-bind:data-index="index">
                                    <img class="photo__image" v-lazy="photo.url" :alt="photo.title" :style="'transform: translate(' + (photo.parity === 'even' ? '-' : '' ) + photo.offsetX + 'px, ' + (photo.parity === 'even' ? '-' : '' ) + photo.offsetY + 'px)'" />
                                    <div class="photo__caption">
                                        {{ photo.caption }}
                                        <p v-if="!photo.caption">Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod.</p>
                                    </div>
                                </div>
                            </staggered-fade>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col--xs-12 col--sm-12 col--md-12 col--lg-12 align-text-center">
                            <router-link to="/holidays" class="link link--all-holidays">All holidays</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  import each from 'lodash/each';
  import store from './store';
  import doc from './helpers/doc';
  import StaggeredFade from './transitions/StaggeredFade.vue';


  export default {
    name: 'holiday',

    components: {
      StaggeredFade,
    },

    props: {
      slug: {
        type: String,
        required: true,
        default: null
      }
    },

    data() {
      return {
        sharedState: store,
        item: null,
        photos: [],
      }
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
            photo.parity = ( index & 1 ) ? 'odd' : 'even';

            this.photos.push(photo);
          });

          this.item = response.data.data;
          this.sharedState.setLoadingAction(false);

          doc.updateTitle(this.item.title);
        })
        .catch((error, status) => {
          this.sharedState.setLoadingAction(false);

          if(error.response.status === 404) {
            this.sharedState.state.router.replace('/404');
          }
        });
      },

      random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
    },
  };
</script>

<style lang="scss">
  .photos {
    margin-top: $base-spacing-unit * 3;

    img {
      max-width: 100%;
      height: auto;
    }
  }

  .photo {
    position: relative;
    min-height: 700px;
  }

  .photo__caption {
    width: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
  }

  .photo--odd {
    text-align: right;

    .photo__caption {
      right: inherit;
      left: 0;
    }
  }

  .link--all-holidays {
    margin-top: $base-spacing-unit * 3;
    display: inline-block;
  }
</style>
