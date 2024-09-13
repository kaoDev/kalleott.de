import { cn } from "@/utilities/cn";
import { Prose } from "../Prose/Prose";
import {
	type NodeTypes,
	serializeSimpleLexical,
} from "./serializeSimpleLexical";

export interface SimpleRichTextContent {
	root: { children: NodeTypes[] };
}

type Props = {
	className?: string;
	content: SimpleRichTextContent;
	enableGutter?: boolean;
	enableProse?: boolean;
};

export function SimpleRichText({
	className,
	content,
	enableGutter = true,
	enableProse = true,
}: Props) {
	if (!content) {
		return null;
	}

	const classNames = cn(
		{
			"container ": enableGutter,
			"max-w-none": !enableGutter,
		},
		className,
	);

	const text = (
		<>
			{content &&
				!Array.isArray(content) &&
				typeof content === "object" &&
				"root" in content &&
				serializeSimpleLexical({ nodes: content?.root?.children })}
		</>
	);

	return enableProse ? (
		<Prose className={classNames}>{text}</Prose>
	) : (
		<div className={classNames}>{text}</div>
	);
}
