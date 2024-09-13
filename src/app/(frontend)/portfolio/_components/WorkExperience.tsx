import { Prose } from "@/components/Prose/Prose";
import { RichText } from "@/components/RichText";
import type { Project } from "src/payload-types";

interface Props {
	project: Project;
}

export function WorkExperience({ project }: Props) {
	const tags = project.tags?.filter(
		(tag) => tag != null && typeof tag !== "number",
	);

	const startDate = project.startedAt ? new Date(project.startedAt) : null;
	const endDate = project.completedAt ? new Date(project.completedAt) : null;

	let title = (
		<h2 className="text-l font-bold md:text-2xl lg:text-3xl">
			{project.title}
		</h2>
	);

	if (project.link) {
		title = (
			<a
				className="hover:underline"
				href={project.link}
				target="_blank"
				rel="noopener noreferrer"
			>
				{title}
			</a>
		);
	}

	return (
		<div className="container pb-16">
			<div className="mx-auto flex max-w-2xl flex-col pb-6 md:flex-row md:items-center md:justify-between">
				{title}
				<div>
					<DateRange startDate={startDate} endDate={endDate} />
				</div>
			</div>
			{project.description ? <RichText content={project.description} /> : null}
			<Prose>
				{tags && tags.length > 0 ? (
					<div className="flex flex-wrap">
						{tags.map((tech) => (
							<span
								key={tech.id}
								className="mb-2 mr-2 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-800"
							>
								{tech.title}
							</span>
						))}
					</div>
				) : null}
			</Prose>
		</div>
	);
}

function DateRange({
	startDate,
	endDate,
}: {
	startDate: Date | null;
	endDate: Date | null;
}) {
	if (!startDate) {
		return null;
	}

	return (
		<p>
			<MonthAndYear date={startDate} />
			{endDate ? (
				<>
					{" "}
					- <MonthAndYear date={endDate} />
				</>
			) : null}
		</p>
	);
}

function MonthAndYear({ date }: { date: Date }) {
	return (
		<time dateTime={date.toISOString()}>
			{date.toLocaleDateString("en-US", {
				month: "short",
				year: "numeric",
			})}
		</time>
	);
}
