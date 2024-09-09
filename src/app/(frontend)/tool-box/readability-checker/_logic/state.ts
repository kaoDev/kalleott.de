import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { ColorInfo } from "./types";

const storage = createJSONStorage<ColorInfo[]>(() => localStorage);

const prefix = "__readability_checker_";

export const foregroundAtom = atomWithStorage<ColorInfo[]>(
  `${prefix}foreground`,
  [],
  storage,
  { getOnInit: true },
);

export const backgroundAtom = atomWithStorage<ColorInfo[]>(
  `${prefix}background`,
  [],
  storage,
  { getOnInit: true },
);
