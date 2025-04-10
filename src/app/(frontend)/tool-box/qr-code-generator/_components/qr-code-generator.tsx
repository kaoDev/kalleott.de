"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import QRCodeStyling, {
	type CornerDotType,
	type CornerSquareType,
	type DotType,
	type ShapeType,
} from "qr-code-styling";
import {
	type RefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

const QR_CODE_SIZE = 300; // Base size of the QR code in pixels
const QR_SIZE_OPTIONS = [QR_CODE_SIZE, 600, 1200]; // Available download sizes

const dotTypes: DotType[] = [
	"rounded",
	"dots",
	"classy",
	"classy-rounded",
	"square",
	"extra-rounded",
];
const cornerDotTypes: CornerDotType[] = ["dot", "square"];
const cornerSquareTypes: CornerSquareType[] = [
	"dot",
	"square",
	"extra-rounded",
];
const shapeTypes: ShapeType[] = ["square", "circle"];

function StyleSettings({
	qrCode,
	onUpdate,
}: {
	qrCode: RefObject<QRCodeStyling | null>;
	onUpdate: () => void;
}) {
	const [dotType, setDotType] = useState<DotType>("square");
	const [cornerDotType, setCornerDotType] = useState<CornerDotType>("square");
	const [cornerSquaredotType, setCornerSquareDotType] =
		useState<CornerSquareType>("square");
	const [shapeType, setShapeType] = useState<ShapeType>("square");

	useEffect(() => {
		if (qrCode.current) {
			qrCode.current.update({
				dotsOptions: {
					type: dotType,
				},
				cornersDotOptions: {
					type: cornerDotType,
				},
				cornersSquareOptions: {
					type: cornerSquaredotType,
				},

				shape: shapeType,
			});

			onUpdate();
		}
	}, [
		dotType,
		cornerDotType,
		cornerSquaredotType,
		shapeType,
		qrCode,
		onUpdate,
	]);

	return (
		<AccordionItem value="style">
			<AccordionTrigger>Style Options</AccordionTrigger>
			<AccordionContent>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="dot-type">Dot Style</Label>
						<Select
							value={dotType}
							onValueChange={(value) => setDotType(value as DotType)}
						>
							<SelectTrigger id="dot-type">
								<SelectValue placeholder="Select dot style" />
							</SelectTrigger>
							<SelectContent>
								{dotTypes.map((type) => (
									<SelectItem key={type} value={type}>
										{type.charAt(0).toUpperCase() + type.slice(1)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="corner-dot-type">Corner Dot Style</Label>
						<Select
							value={cornerDotType}
							onValueChange={(value) =>
								setCornerDotType(value as CornerDotType)
							}
						>
							<SelectTrigger id="corner-dot-type">
								<SelectValue placeholder="Select corner dot style" />
							</SelectTrigger>
							<SelectContent>
								{cornerDotTypes.map((type) => (
									<SelectItem key={type} value={type}>
										{type.charAt(0).toUpperCase() + type.slice(1)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="corner-square-dot-type">Corner Square Style</Label>
						<Select
							value={cornerSquaredotType}
							onValueChange={(value) =>
								setCornerSquareDotType(value as CornerSquareType)
							}
						>
							<SelectTrigger id="corner-square-dot-type">
								<SelectValue placeholder="Select corner square style" />
							</SelectTrigger>
							<SelectContent>
								{cornerSquareTypes.map((type) => (
									<SelectItem key={type} value={type}>
										{type.charAt(0).toUpperCase() + type.slice(1)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="shape-type">Shape Type</Label>
						<Select
							value={shapeType}
							onValueChange={(value) => setShapeType(value as ShapeType)}
						>
							<SelectTrigger id="shape-type">
								<SelectValue placeholder="Select shape type" />
							</SelectTrigger>
							<SelectContent>
								{shapeTypes.map((type) => (
									<SelectItem key={type} value={type}>
										{type.charAt(0).toUpperCase() + type.slice(1)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
}

export function QRCodeGenerator() {
	const [url, setUrl] = useState("https://example.com");
	const [logo, setLogo] = useState<File | null>(null);
	const [logoSize, setLogoSize] = useState(0.4);
	const [dotColor, setDotColor] = useState("#000000");
	const [backgroundColor, setBackgroundColor] = useState("#ffffff");
	const [backgroundAlpha, setBackgroundAlpha] = useState(100);

	const [size, setSize] = useState(QR_CODE_SIZE);

	const qrRef = useRef<HTMLDivElement>(null);
	const qrCode = useRef<QRCodeStyling | null>(null);

	const onUpdate = useCallback(() => {
		if (qrCode.current?._domCanvas) {
			qrCode.current._domCanvas.style.aspectRatio = "1/1";
			qrCode.current._domCanvas.style.width = "100%";
			qrCode.current._domCanvas.style.maxWidth = "100%";
		}
	}, []);

	useEffect(() => {
		qrCode.current = new QRCodeStyling({
			width: QR_CODE_SIZE,
			height: QR_CODE_SIZE,
			type: "canvas",
			imageOptions: {
				crossOrigin: "anonymous",
				margin: 10,
			},
		});

		if (qrRef.current) {
			qrRef.current.innerHTML = "";
			qrCode.current.append(qrRef.current);
		}
		// this is just a one-time setup
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (qrCode.current) {
			qrCode.current.update({
				data: url,
				image: logo ? URL.createObjectURL(logo) : undefined,
				dotsOptions: {
					color: dotColor,
				},
				backgroundOptions: {
					color: applyAlphaToColor(backgroundColor, backgroundAlpha),
				},
				imageOptions: {
					crossOrigin: "anonymous",
					margin: 10,
					imageSize: logoSize,
				},
				height: size,
				width: size,
			});
		}
		onUpdate();
	}, [
		url,
		logo,
		logoSize,
		size,
		dotColor,
		backgroundColor,
		backgroundAlpha,
		onUpdate,
	]);

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
	};

	const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setLogo(file);
		}
	};

	const handleLogoSizeChange = (value: number[]) => {
		console.log("logo size change", value);
		setLogoSize(value[0] ?? 0.4);
	};

	const handleBackgroundAlphaChange = (value: number[]) => {
		setBackgroundAlpha(value[0] ?? 0.4);
	};

	const downloadQRCode = async () => {
		if (qrCode.current) {
			qrCode.current.download({
				extension: "png",
				name: `qrcode-${size}x${size}`,
			});
		}
	};

	const applyAlphaToColor = (color: string, alpha: number): string => {
		const hex = color.replace("#", "");
		const r = Number.parseInt(hex.substring(0, 2), 16);
		const g = Number.parseInt(hex.substring(2, 4), 16);
		const b = Number.parseInt(hex.substring(4, 6), 16);
		return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
	};

	return (
		<div className="mx-auto max-w-md space-y-6 p-6">
			<div className="space-y-2">
				<Label htmlFor="url">Enter URL</Label>
				<Input
					id="url"
					type="url"
					placeholder="https://example.com"
					value={url}
					onChange={handleUrlChange}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="logo">Upload Logo (optional)</Label>
				<Input
					id="logo"
					type="file"
					accept="image/*"
					onChange={handleLogoUpload}
				/>
			</div>

			{logo && (
				<div className="space-y-2">
					<Label htmlFor="logo-size">Logo Size</Label>
					<Slider
						id="logo-size"
						min={0.1}
						max={0.5}
						step={0.05}
						value={[logoSize]}
						onValueChange={handleLogoSizeChange}
					/>
				</div>
			)}

			<Accordion type="single" collapsible className="w-full">
				<StyleSettings qrCode={qrCode} onUpdate={onUpdate} />
				<AccordionItem value="color">
					<AccordionTrigger>Color Options</AccordionTrigger>
					<AccordionContent>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="dot-color">Dot Color</Label>
								<Input
									id="dot-color"
									type="color"
									value={dotColor}
									onChange={(e) => setDotColor(e.target.value)}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="background-color">Background Color</Label>
								<Input
									id="background-color"
									type="color"
									value={backgroundColor}
									onChange={(e) => setBackgroundColor(e.target.value)}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="background-alpha">Background Opacity</Label>
								<Slider
									id="background-alpha"
									min={0}
									max={100}
									step={1}
									value={[backgroundAlpha]}
									onValueChange={handleBackgroundAlphaChange}
								/>
								<div className="text-muted-foreground text-sm">
									{backgroundAlpha}%
								</div>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<div ref={qrRef} className="flex justify-center space-y-2" />

			<div className="space-y-2">
				<Label htmlFor="size">QR Code Size</Label>
				<Select
					value={size.toString()}
					onValueChange={(value) => setSize(Number.parseInt(value))}
				>
					<SelectTrigger id="size">
						<SelectValue placeholder="Select QR Code size" />
					</SelectTrigger>
					<SelectContent>
						{QR_SIZE_OPTIONS.map((qrSize) => (
							<SelectItem key={qrSize} value={qrSize.toString()}>
								{`${qrSize} x ${qrSize} px`}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-2">
				<Button onClick={downloadQRCode}>Download QR Code</Button>
			</div>
		</div>
	);
}
