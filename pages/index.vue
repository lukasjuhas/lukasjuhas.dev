<template>
  <div>
    <section class="section section--main">
      <span
        v-if="bg"
        class="gradient"
        :style="`background: linear-gradient(${bg} 0%, #fff 100%)`"
        :class="{ 'gradient-out': fadeOut }"
      />

      <div class="container">
        <div class="row">
          <div class="col col--xs-12 col--sm-10 col--md-7 col--lg-7">
            <article class="content">
              <p>
                I'm Lukas Juhas, and I'm a citizen of the world. Born and grew up in Slovakia,
                became an adult in the United Kingdom. My primary purpose on this planet is to enjoy
                life by
                <a href="https://github.com/lukasjuhas" target="_blank" rel="noopener"
                  >writing code</a
                >,
                <a
                  href="https://www.goodreads.com/user/show/90882699-lukas-juhas"
                  target="_blank"
                  rel="noopener"
                  >reading</a
                >, travelling, and taking
                <a href="https://instagram.com/lukasjuhas" target="_blank" rel="noopener"
                  >photographs</a
                >.
              </p>

              <p>
                Currently living and working between London and Copenhagen as Senior
                Software Engineer at
                <a href="https://www.worksome.com" target="_blank" rel="noopener">Worksome</a>.
                Previously Technical Lead at
                <a href="https://getasnap.com" target="_blank" rel="noopener">Snap</a>. I'm the
                creator of
                <a href="https://pilgrim.ist" target="_blank" rel="noopener">Pilgrimist</a>, a
                community-driven platform for travellers.
              </p>

              <p>
                Say hello
                <a href="mailto:lukas@itsluk.as">lukas@itsluk.as</a>,
                <a href="https://twitter.com/itslukasjuhas" target="_blank" rel="noopener"
                  >@itslukasjuhas</a
                >.
              </p>
            </article>
          </div>
          <div class="col col--xs-12 col--sm-2 col--md-2 col--lg-2"></div>
        </div>
      </div>
    </section>
    <transition name="fade">
      <section v-if="photos.length" class="section section--photo-feed">
        <div class="container">
          <div class="photo-feed">
            <div v-for="(photo, index) in photos" :key="index" :data-index="index" class="photo">
              <img :src="photo.media_url" :alt="photo.caption" :title="photo.caption" />
            </div>
          </div>
        </div>

        <div class="photo-feed-footer">
          <a href="https://instagram.com/lukasjuhas" class="see-more" target="_blank" rel="noopener"
            >see more</a
          >
        </div>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import splashy from 'splashy'
import tinycolor from 'tinycolor2'
import { Component, Vue } from 'vue-property-decorator'
import StaggeredFade from '~/components/StaggeredFade.vue'
import { Photo, RootState } from '~/types'

@Component({
  components: {
    StaggeredFade,
  },

  async mounted(this: Home) {
    await this.$store.dispatch('getPhotos');

    const palette = await splashy(this.firstPhotoUrl)
    if (palette.length) {
      this.$store.commit('setBg', palette[0])
    }


    if (this.bg && tinycolor(this.bg).isDark()) {
      this.$store.commit('setTheme', 'dark')
    }
  },
})
export default class Home extends Vue {
  fadeOut: boolean = false

  get photos() {
    return (this.$store.getters as RootState).photos
  }

  get firstPhotoUrl() {
    return (this.$store.getters as RootState).firstPhotoUrl
  }

  get theme() {
    return (this.$store.getters as RootState).theme
  }

  get bg() {
    return (this.$store.getters as RootState).bg
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    this.fadeOut = true

    // if it's not index page, just default the theme to light
    if (to.name !== 'index') {
      this.$store.commit('setTheme', 'light')
    }

    // room for css animation
    setTimeout(() => {
      next()
    }, 50)
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

  &.gradient-out {
    animation: fadeout $animation-speed ease-in-out;
    opacity: 0;
  }
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

.photo-feed {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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

@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
