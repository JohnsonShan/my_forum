import Layout from "../../components/layout";
// import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { useState } from "react";
import UploadComment from "../../components/uploadComment";

const domain = "http://34.70.158.129";
// const domain = "http://localhost:8000";

export default function Post({ post }) {


  const safeContent = post.content
    .split("<")
    .join("< ")
    // .split("< img")
    // .join("<img")
    .split("\n")
    .join("<br />");



  return (
    <Layout>
      <Head>
        <title> {post.title} </title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}> {post.title} </h1>
        <div className={utilStyles.lightText}></div>
        <div dangerouslySetInnerHTML={{ __html: safeContent }} />
        <div>
          <h4> Comment: </h4>
          <ul className={utilStyles.list}>
            
            {post.comments.map((comment, i) => {
              const array = comment.split(", ");
              let joinArray = array[2]
                .split("<")
                .join("< ")
                // .split("< img")
                // .join("<img")
                .split("\n")
                .join("<br />");
              for (let j = 3; j < array.length; j++) {
                joinArray +=
                  ", " +
                  array[j]
                    .split("<")
                    .join("< ")
                    // .split("< img")
                    // .join("<img")
                    .split("\r\n")
                    .join("<br />");
              }
              return (
                <li className={utilStyles.listItem} key={i}>
                  {" "}
                  #{i + 1} {array[0]}． <Date dateString={array[1]} /> <br />
                  <div dangerouslySetInnerHTML={{ __html: joinArray }} />{" "}
                </li>
              );
            })}
          </ul>
        </div>
        <UploadComment props={post.url}/>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const endPoint = domain + "/posts.json";
  const res = await fetch(endPoint);
  const json = await res.json();
  const posts = await json.results;
  const paths = await posts.map((post) => {
    return {
      params: {
        id: post.id.toString(),
      },
    };
  });
  // console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const endPoint = domain + "/posts/" + params.id + ".json";
  const res = await fetch(endPoint);
  const post = await res.json();

  // console.log(post.url);
  return {
    props: {
      post,
    },
  };
}
