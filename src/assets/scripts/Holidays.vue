<template>
    <div class="page">
        <section class="container">
            <h1 class="page__title">Every Month's Holiday</h1>
            <div class="row">
                <div class="col col--xs-12 col--sm-12 col--md-7 col--lg-7">
                    <p>It all started on my birthday in October 2014 when as a present I got weekend trip to Paris. Since then we travelled almost every month at least once.</p>
                    <p>Although lately it's not as regular as before, we still would like to carry on with this and hopefully even catch up on missed months.</p>
                    <p>Check out our trips below.</p>
                </div>
            </div>
        </section>
        <section v-if="items">
            <div class="holidays">
                <router-link v-for="item in items" class="holiday" v-bind:to="'/holidays/' + item.slug"><h1>{{ item.title }}</h1></router-link>
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
      document.documentElement.className = 'dark';
    },

    methods: {
      fetchData: function() {
        this.sharedState.setLoadingAction(true);

        const config = {
          onDownloadProgress: function (e) {
            console.log("This just in... ", e);
          }
        }

        axios.get('https://api.itsluk.dev/trips', config).then((response) => {
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

<style lang="scss">
  .holidays {
    text-align: center;
  }

  .holiday {
    width: 100%;
    display: block;
    padding: ($base-spacing-unit * 2) 0;
    text-decoration: none;
    transition: all $animation-speed $animation;

    &:hover {
      padding: ($base-spacing-unit * 2.5) 0;
    }
  }
</style>
