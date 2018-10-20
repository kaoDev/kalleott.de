import React from 'react'
// @ts-ignore
import isRelativeUrl from 'is-relative-url'
// @ts-ignore
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import GatsbyLink, { GatsbyLinkProps } from 'gatsby-link'

type Props =
  | GatsbyLinkProps<any>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>

// @ts-ignore
const isGatsbyLink = (p: Props): p is GatsbyLinkProps<any> => !!p.to

export const Link = (props: Props) => {
  if (isGatsbyLink(props)) {
    return isRelativeUrl(props.to) ? (
      // @ts-ignore
      <GatsbyLink {...props} />
    ) : (
      <OutboundLink
        target="_blank"
        rel="noopener noreferrer"
        href={props.to}
        {...props}
      />
    )
  }
  return isRelativeUrl(props.href) ? (
    <GatsbyLink to={props.href || ''}>{props.children}</GatsbyLink>
  ) : (
    <OutboundLink target="_blank" rel="noopener noreferrer" {...props} />
  )
}
