"use client";

import {
  Button,
  CheckboxInput,
  LoadingOverlay,
  toast,
  useDocumentInfo,
  useField,
} from "@payloadcms/ui";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { z } from "zod";

async function triggerAltTextGeneration(
  mediaId: string | number,
  aiGenerated: boolean,
) {
  const response = await fetch(`/api/media/generateAltText`, {
    method: "POST",
    body: JSON.stringify({
      id: mediaId,
      aiGenerated,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { altText } = z
    .object({
      altText: z.string(),
      success: z.boolean(),
    })
    .parse(await response.json());

  return altText;
}

export function AltTextEditor() {
  const doc = useDocumentInfo();

  const { setValue } = useField({});

  const [aiGenerated, setAIGenerated] = useState(false);

  const altTextMutationState = useMutation({
    mutationFn: async () => {
      if (!doc.id) {
        return;
      }

      const response = await triggerAltTextGeneration(doc.id, aiGenerated);

      setValue(response);

      return response;
    },
  });

  useEffect(() => {
    if (altTextMutationState.status === "error") {
      toast("Failed to generate alt text");
      console.error(altTextMutationState.error);
    }
  }, [altTextMutationState.status, altTextMutationState.error]);

  const loading = altTextMutationState.status === "pending";

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        padding: "8px 0",
        alignItems: "center",
      }}
    >
      <LoadingOverlay show={loading} />
      <Button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          altTextMutationState.mutate();
        }}
      >
        Generate Alt Text
      </Button>
      <CheckboxInput
        checked={aiGenerated}
        onToggle={() => {
          setAIGenerated((prev) => !prev);
        }}
        label={"AI generated"}
      ></CheckboxInput>
    </div>
  );
}
