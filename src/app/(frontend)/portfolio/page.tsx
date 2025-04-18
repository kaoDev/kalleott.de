import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Container } from "../_components/container";
import { WorkExperience } from "./_components/WorkExperience";
import { Intro } from "./_components/intro";

export default async function Portfolio() {
	const payload = await getPayload({ config: configPromise });

	const experiences = await payload.find({
		collection: "projects",
		depth: 1,
		limit: 100,
		sort: "-completedAt",
	});

	return (
		<Container>
			<Intro />
			{experiences.docs.map((experience) => (
				<WorkExperience key={experience.id} project={experience} />
			))}
		</Container>
	);
}
