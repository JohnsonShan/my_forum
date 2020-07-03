import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { useState } from "react";


const domain = "http://34.70.158.129";
// const domain = "http://localhost:8000";

export default function SignIn() {
  let [username, setUserName] = useState("");
  let [password, setPassword] = useState("");

  const handleUserNameChange = (setUserName) => (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (setPassword) => (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };
    const endPoint = domain + "/api-token-auth/";

    const res = await fetch(endPoint, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        status = res.status;
        // console.log("status", status);
        return res.json();
      })
      .then((result) => {
        if (status == 200) {
          document.cookie = "csrftoken=" + result.token;
          document.cookie = "username=" + username;
          alert("Success");
          location.href = "/";
        } else {
          alert("Invalid Username/Password.");
        }
      });
  }

  return (
    <Layout AuthPage>
      <Head>
        <title> Log In </title>{" "}
      </Head>{" "}
      <form onSubmit={handleSubmit}>
        <label> Username: </label> <br />
        <input
          type="text"
          value={username}
          onChange={handleUserNameChange(setUserName)}
          placeholder="Username"
        />
        <br />
        <label> Password: </label> <br />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange(setPassword)}
          placeholder="password"
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </Layout>
  );
}
