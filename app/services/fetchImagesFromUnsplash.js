import { unsplashAPIToken } from "../utils/constants";

export default async function fetchImagesFromUnsplash(
  username,
  page,
  isUserProfile
) {
  const res = await fetch(
    isUserProfile
      ? `https://api.unsplash.com/users/${username}/photos?page=${page}&&per_page=10&&client_id=${unsplashAPIToken}`
      : `https://api.unsplash.com/photos?page=${page}&&per_page=10&&client_id=${unsplashAPIToken}`,
    { next: { revalidate: 30 } }
  );
  return res;
}
