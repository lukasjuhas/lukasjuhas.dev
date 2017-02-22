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

  export default {
    name: 'holiday',

    props: {
      slug: {
        type: String,
        required: true,
        default: null
      }
    },

    data: function() {
      return {
        sharedState: store,
        item: null,
      }
    },

    created: function() {
      this.fetchData();
    },

    methods: {
      fetchData: function() {
        this.sharedState.setLoadingAction(true);

        axios.get(`https://api.itsluk.dev/trips/${this.slug}`).then((response) => {
          this.item = response.data.data;
          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {
          this.sharedState.setLoadingAction(false);
          console.log(error);
        });
      },
    },
  };
</script>
