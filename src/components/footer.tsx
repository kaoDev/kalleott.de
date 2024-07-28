import Link from "next/link";
import { z } from "zod";

const copyrightName = z.string().parse(process.env.PRIVACY_CONTACT_NAME);

export function Footer() {
  return (
    <footer className="bg-gray-800 p-5 text-white">
      <div className="container mx-auto"></div>
      <div className="flex justify-center">
        <p className="mx-4">
          © {new Date().getFullYear()} {copyrightName}
        </p>
        <Link className="mx-4 hover:underline" href="/legal/privacy">
          Privacy Policy
        </Link>
        <Link className="mx-4 hover:underline" href="/legal/imprint">
          Imprint
        </Link>
      </div>
    </footer>
  );
}
