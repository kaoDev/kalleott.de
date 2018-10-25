import React from 'react'
import GatsbyLink, { GatsbyLinkProps } from 'gatsby-link'
import ReactGA from 'react-ga'
import { isRelative } from '../utils/url'
type Props = GatsbyLinkProps<any>

export const Link = ({ ref, onClick, unselectable, ...props }: Props) => {
  return isRelative(props.to) ? (
    <GatsbyLink onClick={onClick} unselectable={unselectable} {...props} />
  ) : (
    <ReactGA.OutboundLink
      target="_blank"
      rel="noopener noreferrer"
      eventLabel={props.to}
      // @ts-ignore
      onClick={onClick}
      unselectable={unselectable ? 'on' : undefined}
      {...props}
    />
  )
}
