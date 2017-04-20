<template>
    <div class="container">
        <editor></editor>
    </div>
</template>

<script>
  import store from '../store';
  import helpers from '../helpers/helpers';
  import flash from '../helpers/flash';
  import Editor from '../components/Editor.vue';

  export default {
    name: 'manage-new-trip',

    components: {
      Editor,
    },

    data() {
      return {
        sharedState: store,
      };
    },

    mounted() {
      document.documentElement.classList.add('light');
    },

    methods: {
      /**
       * save editor
       *
       * Components/Editor.vue
       * @param string title
       * @param string content
       */
      saveEditor(title, content) {
        flash.hide();
        this.sharedState.setLoadingAction(true);

        axios.post('trips', { title, content }).then((response) => {
          if (response.data.error) {
            flash.showError(response.data.error.message);
          } else {
            flash.showSuccess(response.data.message, true);

            setTimeout(() => {
              window.location = helpers.url(`manage/trip/${response.data.data.slug}`);
            }, 1000);
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
    },
  };
</script>
