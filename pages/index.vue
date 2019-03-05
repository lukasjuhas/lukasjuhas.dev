<template>
  <div>
    <section class="section section--main">
      <span v-if="bg" class="gradient" :style="`background: linear-gradient(${bg} 0%, #fff 100%)`"/>

      <div class="container">
        <div class="row">
          <div class="col col--xs-12 col--sm-10 col--md-7 col--lg-7">
            <article class="content">
              <p>
                I'm Lukas Juhas and my main purpose on this planet is to enjoy life by
                <a
                  href="https://github.com/lukasjuhas"
                  target="_blank"
                  rel="noopener"
                >writing code</a>, traveling and taking
                <a
                  href="https://instagram.com/lukasjuhas"
                  target="_blank"
                  rel="noopener"
                >photographs</a>. Currently living and working in London as a Tech Lead at
                <a
                  href="https://getasnap.com/"
                  target="_blank"
                  rel="noopener"
                >Snap</a>.
              </p>

              <p>
                Say hello
                <a href="mailto:lukas@itsluk.as">lukas@itsluk.as</a>,
                <a
                  href="https://twitter.com/itslukasjuhas"
                  target="_blank"
                  rel="noopener"
                >@itslukasjuhas</a>.
              </p>
            </article>
          </div>
          <div class="col col--xs-12 col--sm-2 col--md-2 col--lg-2"></div>
        </div>
      </div>
    </section>
    <transition name="fade">
      <section v-if="photos" class="section section--photo-feed">
        <!-- <staggered-fade class="photo-feed"> -->
        <div class="container">
          <div v-for="(photo, index) in photos" :key="index" :data-index="index" class="photo">
            <img
              :src="photo.images.standard_resolution.url"
              :alt="photo.caption.text"
              :title="photo.caption.text"
            >
          </div>
        </div>
        <!-- </staggered-fade> -->
        <div class="photo-feed-footer">
          <a
            href="https://instagram.com/lukasjuhas"
            class="see-more"
            target="_blank"
            rel="noopener"
          >see more</a>
        </div>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import splashy from 'splashy';
import tinycolor from 'tinycolor2';
import { Component, Vue, State, Action } from 'nuxt-property-decorator';
import StaggeredFade from '~/components/StaggeredFade.vue';
import { Photo } from '~/types';

@Component({
  components: {
    StaggeredFade,
  },
})
export default class Home extends Vue {
  bg: string = '';

  @State photos: Photo;
  @State firstPhotoUrl;
  @State theme;

  @Action('getPhotos') getPhotos: any;

  mounted() {
    this.getPhotos().then(() => {
      splashy(this.firstPhotoUrl).then(palette => {
        this.bg = palette[0];

        if (tinycolor(this.bg).isDark()) {
          this.$store.commit('setTheme', 'dark');
        }
      });
    });
  }
}
</script>

<style lang="scss" scoped>
.gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  animation: fadein $animation-speed ease-in-out;
}

.section--main {
  min-height: 100vh;
  padding: 90px 70px;
  position: relative;
  display: flex;
  align-items: center;
  transition: all $animation-speed $animation;

  .dark & {
    color: $col-text-light;

    a {
      color: inherit;
    }
  }

  @include resp-max($breakpoint-sm) {
    padding: 90px 0;
  }
}

.content {
  font-size: $font-size-lg;
  line-height: $line-height-lg;
  margin-bottom: 100px;

  @include resp-max($breakpoint-sm) {
    font-size: $font-size-base;
  }
}

.photo {
  display: inline-block;
  max-width: 33.33%;
  height: auto;
  font-size: 0;

  img {
    max-width: 100%;
    height: auto;
    vertical-align: top;
    font-size: $font-size-base;
  }

  @include resp-max($breakpoint-sm) {
    max-width: 100%;
  }
}

.photo-feed-footer {
  text-align: center;
  padding: $spacing-xl 0;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
