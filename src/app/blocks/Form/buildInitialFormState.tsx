import type { FormFieldBlock } from "@payloadcms/plugin-form-builder/types";

export const buildInitialFormState = (fields: FormFieldBlock[]) => {
	return fields?.reduce<Record<string, unknown>>((accumulator, field) => {
		switch (field.blockType) {
			case "checkbox":
				accumulator[field.name] = false;
				return accumulator;
			case "country":
			case "email":
			case "text":
			case "select":
			case "state":
				accumulator[field.name] = "";
				return accumulator;
			default:
				return accumulator;
		}
	}, {});
};
