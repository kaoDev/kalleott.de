"use client";

import dynamic from "next/dynamic";

const QRCodeGenerator = dynamic(
	() =>
		import("./_components/qr-code-generator").then((m) => m.QRCodeGenerator),
	{
		loading: () => <p>Loading...</p>,
		ssr: false,
	},
);

export default function QrCodeGeneratorPage() {
	return <QRCodeGenerator />;
}
