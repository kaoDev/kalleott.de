import Link from "next/link";
import { Prose } from "@/components/Prose/Prose";
import { Avatar } from "./avatar";

export function Intro() {
	return (
		<section className="relative mb-16 mt-16 md:mb-12">
			<div className="flex justify-between gap-4 pb-8 md:justify-center">
				<h1 className="text-5xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
					Hi! <br /> I’m Kalle 👋
				</h1>
				<div className="md:px-12">
					<Avatar />
				</div>
			</div>
			<Prose>
				<p className="text-lg md:pr-8 md:text-2xl">
					a software engineer working in the Berlin startup scene. You found my
					personal website, where I write about software engineering,
					programming, and other things that interest me.
				</p>
				<p className="text-lg md:pr-8 md:text-2xl">
					Besides coding I like to cook hot sauces, the recipes are in{" "}
					<Link className="underline" href="/chili-corner">
						my chili corner
					</Link>
					. I also like to take pictures, you can find them on{" "}
					<a
						className="underline"
						target="_blank"
						href="https://www.instagram.com/kalle_ott/"
						rel="noopener"
					>
						Instagram
					</a>
				</p>
			</Prose>
		</section>
	);
}
