import { cn } from "@/utilities/cn";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type React from "react";
import { Fragment } from "react";
import { AdminBar } from "../components/AdminBar";
import { LivePreviewListener } from "../components/LivePreviewListener";
import { PageFooter } from "../components/PageFooter";
import { PageHeader } from "../components/PageHeader";
import { Providers } from "../providers";
import { InitTheme } from "../providers/Theme/InitTheme";
import "./globals.css";

export default async function RootLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<html
			className={cn(GeistSans.variable, GeistMono.variable)}
			lang="en"
			suppressHydrationWarning
		>
			<head>
				{["light", "dark"].map((theme) => (
					<Fragment key={theme}>
						<link
							rel="icon"
							href={`/images/favicon/${theme}/icon.svg`}
							media={`(prefers-color-scheme: ${theme})`}
							type="image/svg+xml"
						/>
						<link
							rel="apple-touch-icon"
							href={`/images/favicon/${theme}/apple-touch-icon.png`}
							media={`(prefers-color-scheme: ${theme})`}
							type="image/svg+xml"
						/>
					</Fragment>
				))}
				<InitTheme />
			</head>
			<body className="flex min-h-lvh flex-col">
				<Providers>
					<AdminBar />
					<LivePreviewListener />

					<PageHeader />
					<main>{children}</main>
					{modal}
					<div className="flex-1" />
					<PageFooter />
				</Providers>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}

export const metadata: Metadata = {
	title: "Kalle Ott",
	description:
		"Hi I'm Kalle, a software engineer working in the Berlin startup scene. This is my blog where I write about software engineering, programming, and other things that interest me.",
};
