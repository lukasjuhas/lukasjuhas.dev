<template>
    <div class="page">
        <div class="container">
            <h1 class="page__title">Code</h1>
            <p>Some of the latest code I wrote, actively maintain and use.</p>
            <transition name="fade">
                <div v-if="items" class="code-feed">
                    <div class="row">
                        <div v-for="item in items" class="col col--xs-12 col--sm-6 col--md-6 col--lg-6">
                            <div class="code">
                                <h3 class="code__title">{{ item.name }}</h3>
                                <div class="code__content">
                                    <p>{{ item.description }}</p>
                                </div>
                                <div class="code__foter">
                                    <a v-if="item.github" v-bind:href="item.github" target="_blank" rel="noopener">View Code</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <p>See more of my code on <a href="https://github.com/lukasjuhas/" target="_blank" rel="noopener">Github</a>.</p>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'code',

    data() {
      return {
        items: this.fetchItems(),
      };
    },

    methods: {
      fetchItems() {
        return [
          {
            name: 'itsluk.as (tbc)',
            github: false,
            // github: 'https://github.com/lukasjuhas/itsluk.as',
            link: null,
            description: 'Source code of this site build on web starter and simple flexbox grid.',
          },
          {
            name: 'api.itsluk.as (tbc)',
            github: false,
            // github: 'https://github.com/lukasjuhas/api.itsluk.as',
            link: null,
            description: 'API for this site build on Laravel Lumen.',
          },
          {
            name: 'Web Starter',
            github: 'https://github.com/lukasjuhas/web-starter',
            link: null,
            description: 'Starter kit for web sites and web apps using gulp, rollup, vuejs',
          },
          {
            name: 'Simple Flexbox Grid',
            github: 'https://github.com/lukasjuhas/simple-flexbox-grid',
            link: null,
            description: 'Simple Flexbox Grid based on simple grid from @benchmarkstudios which is simplified version of bootstrap\'s grid.',
          },
          {
            name: 'Maintenance Mode',
            github: 'https://github.com/lukasjuhas/lj-maintenance-mode',
            link: 'https://plugins.itsluk.as/maintenance-mode/',
            description: 'Simple maintenance mode wordpress plugin. ',
          },
          {
            name: 'WooCommerce Category Locker',
            github: 'https://github.com/benchmarkstudios/wc-category-locker',
            link: null,
            description: 'Adds ability to password lock each category.',
          },
          {
            name: 'dotfiles',
            github: 'https://github.com/lukasjuhas/dotfiles',
            link: null,
            description: 'Dotfiles & configs I use on a day-to-day basis.',
          },
          {
            name: 'Did You Know?',
            github: 'https://github.com/lukasjuhas/did-you-know',
            link: null,
            description: 'List of interesting facts that mostly geeks will appreciate. (Used on this site for 404 page)',
          },
        ];
      },
    },
  };
</script>

<style lang="scss">
  .code-feed {
    .col {
      margin-bottom: $base-spacing-unit;
    }
  }

  .code {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: $col-background;
    padding: ($base-spacing-unit / 2) $base-spacing-unit;
    color: $col-text;
  }

  .code__content {
    flex: 1 0 auto;
  }
</style>
