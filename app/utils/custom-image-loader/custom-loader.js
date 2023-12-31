export function normalizeUnsplashUrl(src) {
  const unsplashBaseUrl = "https://images.unsplash.com";

  if (src.slice(0, 4) === "http") {
    return new URL(src);
  } else {
    return new URL(`${unsplashBaseUrl}/${src[0] === "/" ? src.slice(1) : src}`);
  }
}

export const customLoader = ({ src, width, quality }) => {
  const url = normalizeUnsplashUrl(src);

  const params = url.searchParams;

  params.set("auto", params.getAll("auto").join(",") || "format");
  params.set("fit", params.get("fit") || "max");
  params.set("w", params.get("w") || width.toString());

  if (quality) {
    params.set("q", quality.toString());
  }

  return url.href;
};
