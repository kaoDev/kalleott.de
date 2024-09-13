import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import jwt from "jsonwebtoken";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const payloadToken = "payload-token";

export async function GET(
	req: Request & {
		cookies: {
			get: (name: string) => {
				value: string;
			};
		};
	},
): Promise<Response> {
	const token = req.cookies.get(payloadToken)?.value;
	const { searchParams } = new URL(req.url);
	const path = searchParams.get("path");

	if (!path) {
		return new Response("No path provided", { status: 404 });
	}

	if (!token) {
		new Response("You are not allowed to preview this page", { status: 403 });
	}

	const payload = await getPayloadHMR({ config: configPromise });

	const user = jwt.verify(token, payload.secret);

	if (!user) {
		draftMode().disable();
		return new Response("You are not allowed to preview this page", {
			status: 403,
		});
	}

	draftMode().enable();
	redirect(path);
}
