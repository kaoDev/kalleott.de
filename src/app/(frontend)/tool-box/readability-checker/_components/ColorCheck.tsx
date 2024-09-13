import { Prose } from "@/components/Prose/Prose";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useAtom } from "jotai/react";
import { useMemo } from "react";
import { checkContrastRatios } from "../_logic/checkColors";
import { backgroundAtom, foregroundAtom } from "../_logic/state";

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
				<Table className="relative max-h-[600px] overflow-auto">
					<TableHeader className="sticky top-0">
						<TableRow>
							<TableHead>Color</TableHead>
							<TableHead>Background</TableHead>
							<TableHead>Sample</TableHead>
							<TableHead>Contrast</TableHead>
							<TableHead>AA</TableHead>
							<TableHead>AAA</TableHead>
							<TableHead>Large text</TableHead>
							<TableHead>Decorative</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{checkResult.flatMap((result) => [
							...result.readabilityValues.map((readability, index) => {
								const colorName = result.color.name || result.color.hex;
								const backgroundName =
									readability.background.name || readability.background.hex;

								const sampleBgStyle = {
									backgroundColor: readability.background.hex,
									color: result.color.hex,
								};

								return (
									<TableRow
										key={`${result.color.hex}-${readability.background.hex}`}
									>
										<TableCell>{colorName}</TableCell>
										<TableCell>{backgroundName}</TableCell>
										<TableCell
											className="flex items-center justify-center gap-1"
											style={sampleBgStyle}
										>
											<span className="text-sm">small</span>
											<span className="text-lg">large</span>
											<div className="aspect-square w-5 bg-current" />
										</TableCell>
										<TableCell>{readability.contrast}</TableCell>
										<TableCell>{readability.aa ? "✅" : "❌"}</TableCell>
										<TableCell>{readability.aaa ? "✅" : "❌"}</TableCell>
										<TableCell>{readability.largeText ? "✅" : "❌"}</TableCell>
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
