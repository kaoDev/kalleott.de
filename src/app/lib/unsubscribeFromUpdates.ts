import { Resend } from "resend";
import z from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const audienceId = z.string().parse(process.env.RESEND_AUDIENCE_ID);

interface State {
	error: null | string;
	message: null | string;
}

interface Payload {
	email: string;
}

export async function unsubscribeFromUpdates(
	_state: State,
	{ email }: Payload,
): Promise<State> {
	"use server";

	const existingContacts = await resend.contacts.list({ audienceId });

	const existingContact = existingContacts.data?.data.find((contact) => {
		return contact.email === email;
	});

	if (existingContact != null) {
		const updateResult = await resend.contacts.update({
			audienceId,
			id: existingContact.id,
			unsubscribed: true,
		});

		if (updateResult.error) {
			return {
				error: "Something went wrong, please try again later",
				message: null,
			};
		}

		return {
			error: null,
			message: "Good bye! You have been unsubscribed",
		};
	}

	return {
		error: "Could not find email to unsubscribe",
		message: null,
	};
}
