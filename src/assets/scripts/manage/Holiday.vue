<template>
    <div class="container">
        <transition name="fade">
            <div class="page">
                <h1>{{ title }}</h1>
                <p>Gallery manager</p>
                <button class="button button--primary" type="button" @click="modal('upload')" name="button">Upload</button>
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
  import store from '../store';
  import flash from '../helpers/flash';
  import Modal from '../components/Modal.vue';

  export default {
    name: 'manage-despatch',

    props: {
      slug: {
        type: String,
        required: true,
        default: null
      }
    },

    components: {
      Modal,
    },

    data() {
      return {
        sharedState: store,
        show: false,
        title: null,
        content: null,
        files: null,
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
        console.log(this.files)
      },

      upload(ele) {
        this.sharedState.setLoadingAction(true);

        const formData = new FormData();

        each(this.files, (file, index) => {
          formData.append(`photo[${index}]`, file);
        });

        axios.post(`photos`, formData).then((response) => {

          this.sharedState.setLoadingAction(false);
        })
        .catch((error, status) => {
          this.sharedState.setLoadingAction(false);
          if(error.status === 404) {
            this.sharedState.state.router.replace('/404');
          }
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
