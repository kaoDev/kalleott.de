import React, { Fragment } from "react";
import type { Page } from "../../../payload-types";
import { ArchiveBlock } from "../../blocks/ArchiveBlock";
import { CallToActionBlock } from "../../blocks/CallToAction";
import type { Form as FormType } from "@payloadcms/plugin-form-builder/types";
import { ContentBlock } from "../../blocks/Content";
import { FormBlock } from "../../blocks/Form";
import { MediaBlock } from "../../blocks/MediaBlock";
import { toKebabCase } from "../../utilities/toKebabCase";
import { HotSaucesBlock } from "@/blocks/HotSaucesBlock";

export const Blocks: React.FC<{
  blocks: Page["layout"][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          return renderBlock(block, index);
        })}
      </Fragment>
    );
  }

  return null;
};

function renderBlock(block: Page["layout"][0], index: number) {
  const { blockName, blockType } = block;

  const blockId = blockName ? toKebabCase(blockName) : undefined;

  switch (blockType) {
    case "archive":
      return <ArchiveBlock key={index} {...block} id={blockId} />;
    case "content":
      return <ContentBlock key={index} {...block} id={blockId} />;
    case "cta":
      return <CallToActionBlock key={index} {...block} id={blockId} />;
    case "formBlock":
      return (
        <FormBlock
          key={index}
          {...block}
          id={blockId}
          enableIntro
          form={block.form as unknown as FormType}
        />
      );
    case "mediaBlock":
      return <MediaBlock key={index} {...block} id={blockId} />;

    case "hotSauces":
      return <HotSaucesBlock key={index} {...block} id={blockId} />;
    default:
      return null;
  }
}
