import { Resend } from "resend";
import z from "zod";
import { render } from "@react-email/render";
import { WelcomeEmailTemplate } from "../email/templates/welcome";
import { encryptEmail } from "./emailToken";

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

  const emailParseResult = z.string().email().safeParse(email);

  if (!emailParseResult.success) {
    return {
      error: "Invalid email address",
      message: null,
    };
  }

  const existingContacts = await resend.contacts.list({ audienceId });

  const existingContact = existingContacts.data?.data.find((contact) => {
    return contact.email === email;
  });

  if (existingContact != null) {
    return await updateExistingContact(
      existingContact.id,
      existingContact.email,
      firstName,
    );
  }

  return await addNewContact(email, firstName);
}

async function updateExistingContact(
  id: string,
  email: string,
  firstName: string,
): Promise<State> {
  const updateResult = await resend.contacts.update({
    audienceId,
    id,
    firstName,
    unsubscribed: false,
  });

  if (updateResult.error) {
    return {
      error: "Something went wrong, please try again later",
      message: null,
    };
  }

  sendSubscriptionEmail(email, firstName);

  return {
    error: null,
    message: randomGreeting(firstName),
  };
}

async function addNewContact(email: string, firstName: string): Promise<State> {
  const contactResult = await resend.contacts.create({
    audienceId,
    email,
    firstName,
    unsubscribed: false,
  });

  if (contactResult.error) {
    return {
      error: "Could not add contact to audience",
      message: null,
    };
  }

  sendSubscriptionEmail(email, firstName);

  return {
    error: null,
    message: randomGreeting(firstName),
  };
}

function randomGreeting(name: string) {
  const greetings = [
    `Hello ${name}!`,
    `Hi ${name}!`,
    `Hey ${name}!`,
    `Welcome ${name}!`,
  ];

  const thanksForSubscribing = [
    "Thanks for subscribing!",
    "Thanks for joining!",
    "Thanks for signing up!",
  ];

  return `${greetings[Math.floor(Math.random() * greetings.length)]} ${thanksForSubscribing[Math.floor(Math.random() * thanksForSubscribing.length)]}`;
}

function sendSubscriptionEmail(email: string, firstName: string) {
  const subject = "Thanks for subscribing!";

  const emailToken = encryptEmail(email);
  const unsubscribeUrl = `https://www.kalleott.de/emails/unsubscribe/${emailToken}`;

  const emailReactElement = (
    <WelcomeEmailTemplate
      unsubscribeUrl={unsubscribeUrl}
      firstName={firstName}
    />
  );

  return resend.emails.send({
    from: emailSender,
    to: email,
    subject,
    html: render(emailReactElement),
    text: render(emailReactElement, {
      plainText: true,
    }),
    headers: {
      "List-Unsubscribe": unsubscribeUrl,
    },
  });
}
