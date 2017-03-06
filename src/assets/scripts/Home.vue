<template>
    <div class="page">
        <section class="section">
            <div class="container">
                <div class="row">
                    <div class="col col--xs-12 col--sm-2 col--md-2 col--lg-2">
                        <div class="avatar" v-on:mouseover="showCaption = true" v-on:mouseleave="showCaption = false">
                            <img src="/images/avatar.jpg" alt="Lukas Juhas">
                        </div>
                        <transition name="slide-fade">
                            <div v-if="showCaption" class="avatar-caption">
                                <p>That's me in Venice</p>
                            </div>
                        </transition>
                    </div>
                    <div class="col col--xs-12 col--sm-10 col--md-7 col--lg-7">
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
                    <div class="col col--xs-12 col--sm-12 col--md-12 col--lg-12">
                        <h2>Latest Trip</h2>
                        <transition name="fade">
                            <section v-if="item">
                                <div class="holidays">
                                    <div class="holiday">
                                        <router-link v-bind:to="'/holidays/' + item.slug">
                                            <h2 class="holiday__title">{{ item.title }}</h2>
                                        </router-link>
                                    </div>
                                </div>
                            </section>
                        </transition>
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
        showCaption: false,
      }
    },

    mounted() {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.add('gradient');
    },

    created() {
      this.fetchData();
    },

    methods: {
      fetchData(path = 'trips?limit=1&content=true') {
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

  .avatar {
    width: 100%;
    height: auto;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: $base-spacing-unit;

    img {
      width: 100%;
      height: auto;
      vertical-align: top;
    }
  }

  .avatar-caption {
    font-style: italic;
    font-size: 12px;
    text-align: center;
  }
</style>
