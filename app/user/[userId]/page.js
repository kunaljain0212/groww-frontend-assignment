import UserProfileHeader from "@/app/components/user-profile-header/UserProfileHeader";
import Feed from "@/app/components/feed";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const username = params.userId;

  return {
    title: username,
    description: `Photos from ${username}`,
  };
}

export default function Profile({ params }) {
  return (
    <main className={styles.main}>
      <UserProfileHeader username={params.userId} />
      <div className={styles.separator}></div>
      <Feed isUserProfile={true} username={params.userId} />
    </main>
  );
}
