import Image from "next/image";
import avatarImage from "./assets/_DSC5195.jpg";

export function Avatar() {
	return (
		<div className="flex items-center justify-center">
			<Image
				src={avatarImage}
				alt="Kalle's avatar"
				className="w-32 rounded-full sm:w-40 md:w-64"
				width={250}
				height={250}
			/>
		</div>
	);
}
