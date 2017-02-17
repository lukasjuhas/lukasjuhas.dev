<template>
    <div class="page">
        <div class="container">
            <h1 class="page__title">Photos</h1>
            <div v-if="items" class="gallery">
                <div class="gallery__item">
                    <img :src="items[current % items.length].photo_url" v-bind:alt="items[current % items.length].photo_title" />
                </div>
            </div>
            <button type="button" name="button" class="gallery-arrow gallery-arrow-prev" @click="next">Prev</button>
            <button type="button" name="button" class="gallery-arrow gallery-arrow-next" @click="next">Next</button>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'photos',
    data: function() {
      return {
        items: null,
        current: 0,
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
        axios.get('https://api.itsluk.dev/photos').then((response) => {
          this.items = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
      },

      next: function() {
        this.current += 1;
      },

      prev: function() {
        this.current -= 1;
      },
    },
  };
</script>

<style lang="scss">
  .gallery {
    width: 100%;
    max-height: 700px;
    overflow: hidden;
    text-align: center;
    vertical-align: middle;

    .gallery__item {

    }
  }
</style>
