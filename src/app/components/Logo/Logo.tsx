import Image from "next/image";
import React from "react";
import LogoDarkMode from "../../../../public/images/favicon/dark/icon.svg";
import LogoLightMode from "../../../../public/images/favicon/light/icon.svg";

export function Logo() {
	return (
		<div className="relative aspect-square w-14">
			<Image
				src={LogoLightMode}
				fill
				alt="K O logo"
				className="block dark:hidden"
			/>
			<Image
				src={LogoDarkMode}
				fill
				alt="K O logo"
				className="hidden dark:block"
			/>
		</div>
	);
}
