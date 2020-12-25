import Layout from "../../components/layout";
import { getAllPostIds, getPostData, Post as PostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import Prism from "prismjs";

interface Props {
  postData: PostData;
}

export default function Post({ postData }: Props) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <link
          href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/style.css"
          rel="stylesheet"
          media='(prefers-color-scheme: dark)'
        />
        <link
          href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/light.css"
          rel="stylesheet"
          media='(prefers-color-scheme: light)'
        />
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params!.id as string[]);
  return {
    props: {
      postData,
    },
  };
};
