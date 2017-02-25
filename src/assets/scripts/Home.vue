<template>
    <div class="page">
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col col--xs-12 col--sm-12 col--md-7 col--lg-7">
                        <article class="large-content">
                            <p>I'm Lukas Juhas and my main purpose on this planet is to enjoy life by&nbsp;<router-link to="/code">writing code</router-link>,&nbsp;<router-link to="/holidays">traveling</router-link>, making music and taking <a href="https://instagram.com/lukasjuhas" target="_blank" rel="noopener">photographs</a>. Currently living and working in London as Full-stack Web Developer at <a href="https://benchmark.co.uk/" target="_blank" rel="noopener">Benchmark</a>.</p>

                            <p>Say hello <a href="mailto:lukas@itsluk.as">lukas@itsluk.as</a>.</p>

                            <p>If you are looking for Wordpress plugins I wrote you can visit <a href="https://plugins.itsluk.as/" target="_blank" rel="noopener">dedicated site</a> for these.</p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col col--xs-12 col--sm-6 col--md-6 col--lg-6">
                        <h2>Latest Travel</h2>
                        <section v-if="item">
                            <div class="holidays">
                                <router-link class="holiday" v-bind:to="'/holidays/' + item.slug">
                                    <h1>{{ item.title }}</h1>
                                </router-link>
                            </div>
                        </section>
                    </div>
                    <div class="col col--xs-12 col--sm-6 col--md-6 col--lg-6">
                        <h2>Latest Despatch</h2>
                        <p>No despatches yet.</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
  import store from './store';
  import each from 'lodash/each';
  import flash from './helpers/flash';

  export default {
    name: 'home',

    data() {
      return {
        sharedState: store,
        item: null,
      }
    },

    mounted() {
      document.documentElement.className = 'dark';
    },

    created() {
      this.fetchData();
    },

    methods: {
      fetchData(path = 'trips?limit=1') {
        this.sharedState.setLoadingAction(true);

        axios.get(path).then((response) => {
          if(response.data.data !== null) {
            each(response.data.data, (item) => {
              this.item = item;
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
          flash.showError('Sorry, there was problem loading latest journey.');
        });
      },
    }
  };
</script>

<style lang="scss">
  .large-content {
    font-size: 18px;
  }
</style>
