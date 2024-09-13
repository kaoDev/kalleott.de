import type React from "react";

export type HtmlBlockProps = {
	code: string;
	blockType: "html";
};

type Props = HtmlBlockProps & {
	className?: string;
};

export const HtmlBlock: React.FC<Props> = ({ className, code }) => {
	return (
		<div
			className={[className, "not-prose"].filter(Boolean).join(" ")}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: This is a block for adding custom HTML, so it's expected that the HTML will be set dangerously
			dangerouslySetInnerHTML={{ __html: code }}
		/>
	);
};
