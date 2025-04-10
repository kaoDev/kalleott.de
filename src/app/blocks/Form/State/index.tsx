"use client";

import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { StateField } from "@payloadcms/plugin-form-builder/types";
import type React from "react";
import type { Control, FieldErrorsImpl, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { FieldError } from "../FieldError";
import { Width } from "../Width";
import { stateOptions } from "./options";

export const State: React.FC<
	StateField & {
		control: Control<FieldValues, unknown>;
		errors: Partial<
			FieldErrorsImpl<{
				[x: string]: unknown;
			}>
		>;
	}
> = ({ name, control, errors, label, required, width }) => {
	return (
		<Width width={width}>
			<Label htmlFor={name}>{label}</Label>
			<Controller
				control={control}
				defaultValue=""
				name={name}
				render={({ field: { onChange, value } }) => {
					const controlledValue = stateOptions.find((t) => t.value === value);

					return (
						<Select
							onValueChange={(val) => onChange(val)}
							value={controlledValue?.value}
						>
							<SelectTrigger className="w-full" id={name}>
								<SelectValue placeholder={label} />
							</SelectTrigger>
							<SelectContent>
								{stateOptions.map(({ label, value }) => {
									return (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
					);
				}}
				rules={{ required }}
			/>
			{required && errors[name] && <FieldError />}
		</Width>
	);
};
