<template>
    <div class="page">
        <div class="container">
            <h1 class="page__title">Records</h1>
            <p>This is my record collection.</p>
            <transition name="fade">
                <div v-if="items.length" class="record-feed">
                    <staggered-fade class="row">
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
                            <a title="Open in Spotify" v-if="release.spotify" :href="release.spotify" target="_blank" rel="noopener" class="record__link_icon">
                                <svg class="icon"><use xlink:href="#spotify-brand"></use></svg>
                            </a>
                        </div>
                        <div class="col col--xs-12 col--sm-12 col--md-8 col--lg-8">
                            <div class="container">
                                <ol class="list">
                                  <li v-for="(track, index) in release.tracklist" :key="index">
                                      <span @click="trackPlaying('track' + index)" class="list__track_play_pause" v-if="track.preview" @click="toggleTrackStatus('track' + index)">
                                          <svg v-if="trackPlaying('track' + index)" title="Pause preview" class="icon"><use xlink:href="#pause"></use></svg>
                                          <svg v-else title="Play preview" class="icon"><use xlink:href="#play"></use></svg>
                                      </span>
                                      <audio v-if="track.preview" :ref="'track' + index" :src="track.preview" ref="player"></audio>
                                      <span class="list__track_title">{{ track.title }}</span>
                                  </li>
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
  /* eslint no-param-reassign: ["error", {
    "props": true, "ignorePropertyModificationsFor": ["item"] }]*/
  import throttle from 'lodash/throttle';
  import includes from 'lodash/includes';
  import each from 'lodash/each';
  import store from './store';
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
        showCaption: false,
        tracksPlaying: [],
      };
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
          if (response.data.data !== null) {
            each(response.data.data, (item, index) => {
              this.items.push(item);
            });
          }

          each(this.items, (item, index) => {
            item.index = index;
            this.items[index] = item;
          });

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

          flash.showError('Sorry, there was problem loading the records. 😳');
        });
      },

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

      fetchRelease(releaseId) {
        flash.hide();
        this.sharedState.setLoadingAction(true);

        axios.get(`records/${releaseId}`).then((response) => {
          if (response.data.data !== null) {
            this.release = response.data.data;
            this.modal('release');
          }

          this.sharedState.setLoadingAction(false);
        })
        .catch(() => {
          this.sharedState.setLoadingAction(false);

          flash.showError('Sorry, there are no details about this record.', true);
        });
      },

      toggleTrackStatus(ref) {
        // clean up track currently plaing
        this.tracksPlaying = [];

        // pause any other tracks
        each(this.$refs, (item, index) => {
          if ((typeof item[0] !== 'undefined') && (index !== ref)) {
            item[0].pause();
          }
        });

        // play or pause selected track.
        if (typeof this.$refs[ref] !== 'undefined') {
          this.$refs[ref][0].paused ? this.$refs[ref][0].play() : this.$refs[ref][0].pause();

          if (!this.$refs[ref][0].paused) {
            // when preview finished, remove "pause" icon
            this.$refs[ref][0].addEventListener('ended', () => {
              this.tracksPlaying = [];
            });

            // current tracks playing
            this.tracksPlaying.push(ref);
          }
        }
      },

      trackPlaying(ref) {
        if (includes(this.tracksPlaying, ref)) {
          return true;
        }

        return false;
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

<style lang="scss" scoped>
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
    margin-bottom: $base-spacing-unit;

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

      @include resp-max($breakpoint-sm) {
        width: 100%;
      }
    }
  }

  .record__link_icon {
    display: inline-block;
    margin-bottom: $base-spacing-unit;
    width: 100%;

    .icon {
      display: inline-block;
      vertical-align: middle;
      width: 40px;
      height: 40px;
      margin-right: $base-spacing-unit;
    }
  }

  .record__link_caption {
    display: inline-block;
    vertical-align: middle;
  }

  .record-wrapper {
    @include resp-max(525px) {
      flex-basis: 50%;
      max-width: 50%;
    }
  }

  .list__track_play_pause {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    margin-right: $base-spacing-unit / 4;
    cursor: pointer;

    .icon {
      width: 20px;
      height: 20px;
    }
  }
</style>
