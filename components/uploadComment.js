import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

import React, { useState, useEffect } from "react";

const domain = "http://34.70.158.129";
// const domain = "http://localhost:8000";

export default function UploadComment(props) {
  // console.log(props.props)
  let [username, setUserName] = useState("Anonymous");

  let [input, setInput] = useState("");
  const handleChange = (setInput) => (e) => {
    setInput(e.target.value);
  };

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
    // console.log(input);

    const csrftoken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken"))
      .split("=")[1];

    const url = props.props.replace(".json", "/");
    // console.log(url);
    const data = {
      content: input,
      post: url,
    };
    const endPoint = domain + "/comments/";
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
          <label> Comment: </label>{" "}
          <textarea
            type="text"
            value={input}
            onChange={handleChange(setInput)}
            placeholder=""
          />
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <></>
      )}
    </div>
  );
}
