<template>
    <div class="page">
        <div class="container">
            <h1 class="page__title">Records</h1>
            <transition name="fade">
                <div v-if="items.length" class="record-feed">
                    <staggered-fade classes="row">
                        <div v-for="item in items" :key="item.index" v-bind:data-index="item.index" class="record-wrapper col col--xs-4 col--sm-3 col--md-2 col--lg-2">
                            <div class="record">
                                <div @click="fetchRelease(item.release_id)" class="record__artwork">
                                    <img v-if="item.thumb" v-lazy="item.thumb" :alt="item.title">
                                </div>
                                <h3 class="record__title">{{ item.artist }} - {{ item.title }}</h3>
                            </div>
                        </div>
                    </staggered-fade>
                </div>
            </transition>
            <transition name="fade">
                <section v-if="showAllLoaded" class="container align-text-center all-loaded">
                    <p><em>That's it!</em></p>
                </section>
            </transition>
        </div>
        <modal ref="release" v-cloak class="modal--release">
            <h1 slot="header">{{ release ? release.title : 'Release' }}</h1>
            <div v-if="release" slot="body">
                <div class="record">
                    <div class="row">
                        <div class="col col--xs-12 col--sm-12 col--md-4 col--lg-4">
                            <div class="record__artwork">
                                <img v-if="release.image" v-lazy="release.image" :alt="release.title">
                            </div>
                        </div>
                        <div class="col col--xs-12 col--sm-12 col--md-8 col--lg-8">
                            <div class="container">
                                <ol class="list">
                                  <li v-for="track in release.tracklist">{{ track }}</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
  import store from './store';
  import throttle from 'lodash/throttle';
  import each from 'lodash/each';
  import StaggeredFade from './transitions/StaggeredFade.vue';
  import flash from './helpers/flash';
  import Modal from './components/Modal.vue';

  export default {
    name: 'records',

    components: {
      StaggeredFade,
      Modal,
    },

    data() {
      return {
        sharedState: store,
        items: [],
        nextPage: null,
        prevPage: null,
        showAllLoaded: false,
        release: null,
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

    methods: {
      fetchData(path = 'records') {
        flash.hide();
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

          flash.showError('Sorry, there was problem loading the records. 😳');
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
      },

      fetchRelease(releaseId) {
        flash.hide();
        this.sharedState.setLoadingAction(true);

        axios.get(`records/${releaseId}`).then((response) => {
          if(response.data.data !== null) {
            this.release = response.data.data;
            this.modal('release');
          }

          console.log(this.release);

          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {

          this.sharedState.setLoadingAction(false);

          flash.showError('Sorry, there are no details about this record.', true);
        });
      },

      modal(ref) {
        this.$refs[ref].toggle = true;
      },

      closeModal(ref) {
        this.release = null;
        this.$refs[ref].toggle = false;
      },
    },
  };
</script>

<style lang="scss">
  .record {
    margin-bottom: $base-spacing-unit;
  }

  .record__artwork {
    cursor: pointer;
    width: 100%;
    padding-bottom: 100%;
    background: lighten($col-background-dark, 10%);
    margin-bottom: $base-spacing-unit / 4;
    position: relative;
    max-width: 300px;
    max-height: 300px;

    &:before {
      content: '';
      width: 75%;
      height: 75%;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      border: 2px solid $col-background-dark;
      transform: translate(-50%, -50%);
    }

    &:after {
      content: '';
      width: 20%;
      height: 20%;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: $col-background-dark;
      transform: translate(-50%, -50%);
    }

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 100%;
      height: auto;
      z-index: 5;
    }
  }

  .record__title {
    font-size: 14px;
  }

  .modal--release {
    .modal-container {
      width: 70%;
    }
  }
</style>
