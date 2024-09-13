import { getContrast, hasBadContrast } from "color2k";
import type { ColorInfo, ReadabilityCheck } from "./types";

const standards = ["aa", "aaa", "readable", "decorative"] as const;

export function checkContrastRatios(
	foreground: ColorInfo[],
	background: ColorInfo[],
): ReadabilityCheck[] {
	const contrastChecks = foreground.map((color) => ({
		color,
		backgrounds: background,
	}));

	const results = contrastChecks.flatMap(({ color, backgrounds }) => {
		const readabilityValues = backgrounds.map((background) => {
			const contrast = getContrast(color.hex, background.hex).toFixed(2);
			const [badAA, badAAA, badReadability, badAsDecorative] = standards.map(
				(standard) => hasBadContrast(color.hex, standard, background.hex),
			);

			return {
				background,
				contrast,
				aa: !badAA,
				aaa: !badAAA,
				largeText: !badReadability,
				decorative: !badAsDecorative,
			};
		});

		return {
			color,
			readabilityValues,
		};
	});

	return results;
}
