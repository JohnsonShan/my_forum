import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { useState } from "react";

export default function SignIn() {
  let [username, setUserName] = useState("");
  let [password, setPassword] = useState("");

  let [passwordConfirm, setPasswordConfirm] = useState("");
  const handleUserNameChange = (setUserName) => (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (setPassword) => (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmChange = (setPasswordConfirm) => (e) => {
    setPasswordConfirm(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const csrftoken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken"))
      .split("=")[1];

    if (password != passwordConfirm) {
      // alert('Invalid Username/Password.');
      alert("Different Password.");
      return;
    }
    const validInput =
      "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    const usernameArray = username.trim().split("");
    console.log(usernameArray);
    let validBoolean = true;
    usernameArray.every((char) => {
      if (validInput.includes(char)) {
      } else {
        console.log("char", char);
        validBoolean = false;
      }
    });

    if (validBoolean) {
    } else {
      alert("Invalid Username");
      return;
    }

    const data = {
      username: username,
      password: password,
    };
    // const res = await fetch("http://34.69.148.251/users/", {
    // const res = await fetch("http://localhost:8000/api-token-auth/", {
    const res = await fetch("http://localhost:8000/users/", {
      method: "post",
      // id Anonymous, pw guestuser123
      headers: {
        // csrfmiddlewaretoken: '{{ csrf_token }}',
        // 'Accept': 'application/json',
        // "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
        // "X-Requested-With": "XMLHttpRequest",
        // Authorization: "Basic " + btoa("Anonymous:guestuser123"),
        Authorization: "Token " + csrftoken,
      },
      // credentials: 'Anonymous:guestuser123',
      body: JSON.stringify(data),
    }).then((res) => {
      status = res.status;
      //   console.log("status", status);
      if (status == 201) {
        alert("Success");
        location.href = "/";
      } else {
        alert("Unsuccess, Invalid Username or Username already exist.");
      }
    });
  }

  return (
    <Layout AuthPage>
      <Head>
        <title> Sign Un </title>{" "}
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
        <label> Confirm: </label> <br />
        <input
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange(setPasswordConfirm)}
          placeholder="Confirm"
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </Layout>
  );
}
