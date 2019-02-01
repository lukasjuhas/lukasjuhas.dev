import { Photo } from '~/types';

export interface RootState {
  loading: boolean;
  photos: Photo[];
  firstPhotoUrl: string;
}
