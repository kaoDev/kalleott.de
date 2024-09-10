"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import type { Theme } from "@/providers/Theme/types";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

interface HeaderClientProps {
  children: ReactNode;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ children }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<Theme | undefined>(undefined);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  useEffect(() => {
    setHeaderTheme(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (headerTheme !== theme) setTheme(headerTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme]);

  return (
    <header
      className="header-blur gradient-mask sticky top-0 z-20 w-full shadow-sm backdrop-blur-sm"
      {...(theme ? { "data-theme": theme } : {})}
    >
      {children}
    </header>
  );
};
