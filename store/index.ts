import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState, Photo } from '~/types';
import axios from 'axios';

export const state = (): RootState => ({
  loading: false,
  photos: [],
  firstPhotoUrl: '',
  theme: 'light',
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
};

export const actions: ActionTree<RootState, RootState> = {
  // async nuxtServerInit({ commit }, { app }) {
  // //
  // },
  async getPhotos({ commit }) {
    await axios
      .get(
        `https://api.instagram.com/v1/users/self/media/recent?access_token=${
          process.env.INSTAGRAM_ACCESS_TOKEN
        }&count=3` // update count when more posts with new grid are up.
      )
      .then(response => {
        commit('setPhotos', response.data.data);
        commit('setFirstPhotoUrl', response.data.data[0].images.standard_resolution.url);
      });
  },
};
