import Link from 'next/link'
import { Post } from 'src/payload-types'
import { CoverImage } from './cover-image'
import { DateFormatter } from './date-formatter'

type Props = {
  title: string
  coverImage: Post['hero']
  date: string | null | undefined
  excerpt: string | null | undefined
  slug: string
}

export function PostPreview({ title, coverImage, date, excerpt, slug }: Props) {
  return (
    <div>
      <div className="mb-5">
        {coverImage ? <CoverImage small slug={slug} title={title} src={coverImage} /> : null}
      </div>
      <Link href={`/posts/${slug}`} className="hover:underline">
        <h3 className="blog-title mb-3 text-3xl leading-snug">{title}</h3>
      </Link>
      <div className="mb-4 text-lg">{date ? <DateFormatter dateString={date} /> : null}</div>
      <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
    </div>
  )
}
