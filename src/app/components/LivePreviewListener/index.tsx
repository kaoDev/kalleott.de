'use client'

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { z } from 'zod'

const serverUrl = z.string().parse(process.env.NEXT_PUBLIC_SERVER_URL)

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  return <PayloadLivePreview refresh={router.refresh} serverURL={serverUrl} />
}
