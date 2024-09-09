import { useAtom } from "jotai/react";
import { backgroundAtom, foregroundAtom } from "../_logic/state";
import { useMemo } from "react";
import { checkContrastRatios } from "../_logic/checkColors";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Prose } from "@/components/Prose/Prose";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ColorCheck() {
  const [foreground] = useAtom(foregroundAtom);
  const [background] = useAtom(backgroundAtom);

  const checkResult = useMemo(() => {
    if (foreground.length === 0 || background.length === 0) {
      return null;
    }

    return checkContrastRatios(foreground, background);
  }, [foreground, background]);

  if (!checkResult || checkResult.length === 0) {
    return (
      <Prose>
        <p>
          Add colors to both the foreground and background to check their
          readability.
        </p>
      </Prose>
    );
  }

  return (
    <Card>
      <CardTitle className="p-3">Readability</CardTitle>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Color</TableHead>
              <TableHead>Background</TableHead>
              <TableHead>Contrast</TableHead>
              <TableHead>AA</TableHead>
              <TableHead>AAA</TableHead>
              <TableHead>Readable</TableHead>
              <TableHead>Decorative</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checkResult.flatMap((result) => [
              ...result.readabilityValues.map((readability, index) => {
                const colorName =
                  index === 0 ? result.color.name || result.color.hex : null;
                const backgroundName =
                  readability.background.name || readability.background.hex;

                const colorStyle = {
                  backgroundColor: readability.background.hex,
                  color: result.color.hex,
                };

                return (
                  <TableRow key={`${result.color.hex}-${readability.background.hex}`}>
                    <TableCell style={colorStyle}>{colorName}</TableCell>
                    <TableCell style={colorStyle}>{backgroundName}</TableCell>
                    <TableCell>{readability.contrast}</TableCell>
                    <TableCell>{readability.aa ? "✅" : "❌"}</TableCell>
                    <TableCell>{readability.aaa ? "✅" : "❌"}</TableCell>
                    <TableCell>{readability.readable ? "✅" : "❌"}</TableCell>
                    <TableCell>
                      {readability.decorative ? "✅" : "❌"}
                    </TableCell>
                  </TableRow>
                );
              }),
            ])}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
