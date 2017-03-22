<template>
    <div class="container">
        <editor></editor>
    </div>
</template>

<script>
  import store from '../store';
  import flash from '../helpers/flash';
  import Editor from '../components/Editor.vue';

  export default {
    name: 'manage-new-holiday',

    components: {
      Editor,
    },

    data() {
      return {
        sharedState: store,
      }
    },

    methods: {
      saveEditor(title, content) {
        flash.hide();
        this.sharedState.setLoadingAction(true);

        axios.post(`trips`, { title, content }).then((response) => {
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
    }
  }
</script>
