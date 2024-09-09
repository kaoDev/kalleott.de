"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAtom } from "jotai/react";
import { PrimitiveAtom } from "jotai/vanilla";
import { useEffect, useState } from "react";
import { parseColors } from "../_logic/parseColors";
import { ColorInfo } from "../_logic/types";
import { ColorSquare } from "./ColorSquare";

interface Props {
  colorSetName: string;
  stateAtom: PrimitiveAtom<ColorInfo[]>;
}

// placeholder text to indicate the format of the input doesn't matter, the parser will handle it
const placeholderText = `My favorite colors are #FF5733 and rgb(60, 179, 113).
I also like Blue and YELLOW.
The walls are painted #f0f and hsl(120, 100%, 50%).`;

export function ColorSetEditor({ colorSetName, stateAtom }: Props) {
  const [input, setInput] = useState("");

  const [colorSet, setColorSet] = useAtom(stateAtom);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsedColors = parseColors(input);
      setColorSet(parsedColors);
      setError(null);
    } catch (err) {
      setError("Error parsing colors. Please check your input.");
    }
  }, [input, setColorSet]);

  const handleColorNameChange = (index: number, newName: string) => {
    const updatedColorSet = [...colorSet];

    const colorToChange = updatedColorSet[index];

    if (!colorToChange) {
      return;
    }

    colorToChange.name = newName;

    setColorSet(updatedColorSet);
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="mb-4 text-2xl font-bold">{colorSetName} colors</h3>
      <div className="mb-4">
        <Label htmlFor="colorInput">Enter Colors</Label>
        <Textarea
          id="colorInput"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholderText}
          rows={10}
        />
      </div>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <Card>
        <CardContent>
          <div className="flex flex-wrap justify-center">
            {colorSet.map((colorInfo, index) => (
              <ColorSquare
                key={colorInfo.hex}
                hex={colorInfo.hex}
                name={colorInfo.name}
                onNameChange={(newName) =>
                  handleColorNameChange(index, newName)
                }
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
