<template>
    <div class="page page--404">
        <div class="container">
            <h1 class="page__title page__title--404">404</h1>
            <h4>I think you got lost here.. but did you know?</h4>
            <p><em>{{ chosen }}</em></p>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'NotFound',

    data() {
      return {
        chosen: null,
        facts: [
           "Elon Musk owns Wet Nellie, a custom-built Lotus Esprit submarine car from the James Bond film, The Spy Who Loved Me.",
           "The font Comic Sans is based on Dave Gibbons’ lettering in the Watchmen comic books. (He calls the font “dreadful.”)",
        ],
      }
    },

    mounted() {
      this.setRandomFact();
    },

    methods: {
      setRandomFact() {
       this.chosen = this.facts[Math.floor(Math.random() * this.facts.length)];
      }
    }
  };
</script>

<style lang="scss">
  .page--404 {
    text-align: center;
  }

  .page__title {
    &.page__title--404 {
      font-size: 72px;
    }
  }
</style>
