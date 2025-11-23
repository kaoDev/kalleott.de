"use client";

import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import type { Theme } from "@/providers/Theme/types";
import canUseDOM from "../../utilities/canUseDOM";

export interface ContextType {
	headerTheme: Theme | undefined;
	setHeaderTheme: (theme: Theme | undefined) => void;
}

const initialContext: ContextType = {
	headerTheme: undefined,
	setHeaderTheme: () => undefined,
};

const HeaderThemeContext = createContext(initialContext);

export const HeaderThemeProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [headerTheme, setThemeState] = useState<Theme | undefined>(
		canUseDOM
			? (document.documentElement.getAttribute("data-theme") as Theme)
			: undefined,
	);

	const setHeaderTheme = useCallback((themeToSet: Theme | undefined) => {
		setThemeState(themeToSet);
	}, []);

	return (
		<HeaderThemeContext.Provider value={{ headerTheme, setHeaderTheme }}>
			{children}
		</HeaderThemeContext.Provider>
	);
};

export function useEnforcedHeaderThemeEffect(theme: Theme | undefined): void {
	const { setHeaderTheme } = useContext(HeaderThemeContext);

	useEffect(() => {
		if (!theme) {
			return;
		}

		setHeaderTheme(theme);

		return () => {
			setHeaderTheme(undefined);
		};
	}, [theme, setHeaderTheme]);
}

export const useHeaderTheme = () => useContext(HeaderThemeContext).headerTheme;
