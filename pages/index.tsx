import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData, Post } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

interface Props {
  allPostsData: Post[];
}

export default function Home({ allPostsData }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi, I'm Kalle a software engineer living in Hamburg focused on
          frontend- and app-development.
        </p>
        <p>
          Besides my work I like to take pictures which you can find on my{" "}
          <a target="_blank" href="https://www.instagram.com/kalle_ott/">
            instagram
          </a>
          .
        </p>
        <p>
          If you want to contact me feel free to reach out on{" "}
          <a target="_blank" href="https://twitter.com/kaoDev">
            Twitter
          </a>{" "}
          or{" "}
          <a
            target="_blank"
            href="https://www.linkedin.com/in/kalle-ott-94977073/"
          >
            LinkedIn
          </a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
