"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FeedCard from "../feed-card";
import styles from "./feed.module.css";

export default function Feed({ isUserProfile, username }) {
  const [images, setImages] = useState([]);
  const [isListView, setIsListView] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const cardRef = useRef();

  function toggleView() {
    setIsListView((prevState) => !prevState);
  }

  function incrementPageNumber() {
    setPage(page + 1);
  }

  async function getPhotos() {
    const res = await fetch(
      isUserProfile
        ? `https://api.unsplash.com/users/${username}/photos?page=${page}&&per_page=10&&client_id=mNWyX3YH8mMSq4XVja87Vlf1AUipq21-PQRPNn3bgs4`
        : `https://api.unsplash.com/photos?page=${page}&&per_page=10&&client_id=mNWyX3YH8mMSq4XVja87Vlf1AUipq21-PQRPNn3bgs4`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) {
      console.log("got vcalled");
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    setImages((prev) => [...prev, ...data]);
    setHasMore(true);
  }

  useEffect(() => {
    getPhotos();
  }, [page]);

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          incrementPageNumber();
        }
      },
      { threshold: 1 }
    );

    observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [images]);

  return (
    <div className={isListView ? styles.feed : styles.feedGrid}>
      <div className={styles.viewToggle} onClick={toggleView}>
        <Image
          src={isListView ? "/images/icons/grid.png" : "/images/icons/list.png"}
          alt={isListView ? "grid view" : "list view"}
          width={24}
          height={24}
        />
      </div>
      {images.map((imageData, index) => {
        return (
          <FeedCard
            key={imageData?.id}
            imageData={imageData}
            isListView={isListView}
          />
        );
      })}
      <div ref={cardRef} className={styles.separator}></div>
    </div>
  );
}
