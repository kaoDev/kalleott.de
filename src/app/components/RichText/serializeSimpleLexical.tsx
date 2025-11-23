import type { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import { Fragment, type JSX } from "react";
import { serializeDefaultNodes } from "./serializeDefaultNodes";
import { serializeTextNodes } from "./serializeTextNodes";

export type NodeTypes = DefaultNodeTypes;

type Props = {
	nodes: NodeTypes[];
};

export function serializeSimpleLexical({ nodes }: Props): JSX.Element {
	return (
		<Fragment>
			{nodes?.map((node, index): JSX.Element | null => {
				if (node == null) {
					return null;
				}

				if (node.type === "text") {
					return serializeTextNodes(node, index);
				}

				// NOTE: Hacky fix for
				// https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
				// which does not return checked: false (only true - i.e. there is no prop for false)
				const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
					if (!("children" in node) || node.children == null) {
						return null;
					}
					if (node?.type === "list" && node?.listType === "check") {
						for (const item of node.children) {
							if ("checked" in item) {
								if (!item?.checked) {
									item.checked = false;
								}
							}
						}
					}
					return serializeSimpleLexical({
						nodes: node.children as NodeTypes[],
					});
				};

				const serializedChildren =
					"children" in node ? serializedChildrenFn(node) : null;

				return serializeDefaultNodes(node, serializedChildren, index);
			})}
		</Fragment>
	);
}
