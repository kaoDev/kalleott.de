"use client";

import dynamic from "next/dynamic";
import { Prose } from "@/components/Prose/Prose";

const ReadabilityCheckerClient = dynamic(
	() =>
		import("./_components/clientApp").then((m) => m.ReadabilityCheckerClient),
	{
		loading: () => <p>Loading...</p>,
		ssr: false,
	},
);

export default function ReadabilityChecker() {
	return (
		<div className="container pb-32">
			<Prose>
				<h1>Readability Checker</h1>
				<p>
					This tool allows you to quickly check the contrast ratios between
					different sets of colors to ensure they meet accessibility standards.
				</p>
				<p>
					The readability result is based on the{" "}
					<a
						href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
						target="_blank"
						rel="noopener"
					>
						WCAG 2.0 guidelines
					</a>
					, which are implemented in the{" "}
					<a
						href="https://color2k.com/#has-bad-contrast"
						target="_blank"
						rel="noopener"
					>
						color2k
					</a>{" "}
					library.
				</p>
			</Prose>
			<ReadabilityCheckerClient />
		</div>
	);
}
