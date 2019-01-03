<template>
  <div>
    <nuxt-link to="/">
      <logo/>
    </nuxt-link>

    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col col--xs-12 col--sm-2 col--md-2 col--lg-2">
            <div class="avatar" @mouseover="showCaption = true" @mouseleave="showCaption = false">
              <picture>
                <source srcset="images/avatar.webp" type="image/webp">
                <img src="images/avatar.jpg" alt="Lukas Juhas">
              </picture>
            </div>
            <transition name="slide-fade">
              <div v-if="showCaption" class="avatar-caption">
                <p>That's me in Venice</p>
              </div>
            </transition>
          </div>
          <div class="col col--xs-12 col--sm-10 col--md-7 col--lg-7">
            <article class="large-content">
              <p>
                I'm Lukas Juhas and my main purpose on this planet is to enjoy life by
                <nuxt-link to="/code">writing code</nuxt-link>, traveling and taking
                <a
                  href="https://instagram.com/lukasjuhas"
                  target="_blank"
                  rel="noopener"
                >photographs</a>. Currently living and working in London as Tech Lead at
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
        </div>
      </div>
    </section>
    <transition name="fade">
      <section v-if="photos" class="section section--photo-feed">
        <staggered-fade class="photo-feed">
          <div
            v-for="(photo, index) in photos"
            :key="index"
            :data-index="index"
            class="photo-feed__panel"
          >
            <img v-lazy="photo.thumb" :alt="photo.caption" :title="photo.caption">
          </div>
        </staggered-fade>
        <div v-if="photos.length" class="row">
          <div class="col col--xs-12 col--sm-12 col--md-12 col--lg-12 align-text-center">
            <a
              href="https://instagram.com/lukasjuhas"
              class="see-more"
              target="_blank"
              rel="noopener"
            >see more</a>
          </div>
        </div>
      </section>
    </transition>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import StaggeredFade from '~/components/StaggeredFade.vue';

export default {
  components: {
    Logo,
    StaggeredFade,
  },

  data() {
    return {
      photos: [],
      showCaption: false,
    };
  },
};
</script>
