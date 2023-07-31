import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import styles from "./page.module.css";
import "./globals.css";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
