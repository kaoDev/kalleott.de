import { promises as fs } from "node:fs";
import path from "node:path";
import getImageSize from "image-size";
import sharp from "sharp";

export function getLocalImagePath(publicPath: string) {
	// filepath is file addess exactly how is used in Image component (/ = public/)
	return path.join(process.cwd(), "public", publicPath);
}

export function getImageDimensions(publicPath: string) {
	const imagePath = getLocalImagePath(publicPath);
	const dimensions = getImageSize(imagePath);

	return dimensions;
}

function bufferToBase64(buffer: Buffer): `data:image/${string}` {
	return `data:image/png;base64,${buffer.toString("base64")}`;
}

async function getFileBufferLocal(publicPath: string) {
	const realFilepath = getLocalImagePath(publicPath);
	return fs.readFile(realFilepath);
}

export async function getPlaceholderImage(
	filepath: string,
): Promise<{ src: string; placeholder: `data:image/${string}` }> {
	try {
		const originalBuffer = await getFileBufferLocal(filepath);
		const resizedBuffer = await sharp(originalBuffer).resize(20).toBuffer();
		return {
			src: filepath,
			placeholder: bufferToBase64(resizedBuffer),
		};
	} catch {
		return {
			src: filepath,
			placeholder:
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==",
		};
	}
}
