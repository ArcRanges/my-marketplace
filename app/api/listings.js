import client from "./client";

const endpoint = "/listings";

const getListings = (query, page, sort) => {
  let url = `${endpoint}`;
  query && (url += "/" + query);
  page && (url += "/" + page);
  sort && (url += "/" + sort);
  return client.get(url);
};

const addListing = (listing, onUploadProgress) => {
  const { title, description, category, price, location, images } = listing;

  const data = {
    title,
    description,
    category: category._id,
    price,
    location,
    images,
  };

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const editListing = (id, listing, onUploadProgress) => {
  return client.put(endpoint + `/${id}`, listing, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const removeListing = (id) => {
  console.log(id);
  return client.delete(endpoint + `/${id}`);
};

export default {
  getListings,
  addListing,
  editListing,
  removeListing,
};
