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
  console.log("Updating existing contact");
  const updateResult = await resend.contacts.update({
    audienceId,
    id,
    firstName,
    unsubscribed: false,
  });

  console.log("Update result", updateResult);

  if (updateResult.error) {
    return {
      error: "Something went wrong, please try again later",
      message: null,
    };
  }

  const welcomeEmailSendResult = await sendSubscriptionEmail(email, firstName);

  console.log("Welcome email send result", welcomeEmailSendResult);

  return {
    error: null,
    message: randomGreeting(firstName),
  };
}

async function addNewContact(email: string, firstName: string): Promise<State> {
  console.log("Adding new contact");
  const contactResult = await resend.contacts.create({
    audienceId,
    email,
    firstName,
    unsubscribed: false,
  });

  console.log("Contact result", contactResult);

  if (contactResult.error) {
    return {
      error: "Could not add contact to audience",
      message: null,
    };
  }

  const welcomeEmailSendResult = await sendSubscriptionEmail(email, firstName);

  console.log("Welcome email send result", welcomeEmailSendResult);

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
  console.log("Sending subscription email");
  const subject = "Thanks for subscribing!";

  const emailToken = encryptEmail(email);
  const unsubscribeUrl = `https://kalleott.de/emails/unsubscribe/${emailToken}`;

  const emailReactElement = (
    <WelcomeEmailTemplate
      unsubscribeUrl={unsubscribeUrl}
      firstName={firstName}
    />
  );

  console.log("Sending email", email, firstName, subject, unsubscribeUrl);

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
