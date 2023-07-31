"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import fetchUserDataFromUnsplash from "@/app/services/fetchUserDataFromUnsplash";
import styles from "./UserProfileHeader.module.css";

export default function UserProfileHeader({ username }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const res = await fetchUserDataFromUnsplash(username);
      const data = await res.json();
      setUser(data);
    }
    getUser();
  }, [username]);

  return (
    <section className={styles.header}>
      <div className={styles.profile}>
        <Image
          src={user?.profile_image?.medium}
          width={64}
          height={64}
          blurDataURL={`/_next/image?url=${encodeURIComponent(
            user?.profile_image?.medium
          )}&q=1&w=64`}
          alt={`${username}_profile_photo`}
          className={styles.profilePhoto}
          quality={60}
        />
        <span className={styles.username}>{username}</span>
      </div>
      <div className={styles.bio}>
        <span>{user?.bio}</span>
        <span className={styles.location}>📍 {user?.location}</span>
        <span className={styles.location}>📸 {user?.total_photos} Photos</span>
      </div>
    </section>
  );
}
