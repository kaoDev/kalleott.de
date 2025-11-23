"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import type { PayloadAdminBarProps, PayloadMeUser } from "payload-admin-bar";
import { PayloadAdminBar } from "payload-admin-bar";
import type React from "react";
import { useCallback, useState } from "react";
import { cn } from "@/utilities/cn";

const collectionLabels = {
	pages: {
		plural: "Pages",
		singular: "Page",
	},
	posts: {
		plural: "Posts",
		singular: "Post",
	},
	projects: {
		plural: "Projects",
		singular: "Project",
	},
} as const;

const Title: React.FC = () => <span>Dashboard</span>;

export const AdminBar: React.FC<{
	adminBarProps?: PayloadAdminBarProps;
}> = (props) => {
	const { adminBarProps } = props || {};
	const segments = useSelectedLayoutSegments();
	const [show, setShow] = useState(false);
	const collectionSegment = segments?.[1];
	const collection =
		collectionSegment && collectionSegment in collectionLabels
			? (collectionSegment as keyof typeof collectionLabels)
			: "pages";

	const onAuthChange = useCallback((user: PayloadMeUser) => {
		setShow(user?.id != null);
	}, []);

	return (
		<div
			className={cn("bg-black py-2 text-white", {
				block: show,
				hidden: !show,
			})}
		>
			<div className="container">
				<PayloadAdminBar
					{...adminBarProps}
					className="py-2 text-white"
					classNames={{
						controls: "font-medium text-white",
						logo: "text-white",
						user: "text-white",
					}}
					cmsURL={process.env.NEXT_PUBLIC_SERVER_URL}
					collection={collection}
					collectionLabels={{
						plural: collectionLabels[collection]?.plural || "Pages",
						singular: collectionLabels[collection]?.singular || "Page",
					}}
					logo={<Title />}
					onAuthChange={onAuthChange}
					style={{
						backgroundColor: "transparent",
						padding: 0,
						position: "relative",
						zIndex: "unset",
					}}
				/>
			</div>
		</div>
	);
};
