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
                                    <img :src="photo.url" :alt="photo.title" :style="'transform: translateX(' + (photo.parity === 'even' ? '-' : '' ) + photo.offset + 'px)'" />
                                </div>
                            </staggered-fade>
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
            photo.offset = this.random(10, 70);
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
    margin-top: $base-spacing-unit * 2;
  }

  .photo {
    text-align: left;
    margin-bottom: $base-spacing-unit;

    img {
      max-width: 100%;
      height: auto;
    }
  }

  .photo--odd {
    text-align: right;
  }
</style>
