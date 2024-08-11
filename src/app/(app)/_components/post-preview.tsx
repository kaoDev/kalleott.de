import CoverImage from "@/components/cover-image";
import DateFormatter from "@/components/date-formatter";
import Link from "next/link";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

export function PostPreview({ title, coverImage, date, excerpt, slug }: Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage small slug={slug} title={title} src={coverImage} />
      </div>
      <Link href={`/posts/${slug}`} className="hover:underline">
        <h3 className="blog-title mb-3 text-3xl leading-snug">{title}</h3>
      </Link>
      <div className="mb-4 text-lg">
        <DateFormatter dateString={date} />
      </div>
      <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
    </div>
  );
}
