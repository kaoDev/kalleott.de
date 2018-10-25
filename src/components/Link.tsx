import React from 'react'
import GatsbyLink, { GatsbyLinkProps } from 'gatsby-link'
import { isRelative } from '../utils/url'
type Props = GatsbyLinkProps<any>

export const Link = ({ ref, to, ...props }: Props) => {
  return isRelative(to) ? (
    <GatsbyLink to={to} {...props} />
  ) : (
    <a target="_blank" rel="noopener noreferrer" href={to} {...props} />
  )
}
