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
	firstName: string;
}

export namespace Subscribe {
	export interface Props {
		subscribeToUpdates(state: FormState, payload: Payload): Promise<FormState>;
	}
}

export function SubscribeToUpdatesFormClient(props: Subscribe.Props) {
	const [formState, subscribe, isPending] = useFormState(
		props.subscribeToUpdates,
		{
			error: null,
			message: null,
		},
	);

	return (
		<form
			action={(formData) => {
				subscribe({
					email: formData.get("email") as string,
					firstName: formData.get("firstName") as string,
				});
			}}
			className="mx-auto mt-8 flex w-full max-w-sm flex-col space-y-4"
		>
			<Input
				type="text"
				name="firstName"
				placeholder="First name"
				autoComplete="given-name"
			/>
			<Input
				type="text"
				name="email"
				placeholder="Email"
				autoComplete="email"
			/>
			{formState.error && (
				// biome-ignore lint/a11y/useSemanticElements: alert is no known semantic element
				<p className="text-red-600" role="alert">
					{formState.error}
				</p>
			)}
			{formState.message && (
				// biome-ignore lint/a11y/useSemanticElements: alert is no known semantic element
				<p className="text-green-600" role="alert">
					{formState.message}
				</p>
			)}

			<Button disabled={isPending} type="submit">
				Subscribe
			</Button>
		</form>
	);
}
