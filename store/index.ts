import { MutationTree, ActionTree } from 'vuex';
import { RootState, Photo } from '~/types';
import axios from 'axios';

export const state = (): RootState => ({
  loading: false,
  photos: [],
  firstPhotoUrl: '',
});

export const mutations: MutationTree<RootState> = {
  setPhotos(state: RootState, photos: Photo[]): void {
    state.photos = photos;
  },

  setFirstPhotoUrl(state: RootState, url): void {
    state.firstPhotoUrl = url;
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
        }`
      )
      .then(response => {
        commit('setPhotos', response.data.data);
        commit('setFirstPhotoUrl', response.data.data[0].images.standard_resolution.url);
      });
  },
};
