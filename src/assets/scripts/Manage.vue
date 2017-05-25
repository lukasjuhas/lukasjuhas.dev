<template>
    <div class="container">
        <p><button @click="generatePreviewImages()" class="button">Generate Preview Images</button></p>
        <h4>Trips:</h4>
        <ul>
            <li v-for="item in this.items">
                <router-link :to="'/manage/trip/' + item.slug">
                    {{ item.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  /* eslint no-param-reassign: ["error", {
    "props": true, "ignorePropertyModificationsFor": ["item"] }]*/
  import each from 'lodash/each';
  import store from './store';
  import flash from './helpers/flash';

  export default {
    name: 'manage',

    data() {
      return {
        sharedState: store,
        items: [],
      };
    },

    created() {
      this.fetchData();
    },

    methods: {
      /**
       * Fetch Trips
       * @param {String}
       */
      fetchData(path = 'trips?limit=9999') {
        this.sharedState.setLoadingAction(true);

        axios.get(path).then((response) => {
          if (response.data.data !== null) {
            each(response.data.data, (item, index) => {
              item.index = index;
              this.items.push(item);
            });
          }

          this.sharedState.setLoadingAction(false);
        })
        .catch(() => {
          this.nextPage = null;
          this.prevPage = null;

          this.sharedState.setLoadingAction(false);
          flash.showError('Sorry, there was problem loading trips. 😳');
        });
      },

      generatePreviewImages() {
        this.sharedState.setLoadingAction(true);

        axios.post('photos/generatePreviews').then((response) => {
          if (response.data.error) {
            flash.showError(response.data.error.message);
          } else {
            flash.showSuccess(response.data.message, true);
          }

          this.sharedState.setLoadingAction(false);
        })
        .catch(() => {
          this.sharedState.setLoadingAction(false);
          flash.showError('There was an unexpected problem. Please try again.');
        });
      },
    },
  };
</script>

<style lang="scss">

</style>
