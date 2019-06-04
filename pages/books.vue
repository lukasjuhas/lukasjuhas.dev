<template>
  <div class="page">
    <no-ssr>
      <span v-if="bg" class="gradient" :style="`background: linear-gradient(${bg} 0%, #fff 100%)`"/>
    </no-ssr>

    <transition name="fade">
        <section v-if="books" class="section section--book-feed">

        <div class="container">
          <div class="row">
            <div
              v-for="(book, index) in books"
              :key="index"
              :data-index="index"
              class="col col--xs-6 col--sm-3 col--md-2 col--lg-2"
            >
              <a class="book" :href="book.link">
                <img :src="book.image_url" :alt="book.title" />
                <h4>{{ book.title }}</h4>
                <h6>
                  <span v-for="(author, index) in book.authors" :key="index">
                    {{ author.name }}
                  </span>
                </h6>
              </a>
            </div>
          </div>
        </div>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import splashy from 'splashy'
import tinycolor from 'tinycolor2'
import { Component, Vue, State, Action } from 'nuxt-property-decorator'
import { Book } from '~/types'

@Component({})

export default class Books extends Vue {
  @State books: Book
  @State bg

  @Action('getBooks') getBooks: any

  async asyncData({ store }) {
    await store.dispatch('getBooks').then((response) => {
      splashy(store.state.firstBookImageUrl).then(palette => {
        store.commit('setBg', palette[0])

        if (tinycolor(store.state.bg).isDark()) {
          store.commit('setTheme', 'dark')
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: (50 + $spacing-xl) 0 $spacing-xl;
}

.gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  animation: fadein $animation-speed ease-in-out;
}
</style>
