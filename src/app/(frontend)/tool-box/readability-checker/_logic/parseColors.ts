import { toHex } from "color2k";
import { colorNamesMap, colorValuesToNamesMap } from "./color-names";
import { ColorInfo } from "./types";

const colorNames = Object.keys(colorNamesMap);

const colorRegex = new RegExp(
  `#([0-9A-Fa-f]{3}){1,2}\\b|\\b(?:rgb|hsl)a?\\([\\d%,.\\s]+\\)|\\b(?:${colorNames.join("|")})\\b`,
  "gi",
);

export function parseColors(input: string): ColorInfo[] {
  const cleanInput = input.replace(/<[^>]*>/g, "");

  const matches = cleanInput.match(colorRegex) ?? [];

  const uniqueColorValues = [
    ...new Set(
      matches.map((color) => color.toLowerCase()).map((color) => toHex(color)),
    ),
  ];

  const standardizedColorValues = uniqueColorValues.map((hex) => {
    return {
      hex,
      name: hex in colorValuesToNamesMap ? colorValuesToNamesMap[hex]! : "",
    };
  });

  return standardizedColorValues;
}
