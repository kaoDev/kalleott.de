"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { EmailField } from "@payloadcms/plugin-form-builder/types";
import type {
	FieldErrorsImpl,
	FieldValues,
	Path,
	UseFormRegister,
} from "react-hook-form";
import { FieldError } from "../FieldError";
import { Width } from "../Width";

interface Props<T extends FieldValues> extends EmailField {
	errors: Partial<
		FieldErrorsImpl<{
			[x: string]: unknown;
		}>
	>;
	register: UseFormRegister<T>;
}

export function Email<T extends FieldValues>({
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
			<Label htmlFor={name}>{label}</Label>
			<Input
				defaultValue={defaultValue}
				id={name}
				type="text"
				{...register(name as Path<T>, {
					pattern: /^\S[^\s@]*@\S+$/,
					required: requiredFromProps,
				})}
			/>

			{requiredFromProps && errors[name] && <FieldError />}
		</Width>
	);
}
