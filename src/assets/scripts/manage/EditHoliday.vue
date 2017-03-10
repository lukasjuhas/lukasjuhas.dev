<template>
    <div class="container">
        <transition name="fade">
            <div class="page">
                <editor v-show="show" class="holiday-editor"></editor>

                <h3>Photo manager</h3>
                <div v-if="item && item.photos.length" class="photo-thumbs" id="dragula">
                    <div v-for="photo in item.photos" class="photo-thumb" :data-id="photo.id" @click="handleClickPhoto">
                        <img :src="photo.thumb" :alt="photo.title">
                    </div>
                </div>
                <button v-if="showUpdateOrder" type="button" name="button" class="button button--primary" @click="updateOrder">Update Order</button>
                <button class="button button--primary" type="button" @click="modal('uploadModal')" name="uploadModal">Upload Photos</button>
            </div>
        </transition>
        <modal ref="uploadModal" v-cloak>
            <h3 slot="header">Add Photos</h3>
            <form slot="body" method="post" class="form" v-on:submit.prevent="upload"  enctype="multipart/form-data">
                <div class="form__group">
                    <input v-on:change="onPhotoChange" v-model="photos" type="file" name="photo[]" accept="image/*" multiple>
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
                <button type="button" name="makeFeature" class="button button--secondary" @click="makeFeature">Make as Featured Image</button>
            </div>
        </modal>
    </div>
</template>

<script>
  import each from 'lodash/each';
  import findKey from 'lodash/findKey';
  import omit from 'lodash/omit';
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
        files: null,
        showUpdateOrder: false,
        item: null,
        photos: [],
        editingPhoto: null,
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

        axios.get(`trips/${this.slug}?all=1`).then((response) => {
          this.item = response.data.data;

          if(this.item.title) {
            // remove placeholder
            const titleEl = document.getElementsByClassName('editor__title');
            if (titleEl[0]) {
              titleEl[0].innerHTML = this.item.title;
              titleEl[0].classList.remove('medium-editor-placeholder');
            }
          }

          if(this.item.content) {
            // remove placeholder
            const contentEl = document.getElementsByClassName('editor__content');
            if (contentEl[0]) {
              contentEl[0].innerHTML = this.item.content;
              contentEl[0].classList.remove('medium-editor-placeholder');
            }
          }

          if(this.item.photos) {
            setTimeout(() => {
              this.dragula();
            }, 10);
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
        this.closeModal('uploadModal');
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
            this.fetchTrip();
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
            this.showUpdateOrder = false;
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
      saveEditor(title, content) {
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

      handleClickPhoto(ev) {
        if(ev.target.parentNode.dataset.id) {
          this.fetchPhoto(ev.target.parentNode.dataset.id);
        }
      },

      fetchPhoto(id) {
        this.sharedState.setLoadingAction(true);

        axios.get(`photos/${id}`).then((response) => {
          this.editingPhoto = response.data.data;
          this.modal('editPhoto');

          setTimeout(() => {
            if(this.editingPhoto.caption) {
              const editorPhotoContent = document.getElementById('editor-photo-content');
              if (editorPhotoContent && editorPhotoContent.firstElementChild) {
                editorPhotoContent.firstElementChild.innerHTML = this.editingPhoto.caption;
                editorPhotoContent.firstElementChild.classList.remove('medium-editor-placeholder');
              }
            }
          }, 10);

          this.sharedState.setLoadingAction(false);
        })
        .catch((error, status) => {
          this.sharedState.setLoadingAction(false);
          if(error.status === 404) {
            this.sharedState.state.router.replace('/404');
          }
        });
      },

      saveEditPhotoEditor() {
        console.log('saveEditPhotoEditor');
      },

      onEditPhotoSubmit() {
        console.log('onEditPhotoSubmit');
      },

      removePhoto() {
        this.closeModal('editPhoto');
        this.sharedState.setLoadingAction(true);

        const id = this.editingPhoto.id;

        axios.delete(`photos/${id}`).then((response) => {
          if(response.data.error) {
            flash.showError(response.data.error.message);
          } else {
            flash.showSuccess(response.data.message, true);

            // might need to look at this as it's omiting all of them
            const photoKey = findKey(this.item.photos, { id });
            this.item.photos = omit(this.item.photos, photoKey);
            this.fetchTrip();
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

      makeFeature() {
        this.closeModal('editPhoto');
        this.sharedState.setLoadingAction(true);

        axios.put(`trips/${this.slug}/update-feature`, { photo: this.editingPhoto.url }).then((response) => {
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
