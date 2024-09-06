import { HeaderClient } from '@/components/Header/index.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '../../../payload-types'
import Link from 'next/link'
import { Logo } from '../Logo/Logo'
import { HeaderNav } from './Nav'

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)()

  return (
    <HeaderClient>
      <div className="container relative flex justify-between py-8">
        <Link href="/">
          <Logo />
        </Link>
        <HeaderNav header={header} />
      </div>
      <div className="absolute inset-0 -z-10 hidden bg-black/20 bg-blend-darken dark:block" />
    </HeaderClient>
  )
}
