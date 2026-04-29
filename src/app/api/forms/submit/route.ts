import { checkBotId } from "botid/server";
import { z } from "zod";

const formSubmissionsAccessToken = z
	.string()
	.parse(process.env.FORM_SUBMISSIONS_ACCESS_TOKEN);
const formSubmissionsAccessHeader = "x-form-submissions-token";

const submissionSchema = z.object({
	form: z.union([z.number(), z.string()]),
	submissionData: z.array(
		z.object({
			field: z.string(),
			value: z.unknown(),
		}),
	),
});

export async function POST(request: Request): Promise<Response> {
	const { isBot } = await checkBotId();

	if (isBot) {
		return Response.json(
			{
				errors: [{ message: "Access denied." }],
				status: 403,
			},
			{ status: 403 },
		);
	}

	const requestBody: unknown = await request.json();
	const parsedBody = submissionSchema.safeParse(requestBody);

	if (!parsedBody.success) {
		return Response.json(
			{
				errors: [{ message: "Invalid submission payload." }],
				status: 400,
			},
			{ status: 400 },
		);
	}

	const targetURL = new URL("/api/form-submissions", request.url);
	const forwardResponse = await fetch(targetURL, {
		body: JSON.stringify({
			form: String(parsedBody.data.form),
			submissionData: parsedBody.data.submissionData,
		}),
		headers: {
			"Content-Type": "application/json",
			[formSubmissionsAccessHeader]: formSubmissionsAccessToken,
		},
		method: "POST",
	});

	const responseBody = await forwardResponse.text();
	const contentType = forwardResponse.headers.get("Content-Type");

	return new Response(responseBody, {
		headers: contentType ? { "Content-Type": contentType } : undefined,
		status: forwardResponse.status,
	});
}
