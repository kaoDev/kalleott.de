import React, { JSX } from 'react'
import {
  IS_BOLD,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_UNDERLINE,
  IS_CODE,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
} from './nodeFormat'
import { SerializedTextNode } from 'lexical'

export function serializeTextNodes(node: SerializedTextNode, index: number): JSX.Element {
  let text = <React.Fragment key={index}>{node.text}</React.Fragment>
  if (node.format & IS_BOLD) {
    text = <strong key={index}>{text}</strong>
  }
  if (node.format & IS_ITALIC) {
    text = <em key={index}>{text}</em>
  }
  if (node.format & IS_STRIKETHROUGH) {
    text = (
      <span key={index} style={{ textDecoration: 'line-through' }}>
        {text}
      </span>
    )
  }
  if (node.format & IS_UNDERLINE) {
    text = (
      <span key={index} style={{ textDecoration: 'underline' }}>
        {text}
      </span>
    )
  }
  if (node.format & IS_CODE) {
    text = <code key={index}>{node.text}</code>
  }
  if (node.format & IS_SUBSCRIPT) {
    text = <sub key={index}>{text}</sub>
  }
  if (node.format & IS_SUPERSCRIPT) {
    text = <sup key={index}>{text}</sup>
  }

  return text
}
