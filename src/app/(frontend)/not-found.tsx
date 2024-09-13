import { Prose } from "@/components/Prose/Prose";
import Link from "next/link";
import React from "react";
import { Button } from "../components/ui/button";

export default function NotFound() {
	return (
		<div className="container py-28">
			<Prose>
				<h1 style={{ marginBottom: 0 }}>404</h1>
				<p className="mb-4">This page could not be found.</p>
			</Prose>
			<Button asChild variant="default">
				<Link href="/">Go home</Link>
			</Button>
		</div>
	);
}
