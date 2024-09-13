"use client";

import type {
	FormFieldBlock,
	Form as FormType,
} from "@payloadcms/plugin-form-builder/types";
import { useRouter } from "next/navigation";
import { type ReactNode, useCallback, useState } from "react";
import {
	type Control,
	type FieldErrors,
	type FieldValues,
	type UseFormRegister,
	type UseFormReturn,
	useForm,
} from "react-hook-form";
import { Button } from "src/app/components/ui/button";
import { buildInitialFormState } from "./buildInitialFormState";
import { fields } from "./fields";

export type Value = unknown;

export interface Property {
	[key: string]: Value;
}

export interface Data {
	[key: string]: Property | Property[];
}

interface Props {
	introText: ReactNode;
	confirmationText: ReactNode;
	form: FormType;
}

function renderFormField<T extends FieldValues>(
	field: FormFieldBlock,
	formMethods: UseFormReturn,
	control: Control,
	errors: FieldErrors,
	register: UseFormRegister<T>,
) {
	switch (field.blockType) {
		case "checkbox":
			return (
				<fields.checkbox
					{...field}
					{...formMethods}
					errors={errors}
					register={register}
				/>
			);
		case "country":
			return (
				<fields.country
					{...field}
					{...formMethods}
					errors={errors}
					control={control}
				/>
			);
		case "email":
			return (
				<fields.email
					{...field}
					{...formMethods}
					errors={errors}
					register={register}
				/>
			);
		case "message":
			return <fields.message {...field} {...formMethods} />;
		case "select":
			return (
				<fields.select
					{...field}
					{...formMethods}
					errors={errors}
					control={control}
				/>
			);
		case "state":
			return (
				<fields.state
					{...field}
					{...formMethods}
					errors={errors}
					control={control}
				/>
			);
		case "text":
			return (
				<fields.text
					{...field}
					{...formMethods}
					errors={errors}
					register={register}
				/>
			);
		case "textarea":
			return (
				<fields.textarea
					{...field}
					{...formMethods}
					errors={errors}
					register={register}
				/>
			);

		default:
			break;
	}
}

export function ClientFormBlock(props: Props) {
	const {
		introText,
		confirmationText,
		form: formFromProps,
		form: { id: formID, confirmationType, redirect, submitButtonLabel } = {},
	} = props;

	const formMethods = useForm({
		defaultValues: buildInitialFormState(formFromProps.fields),
	});
	const {
		control,
		formState: { errors },
		handleSubmit,
		register,
	} = formMethods;

	const [isLoading, setIsLoading] = useState(false);
	const [hasSubmitted, setHasSubmitted] = useState<boolean>();
	const [error, setError] = useState<
		{ message: string; status?: string } | undefined
	>();
	const router = useRouter();

	const onSubmit = useCallback(
		(data: Record<string, unknown>) => {
			let loadingTimerID: ReturnType<typeof setTimeout>;
			const submitForm = async () => {
				setError(undefined);

				const dataToSend = Object.entries(data).map(([name, value]) => ({
					field: name,
					value,
				}));

				// delay loading indicator by 1s
				loadingTimerID = setTimeout(() => {
					setIsLoading(true);
				}, 1000);

				try {
					const req = await fetch(
						`${process.env.NEXT_PUBLIC_SERVER_URL}/api/form-submissions`,
						{
							body: JSON.stringify({
								form: formID,
								submissionData: dataToSend,
							}),
							headers: {
								"Content-Type": "application/json",
							},
							method: "POST",
						},
					);

					const res = await req.json();

					clearTimeout(loadingTimerID);

					if (req.status >= 400) {
						setIsLoading(false);

						setError({
							message: res.errors?.[0]?.message || "Internal Server Error",
							status: res.status,
						});

						return;
					}

					setIsLoading(false);
					setHasSubmitted(true);

					if (confirmationType === "redirect" && redirect) {
						const { url } = redirect;

						const redirectUrl = url;

						if (redirectUrl) router.push(redirectUrl);
					}
				} catch (err) {
					console.warn(err);
					setIsLoading(false);
					setError({
						message: "Something went wrong.",
					});
				}
			};

			void submitForm();
		},
		[router, formID, redirect, confirmationType],
	);

	return (
		<div className="container max-w-[48rem] pb-20">
			{introText && !hasSubmitted ? introText : null}
			{!isLoading && hasSubmitted && confirmationType === "message"
				? confirmationText
				: null}
			{isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
			{error && <div>{`${error.status || "500"}: ${error.message || ""}`}</div>}
			{!hasSubmitted && (
				<form id={formID} onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4 last:mb-0">
						{formFromProps?.fields?.map((field, index) => {
							return (
								<div
									className="mb-6 last:mb-0"
									key={`${field.blockName}-${index}`}
								>
									{renderFormField(
										field,
										formMethods,
										control,
										errors,
										register,
									)}
								</div>
							);
						}) ?? null}
					</div>

					<Button form={formID} type="submit" variant="default">
						{submitButtonLabel}
					</Button>
				</form>
			)}
		</div>
	);
}
