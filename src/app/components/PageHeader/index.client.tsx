"use client";

import type React from "react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import type { Theme } from "@/providers/Theme/types";

interface HeaderClientProps {
	children: ReactNode;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ children }) => {
	const [theme, setTheme] = useState<Theme | undefined>(undefined);
	const [isHeroVisible, setIsHeroVisible] = useState(true);
	const headerTheme = useHeaderTheme();
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		// Only set up scroll detection if headerTheme is "dark" (high impact hero)
		if (headerTheme !== "dark") {
			// Clean up observer if theme is not dark
			if (observerRef.current) {
				observerRef.current.disconnect();
				observerRef.current = null;
			}
			setIsHeroVisible(true);
			// Set theme directly from headerTheme when not dark
			setTheme(headerTheme);
			return;
		}

		// Find the high impact hero section
		const heroSection = document.querySelector(
			'[data-hero-section="highImpact"]',
		);

		if (!heroSection) {
			setIsHeroVisible(true);
			setTheme("dark");
			return;
		}

		// Check initial visibility
		const rect = heroSection.getBoundingClientRect();
		const initialVisible =
			rect.top < window.innerHeight - 100 && rect.bottom > 100;
		setIsHeroVisible(initialVisible);

		// Create Intersection Observer to detect when hero scrolls out of view
		observerRef.current = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (!entry) return;

				// Update hero visibility state
				setIsHeroVisible(entry.isIntersecting);
			},
			{
				// Trigger when hero is completely out of view
				threshold: 0,
				// Add some margin to trigger slightly before completely out of view
				rootMargin: "-100px 0px 0px 0px",
			},
		);

		observerRef.current.observe(heroSection);

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
				observerRef.current = null;
			}
		};
	}, [headerTheme]);

	// Update theme based on headerTheme and hero visibility
	useEffect(() => {
		if (headerTheme === "dark") {
			setTheme(isHeroVisible ? "dark" : undefined);
		} else {
			setTheme(headerTheme);
		}
	}, [headerTheme, isHeroVisible]);

	return (
		<header
			className="header-frosted-glass sticky top-0 z-20 w-full shadow-sm"
			{...(theme ? { "data-theme": theme } : {})}
		>
			<div className="header-backdrop" />
			<div className="header-backdrop-edge" />
			{children}
		</header>
	);
};
