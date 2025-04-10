"use client";

import { Checkbox as CheckboxUi } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { CheckboxField } from "@payloadcms/plugin-form-builder/types";
import type {
	FieldErrorsImpl,
	FieldValues,
	Path,
	UseFormRegister,
} from "react-hook-form";
import { FieldError } from "../FieldError";
import { Width } from "../Width";

interface Props<T extends FieldValues> extends CheckboxField {
	errors: Partial<
		FieldErrorsImpl<{
			[x: string]: unknown;
		}>
	>;
	getValues: unknown;
	register: UseFormRegister<T>;
	setValue: unknown;
}

export function Checkbox<T extends FieldValues>({
	name,
	defaultValue,
	errors,
	label,
	register,
	required: requiredFromProps,
	width,
}: Props<T>) {
	return (
		<Width width={width}>
			<div className="flex items-center gap-2">
				<CheckboxUi
					defaultChecked={defaultValue}
					id={name}
					{...register(name as Path<T>, { required: requiredFromProps })}
				/>
				<Label htmlFor={name}>{label}</Label>
			</div>
			{requiredFromProps && errors[name] && <FieldError />}
		</Width>
	);
}
