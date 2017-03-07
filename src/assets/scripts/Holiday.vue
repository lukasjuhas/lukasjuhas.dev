<template>
    <div class="page">
        <transition name="fade">
            <div v-if="item" class="container">
                <h1 class="page__title">{{ item.title }}</h1>
                <div class="page__content" v-html="item.content"></div>
                <div v-if="item.photos.length" class="photos">
                    <staggered-fade>
                        <div v-for="(photo, index) in item.photos" class="photo" :key="index" v-bind:data-index="index">
                            <img :src="photo.url" :alt="photo.title" />
                        </div>
                    </staggered-fade>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  import store from './store';
  import doc from './helpers/doc';
  import StaggeredFade from './transitions/StaggeredFade.vue';

  export default {
    name: 'holiday',

    components: {
      StaggeredFade,
    },

    props: {
      slug: {
        type: String,
        required: true,
        default: null
      }
    },

    data() {
      return {
        sharedState: store,
        item: null,
      }
    },

    created() {
      this.fetchData();
    },

    methods: {
      fetchData() {
        this.sharedState.setLoadingAction(true);

        axios.get(`trips/${this.slug}`).then((response) => {
          this.item = response.data.data;
          this.sharedState.setLoadingAction(false);

          doc.updateTitle(this.item.title);
        })
        .catch((error, status) => {
          this.sharedState.setLoadingAction(false);

          if(error.response.status === 404) {
            this.sharedState.state.router.replace('/404');
          }
        });
      },
    },
  };
</script>
