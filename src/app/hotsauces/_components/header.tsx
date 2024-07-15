import Link from "next/link";

const Header = () => {
  return (
    <h2 className="mb-20 mt-8 flex items-center text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
      <Link href="/" className="hover:underline">
        ← Back home
      </Link>
      .
    </h2>
  );
};

export default Header;
