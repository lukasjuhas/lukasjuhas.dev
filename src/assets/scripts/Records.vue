<template>
    <div class="page">
        <div class="container">
            <h1 class="page__title">Records</h1>
            <transition name="fade">
                <div v-if="items" class="record-feed">
                    <div class="row">
                        <div v-for="item in items" class="col col--xs-12 col--sm-6 col--md-4 col--lg-3">
                            <div class="record">
                                <div class="record__artwork"></div>
                                <h3 class="record__title">{{ item.artist }} - {{ item.title }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
  import store from './store';

  export default {
    name: 'records',

    data: function() {
      return {
        sharedState: store,
        items: null,
        loading: false,
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

        axios.get('https://api.itsluk.dev/records', config).then((response) => {
          this.items = response.data.data;
          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {
          console.log(error);
        });
      },
    },
  };
</script>

<style lang="scss">
  .record {
    margin-bottom: $base-spacing-unit;
  }

  .record__artwork {
    width: 100%;
    padding-bottom: 100%;
    background: lighten($col-background-dark, 10%);
    margin-bottom: $base-spacing-unit / 4;
    position: relative;

    &:before {
      content: '';
      width: 75%;
      height: 75%;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      border: 2px solid $col-background-dark;
      transform: translate(-50%, -50%);
    }

    &:after {
      content: '';
      width: 20%;
      height: 20%;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: $col-background-dark;
      transform: translate(-50%, -50%);
    }
  }
</style>
