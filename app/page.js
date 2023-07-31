import Feed from "./components/feed";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <main className={styles.main}>
      <Feed />
    </main>
  );
}
