import { z } from "zod";

const privacyContact = {
  name: z.string().parse(process.env.PRIVACY_CONTACT_NAME),
  addressLine1: z.string().parse(process.env.PRIVACY_CONTACT_ADDRESS_LINE_1),
  addressLine2: z.string().parse(process.env.PRIVACY_CONTACT_ADDRESS_LINE_2),
  email: z.string().parse(process.env.PRIVACY_CONTACT_EMAIL),
};

export function PrivacyContact() {
  return (
    <p>
      {privacyContact.name}
      <br />
      {privacyContact.addressLine1}
      <br />
      {privacyContact.addressLine2}
      <br />
      {privacyContact.email}
    </p>
  );
}

export function ImprintAddress() {
  return (
    <p>
      {privacyContact.name}
      <br />
      {privacyContact.addressLine1}
      <br />
      {privacyContact.addressLine2}
    </p>
  );
}

export function ImprintEmail() {
  return <p>{privacyContact.email}</p>;
}
