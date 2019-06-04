import { Photo, Book } from '~/types';

export interface RootState {
  loading: boolean;
  photos: Photo[];
  firstPhotoUrl: string;
  theme: string;
  bg: string;
  books: Book[];
  currentBooks: Book[];
  firstBookImageUrl: string;
}
