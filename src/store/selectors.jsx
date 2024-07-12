export const getIsLogged = (state) => state.auth;

export const getAdverts = (state) => state.adverts.data;

export const getAdvert = (advertId) => (state) =>
  getAdverts(state).find((advert) => advert.id === advertId);

export const getUi = (state) => state.ui;

export const areAdvertsLoaded = (state) => state.adverts.loaded;

export const areTagsLoaded = (state) => state.tags.loaded;

export const getTags = (state) => state.tags.data;
export const getSelectedTags = (state) => state.tags.selected;

export const getTagsFromAds = (state) => {
  const adverts = state.adverts.data;
  const tags = [];
  adverts.map((advert) => {
    advert.tags.map((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  return tags;
};
