import { unsplashAPIToken } from "../utils/constants";

export default async function fetchUserDataFromUnsplash(username) {
  const res = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${unsplashAPIToken}`,
    { next: { revalidate: 30 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res;
}
