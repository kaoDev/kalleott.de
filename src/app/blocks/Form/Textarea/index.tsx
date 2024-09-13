import { Label } from "@/components/ui/label";
import { Textarea as TextAreaComponent } from "@/components/ui/textarea";
import type { TextField } from "@payloadcms/plugin-form-builder/types";
import type {
	FieldErrorsImpl,
	FieldValues,
	Path,
	UseFormRegister,
} from "react-hook-form";
import { FieldError } from "../FieldError";
import { Width } from "../Width";

interface Props<T extends FieldValues> extends Omit<TextField, "blockType"> {
	errors: Partial<
		FieldErrorsImpl<{
			[x: string]: unknown;
		}>
	>;
	register: UseFormRegister<T>;
	rows?: number;
}

export function Textarea<T extends FieldValues>({
	name,
	defaultValue,
	errors,
	label,
	register,
	required: requiredFromProps,
	rows = 3,
	width,
}: Props<T>) {
	return (
		<Width width={width}>
			<Label htmlFor={name}>{label}</Label>

			<TextAreaComponent
				defaultValue={defaultValue}
				id={name}
				rows={rows}
				{...register(name as Path<T>, { required: requiredFromProps })}
			/>

			{requiredFromProps && errors[name] && <FieldError />}
		</Width>
	);
}
