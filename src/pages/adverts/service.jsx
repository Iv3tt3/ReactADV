import { client } from "../../api/client";

const advertsURL = "/api/v1/adverts";

export const getAdverts = () => {
  const url = `${advertsURL}`;
  return client.get(url);
};

export const getAdvert = (tweetId) => {
  const url = `${advertsURL}/${tweetId}`;
  return client.get(url);
};

export const postAdvert = (data) => {
  return client.post(`${advertsURL}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAdvert = (tweetId) => {
  const url = `${advertsURL}/${tweetId}`;
  return client.delete(url);
};
