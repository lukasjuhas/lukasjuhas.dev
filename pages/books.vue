<template>
  <div class="page">
    <transition name="fade">
      <section v-if="books">
        <div class="container">
          <h1>All time favourites</h1>

          <div class="row">
            <div
              v-for="(book, index) in books"
              :key="index"
              :data-index="index"
              class="col col--xs-6 col--sm-3 col--md-2 col--lg-2"
            >
              <div class="book">
                <a :href="book.link">
                  <img :src="book.image_url" :alt="book.title" class="book-cover" />
                </a>
                <a :href="book.link">
                  <h4 class="book-title">{{ book.title }}</h4>
                  <h6>
                    <span v-for="(author, index) in book.authors" :key="index">
                      {{ author.name }}
                    </span>
                  </h6>
                </a>
              </div>
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
  bg: string = ''

  @State books: Book
  @State firstBookImageUrl

  @Action('getBooks') getBooks: any

  async asyncData({ store }) {
    await store.dispatch('getBooks');
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: (50 + $spacing-xl) 0 $spacing-xl;
}

.book {
  margin-bottom: $spacing-base;
  text-align: center;
}

.book-title {
  margin: 0;
}

.book-cover {
  margin-bottom: $spacing-sm;
}
</style>
