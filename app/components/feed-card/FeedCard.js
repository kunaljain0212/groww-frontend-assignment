import Link from "next/link";
import BlurHashImageWrapper from "../blur-hash-image-wrapper";
import styles from "./FeedCard.module.css";

export default function FeedCard({ imageData, isListView }) {
  return (
    <div key={imageData?.id} className={isListView ? null : styles.cardWrapper}>
      <div className={styles.card}>
        <Link href={`/user/${imageData?.user?.username}`}>
          <h2>{imageData?.user?.username}</h2>
        </Link>
        <p>{imageData?.description ?? imageData?.alt_description}</p>
        <BlurHashImageWrapper
          orgUrl={imageData?.urls?.regular}
          alt={imageData?.alt_description}
          width={imageData?.width}
          height={imageData?.height}
        />
        <span>❤️ {imageData?.likes} &nbsp;</span>
      </div>
    </div>
  );
}
