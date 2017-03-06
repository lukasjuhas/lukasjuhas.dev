<template>
    <div class="page">
        <div class="container">
            <h1 class="page__title">Records</h1>
            <transition name="fade">
                <div v-if="items.length" class="record-feed">
                    <staggered-fade classes="row">
                        <div v-for="item in items" :key="item.index" v-bind:data-index="item.index" class="record-wrapper col col--xs-6 col--sm-4 col--md-3 col--lg-3">
                            <div class="record">
                                <div class="record__artwork"></div>
                                <h3 class="record__title">{{ item.artist }} - {{ item.title }}</h3>
                            </div>
                        </div>
                    </staggered-fade>
                </div>
            </transition>
            <transition name="fade">
                <section v-if="items.length && showAllLoaded" class="container">
                    <p><em>That's it!</em></p>
                </section>
            </transition>
        </div>
    </div>
</template>

<script>
  import store from './store';
  import throttle from 'lodash/throttle';
  import each from 'lodash/each';
  import StaggeredFade from './transitions/StaggeredFade.vue';
  import flash from './helpers/flash';

  export default {
    name: 'records',

    components: {
      StaggeredFade,
    },

    data() {
      return {
        sharedState: store,
        items: [],
        nextPage: null,
        prevPage: null,
        showAllLoaded: false,
      }
    },

    created() {
      this.fetchData();

      window.addEventListener('scroll', throttle(() => {
        this.handleScroll();
      }, 300));
    },

    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    },

    mounted() {
      // enable dark mode on this page
      document.documentElement.className = 'dark';
    },

    methods: {
      fetchData(path = 'records') {
        this.sharedState.setLoadingAction(true);

        axios.get(path).then((response) => {
          if(response.data.data !== null) {
            each(response.data.data, (item, index) => {
              item.index = index;
              this.items.push(item);
            });
          }

          // set next and prev page
          this.nextPage = response.data.paginator.next_page;
          this.prevPage = response.data.paginator.prev_page;

          this.sharedState.setLoadingAction(false);
        })
        .catch((error) => {
          this.nextPage = null;
          this.prevPage = null;

          this.sharedState.setLoadingAction(false);

          flash.showError('Sorry, there was problem loading the records. 😳');
        });
      },

      handleScroll() {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
          if(this.nextPage !== null) {
            this.fetchData(this.nextPage);
          } else {
            setTimeout(() => {
              this.showAllLoaded = true;
              window.removeEventListener('scroll', this.handleScroll);
            }, 1000);
          }
        }
      }
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
