import { getCachedGlobal } from "@/utilities/getGlobals";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import type { Footer } from "../../../payload-types";
import { ThemeSelector } from "../../providers/Theme/ThemeSelector";
import { CMSLink } from "../Link";
import { Logo } from "../Logo/Logo";

export async function PageFooter() {
	const payload = await getPayload({ config: configPromise });
	const pageOwnerEntry = await payload.find({
		collection: "users",
		where: {
			owner: { equals: true },
		},
	});

	const pageOwner = pageOwnerEntry.docs[0];
	const footer: Footer = await getCachedGlobal("footer", 1)();

	const navItems = footer?.navItems || [];

	return (
		<footer
			className="border-border border-t bg-black text-white"
			data-theme="dark"
		>
			<div className="container flex flex-col gap-8 py-8 min-[870px]:flex-row min-[870px]:justify-between">
				<div className="flex items-center gap-4">
					<Logo />
					{pageOwner ? (
						<p className="mx-4 text-sm font-bold">
							© {new Date().getFullYear()} {pageOwner.firstName}{" "}
							{pageOwner.surName}
						</p>
					) : null}
				</div>

				<div className="flex flex-col-reverse items-start gap-4 min-[870px]:flex-row min-[870px]:items-center">
					<ThemeSelector />
					<nav className="flex flex-col gap-4 min-[870px]:flex-row">
						{navItems.map(({ link }, index) => {
							return (
								<CMSLink
									className="text-white"
									key={`${link.url}-${index}`}
									{...link}
								/>
							);
						})}
					</nav>
				</div>
			</div>
		</footer>
	);
}
