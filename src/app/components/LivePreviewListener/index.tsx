"use client";

import { getEnvServerUrl } from "@/utilities/getEnvServerUrl";
import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";
import React from "react";

const serverUrl = getEnvServerUrl();

export const LivePreviewListener: React.FC = () => {
  const router = useRouter();
  return <PayloadLivePreview refresh={router.refresh} serverURL={serverUrl} />;
};
