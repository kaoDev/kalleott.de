import type {
	DefaultNodeTypes,
	SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedLexicalNode, Spread } from "lexical";
import type { JsonObject } from "payload";
import { Fragment, type JSX } from "react";
import type { BannerBlock as BannerBlockProps } from "src/payload-types";
import { BannerBlock } from "@/blocks/Banner";
import { CallToActionBlock } from "@/blocks/CallToAction";
import { CodeBlock, type CodeBlockProps } from "@/blocks/Code";
import { HtmlBlock, type HtmlBlockProps } from "@/blocks/HtmlBlock";
import { MediaBlock } from "@/blocks/MediaBlock";
import type { Page } from "../../../payload-types";
import { serializeDefaultNodes } from "./serializeDefaultNodes";
import { serializeTextNodes } from "./serializeTextNodes";

export type InlineBlockFields<TBlockFields extends JsonObject = JsonObject> = {
	blockType: string;
	id: string;
} & TBlockFields;
export type SerializedInlineBlockNode<
	TBlockFields extends JsonObject = JsonObject,
> = Spread<
	{
		children?: never;
		fields: InlineBlockFields<TBlockFields>;
		type: "inlineBlock";
	},
	SerializedLexicalNode
>;

export type NodeTypes =
	| DefaultNodeTypes
	| SerializedBlockNode<
			// @ts-expect-error // TODO: Fix this
			| Extract<Page["layout"][0], { blockType: "cta" }>
			| Extract<Page["layout"][0], { blockType: "mediaBlock" }>
			| BannerBlockProps
			| CodeBlockProps
			| HtmlBlockProps
	  >
	| SerializedInlineBlockNode<
			| Extract<Page["layout"][0], { blockType: "mediaBlock" }>
			| CodeBlockProps
			| HtmlBlockProps
	  >;

type Props = {
	nodes: NodeTypes[];
};

export function serializeLexical({ nodes }: Props): JSX.Element {
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
					return serializeLexical({ nodes: node.children as NodeTypes[] });
				};

				const serializedChildren =
					"children" in node ? serializedChildrenFn(node) : null;

				if (node.type === "block") {
					const block = node.fields;

					const blockType = block?.blockType;

					if (!block || !blockType) {
						return null;
					}

					switch (blockType) {
						case "cta":
							return <CallToActionBlock key={block.id} {...block} />;
						case "mediaBlock":
							return (
								<MediaBlock
									className="col-span-3 col-start-1 mx-auto"
									imgClassName="m-0"
									key={block.id}
									{...block}
									captionClassName="mx-auto max-w-[48rem]"
									enableGutter={false}
								/>
							);
						case "banner":
							return (
								<BannerBlock
									className="col-start-2 mb-4"
									key={block.id}
									{...block}
								/>
							);
						case "code":
							return (
								<CodeBlock className="col-start-2" key={block.id} {...block} />
							);

						case "html":
							return (
								<HtmlBlock className="col-start-2" key={block.id} {...block} />
							);
						default:
							return null;
					}
				}
				if (node.type === "inlineBlock") {
					const block = node.fields;

					const blockType = block?.blockType;

					if (!block || !blockType) {
						return null;
					}

					switch (blockType) {
						case "mediaBlock":
							return (
								<MediaBlock
									className="col-span-3 col-start-1"
									imgClassName="m-0"
									key={block.id}
									{...block}
									captionClassName="mx-auto max-w-[48rem]"
									enableGutter={false}
								/>
							);
						case "code":
							return (
								<CodeBlock className="col-start-2" key={block.id} {...block} />
							);

						case "html":
							return (
								<HtmlBlock className="col-start-2" key={block.id} {...block} />
							);
						default:
							return null;
					}
				}
				return serializeDefaultNodes(node, serializedChildren, index);
			})}
		</Fragment>
	);
}
