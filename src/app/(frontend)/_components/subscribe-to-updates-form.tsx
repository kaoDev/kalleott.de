import { Prose } from "@/components/Prose/Prose";
import { subscribeToUpdates } from "@/lib/subscribeToUpdates";
import { SubscribeToUpdatesFormClient } from "./subscribe-to-updates-form-client";

export function SubscribeToUpdatesForm() {
	return (
		<section className="mb-32">
			<Prose>
				<h3 id="mailing-list" className="text-2xl font-bold">
					Mailing List
				</h3>
				<p>
					If you want to receive updates on new posts, leave your email below.
				</p>
				<SubscribeToUpdatesFormClient subscribeToUpdates={subscribeToUpdates} />
			</Prose>
		</section>
	);
}

export function SubscribeToUpdatesFormWithoutText() {
	return (
		<SubscribeToUpdatesFormClient subscribeToUpdates={subscribeToUpdates} />
	);
}
