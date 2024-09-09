import { Avatar } from "@/(frontend)/_components/avatar";
import { Prose } from "@/components/Prose/Prose";
import Link from "next/link";

export function Intro() {
  return (
    <section className="relative mb-16 mt-16 md:mb-12">
      <div className="mx-auto flex w-fit items-center justify-between gap-4 pb-8 md:justify-normal">
        <h1 className="text-5xl font-bold leading-tight tracking-tighter md:pr-8 md:text-6xl">
          Kalle Ott
        </h1>
        <div className="md:px-12">
          <Avatar />
        </div>
      </div>
      <Prose>
        <p>
          I’m a technology leader with over 14 years of experience managing
          cross-functional engineering teams, driving agile processes, and
          building scalable software solutions. I’ve got a proven track record
          of aligning tech with business goals, fostering strong technical
          skills, and leading large-scale technology transformations. I’m
          passionate about building high-performance teams, mentoring talent,
          and pushing innovative strategies in fast-paced environments.
        </p>
        <p>
          If you think we should work together or want to have more details on
          my work experience, please reach out to me on{" "}
          <a
            className="underline"
            target="_blank"
            href="https://linkedin.com/in/kalle-ott"
          >
            LinkedIn
          </a>{" "}
          or <Link href="/contact">send me a message</Link>.
        </p>
      </Prose>
    </section>
  );
}
