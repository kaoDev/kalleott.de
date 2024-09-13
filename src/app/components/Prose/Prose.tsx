import { cn } from "@/utilities/cn";

export function Prose(props: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"prose mx-auto max-w-2xl lg:prose-xl dark:prose-invert prose-headings:underline prose-img:rounded-xl",
				props.className,
			)}
		>
			{props.children}
		</div>
	);
}
