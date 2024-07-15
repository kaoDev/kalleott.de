import Container from "@/components/container";
import Header from "./_components/header";

export default async function Page() {
  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <h1 className="blog-title mb-12 text-center text-5xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
            Kalle’s Chili Corner
          </h1>
          <div className="prose dark:prose-invert prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600 lg:prose-xl mx-auto max-w-2xl">
            <p>
              A few years ago I started growing my own chilies and it kind of
              got out of hand. I had too many chilies to eat fresh, so I started
              looking for recipes to get an understanding of the composition of
              hot sauces and started experimenting.
            </p>
            <p>
              I started giving away bottles to friends and family, if you are
              interested in trying some, let me know!
            </p>
          </div>
        </article>
      </Container>
    </main>
  );
}
