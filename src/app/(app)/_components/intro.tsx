import Link from "next/link";
import { Avatar } from "./avatar";

export function Intro() {
  return (
    <section className="relative mb-16 mt-16 md:mb-12">
      <div className="flex justify-between gap-4 pb-8 md:justify-normal">
        <h1 className="text-5xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
          Hi! <br /> I’m Kalle 👋
        </h1>
        <div className="md:px-12">
          <Avatar />
        </div>
      </div>
      <p className="text-lg md:pr-8 md:text-2xl">
        a software engineer working in the Berlin startup scene. This is my blog
        where I write about software engineering, programming, and other things
        that interest me.
      </p>
      <p className="text-lg md:pr-8 md:text-2xl">
        If you want to get in touch, you can find me on{" "}
        <a
          className="underline"
          target="_blank"
          href="https://linkedin.com/in/kalle-ott"
        >
          LinkedIn
        </a>
        , on{" "}
        <a
          className="underline"
          target="_blank"
          href="https://github.com/kaoDev"
        >
          GitHub
        </a>{" "}
        or{" "}
        <a
          className="underline"
          target="_blank"
          href="https://www.instagram.com/kalle_ott/"
        >
          Instagram
        </a>
        . Or you can{" "}
        <Link className="underline" href="#mailing-list">
          leave your email below
        </Link>{" "}
        if you want to receive updates.
      </p>
    </section>
  );
}
