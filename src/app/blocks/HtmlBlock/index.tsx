import React from "react";

export type HtmlBlockProps = {
  code: string;
  blockType: "html";
};

type Props = HtmlBlockProps & {
  className?: string;
};

export const HtmlBlock: React.FC<Props> = ({ className, code }) => {
  return (
    <div
      className={[className, "not-prose"].filter(Boolean).join(" ")}
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
};
