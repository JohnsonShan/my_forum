import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

import React, { useState, useEffect } from "react";

export const siteTitle = "Next.js Sample Website";

export default function Layout({ children, home, AuthPage }) {
  let [username, setUserName] = useState("Anonymous");
  let [login, setLogin] = useState("false");

  useEffect(() => {
    const Cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username"));
    if (Cookies != undefined) {
      setUserName(Cookies.split("=")[1]);
      if(username!='Anonymous'){
        setLogin(true);
      } else {
        setLogin(false);
      }
      
    } else {
      setUserName("Anonymous");
      setLogin(false);
      const data = {
        username: 'Anonymous',
        password: 'guestuser123',
      };
      // const res = await fetch("http://34.69.148.251/users/", {
      const res = fetch("http://localhost:8000/api-token-auth/", {
        // const res = await fetch("http://localhost:8000/users/", {
        method: "post",
        // id Anonymous, pw guestuser123
        headers: {
          // csrfmiddlewaretoken: '{{ csrf_token }}',
          // 'Accept': 'application/json',
          // "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
          // "X-Requested-With": "XMLHttpRequest",
          // Authorization: "Basic " + btoa("Anonymous:guestuser123"),
          // Authorization: "Token " + csrftoken,
        },
        // credentials: 'Anonymous:guestuser123',
        body: JSON.stringify(data),
      }).then((res) => {
        status = res.status;
        console.log("status", status);
        return res.json();
      })
      .then((result) => {
        if (status == 200) {
          document.cookie = "csrftoken=" + result.token;
          document.cookie = "username=" + username;
          // alert("Success");
          location.href = '/';
        } else {
            // alert('Invalid Username/Password.')
        }
      });
    }
  });
  function logOut() {
    var res = document.cookie;
    var multiple = res.split(";");
    for (var i = 0; i < multiple.length; i++) {
      var key = multiple[i].split("=");
      document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.jpg"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={username}
            />
            <h1 className={utilStyles.heading2Xl}>{username}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={username}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{username}</a>
              </Link>
            </h2>
          </>
        )}
      </header>

      {AuthPage ? (
        <></>
      ) : login ? (
        <>
          <Link href="/">
            <a onClick={logOut}>Log Out</a>
          </Link>
        </>
      ) : (
        <>
          <Link href="/login">
            <a>Log In</a>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/signup">
            <a>Sign Up </a>
          </Link>
        </>
      )}

      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
