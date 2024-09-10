import type { Metadata } from "next/types";
import PaginatedPosts, {
  dynamic,
  revalidate,
  generateMetadata as paginatedGenerateMetadata,
} from "./page/[pageNumber]/page";

export { dynamic, revalidate };

export default async function Page() {
  return <PaginatedPosts params={{ pageNumber: 1 }} />;
}

export function generateMetadata(): Metadata {
  return paginatedGenerateMetadata({ params: { pageNumber: 1 } });
}
