import Link from "next/link";
import { Prose } from "@/components/Prose/Prose";

export function ToolBox() {
	return (
		<Prose className="py-8">
			<h2>Tool Box</h2>
			<p>Here are some tools that I’ve built to help with various tasks.</p>
			<ul>
				<li>
					<Link href="/tool-box/readability-checker">Readability Checker</Link>
				</li>
				<li>
					<Link href="/tool-box/qr-code-generator">QR Code generator</Link>
				</li>
			</ul>
		</Prose>
	);
}
