"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "./UserProfileHeader.module.css";

export default function UserProfileHeader() {
  const { userData } = useSelector((state) => state.unsplash);

  return (
    <section className={styles.header}>
      <div className={styles.profile}>
        <Image
          src={userData?.profile_image?.medium}
          width={64}
          height={64}
          blurDataURL={`/_next/image?url=${encodeURIComponent(
            userData?.profile_image?.medium
          )}&q=1&w=64`}
          alt={`${userData?.username}_profile_photo`}
          className={styles.profilePhoto}
          quality={60}
        />
        <span className={styles.username}>{userData?.username}</span>
      </div>
      <div className={styles.bio}>
        <span>{userData?.bio}</span>
        <span className={styles.location}>📍 {userData?.location}</span>
        <span className={styles.location}>
          📸 {userData?.total_photos} Photos
        </span>
      </div>
    </section>
  );
}
