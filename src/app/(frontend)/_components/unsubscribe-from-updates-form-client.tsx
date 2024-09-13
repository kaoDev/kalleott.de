"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";

interface FormState {
	error: null | string;
	message: null | string;
}
interface Payload {
	email: string;
}

export namespace Subscribe {
	export interface Props {
		prefilledEmail?: string;
		unsubscribeFromUpdates(
			state: FormState,
			payload: Payload,
		): Promise<FormState>;
	}
}

export function UnsubscribeFromUpdatesFormClient(props: Subscribe.Props) {
	const [formState, subscribe, isPending] = useFormState(
		props.unsubscribeFromUpdates,
		{
			error: null,
			message: null,
		},
	);

	if (formState.message) {
		return (
			// biome-ignore lint/a11y/useSemanticElements: alert is no known semantic element
			<p className="my-8" role="alert">
				{formState.message}
			</p>
		);
	}

	return (
		<form
			action={(formData) => {
				subscribe({
					email: formData.get("email") as string,
				});
			}}
			className="mx-auto mt-8 flex w-full max-w-sm flex-col space-y-4"
		>
			<Input
				type="text"
				name="email"
				placeholder="Email"
				autoComplete="email"
				defaultValue={props.prefilledEmail}
			/>
			{formState.error && (
				// biome-ignore lint/a11y/useSemanticElements: alert is no known semantic element
				<p className="text-red-600" role="alert">
					{formState.error}
				</p>
			)}
			<Button disabled={isPending} type="submit">
				Unsubscribe
			</Button>
		</form>
	);
}
