import { LegalPage } from "@/components/legal-page";
import { ImprintAddress, ImprintEmail } from "../_components/contact";
import DateFormatter from "@/components/date-formatter";

export default function Imprint() {
  return (
    <LegalPage>
      <h1>Imprint (Impressum)</h1>
      <b>According to § 5 TMG (Telemediengesetz)</b>
      <ImprintAddress />
      <b>Contact:</b>
      <ImprintEmail />
      <b>Responsible for content according to § 55 Abs. 2 RStV:</b>
      <ImprintAddress />
      <b>Online Dispute Resolution:</b>
      <p>
        The European Commission provides a platform for online dispute
        resolution (OS):{" "}
        <a href="https://ec.europa.eu/consumers/odr">
          https://ec.europa.eu/consumers/odr
        </a>
      </p>
      <p>
        I am not willing or obliged to participate in dispute resolution
        proceedings before a consumer arbitration board.
      </p>
      <b>Liability for Content:</b>
      <p>
        As a service provider, we are responsible for our own content on these
        pages according to § 7 Abs.1 TMG (German Telemedia Act). According to §§
        8 to 10 TMG, we are not obligated to monitor transmitted or stored
        third-party information or to investigate circumstances that indicate
        illegal activity. Obligations to remove or block the use of information
        under general law remain unaffected. However, liability in this regard
        is only possible from the moment of knowledge of a specific
        infringement. Upon notification of such violations, we will remove the
        content immediately.
      </p>
      <b>Liability for Links:</b>
      <p>
        Our offer contains links to external websites of third parties, on whose
        contents we have no influence. Therefore, we cannot assume any liability
        for these external contents. The respective provider or operator of the
        pages is always responsible for the content of the linked pages. The
        linked pages were checked for possible legal violations at the time of
        linking. Illegal contents were not recognizable at the time of linking.
        However, a permanent control of the contents of the linked pages is not
        reasonable without concrete evidence of a violation of law. Upon
        notification of violations, we will remove such links immediately.
      </p>
      <b>Copyright:</b>
      <p>
        The contents and works on these pages created by the site operators are
        subject to German copyright law. The reproduction, editing,
        distribution, and any kind of exploitation outside the limits of
        copyright require the written consent of the respective author or
        creator. Downloads and copies of these pages are only permitted for
        private, non-commercial use. Insofar as the content on this site was not
        created by the operator, the copyrights of third parties are respected.
        In particular, third-party content is marked as such. Should you become
        aware of a copyright infringement, please inform us accordingly. Upon
        notification of violations, we will remove such content immediately.
      </p>
      <p>
        Last updated: <DateFormatter dateString={"2024-07-26"} />
      </p>
    </LegalPage>
  );
}
