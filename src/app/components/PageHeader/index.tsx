import { HeaderClient } from "@/components/PageHeader/index.client";
import { getCachedGlobal } from "@/utilities/getGlobals";
import Link from "next/link";
import type { Header } from "../../../payload-types";
import { Logo } from "../Logo/Logo";
import { HeaderNav } from "./Nav";

export async function PageHeader() {
	const header: Header = await getCachedGlobal("header", 1)();

	return (
		<HeaderClient>
			<div className="container relative flex justify-between py-4">
				<Link href="/">
					<Logo />
				</Link>
				<HeaderNav header={header} />
			</div>
		</HeaderClient>
	);
}
