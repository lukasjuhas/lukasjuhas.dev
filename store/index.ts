import { MutationTree, ActionTree } from 'vuex';
import { RootState, Photo } from '~/types';

export const state = (): RootState => ({
  loading: false,
  photos: [],
});

export const mutations: MutationTree<RootState> = {
  setPhotos(state: RootState, photos: Photo[]): void {
    state.photos = photos;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }, { app }) {
    const photos: Photo[] = await app.$axios.$get('recent-photos');
    commit('setPhoto', photos);
  },
};
