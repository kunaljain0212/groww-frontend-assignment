"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./UserProfileHeader.module.css";

export default function UserProfileHeader({ username }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const res = await fetch(
        `https://api.unsplash.com/users/${username}?client_id=mNWyX3YH8mMSq4XVja87Vlf1AUipq21-PQRPNn3bgs4`,
        { next: { revalidate: 30 } }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setUser(data);
    }
    getUser();
  }, [username]);

  return (
    <section className={styles.header}>
      <div className={styles.profile}>
        <Image
          src="https://images.unsplash.com/profile-1657957024964-94172b775f80image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64"
          width={64}
          height={64}
          alt={`${username}_profile_photo`}
          className={styles.profilePhoto}
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
