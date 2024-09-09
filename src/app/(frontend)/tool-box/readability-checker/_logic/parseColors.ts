import { toHex } from "color2k";
import { colorNamesMap, colorValuesToNamesMap } from "./color-names";
import { ColorInfo } from "./types";

const colorNames = Object.keys(colorNamesMap);

const colorRegex = new RegExp(
  `#([0-9A-Fa-f]{3}){1,2}\\b|\\b(?:rgb|hsl)a?\\([\\d%,.\\s]+\\)|\\b(?:${colorNames.join("|")})\\b`,
  "gi",
);

// default format restored from local storage is "colorName colorHexValue"
// e.g. "red #FF0000"
const standardFormatRegex = new RegExp(
  `((\\w|\\d)+)\\s+(#[0-9A-Fa-f]{6})`,
  "gi",
);

export function parseColors(input: string): ColorInfo[] {
  const lines = input.split("\n");

  const cleanLines = lines.map((line) => line.trim());

  const standardColors = cleanLines.flatMap((line) => {
    const matches = line.match(standardFormatRegex);

    if (matches) {
      return matches.map((match) => {
        const [name, hex] = match.split(" ").filter((item) => !!item);
        return { name: name!, hex: hex! };
      });
    }

    return [];
  });

  const parsedColorsWithNamesMap = new Map<string, string>(
    standardColors.map(({ name, hex }) => [hex, name]),
  );

  const cleanInput = input.replace(/<[^>]*>/g, "");

  const matches = cleanInput.match(colorRegex) ?? [];

  const uniqueColorValues = [
    ...new Set(
      matches.map((color) => color.toLowerCase()).map((color) => toHex(color)),
    ),
  ];

  const standardizedColorValues = uniqueColorValues.map((hex) => {
    let name = parsedColorsWithNamesMap.get(hex);

    if (!name) {
      name = colorValuesToNamesMap[hex] ?? "";
    }

    return {
      hex,
      name,
    };
  });

  return standardizedColorValues;
}
