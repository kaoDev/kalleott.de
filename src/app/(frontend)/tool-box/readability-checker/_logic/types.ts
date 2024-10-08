export interface ColorInfo {
	hex: string;
	name: string;
}

export interface ReadabilityCheck {
	color: ColorInfo;
	readabilityValues: {
		background: ColorInfo;
		contrast: string;
		aa: boolean;
		aaa: boolean;
		largeText: boolean;
		decorative: boolean;
	}[];
}
