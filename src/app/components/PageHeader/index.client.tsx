"use client";

import { useHeaderTheme } from "@/providers/HeaderTheme";
import type { Theme } from "@/providers/Theme/types";
import type React from "react";
import { type ReactNode, useEffect, useState } from "react";

interface HeaderClientProps {
	children: ReactNode;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ children }) => {
	const [theme, setTheme] = useState<Theme | undefined>(undefined);
	const headerTheme = useHeaderTheme();

	useEffect(() => {
		if (headerTheme !== theme) setTheme(headerTheme);
	}, [headerTheme, theme]);

	return (
		<header
			className="header-blur gradient-mask sticky top-0 z-20 w-full shadow-sm backdrop-blur-sm"
			{...(theme ? { "data-theme": theme } : {})}
		>
			{children}
		</header>
	);
};
