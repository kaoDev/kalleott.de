import { cn } from '@/utilities/cn'
import React from 'react'
import { Page, Post } from 'src/payload-types'
import { Prose } from '../Prose/Prose'
import { NodeTypes, serializeLexical } from './serialize'

type Props = {
  className?: string
  content: Post['content'] | Page['hero']['richText']
  enableGutter?: boolean
  enableProse?: boolean
}

export function RichText({ className, content, enableGutter = true, enableProse = true }: Props) {
  if (!content) {
    return null
  }

  const classNames = cn(
    {
      'container ': enableGutter,
      'max-w-none': !enableGutter,
    },
    className,
  )

  const text = (
    <>
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexical({ nodes: content?.root?.children as NodeTypes[] })}
    </>
  )

  return enableProse ? (
    <Prose className={classNames}>{text}</Prose>
  ) : (
    <div className={classNames}>{text}</div>
  )
}
