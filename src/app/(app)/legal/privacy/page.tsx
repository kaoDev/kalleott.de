import { LegalPage } from "@/components/legal-page";
import { PrivacyContact } from "../_components/contact";
import DateFormatter from "@/components/date-formatter";

export default function Privacy() {
  return (
    <LegalPage>
      <h1>Privacy Declaration</h1>
      <b>Data Controller</b>
      <PrivacyContact />
      <b>Data Collection and Usage</b>
      <p>The following data can be collected when you use my website:</p>
      <ul>
        <li>IP address (automatically collected by Vercel)</li>
        <li>Email address (if you subscribe to my mailing list)</li>
      </ul>
      <p>This data is used to:</p>
      <ul>
        <li>Provide and maintain the website service</li>
        <li>Send you newsletters and updates (if subscribed)</li>
      </ul>
      <b>Data Storage and Security</b>
      <p>
        The website is hosted on Vercel, and the mailing list is managed through
        Resend. Both services comply with GDPR regulations. I retain your data
        only as long as necessary for the purposes outlined above.
      </p>
      <p>
        For more information, please visit the{" "}
        <a href="https://vercel.com/legal/privacy-policy">
          Vercel Privacy Policy
        </a>{" "}
        or the{" "}
        <a href="https://resend.com/legal/privacy-policy">
          Resend Privacy Policy
        </a>
      </p>
      <b>Your Rights</b>
      <p>Under GDPR, you have the right to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Rectify inaccurate personal data</li>
        <li>Erase your personal data</li>
        <li>Restrict processing of your personal data</li>
        <li>Object to processing of your personal data</li>
        <li>Data portability</li>
      </ul>
      <p>
        To exercise these rights, please reach out to me using the details
        provided in the Data Controller section.
      </p>
      <b>Cookies</b>
      <p>
        The website uses essential cookies for proper functioning. No
        third-party tracking cookies are used.
      </p>
      <b>Changes to This Policy</b>
      <p>
        We may update this privacy policy from time to time. We will notify
        subscribers of any significant changes via email.
      </p>
      <p>
        Last updated: <DateFormatter dateString={"2024-07-26"} />
      </p>
    </LegalPage>
  );
}
