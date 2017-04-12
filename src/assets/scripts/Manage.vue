<template>
    <div class="container">
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
  import store from './store';
  import each from 'lodash/each';
  import flash from './helpers/flash';

  export default {
    name: 'manage',

    data() {
      return {
        sharedState: store,
        items: [],
      }
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
          if(response.data.data !== null) {
            each(response.data.data, (item, index) => {
              item.index = index;
              this.items.push(item);
            });
          }

          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {
          this.nextPage = null;
          this.prevPage = null;

          this.sharedState.setLoadingAction(false);
          flash.showError('Sorry, there was problem loading trips. 😳');
        });
      },
    }
  }
</script>

<style lang="scss">

</style>
