import { cn } from "@/utilities/cn";
import React from "react";

import { serializeSimpleLexical } from "./serializeSimpleLexical";
import { Prose } from "../Prose/Prose";

type Props = {
  className?: string;
  content: Record<string, any>;
  enableGutter?: boolean;
  enableProse?: boolean;
};

export function SimpleRichText({
  className,
  content,
  enableGutter = true,
  enableProse = true,
}: Props) {
  if (!content) {
    return null;
  }

  const classNames = cn(
    {
      "container ": enableGutter,
      "max-w-none": !enableGutter,
    },
    className,
  );

  const text = (
    <>
      {content &&
        !Array.isArray(content) &&
        typeof content === "object" &&
        "root" in content &&
        serializeSimpleLexical({ nodes: content?.root?.children })}
    </>
  );

  return enableProse ? (
    <Prose className={classNames}>{text}</Prose>
  ) : (
    <div className={classNames}>{text}</div>
  );
}
