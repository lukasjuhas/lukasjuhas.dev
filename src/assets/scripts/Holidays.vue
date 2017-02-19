<template>
    <div class="page">
        <section class="container">
            <h1 class="page__title">Every Month's Holiday</h1>
            <div class="row">
                <div class="col col--xs-12 col--sm-12 col--md-7 col--lg-7">
                    <p>It all started on my birthday in October 2014 when as a present I got weekend trip to Paris. Since then we travelled almost* every month at least once.</p>

                    <p>More details coming soon..</p>
                </div>
            </div>
        </section>
        <section v-if="items">
            <div class="container">
                <h2>Places we travelled so far</h2>
            </div>
            <div class="items">
                <div v-for="item in items" class="item">
                    {{ item.name }}
                </div>
            </div>
        </section>
    </div>
</template>

<script>
  import store from './store';

  export default {
    name: 'holidays',

    data: function() {
      return {
        sharedState: store,
        items: null,
      }
    },

    created: function() {
      this.fetchData();
    },

    mounted() {
      // enable dark mode on this page
      // document.documentElement.className = 'dark';
    },

    methods: {
      fetchData: function() {
        this.sharedState.setLoadingAction(true);

        const config = {
          onDownloadProgress: function (e) {
            console.log("This just in... ", e);
          }
        }

        axios.get('https://api.itsluk.dev/holidays', config).then((response) => {
          this.items = response.data.data;
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
