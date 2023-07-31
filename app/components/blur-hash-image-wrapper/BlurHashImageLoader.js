"use client";

import Image from "next/image";
import { customLoader } from "@/app/utils/custom-image-loader";

export default function BlurHashImageWrapper({ orgUrl, width, height, alt }) {
  return (
    <Image
      // loader={customLoader}
      style={{
        width: "100%",
        height: "auto",
        borderRadius: "8px",
      }}
      src={orgUrl}
      alt={alt}
      blurDataURL={`/_next/image?url=${encodeURIComponent(orgUrl)}&q=1&w=128`}
      placeholder="blur"
      width={width}
      height={height}
      quality={60}
    />
  );
}
