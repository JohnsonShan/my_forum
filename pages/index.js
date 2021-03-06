import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { useState } from "react";
import UploadPost from "../components/uploadPost.js";

const domain = "http://34.70.158.129";
// const domain = "http://localhost:8000";

export default function Home(props) {
  let [input, setInput] = useState("");
  let [title, setTitle] = useState("");

  const handleTitleChange = (setTitle) => (e) => {
    setTitle(e.target.value);
  };
  const handleInputChange = (setInput) => (e) => {
    setInput(e.target.value);
  };
  async function handleSubmit(e) {
    e.preventDefault();

    const csrftoken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken"))
      .split("=")[1];

    const data = {
      title: title,
      content: input,
      comments: [],
    };
    const endPoint = domain + "/posts/";
    const res = await fetch(endPoint, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + csrftoken,
      },
      body: JSON.stringify(data),
    });
    console.log("res", res);
    await location.reload();
  }

  return (
    <Layout home>
      <Head>…</Head>
      <section className={utilStyles.headingMd}></section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>My Simple Forum</h2>
        <ul className={utilStyles.list}>
          {props.posts.map((post, i) => {
            return (
              <li className={utilStyles.listItem} key={post.id}>
                <Link href="/posts/[id]" as={`/posts/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  #{i + 1} {post.owner}．<Date dateString={post.created} />
                </small>
              </li>
            );
          })}
        </ul>
        <UploadPost />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const endPoint = domain + "/posts.json";

  const res = await fetch(endPoint);
  const json = await res.json();
  const posts = await json.results;

  return {
    props: {
      posts,
    },
  };
}
