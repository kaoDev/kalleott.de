import type { FormFieldBlock } from "@payloadcms/plugin-form-builder/types";
import type { ComponentType } from "react";
import { Checkbox } from "./Checkbox";
import { Country } from "./Country";
import { Email } from "./Email";
import { Message } from "./Message";
import { NumberField } from "./NumberField";
import { Select } from "./Select";
import { State } from "./State";
import { Text } from "./Text";
import { Textarea } from "./Textarea";

type AvailableBlockTypes =
	| Exclude<FormFieldBlock["blockType"], "payment">
	| "number";

export const fields = {
	checkbox: Checkbox,
	country: Country,
	email: Email,
	message: Message,
	number: NumberField,
	select: Select,
	state: State,
	text: Text,
	textarea: Textarea,
	// biome-ignore lint: `any` is used to ensure all possible component types are allowed
} satisfies { [key in AvailableBlockTypes]: ComponentType<any> };
