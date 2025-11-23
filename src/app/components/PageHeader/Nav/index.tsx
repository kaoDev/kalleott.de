import type React from "react";
import { MobileNav } from "@/components/PageHeader/Nav/mobile-nav";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { Header as HeaderType } from "../../../../payload-types";
import { CMSLink } from "../../Link";

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
	const navItems = header.navItems || [];

	return (
		<>
			<MobileNav header={header} />
			<NavigationMenu className="hidden min-[440px]:block">
				<NavigationMenuList>
					{navItems.map(({ link }, index) => {
						return (
							<NavigationMenuItem
								key={`${link.url}-${index}`}
								className="row-span-3"
							>
								<NavigationMenuLink
									asChild
									className={navigationMenuTriggerStyle()}
								>
									<CMSLink
										appearance="link"
										className="text-lg"
										url={link.url}
										newTab={link.newTab}
										reference={link.reference}
										type={link.type}
									>
										{link.label}
									</CMSLink>
								</NavigationMenuLink>
							</NavigationMenuItem>
						);
					})}
				</NavigationMenuList>
			</NavigationMenu>
		</>
	);
};
