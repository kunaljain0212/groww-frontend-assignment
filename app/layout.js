import Image from "next/image";
import "./globals.css";
import styles from "./page.module.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HODLgram",
  description:
    "A platform where social investors collaborate to make better decisions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className={styles.nav}>
          <Link href="/">
            <Image
              src="/groww-light.svg"
              alt="Groww Logo"
              width={100}
              height={24}
              priority
            />
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
