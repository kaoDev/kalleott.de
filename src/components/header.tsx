import Link from "next/link";

export namespace Header {
  export interface Props {
    titleOverride?: string;
    hrefOverride?: string;
  }
}

export function Header(props: Header.Props) {
  return (
    <h2 className="mb-20 mt-8 flex items-center text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
      <Link href={props.hrefOverride || "/"} className="hover:underline">
        {props.titleOverride || "← Back home"}
      </Link>
      .
    </h2>
  );
}
