export function Intro() {
  return (
    <section className="mb-16 mt-16 md:mb-12">
      <h1 className="pb-4 text-5xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
        Hi! <br /> I’m Kalle 👋
      </h1>
      <p className="text-lg md:pr-8 md:text-2xl">
        a software engineer working in the Berlin startup scene. This is my blog
        where I write about software engineering, programming, and other things
        that interest me.
      </p>
      <p className="text-lg md:pr-8 md:text-2xl">
        If you want to get in touch, you can find me on{" "}
        <a
          className="hover:underline"
          target="_blank"
          href="https://linkedin.com/in/kalle-ott"
        >
          LinkedIn
        </a>
        , on{" "}
        <a
          className="hover:underline"
          target="_blank"
          href="https://github.com/kaoDev"
        >
          GitHub
        </a>{" "}
        or{" "}
        <a
          className="hover:underline"
          target="_blank"
          href="https://www.instagram.com/kalle_ott/"
        >
          Instagram
        </a>
        .
      </p>
    </section>
  );
}
