import React from 'react'
import type { Header as HeaderType } from '../../../../payload-types'
import { CMSLink } from '../../Link'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []

  return (
    <nav className="flex items-center gap-3">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" className="text-lg" />
      })}
    </nav>
  )
}
