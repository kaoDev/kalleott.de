import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import type { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import {
	BoldFeature,
	FixedToolbarFeature,
	HeadingFeature,
	ItalicFeature,
	LinkFeature,
	UnderlineFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";
import type { Page, Post } from "src/payload-types";
import { z } from "zod";
import { Categories } from "./payload/collections/Categories";
import { Competencies } from "./payload/collections/Competencies";
import { HotSauces } from "./payload/collections/HotSauces";
import { Media } from "./payload/collections/Media/Media";
import { Pages } from "./payload/collections/Pages";
import { Posts } from "./payload/collections/Posts";
import { Projects } from "./payload/collections/Projects";
import { Users } from "./payload/collections/Users";
import { generateAltText } from "./payload/endpoints/generateAltText";
import { Footer } from "./payload/globals/Footer/Footer";
import { Header } from "./payload/globals/Header/Header";
import { HotSauceRequestForm } from "./payload/globals/HotSauceRequestForm/HotSauceRequestForm";
import { revalidateRedirects } from "./payload/hooks/revalidateRedirects";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
	return doc?.title ? `${doc.title}` : "";
};

const serverUrl = z.string().parse(process.env.NEXT_PUBLIC_SERVER_URL);
const payloadSecret = z.string().parse(process.env.PAYLOAD_SECRET);
const blobReadWriteToken = z.string().parse(process.env.BLOB_READ_WRITE_TOKEN);
const payloadEmailFromAddress = z
	.string()
	.parse(process.env.PAYLOAD_EMAIL_FROM_ADDRESS);
const payloadEmailFromName = z
	.string()
	.parse(process.env.PAYLOAD_EMAIL_FROM_NAME);
const resendApiKey = z.string().parse(process.env.RESEND_API_KEY);
const postgresUrl = z.string().parse(process.env.POSTGRES_URL);

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
	return doc?.slug ? `${serverUrl}/${doc.slug}` : serverUrl;
};

export default buildConfig({
	admin: {
		components: {},
		importMap: {
			baseDir: path.resolve(dirname),
		},
		user: Users.slug,
		livePreview: {
			breakpoints: [
				{
					label: "Mobile",
					name: "mobile",
					width: 375,
					height: 667,
				},
				{
					label: "Tablet",
					name: "tablet",
					width: 768,
					height: 1024,
				},
				{
					label: "Desktop",
					name: "desktop",
					width: 1440,
					height: 900,
				},
			],
		},
	},
	// This config helps us configure global or default features that the other editors can inherit
	editor: lexicalEditor({
		features: ({ defaultFeatures }) => {
			return [
				...defaultFeatures,
				UnderlineFeature(),
				BoldFeature(),
				ItalicFeature(),
				LinkFeature({
					enabledCollections: ["pages", "posts"],
					fields: ({ defaultFields }) => {
						const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
							if ("name" in field && field.name === "url") return false;
							return true;
						});

						return [
							...defaultFieldsWithoutUrl,
							{
								name: "url",
								type: "text",
								admin: {
									condition: ({ linkType }) => linkType !== "internal",
								},
								label: ({ t }) => t("fields:enterURL"),
								required: true,
							},
						];
					},
				}),
			];
		},
	}),
	db: postgresAdapter({
		pool: {
			connectionString: postgresUrl,
		},
	}),
	collections: [
		Pages,
		Posts,
		Media,
		Categories,
		Users,
		HotSauces,
		Competencies,
		Projects,
	],
	cors: [serverUrl],
	csrf: [serverUrl],
	endpoints: [
		{
			handler: generateAltText,
			method: "post",
			path: "/media/generateAltText",
		},
	],
	globals: [Header, Footer, HotSauceRequestForm],
	plugins: [
		redirectsPlugin({
			collections: ["pages", "posts"],
			overrides: {
				// @ts-expect-error
				fields: ({ defaultFields }) => {
					return defaultFields.map((field) => {
						if ("name" in field && field.name === "from") {
							return {
								...field,
								admin: {
									description:
										"You will need to rebuild the website when changing this field.",
								},
							};
						}
						return field;
					});
				},
				hooks: {
					afterChange: [revalidateRedirects],
				},
			},
		}),
		nestedDocsPlugin({
			collections: ["categories"],
		}),
		seoPlugin({
			generateTitle,
			generateURL,
		}),
		formBuilderPlugin({
			fields: {
				payment: false,
			},
			formOverrides: {
				fields: ({ defaultFields }) => {
					return defaultFields.map((field) => {
						if ("name" in field && field.name === "confirmationMessage") {
							return {
								...field,
								editor: lexicalEditor({
									features: ({ rootFeatures }) => {
										return [
											...rootFeatures,
											FixedToolbarFeature(),
											HeadingFeature({
												enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
											}),
										];
									},
								}),
							};
						}
						return field;
					});
				},
			},
		}),
		vercelBlobStorage({
			enabled: true, // Optional, defaults to true
			// Specify which collections should use Vercel Blob
			collections: {
				[Media.slug]: true,
			},
			// Token provided by Vercel once Blob storage is added to your Vercel project
			token: blobReadWriteToken,
		}),
	],
	secret: payloadSecret,
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	email: resendAdapter({
		defaultFromAddress: payloadEmailFromAddress,
		defaultFromName: payloadEmailFromName,
		apiKey: resendApiKey,
	}),
});
