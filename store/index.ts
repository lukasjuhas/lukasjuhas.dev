import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState, Photo } from '~/types';
import axios from 'axios';

export const state = (): RootState => ({
  loading: false,
  photos: [],
  firstPhotoUrl: '',
  theme: 'light',
  bg: '',
});

export const getters: GetterTree<RootState, RootState> = {
  theme(localState: RootState) {
    return localState.theme;
  },

  bg(localState: RootState) {
    return localState.bg;
  },

  photos(localState: RootState) {
    return localState.photos;
  },

  firstPhotoUrl(localState: RootState) {
    return localState.firstPhotoUrl;
  },
};

export const mutations: MutationTree<RootState> = {
  setPhotos(localState: RootState, photos: Photo[]): void {
    localState.photos = photos;
  },

  setFirstPhotoUrl(localState: RootState, url): void {
    localState.firstPhotoUrl = url;
  },

  setTheme(localState: RootState, theme): void {
    localState.theme = theme;
  },

  setBg(localState: RootState, bg): void {
    localState.bg = bg;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async getPhotos({ commit }) {
    try {
      const tokenResponse = await axios.get('https://ig.instant-tokens.com/users/11ae0c52-8c0d-47c7-b146-dec0e2c3aeda/instagram/17841401548274180/token?userSecret=4d9tnd77d9uiuyll5fm22');
      const response = await axios
      .get(
        `https://graph.instagram.com/17841401548274180/media?fields=media_url,caption&access_token=${
          tokenResponse.data.Token
        }`
      )

      const photos = response.data.data.slice(0, 18);
      commit('setPhotos', photos);
      commit('setFirstPhotoUrl', photos[0].media_url);

      return photos;
    } catch (error) {
      // in case we wanna show error page
      // return Promise.reject(error);
    }
  },
};
