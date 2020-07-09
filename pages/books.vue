<template>
  <div class="page">
    <transition name="fade">
      <section v-if="currentBooks" class="section">
        <div class="container">
          <h1>Currently Reading</h1>

          <div class="row">
            <div
              v-for="(book, index) in currentBooks"
              :key="index"
              :data-index="index"
              class="book-col col col--xs-6 col--sm-4 col--md-3 col--lg-3"
            >
              <div class="row book">
                <div class="left col col--xs-6 col--sm-4 col--md-4 col--lg-4">
                  <a
                    :href="book.link"
                    target="_blank"
                    ref="noopener"
                  >
                    <img :src="book.image_url" :alt="book.title" class="book-cover" />
                  </a>
                </div>
                <div class="right col col--xs-6 col--sm-8 col--md-8 col--lg-8">
                  <a
                    :href="book.link"
                    target="_blank"
                    ref="noopener"
                  >
                    <h2 class="book-title">{{ book.title }}</h2>
                    <h3 class="book-author">
                      <span v-for="(author, index) in book.authors" :key="index">
                        {{ author.name }}
                      </span>
                    </h3>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </transition>
    <transition name="fade">
      <section v-if="books" class="section">
        <div class="container">
          <h1>All-time Favourites</h1>

          <div class="row">
            <div
              v-for="(book, index) in books"
              :key="index"
              :data-index="index"
              class="book-col col col--xs-6 col--sm-4 col--md-3 col--lg-3"
            >
              <div class="row book">
                <div class="left col col--xs-6 col--sm-4 col--md-4 col--lg-4">
                  <a
                    :href="book.link"
                    target="_blank"
                    ref="noopener"
                  >
                    <img :src="book.image_url" :alt="book.title" class="book-cover" />
                  </a>
                </div>
                <div class="right col col--xs-6 col--sm-8 col--md-8 col--lg-8">
                  <a
                    :href="book.link"
                    target="_blank"
                    ref="noopener"
                  >
                    <h2 class="book-title">{{ book.title }}</h2>
                    <h3 class="book-author">
                      <span v-for="(author, index) in book.authors" :key="index">
                        {{ author.name }}
                      </span>
                    </h3>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="books-footer">
          <a href="https://www.goodreads.com/user/show/90882699-lukas-juhas" class="see-more" target="_blank" rel="noopener"
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
import {
  State,
  Action,
} from 'vuex-class'
import { Book, RootState } from '~/types'

@Component({
  async asyncData(context: any) {
    await context.store.dispatch('getBooks')
    await context.store.dispatch('getCurrentBooks')
  }
})
export default class Books extends Vue {
  bg: string = ''

  get currentBooks() {
      return (this.$store.getters as RootState).currentBooks
  }

  get books() {
      return (this.$store.getters as RootState).books
  }

  get firstBookImageUrl() {
      return (this.$store.getters as RootState).firstBookImageUrl
  }

  @Action('getBooks') getBooks: any
  @Action('getCurrentBooks') getCurrentBooks: any
}
</script>

<style lang="scss" scoped>
.page {
  padding: (110 + $spacing-xl) 0 $spacing-xl;
}

.section {
  margin-bottom: $spacing-xl;
}

.book {
  margin-bottom: $spacing-base;

  a {
    text-decoration: none;
  }

  .left {
    flex: 0 0 118px;
  }

  @include resp-max($breakpoint-sm) {
    .col {
      max-width: initial;
    }

    .right {
      flex: 1 0 0;
    }
  }
}

.book-title {
  margin: 0;
  font-size: $font-size-sm;
}

.book-author {
  font-size: $font-size-xs;
  color: lighten($col-text, 50);
}

.book-cover {
  max-width: 100%;
  height: auto;
}

.books-footer {
  text-align: center;
  padding: $spacing-xl 0;
}

@include resp-max($breakpoint-xs) {
  .book-col {
    flex-basis: 100%;
    max-width: 100%;
  }
}
</style>
