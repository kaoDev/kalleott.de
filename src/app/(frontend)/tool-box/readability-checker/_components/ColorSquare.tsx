"use client";

import { Input } from "@/components/ui/input";

export function ColorSquare({
  hex,
  name,
  onNameChange,
}: {
  hex: string;
  name: string;
  onNameChange: (name: string) => void;
}) {
  return (
    <div className="m-2 flex flex-col items-center">
      <div
        className="h-20 w-20 rounded-md shadow-md"
        style={{ backgroundColor: hex }}
        title={name}
      ></div>
      <Input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className="mt-2 w-24 text-center"
        placeholder="Color name"
      />
    </div>
  );
}
