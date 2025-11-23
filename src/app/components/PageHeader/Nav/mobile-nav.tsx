"use client";

import { Logo } from "@/components/Logo/Logo";
import { cn } from "@/utilities";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import type { Header as HeaderType } from "../../../../payload-types";
import { Button } from "../../ui/button";
import { ScrollArea } from "../../ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";

export function MobileNav({ header }: { header: HeaderType }) {
	const [open, setOpen] = React.useState(false);

	const navItems = header.navItems ?? [];

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white min-[440px]:hidden"
				>
					<svg
						strokeWidth="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
					>
						<title>menu</title>
						<path
							d="M3 5H11"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M3 12H16"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M3 19H21"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="pr-0">
				<MobileLink
					href="/"
					className="flex items-center"
					onOpenChange={setOpen}
				>
					<Logo />
				</MobileLink>
				<ScrollArea className="my-6 h-[calc(100vh-8rem)] pb-10 pl-6">
					<div className="flex flex-col space-y-3">
						{navItems.map(
							(item) =>
								item.link.url && (
									<MobileLink
										key={item.id}
										href={item.link.url}
										onOpenChange={setOpen}
									>
										{item.link.label}
									</MobileLink>
								),
						)}
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}

interface MobileLinkProps extends LinkProps {
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
	className?: string;
}

function MobileLink({
	href,
	onOpenChange,
	className,
	children,
	...props
}: MobileLinkProps) {
	const router = useRouter();
	return (
		<Link
			href={href}
			onClick={() => {
				router.push(href.toString());
				onOpenChange?.(false);
			}}
			className={cn(className)}
			{...props}
		>
			{children}
		</Link>
	);
}
