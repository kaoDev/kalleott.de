import cn from "classnames";
import Image from "next/image";
import { getImageDimensions, getPlaceholderImage } from "@/lib/imageUtils";
import Link from "next/link";

type Props = {
  title: string;
  src: string;
  slug?: string;
  small?: boolean;
};

async function CoverImage({ title, src, slug, small }: Props) {
  const localImagePath = src.startsWith("/images");

  let width = 1792;
  let height = 1024;
  let blurDataURL: `data:image/${string}` | undefined;

  if (localImagePath) {
    const dimensions = getImageDimensions(src);
    width = dimensions.width ?? width;
    height = dimensions.height ?? height;

    blurDataURL = (await getPlaceholderImage(src)).placeholder;
  }

  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("blog-cover-image w-full shadow-sm", {
        "transition-shadow duration-200 hover:shadow-lg": slug,
      })}
      width={width}
      height={height}
      priority={!small}
      placeholder={blurDataURL}
      blurDataURL={blurDataURL}
      sizes={
        small
          ? "(max-width: 768px) 100vw, (max-width: 1368px) 50vw, 684px"
          : "(max-width: 1500px) 100vw, 1500px"
      }
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}

export default CoverImage;
