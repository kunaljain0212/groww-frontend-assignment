"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import FeedCard from "../feed-card";
import fetchImagesFromUnsplash from "@/app/services/fetchImagesFromUnsplash";
import {
  setPhotosLoading,
  setPhotosLoadingFailure,
  setPhotosLoadingSuccess,
} from "@/app/store/slices/unsplashSlice";
import styles from "./feed.module.css";

export default function Feed({ isUserProfile, username }) {
  const [images, setImages] = useState([]);
  const [isListView, setIsListView] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const cardRef = useRef();

  const dispatch = useDispatch();
  const { isPhotosLoading, error } = useSelector((state) => state.unsplash);

  function toggleView() {
    setIsListView((prevState) => !prevState);
  }

  function incrementPageNumber() {
    setPage(page + 1);
  }

  async function getPhotos() {
    dispatch(setPhotosLoading());
    const res = await fetchImagesFromUnsplash(username, page, isUserProfile);
    if (!res.ok) {
      dispatch(setPhotosLoadingFailure("Error fetching photos from Unsplash"));
    }
    const data = await res.json();
    dispatch(setPhotosLoadingSuccess());
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
      {isPhotosLoading && <p>Loading...</p>}
      <div ref={cardRef} className={styles.separator}></div>
    </div>
  );
}
