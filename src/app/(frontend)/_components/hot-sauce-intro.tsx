import Link from 'next/link'

export function HotSauceIntro() {
  return (
    <section className="relative mb-16 mt-16 md:mb-12">
      <Link className="" href="/chili-corner">
        <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter hover:underline md:text-7xl">
          Kalle’s Chili 🌶️ Corner
        </h2>
        <p className="text-lg md:pr-8 md:text-2xl">
          Besides coding, I have a passion for growing chilies and making hot sauce. On this page I
          will share some of my recipes and experiences, and if you are interested in trying some,
          let me know!
        </p>
      </Link>
    </section>
  )
}
