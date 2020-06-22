import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { useState } from "react";
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
    // console.log(title);
    // console.log(input);
    const data = {
      title: title,
      content: input,
      comments: [],
      // owner: 'Anonymous',
    };
    const res = await fetch("http://127.0.0.1:8000/posts/", {
      method: "post",
      // id Anonymous, pw guestuser123
      headers: {
        // csrfmiddlewaretoken: '{{ csrf_token }}',
        // 'Accept': 'application/json',
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Basic " + btoa("Anonymous:guestuser123"),
      },
      // credentials: 'Anonymous:guestuser123',
      body: JSON.stringify(data),
    });
    console.log("res", res);
    await location.reload();
  }
  return (
    <Layout home>
      <Head>…</Head>
      <section className={utilStyles.headingMd}>…</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>My Simple Forum</h2>
        <ul className={utilStyles.list}>
          {props.posts.map((post) => {
            return (
              <li className={utilStyles.listItem} key={post.id}>
                <Link href="/posts/[id]" as={`/posts/${post.id}`}>
            <a>{post.title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                #{post.id} {post.owner}．<Date dateString={post.created} />
                </small>
              </li>
            );
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange(setTitle)}
            placeholder="Title"
          />
          <br />
          <label>Content:</label>
          <input
            type="text"
            value={input}
            onChange={handleInputChange(setInput)}
            placeholder="Content"
          />
          <input type="submit" value="Submit" />
        </form>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:8000/posts.json");
  const json = await res.json();
  const posts = await json.results;

  return {
    props: {
      posts,
    },
  };
}