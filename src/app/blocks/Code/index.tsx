import React from "react";
import { Code } from "bright";

export type CodeBlockProps = {
  code: string;
  language?: string;
  blockType: "code";
};

type Props = CodeBlockProps & {
  className?: string;
};

export const CodeBlock: React.FC<Props> = ({ className, code, language }) => {
  return (
    <div className={[className, "not-prose"].filter(Boolean).join(" ")}>
      <Code code={code} lang={language} className="text-sm" lineNumbers />
    </div>
  );
};
