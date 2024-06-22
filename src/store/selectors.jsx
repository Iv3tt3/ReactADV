export const getIsLogged = (state) => state.auth;

export const areAdvertsLoaded = (state) => state.adverts.loaded;
export const listedAdverts = (state) => state.adverts.data;

export const availableTags = (state) => state.tags.data;
export const selectedTags = (state) => state.tags.filtered;