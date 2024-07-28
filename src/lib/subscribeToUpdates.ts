import { Resend } from "resend";
import z from "zod";
import { WelcomeEmailTemplate } from "../email/templates/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

const audienceId = z.string().parse(process.env.RESEND_AUDIENCE_ID);
const emailSender = z.string().parse(process.env.RESEND_EMAIL_SENDER);

interface State {
  error: null | string;
  message: null | string;
}

interface Payload {
  email: string;
  firstName: string;
  error: null | string;
}

export async function subscribeToUpdates(
  _state: State,
  { email, firstName }: Payload,
): Promise<State> {
  "use server";

  console.log("SUBSCRIBE", { email, firstName });

  const emailParseResult = z.string().email().safeParse(email);

  console.log("emailParseResult", emailParseResult);

  if (!emailParseResult.success) {
    return {
      error: "Invalid email address",
      message: null,
    };
  }

  console.log("Creating contact", { email, firstName, audienceId });

  const existingContacts = await resend.contacts.list({ audienceId });

  const existingContact = existingContacts.data?.data.find((contact) => {
    return contact.email === email;
  });

  if (existingContact != null) {
    return await updateExistingContact(
      existingContact.id,
      firstName,
      existingContact.unsubscribed,
    );
  }

  return await addNewContact(email, firstName);
}

async function updateExistingContact(
  id: string,
  firstName: string,
  wasUnsubscribed: boolean,
): Promise<State> {
  const updateResult = await resend.contacts.update({
    audienceId,
    id,
    firstName,
    unsubscribed: false,
  });

  console.log("updateResult", updateResult);

  if (updateResult.error) {
    console.log("Error updating contact", updateResult.error);
    return {
      error: "Something went wrong, please try again later",
      message: null,
    };
  }

  return {
    error: null,
    message: wasUnsubscribed
      ? "Welcome back!"
      : "You were already subscribed, but welcome again!",
  };
}

async function addNewContact(email: string, firstName: string): Promise<State> {
  const contactResult = await resend.contacts.create({
    audienceId,
    email,
    firstName,
    unsubscribed: false,
  });

  console.log("contactResult", contactResult);

  if (contactResult.error) {
    console.log("Error creating contact", contactResult.error);
    return {
      error: "Could not add contact to audience",
      message: null,
    };
  }

  const { error } = await resend.emails.send({
    from: emailSender,
    to: email,
    subject: "Hello world",
    react: WelcomeEmailTemplate({ firstName }),
    text: "Hello world",
    headers: {
      "List-Unsubscribe":
        "<https://qwxglf7h-3000.euw.devtunnels.ms/api/unsubscribe>",
    },
  });

  if (error) {
    console.log("Error sending welcome email", error);
    return {
      error: "Could not send welcome email",
      message: null,
    };
  }

  return {
    error: null,
    message: "Welcome!",
  };
}
