import { Media } from 'src/payload-types'
import { CoverImage } from './cover-image'
import { DateFormatter } from './date-formatter'
import Link from 'next/link'

type Props = {
  title: string
  coverImage: number | Media | null | undefined
  date: string
  excerpt: string | null | undefined
  slug: string
}

export function HeroPost({ title, coverImage, date, excerpt, slug }: Props) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        {coverImage ? <CoverImage title={title} src={coverImage} slug={slug} /> : null}
      </div>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h2 className="blog-title mb-4 text-4xl leading-tight lg:text-5xl">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h2>
          <div className="mb-4 text-lg md:mb-0">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
        </div>
      </div>
    </section>
  )
}
