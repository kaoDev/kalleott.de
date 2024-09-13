import { Prose } from "@/components/Prose/Prose";

export function ToolBox() {
	return (
		<Prose className="py-8">
			<h2>Tool Box</h2>
			<p>Here are some tools that I’ve built to help with various tasks.</p>
			<ul>
				<li>
					<a href="/tool-box/readability-checker">Readability Checker</a>
				</li>
			</ul>
		</Prose>
	);
}
