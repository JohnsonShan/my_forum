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

    const csrftoken = "a3a739bd6fbfd1016e1fe766c6db637030790f2e"

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
        // console.log("char", char);
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

    const endPoint = domain + "/users/";
    const res = await fetch(endPoint, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + csrftoken,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      status = res.status;
      //   console.log("status", status);
      if (status == 201) {
        alert("Success");
        location.href = "/login";
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
        <label> Password (again): </label> <br />
        <input
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange(setPasswordConfirm)}
          placeholder="Password (again)"
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </Layout>
  );
}
