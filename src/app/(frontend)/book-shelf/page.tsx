import { Prose } from "@/components/Prose/Prose";
import type { SimpleRichTextContent } from "@/components/RichText/SimpleRichText";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { BookCard } from "./_components/BookCard";

async function getRecommendedBooks() {
	const payload = await getPayload({ config: configPromise });

	const { docs } = await payload.find({
		collection: "books",
		sort: "priority",
	});

	docs.sort((a, b) => {
		const prioCompare = a.priority - b.priority;

		if (prioCompare !== 0) {
			return prioCompare;
		}

		if (a.readingDate < b.readingDate) {
			return 1;
		}
		return -1;
	});

	return docs;
}

export default async function BookShelf() {
	const recommendedBooks = await getRecommendedBooks();

	return (
		<div className="container mx-auto px-4 py-8">
			<Prose className="mb-6">
				<h1>My Reading & Listening List</h1>
				<p>
					Here’s a selection of books related to my work that I have read and
					would recommend to others.
				</p>
			</Prose>
			<div className="grid grid-cols-1 gap-6">
				{recommendedBooks.map((book) => (
					<BookCard
						key={book.id}
						author={book.author}
						category={typeof book.category === "object" ? book.category : null}
						summary={book.summary as SimpleRichTextContent}
						image={book.image}
						title={book.title}
						link={book.link}
					/>
				))}
			</div>
		</div>
	);
}
