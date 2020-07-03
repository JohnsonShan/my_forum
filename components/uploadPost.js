import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

import React, { useState, useEffect } from "react";

const domain = "http://34.70.158.129";
// const domain = "http://localhost:8000";

export default function UploadPost() {
  let [username, setUserName] = useState("Anonymous");

  let [input, setInput] = useState("");
  let [title, setTitle] = useState("");

  let [login, setLogin] = useState(false);

  useEffect(() => {
    const Cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username"));
    if (Cookies != undefined) {
      setUserName(Cookies.split("=")[1]);
      if (username != "Anonymous") {
        setLogin(true);
      } else {
        setLogin(false);
      }
    } else {
      setUserName("Anonymous");
      setLogin(false);
    }
  });

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
    <div>
      {login ? (
        <form onSubmit={handleSubmit}>
          <label> Title: </label> <br />
          <input
            type="text"
            value={title}
            onChange={handleTitleChange(setTitle)}
            placeholder="Title"
          />
          <br />
          <label> Content: </label> <br />
          <textarea
            type="text"
            value={input}
            onChange={handleInputChange(setInput)}
            placeholder="Content"
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <></>
      )}
    </div>
  );
}
