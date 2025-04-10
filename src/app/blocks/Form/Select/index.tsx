"use client";

import { Label } from "@/components/ui/label";
import {
	Select as SelectComponent,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { SelectField } from "@payloadcms/plugin-form-builder/types";
import type React from "react";
import type { Control, FieldErrorsImpl, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { FieldError } from "../FieldError";
import { Width } from "../Width";

export const Select: React.FC<
	SelectField & {
		control: Control<FieldValues, unknown>;
		errors: Partial<
			FieldErrorsImpl<{
				[x: string]: unknown;
			}>
		>;
	}
> = ({ name, control, errors, label, options, required, width }) => {
	return (
		<Width width={width}>
			<Label htmlFor={name}>{label}</Label>
			<Controller
				control={control}
				defaultValue=""
				name={name}
				render={({ field: { onChange, value } }) => {
					const controlledValue = options.find((t) => t.value === value);

					return (
						<SelectComponent
							onValueChange={(val) => onChange(val)}
							value={controlledValue?.value}
						>
							<SelectTrigger className="w-full" id={name}>
								<SelectValue placeholder={label} />
							</SelectTrigger>
							<SelectContent>
								{options.map(({ label, value }) => {
									return (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									);
								})}
							</SelectContent>
						</SelectComponent>
					);
				}}
				rules={{ required }}
			/>
			{required && errors[name] && <FieldError />}
		</Width>
	);
};
