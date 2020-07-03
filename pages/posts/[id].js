import Layout from "../../components/layout";
// import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { useState } from "react";

export default function Post({ post }) {
  let [input, setInput] = useState("");
  const handleChange = (setInput) => (e) => {
    setInput(e.target.value);
  };

  const safeContent = post.content.split('<').join('< ').split('< img').join('<img').split('\n').join('<br />');

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(input);

    const csrftoken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken"))
    .split("=")[1];
    
    const url = post.url.replace(".json", "/");
    // console.log(url);
    const data = {
      content: input,
      post: url,
      // owner: 'Anonymous',
    };
    
    // const res = await fetch("http://34.69.148.251/comments/", {
      const res = await fetch("http://localhost:8000/comments/", {
      method: 'post',
      // id Anonymous, pw guestuser123
      headers: {
        // csrfmiddlewaretoken: '{{ csrf_token }}',
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'Authorization': 'Basic ' + btoa('Anonymous:guestuser123')
        Authorization: "Token " + csrftoken,
      },
      // credentials: 'Anonymous:guestuser123',
      body: JSON.stringify(data),
      
    });
    console.log("res", res);
    await location.reload();
  }

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
        </div>
        
        <div dangerouslySetInnerHTML={{ __html: safeContent }} />
        <div>
          <h4>Comment:</h4>
          <ul className={utilStyles.list}>
            {post.comments.map((comment, i) => {
              const array = comment.split(", ");
              let joinArray = array[2].split('<').join('< ').split('< img').join('<img').split('\r\n').join('<br />');
              for(let j=3;j<array.length;j++){
                joinArray += ', ' + array[j].split('<').join('< ').split('< img').join('<img').split('\r\n').join('<br />');
              }
              return (
                <li className={utilStyles.listItem} key={i}>
                  #{i + 1} {array[0]}．<Date dateString={array[1]} />
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: joinArray }} />
                </li>
              );
            })}
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Comment:</label>
          <textarea
            type="text"
            value={input}
            onChange={handleChange(setInput)}
            placeholder=""
          />
          <input type="submit" value="Submit" />
        </form>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  // const res = await fetch("http://34.69.148.251/posts.json");
  const res = await fetch("http://localhost:8000/posts.json");
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
  // const endPoint = "http://34.69.148.251/posts/" + params.id + ".json";
  const endPoint = "http://localhost:8000/posts/" + params.id + ".json";
  const res = await fetch(endPoint);
  const post = await res.json();

  // console.log(post.url);
  return {
    props: {
      post,
    },
  };
}
