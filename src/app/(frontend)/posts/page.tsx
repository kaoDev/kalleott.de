import type { Metadata } from "next/types";
import PaginatedPosts, {
	generateMetadata as paginatedGenerateMetadata,
} from "./page/[pageNumber]/page";

// Next.js 16: dynamic and revalidate must be defined directly, not re-exported
export const dynamic = "force-static";
export const revalidate = 600;

const defaultParamsPromise = Promise.resolve({
	pageNumber: "1",
});

export default async function Page() {
	return <PaginatedPosts params={defaultParamsPromise} />;
}

export function generateMetadata(): Promise<Metadata> {
	return paginatedGenerateMetadata({ params: defaultParamsPromise });
}
