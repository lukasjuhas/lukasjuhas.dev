<template>
    <div class="page">
        <div v-if="item" class="container">
            <h1 class="page__title">{{ item.title }}</h1>
            <p>This is single holiday page.</p>
        </div>
    </div>
</template>

<script>
  import store from './store';
  import doc from './helpers/doc';

  export default {
    name: 'holiday',

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
        item: null,
      }
    },

    created() {
      this.fetchData();
    },

    methods: {
      fetchData: function() {
        this.sharedState.setLoadingAction(true);

        axios.get(`trips/${this.slug}`).then((response) => {
          this.item = response.data.data;
          this.sharedState.setLoadingAction(false);

          doc.updateTitle(this.item.title);
        })
        .catch((error, status) => {
          this.sharedState.setLoadingAction(false);
          if(error.response.status === 404) {  
            this.sharedState.state.router.replace('/404');
          }
        });
      },
    },
  };
</script>
