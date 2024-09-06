import { HeroPost } from './_components/hero-post'
import configPromise from '@payload-config'
import { Intro } from './_components/intro'
import { MoreStories } from './_components/more-stories'
import { Container } from './_components/container'
import { SubscribeToUpdatesForm } from './_components/subscribe-to-updates-form'
import { differenceInMonths } from 'date-fns'
import { HotSauceIntro } from './_components/hot-sauce-intro'
import { Post } from 'src/payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export default async function Index() {
  const payload = await getPayloadHMR({ config: configPromise })

  const allPosts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    sort: '-publishedAt',
  })

  const currentData = new Date()

  const currentPosts: Post[] = []
  const writingsFromThePast: Post[] = []

  for (const post of allPosts.docs) {
    // show posts from the last 3 years as relevant
    const diff = differenceInMonths(currentData, new Date(post.publishedAt ?? 0))
    if (diff <= 36) {
      currentPosts.push(post)
    } else {
      writingsFromThePast.push(post)
    }
  }

  const heroPost = currentPosts[0]
  const morePosts = currentPosts.slice(1)

  return (
    <Container>
      <Intro />
      <HotSauceIntro />
      <h2 id="blog" className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        Blog
      </h2>
      {heroPost && heroPost.slug ? (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.hero}
          date={heroPost.createdAt}
          slug={heroPost.slug}
          excerpt={heroPost.meta?.description}
        />
      ) : null}
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      {writingsFromThePast.length > 0 && (
        <MoreStories title="Writings from the past" posts={writingsFromThePast} />
      )}
      <SubscribeToUpdatesForm />
    </Container>
  )
}
