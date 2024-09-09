import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { Container } from "../_components/container";
import { Intro } from "./_components/intro";
import { WorkExperience } from "./_components/WorkExperience";

export default async function Portfolio() {
  const payload = await getPayloadHMR({ config: configPromise });

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
