import type React from "react";
import type { Header as HeaderType } from "../../../../payload-types";
import { CMSLink } from "../../Link";

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
	const navItems = header?.navItems || [];

	return (
		<nav className="flex items-center gap-3">
			{navItems.map(({ link }, index) => {
				return (
					<CMSLink
						key={`${link.url}-${index}`}
						{...link}
						appearance="link"
						className="text-lg"
					/>
				);
			})}
		</nav>
	);
};
