import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState, Photo, Book } from '~/types';
import axios from 'axios';
import parser from 'fast-xml-parser';

export const state = (): RootState => ({
  loading: false,
  photos: [],
  firstPhotoUrl: '',
  theme: 'light',
  bg: '',
  books: [],
  currentBooks: [],
  firstBookImageUrl: '',
});

export const getters: GetterTree<RootState, RootState> = {
  theme(state: RootState) {
    return state.theme;
  },
};

export const mutations: MutationTree<RootState> = {
  setPhotos(state: RootState, photos: Photo[]): void {
    state.photos = photos;
  },

  setFirstPhotoUrl(state: RootState, url): void {
    state.firstPhotoUrl = url;
  },

  setTheme(state: RootState, theme): void {
    state.theme = theme;
  },

  setBg(state: RootState, bg): void {
    state.bg = bg;
  },

  setBooks(state: RootState, books: Book[]): void {
    state.books = books;
  },

  setCurrentBooks(state: RootState, books: Book[]): void {
    state.currentBooks = books;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async getPhotos({ commit }) {
    await axios
      .get(
        `https://api.instagram.com/v1/users/self/media/recent?access_token=${
          process.env.INSTAGRAM_ACCESS_TOKEN
        }&count=18`
      )
      .then(response => {
        commit('setPhotos', response.data.data);
        commit('setFirstPhotoUrl', response.data.data[0].images.standard_resolution.url);
      });
  },

  async getBooks({ commit }) {
    // ¯\_(ツ)_/¯
    // https://www.goodreads.com/topic/show/17893514-cors-access-control-allow-origin
    await axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list/90882699.xml?key=${process.env.GOODREADS_API_KEY}&shelf=favourites&sort=position`
      , {
        headers: {
          origin: process.env.baseUrl,
        }
      })
      .then(response => {
        const json = parser.parse(response.data);
        commit('setBooks', json.GoodreadsResponse.books.book);
      })
  },

  async getCurrentBooks({ commit }) {
    // ¯\_(ツ)_/¯
    // https://www.goodreads.com/topic/show/17893514-cors-access-control-allow-origin
    await axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list/90882699.xml?key=${process.env.GOODREADS_API_KEY}&shelf=currently-reading&sort=position`
      , {
        headers: {
          origin: process.env.baseUrl,
        }
      })
      .then(response => {
        const json = parser.parse(response.data);
        commit('setCurrentBooks', json.GoodreadsResponse.books.book);
      })
  }
};
