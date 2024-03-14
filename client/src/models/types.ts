
export interface UserAuthentication {
  isAuthenticated: boolean;
}

export interface items {
  link: string;
  title: string;
  image: {
    byteSize: number;
  }
}

export interface user {
  name: string;
  id: string;
}

export interface searchInformation {
  formattedSearchTime: string;
}

export interface spelling {
  correctedQuery: string;
}


export interface FavoriteImage {
  title: string;
  byteSize: number;
  url: string;
}

export interface UserFavorites {
  user: string;
  favoriteImages: FavoriteImage[];
}

