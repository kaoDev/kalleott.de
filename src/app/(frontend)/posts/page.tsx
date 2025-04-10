import type { Metadata } from "next/types";
import PaginatedPosts, {
	dynamic,
	generateMetadata as paginatedGenerateMetadata,
	revalidate,
} from "./page/[pageNumber]/page";

export { dynamic, revalidate };

const defaultParamsPromise = Promise.resolve({
	pageNumber: "1",
});

export default async function Page() {
	return <PaginatedPosts params={defaultParamsPromise} />;
}

export function generateMetadata(): Promise<Metadata> {
	return paginatedGenerateMetadata({ params: defaultParamsPromise });
}
