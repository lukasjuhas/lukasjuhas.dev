<template>
    <div class="container">
        <transition name="fade">
            <div class="page">
                <editor v-show="show" class="trip-editor"></editor>

                <h3>Photo manager</h3>
                <div v-if="item && item.photos.length" class="photo-thumbs" id="dragula">
                    <div v-for="(photo, index) in item.photos" :key="index" class="photo-thumb" :data-id="photo.id" @click="handleClickPhoto">
                        <img :src="photo.thumb" :alt="photo.title">
                    </div>
                </div>
                <button v-if="showUpdateOrder" type="button" name="button" class="button button--primary" @click="updateOrder">Update Order</button>
                <button class="button button--primary" type="button" @click="modal('uploadModal')" name="uploadModal">Upload Photos</button>
            </div>
        </transition>
        <modal ref="uploadModal" v-cloak>
            <h3 slot="header">Add Photos</h3>
            <form slot="body" method="post" class="form" v-on:submit.prevent="upload" enctype="multipart/form-data">
                <div class="form__group">
                    <input v-on:change="onPhotoChange" type="file" name="photo[]" accept="image/*" multiple>
                </div>
                <button type="submit" name="upload" class="button button--primary">Upload</button>
            </form>
        </modal>
        <modal ref="editPhoto" v-cloak>
            <h3 slot="header">Edit Photo</h3>
            <div v-if="editingPhoto" slot="body">
                <div class="form__group">
                    <img :src="editingPhoto.thumb" :alt="editingPhoto.title">
                </div>
                <div class="form__group">
                    <editor save-method="saveEditPhotoEditor" notitle id="editor-photo-content"></editor>
                </div>
                <button type="button" name="removePhoto" class="button button--danger" @click="removePhoto">Remove Photo</button>
                <button type="button" name="setAsFeature" class="button button--secondary" @click="setAsFeature">Make as Featured Image</button>
            </div>
        </modal>
    </div>
</template>

<script>
  // import each from 'lodash/each';
  // import findKey from 'lodash/findKey';
  // import omit from 'lodash/omit';
  // import dragula from 'dragula';
  import store from '../store';
  import helpers from '../helpers/helpers';
  import flash from '../helpers/flash';
  import Modal from '../components/Modal.vue';
  import Editor from '../components/Editor.vue';

  export default {
    name: 'manage-trip',

    props: {
      slug: {
        type: String,
        required: true,
        default: null,
      },
    },

    components: {
      Editor,
      Modal,
    },

    data() {
      return {
        sharedState: store,
        show: false,
        files: null,
        showUpdateOrder: false,
        item: null,
        photos: [],
        editingPhoto: null,
      };
    },

    mounted() {
      document.documentElement.classList.add('light');
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

        axios.get(`trips/${this.slug}?all=1`).then((response) => {
          this.item = response.data.data;

          if (this.item.title) {
            // remove placeholder
            const titleEl = document.getElementsByClassName('editor__title');
            if (titleEl[0]) {
              titleEl[0].innerHTML = this.item.title;
              titleEl[0].classList.remove('medium-editor-placeholder');
            }
          }

          if (this.item.content) {
            // remove placeholder
            const contentEl = document.getElementsByClassName('editor__content');
            if (contentEl[0]) {
              contentEl[0].innerHTML = this.item.content;
              contentEl[0].classList.remove('medium-editor-placeholder');
            }
          }

          if (this.item.photos) {
            setTimeout(() => {
              // this.dragula();
            }, 10);
          }

          this.show = true;

          this.sharedState.setLoadingAction(false);

          helpers.updateTitle(this.title);
        })
        .catch((error) => {
          this.sharedState.setLoadingAction(false);
          if (error.status === 404) {
            this.sharedState.state.router.replace('/404');
          }
        });
      },

      /**
       * on photo change check for files
       * @param object ele
       */
      onPhotoChange(ele) {
        this.files = ele.target.files || ele.dataTransfer.files;
      },

      /**
       * upload
       * @param object ele
       */
      upload() {
        this.closeModal('uploadModal');
        this.sharedState.setLoadingAction(true);

        const formData = new FormData();
        formData.append('trip', this.slug);
        _.each(this.files, (file, index) => {
          formData.append(`photo[${index}]`, file);
        });

        axios.post('photos', formData).then((response) => {
          if (response.data.error) {
            flash.showError(response.data.error.message);
          } else {
            flash.showSuccess(response.data.message, true);
            this.fetchTrip();
          }

          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {
          this.sharedState.setLoadingAction(false);
          // console.log(error, status);
          if (error.status === 404) {
            this.sharedState.state.router.replace('/404');
          }

          flash.showError('There was an unexpected problem. Please try again.');
        });
      },

      /**
       * update order of photos
       */
      updateOrder() {
        flash.hide();
        this.sharedState.setLoadingAction(true);

        const photos = [];
        const photoThumbs = document.getElementsByClassName('photo-thumb');
        _.each(photoThumbs, (photo, index) => {
          photos[photo.dataset.id] = index + 1;
        });

        axios.put(`trips/${this.slug}/order`, { photos }).then((response) => {
          if (response.data.error) {
            flash.showError(response.data.error.message);
          } else {
            flash.showSuccess(response.data.message, true);
            this.showUpdateOrder = false;
          }

          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {
          if (error.status === 404) {
            this.sharedState.state.router.replace('/404');
          }

          flash.showError('There was an unexpected problem. Please try again.');
          this.sharedState.setLoadingAction(false);
        });
      },

      /**
       * Update despatch on save
       */
      saveEditor(title, content) {
        flash.hide();
        this.sharedState.setLoadingAction(true);

        axios.put(`trips/${this.slug}`, { title, content }).then((response) => {
          if (response.data.error) {
            flash.showError(response.data.error.message);
          } else {
            flash.showSuccess(response.data.message, true);
          }

          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {
          if (error.status === 404) {
            this.sharedState.state.router.replace('/404');
          }

          flash.showError('There was an unexpected problem. Please try again.');
          this.sharedState.setLoadingAction(false);
        });
      },

      /**
       * dragula
       * @return object
       */
      dragula() {
        const els = [];

        els.push(document.getElementById('dragula'));

        // init drake
        const drake = dragula(els, {
          revertOnSpill: true,
          // mirrorContainer: document.body,
        });

        // on card dropped in to board
        drake.on('drop', (el, target) => {
          this.showUpdateOrder = true;
          // target.classList.remove('cards--empty');
          // el.classList.add('saving');
          // this.saveCard(target, el.dataset.hash, el);
        });
        // this.sharedState.drake = drake;
        return drake;
      },

      /**
       * handle click on photo
       * @param mixed ev
       */
      handleClickPhoto(ev) {
        if (ev.target.parentNode.dataset.id) {
          this.fetchPhoto(ev.target.parentNode.dataset.id);
        }
      },

      /**
       * fetch single photo
       * @param int id
       */
      fetchPhoto(id) {
        this.sharedState.setLoadingAction(true);

        axios.get(`photos/${id}`).then((response) => {
          this.editingPhoto = response.data.data;
          this.modal('editPhoto');

          setTimeout(() => {
            if (this.editingPhoto.caption) {
              const editorPhotoContent = document.getElementById('editor-photo-content');
              if (editorPhotoContent && editorPhotoContent.firstElementChild) {
                editorPhotoContent.firstElementChild.innerHTML = this.editingPhoto.caption;
                editorPhotoContent.firstElementChild.classList.remove('medium-editor-placeholder');
              }
            }
          }, 10);

          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {
          this.sharedState.setLoadingAction(false);
          if (error.status === 404) {
            this.sharedState.state.router.replace('/404');
          }
        });
      },

      /**
       * save photo content editor
       * @param string title
       * @param string content
       */
      saveEditPhotoEditor(title, content) {
        flash.hide();

        this.closeModal('editPhoto');

        this.sharedState.setLoadingAction(true);

        const id = this.editingPhoto.id;

        axios.put(`photos/${id}`, { title, content }).then((response) => {
          if (response.data.error) {
            flash.showError(response.data.error.message);
          } else {
            flash.showSuccess(response.data.message, true);
          }

          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {
          if (error.status === 404) {
            this.sharedState.state.router.replace('/404');
          }

          flash.showError('There was an unexpected problem. Please try again.');
          this.sharedState.setLoadingAction(false);
        });
      },

      /**
       * remove single photo
       */
      removePhoto() {
        this.closeModal('editPhoto');
        this.sharedState.setLoadingAction(true);

        const id = this.editingPhoto.id;

        axios.delete(`photos/${id}`).then((response) => {
          if (response.data.error) {
            flash.showError(response.data.error.message);
          } else {
            flash.showSuccess(response.data.message, true);

            // might need to look at this as it's omiting all of them
            const photoKey = _.findKey(this.item.photos, { id });
            this.item.photos = _.omit(this.item.photos, photoKey);
            this.fetchTrip();
          }

          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {
          this.sharedState.setLoadingAction(false);
          // console.log(error, status);
          if (error.status === 404) {
            this.sharedState.state.router.replace('/404');
          }

          flash.showError('There was an unexpected problem. Please try again.');
        });
      },

      /**
       * set photo as featured image for the trip
       * @return [type]
       */
      setAsFeature() {
        this.closeModal('editPhoto');
        this.sharedState.setLoadingAction(true);

        axios.put(`trips/${this.slug}/update-feature`, { photo: this.editingPhoto.url }).then((response) => {
          if (response.data.error) {
            flash.showError(response.data.error.message);
          } else {
            flash.showSuccess(response.data.message, true);
          }

          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {
          this.sharedState.setLoadingAction(false);
          // console.log(error, status);
          if (error.status === 404) {
            this.sharedState.state.router.replace('/404');
          }

          flash.showError('There was an unexpected problem. Please try again.');
        });
      },

      /**
       * modal init
       * @param string ref
       */
      modal(ref) {
        this.$refs[ref].toggle = true;
      },

      /**
       * close modal
       * @param string ref
       */
      closeModal(ref) {
        this.$refs[ref].toggle = false;
      },
    },
  };
</script>

<style lang="scss">
  .trip-editor {
    margin-bottom: $base-spacing-unit * 2;
  }

  .photo-thumbs {
    text-align: left;
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
