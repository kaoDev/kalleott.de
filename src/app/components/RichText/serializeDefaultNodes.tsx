import { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import { JSX } from "react";
import { CMSLink } from "../Link";
import { cn } from "@/utilities";

export function serializeDefaultNodes(
  node: DefaultNodeTypes,
  serializedChildren: JSX.Element | null,
  index: number,
) {
  let textAlignClass = "";
  let indentClass = "";

  if ("format" in node) {
    textAlignClass =
      node.format === "left" || node.format === "start"
        ? "text-start"
        : node.format === "right" || node.format === "end"
          ? "text-end"
          : node.format === "center"
            ? "text-center"
            : "text-justify";
  }

  if ("indent" in node) {
    indentClass = node.indent > 0 ? `pl-${node.indent}` : "";
  }

  switch (node.type) {
    case "linebreak": {
      return <br key={index} />;
    }
    case "paragraph": {
      return (
        <p
          className={`col-start-2 ${indentClass} ${textAlignClass}`}
          key={index}
        >
          {serializedChildren}
        </p>
      );
    }
    case "heading": {
      const Tag = node?.tag;

      return (
        <Tag
          className={`col-start-2 ${indentClass} ${textAlignClass}`}
          key={index}
        >
          {serializedChildren}
        </Tag>
      );
    }
    case "list": {
      const Tag = node?.tag;

      return (
        <Tag
          className={`list col-start-2 ${indentClass} ${textAlignClass}`}
          key={index}
        >
          {serializedChildren}
        </Tag>
      );
    }
    case "listitem": {
      const isNestedList =
        node.children.length === 1 && node.children[0]?.type === "list";

      if (node?.checked != null) {
        return (
          <li
            aria-checked={node.checked ? "true" : "false"}
            className={cn(
              indentClass,
              textAlignClass,
              isNestedList ? "list-none" : "",
            )}
            key={index}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role="checkbox"
            tabIndex={-1}
            value={node?.value}
            data-indent={node.indent}
          >
            {serializedChildren}
          </li>
        );
      } else {
        return (
          <li
            className={cn(
              indentClass,
              textAlignClass,
              isNestedList ? "list-none" : "",
            )}
            key={index}
            value={node?.value}
            data-indent={node.indent}
          >
            {serializedChildren}
          </li>
        );
      }
    }
    case "quote": {
      return (
        <blockquote
          className={`col-start-2 ${indentClass} ${textAlignClass}`}
          key={index}
        >
          {serializedChildren}
        </blockquote>
      );
    }
    case "link": {
      const fields = node.fields;

      return (
        <CMSLink
          key={index}
          newTab={Boolean(fields?.newTab)}
          reference={fields.doc as any}
          type={fields.linkType === "internal" ? "reference" : "custom"}
          url={fields.url}
          className={`${indentClass} ${textAlignClass}`}
        >
          {serializedChildren}
        </CMSLink>
      );
    }

    default:
      return null;
  }
}
