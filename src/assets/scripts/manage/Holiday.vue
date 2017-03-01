<template>
    <div class="container">
        <editor :title="title" :content="content"></editor>
    </div>
</template>

<script>
  import store from '../store';
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
      fetchTrip() {
        this.sharedState.setLoadingAction(true);

        axios.get(`trips/${this.slug}?all=1`).then((response) => {
          this.title = response.data.data.title;
          this.content = response.data.data.content;
          this.sharedState.setLoadingAction(false);

          doc.updateTitle(this.title);
        })
        .catch((error, status) => {
          this.sharedState.setLoadingAction(false);
          if(error.status === 404) {
            this.sharedState.state.router.replace('/404');
          }
        });
      }
    }
  }
</script>
