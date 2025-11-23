"use client";

import type { TextField } from "@payloadcms/plugin-form-builder/types";
import type React from "react";
import type {
	FieldErrorsImpl,
	FieldValues,
	UseFormRegister,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "../FieldError";
import { Width } from "../Width";

export const NumberField: React.FC<
	TextField & {
		errors: Partial<
			FieldErrorsImpl<{
				[x: string]: unknown;
			}>
		>;
		register: UseFormRegister<FieldValues>;
	}
> = ({
	name,
	defaultValue,
	errors,
	label,
	register,
	required: requiredFromProps,
	width,
}) => {
	return (
		<Width width={width}>
			<Label htmlFor={name}>{label}</Label>
			<Input
				defaultValue={defaultValue}
				id={name}
				type="number"
				{...register(name, { required: requiredFromProps })}
			/>
			{requiredFromProps && errors[name] && <FieldError />}
		</Width>
	);
};
