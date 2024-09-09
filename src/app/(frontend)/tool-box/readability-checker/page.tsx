"use client";

import { Prose } from "@/components/Prose/Prose";
import { ColorSetEditor } from "./_components/ColorSetEditor";
import { backgroundAtom, foregroundAtom } from "./_logic/state";
import { ColorCheck } from "./_components/ColorCheck";

export default function ReadabilityChecker() {
  return (
    <div className="container pb-32">
      <Prose>
        <h1>Readability Checker</h1>
        <p>
          This tool allows you to quickly check the contrast ratios between
          different sets of colors to ensure they meet accessibility standards.
        </p>
        <p>
          The readability result is based on the WCAG 2.0 guidelines, which are
          implemented in the{" "}
          <a href="https://color2k.com/#has-bad-contrast">color2k</a> library.
        </p>
      </Prose>
      <ColorSetEditor colorSetName="Foreground" stateAtom={foregroundAtom} />
      <ColorSetEditor colorSetName="Background" stateAtom={backgroundAtom} />
      <ColorCheck />
    </div>
  );
}
