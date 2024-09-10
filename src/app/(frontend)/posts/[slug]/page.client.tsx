"use client";

import { useHeaderTheme } from "@/providers/HeaderTheme";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function PageClient({
  heroSection,
  activePath,
}: {
  heroSection: "highImpact" | "lowImpact" | "mediumImpact" | "none";
  activePath: string;
}) {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === activePath && heroSection === "highImpact") {
      setHeaderTheme("dark");
    } else {
      setHeaderTheme(undefined);
    }
  }, [heroSection, setHeaderTheme, pathName, activePath]);

  return <React.Fragment />;
}

export default PageClient;
