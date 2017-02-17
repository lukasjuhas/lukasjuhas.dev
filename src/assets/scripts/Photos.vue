<template>
    <div>
        <h1>Photos</h1>
        <div v-if="items" class="photo-feed">
            <div v-for="item in items">
                <img v-bind:src="item.photo_url" v-bind:alt="item.photo_title" />
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'photos',
    data: function() {
      return {
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
        axios.get('https://api.itsluk.dev/photos').then((response) => {
          this.items = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
      },
    },
  };
</script>
