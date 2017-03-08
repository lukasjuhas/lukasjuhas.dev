<template>
    <div class="container">
        <transition name="fade">
            <div class="page">
                <editor v-show="show" class="holiday-editor"></editor>

                <h3>Gallery manager</h3>
                <div v-if="photos" class="photo-thumbs" id="dragula">
                    <div v-for="photo in photos" class="photo-thumb" :data-id="photo.id">
                        <img :src="photo.thumb" :alt="photo.title">
                    </div>
                </div>
                <button v-if="showUpdateOrder" type="button" name="button" class="button button--primary" @click="updateOrder">Update Order</button>
                <button class="button button--primary" type="button" @click="modal('upload')" name="button">Upload Photos</button>
            </div>
        </transition>
        <modal ref="upload" v-cloak>
            <h3 slot="header">Add Photos</h3>
            <form slot="body" method="post" class="form" v-on:submit.prevent="upload"  enctype="multipart/form-data">
                <div class="from__group">
                    <input v-on:change="onPhotoChange" v-model="photos" type="file" name="photo[]" accept="image/*" multiple>
                </div>
                <button type="submit" name="upload" class="button button--primary">Upload</button>
            </form>
        </modal>
    </div>
</template>

<script>
  import each from 'lodash/each';
  import dragula from 'dragula';
  import store from '../store';
  import flash from '../helpers/flash';
  import Modal from '../components/Modal.vue';
  import Editor from '../components/Editor.vue';

  export default {
    name: 'manage-holiday',

    props: {
      slug: {
        type: String,
        required: true,
        default: null
      }
    },

    components: {
      Editor,
      Modal,
    },

    data() {
      return {
        sharedState: store,
        show: false,
        title: null,
        content: null,
        files: null,
        photos: [],
        showUpdateOrder: false,
      }
    },

    created() {
      this.fetchTrip();
    },

    methods: {
      /**
       * Fetch trip data
       */
      fetchTrip() {
        this.sharedState.setLoadingAction(true);

        axios.get(`trips/${this.slug}`).then((response) => {
          if(response.data.data.title) {
            this.title = response.data.data.title;

            // remove placeholder
            const titleEl = document.getElementsByClassName('editor__title');
            if (titleEl[0]) {
              titleEl[0].innerHTML = this.title;
              titleEl[0].classList.remove('medium-editor-placeholder');
            }
          }

          if(response.data.data.content) {
            this.content = response.data.data.content;
            this.photos = response.data.data.photos;

            if(this.photos) {
              setTimeout(() => {
                this.dragula();
              }, 10);
            }

            // remove placeholder
            const contentEl = document.getElementsByClassName('editor__content');
            if (contentEl[0]) {
              contentEl[0].innerHTML = this.content;
              contentEl[0].classList.remove('medium-editor-placeholder');
            }
          }

          this.show = true;

          this.sharedState.setLoadingAction(false);

          doc.updateTitle(this.title);
        })
        .catch((error, status) => {
          this.sharedState.setLoadingAction(false);
          if(error.status === 404) {
            this.sharedState.state.router.replace('/404');
          }
        });
      },

      onPhotoChange(ele) {
        this.files = ele.target.files || ele.dataTransfer.files;
      },

      upload(ele) {
        this.closeModal('upload');
        this.sharedState.setLoadingAction(true);

        const formData = new FormData();
        formData.append(`trip`, this.slug);
        each(this.files, (file, index) => {
          formData.append(`photo[${index}]`, file);
        });

        axios.post(`photos`, formData).then((response) => {
          if(response.data.error) {
            flash.showError(response.data.error.message);
          } else {
            flash.showSuccess(response.data.message, true);
          }

          this.sharedState.setLoadingAction(false);
        })
        .catch((error, status) => {
          this.sharedState.setLoadingAction(false);
          console.log(error, status);
          if(error.status === 404) {
            this.sharedState.state.router.replace('/404');
          }

          flash.showError('There was an unexpected problem. Please try again.');
        });
      },

      updateOrder() {
        flash.hide();
        this.sharedState.setLoadingAction(true);

        const photos = [];
        const photoThumbs = document.getElementsByClassName('photo-thumb');
        each(photoThumbs, (photo, index) => {
          photos[photo.dataset.id] = index + 1;
        });

        axios.put(`trips/${this.slug}/order`, { photos }).then((response) => {
          if(response.data.error) {
            flash.showError(response.data.error.message);
          } else {
            flash.showSuccess(response.data.message, true);
          }

          this.sharedState.setLoadingAction(false);
        })
        .catch((error, status) => {
          if(error.status === 404) {
            this.sharedState.state.router.replace('/404');
          }

          flash.showError('There was an unexpected problem. Please try again.');
          this.sharedState.setLoadingAction(false);
        });
      },

      /**
       * Update despatch on save
       */
      save(title, content) {
        flash.hide();
        this.sharedState.setLoadingAction(true);

        axios.put(`trips/${this.slug}`, { title, content }).then((response) => {
          if(response.data.error) {
            flash.showError(response.data.error.message);
          } else {
            flash.showSuccess(response.data.message, true);
          }

          this.sharedState.setLoadingAction(false);
        })
        .catch((error, status) => {
          if(error.status === 404) {
            this.sharedState.state.router.replace('/404');
          }

          flash.showError('There was an unexpected problem. Please try again.');
          this.sharedState.setLoadingAction(false);
        });
      },

      dragula() {
        const els = [];

        els.push(document.getElementById('dragula'));

        // init drake
        const drake = dragula(els, {
          revertOnSpill: true,
          // mirrorContainer: document.body,
        });

        // on card dropped in to board
        drake.on('drop', (el, target, source, sibling) => {
          this.showUpdateOrder = true;
          // target.classList.remove('cards--empty');
          // el.classList.add('saving');
          // this.saveCard(target, el.dataset.hash, el);
        });
        // this.sharedState.drake = drake;
        return drake;
      },

      modal(ref) {
        this.$refs[ref].toggle = true;
      },

      closeModal(ref) {
        this.$refs[ref].toggle = false;
      },
    }
  }
</script>

<style lang="scss">
  .holiday-editor {
    margin-bottom: $base-spacing-unit * 2;
  }

  .photo-thumbs {
    text-align: center;
    margin-bottom: $base-spacing-unit;
  }

  .photo-thumb {
    display: inline-block;
    padding: 2px;
    cursor: move;
    background-color: $col-neutral-lightest;
  }

  .gu-mirror {
    position: fixed;
    margin: 0;
    z-index: 9999;
    opacity: 0.8;
    filter: alpha(opacity = 80);
  }

  .gu-hide {
    display: none;
  }

  .gu-unselectable {
    user-select: none;
  }

  .gu-transit {
    opacity: 0.2;
    filter: alpha(opacity = 20);
  }
</style>
