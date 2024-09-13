"use client";

import { useEnforcedHeaderThemeEffect } from "@/providers/HeaderTheme";

function PageClient({
	heroSection,
}: {
	heroSection: "highImpact" | "lowImpact" | "mediumImpact" | "none";
}) {
	useEnforcedHeaderThemeEffect(
		heroSection === "highImpact" ? "dark" : undefined,
	);

	return null;
}

export default PageClient;
