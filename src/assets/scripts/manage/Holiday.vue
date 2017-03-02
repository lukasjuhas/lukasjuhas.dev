<template>
    <div class="container">
        <editor></editor>
    </div>
</template>

<script>
  import store from '../store';
  import Editor from '../components/Editor.vue';
  import flash from '../helpers/flash';

  export default {
    name: 'manage-holiday',

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
        title: null,
        content: null,
      }
    },

    components: {
      Editor,
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

      /**
       * Update trip on save
       */
      save(title, content) {
        flash.hide();
        this.sharedState.setLoadingAction(true);

        axios.put(`trips/${this.slug}`, { title, content }).then((response) => {
          if(response.data.error) {
            flash.showError(response.data.error.message);
          } else {
            flash.showSuccess(response.data.message);
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
      }
    }
  }
</script>
