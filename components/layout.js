import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

import React, { useState, useEffect } from "react";

export const siteTitle = "Next.js Sample Website";

const domain = "http://34.70.158.129";
// const domain = "http://localhost:8000";

export default function Layout({ children, home, AuthPage }) {
  let [username, setUserName] = useState("Anonymous");
  let [login, setLogin] = useState(false);
  let [curPath, setCurPath] = useState("/");
  //<Link href="/posts/[id]" as={`/posts/${post.id}`}>
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

    setCurPath(
      location.href
        .replace("http://localhost", "")
        .replace("http://34.70.158.129", "")
    );
    // console.log(curPath);
    
  });

  function guestLogIn() {
    document.cookie = "csrftoken=" + "eb95839381c7e5af05aa0f117119525a55d76a91";
    document.cookie = "username=" + "Guest";
    // location.href = "";
  }

  function logOut() {
    var res = document.cookie;
    var multiple = res.split(";");
    for (var i = 0; i < multiple.length; i++) {
      var key = multiple[i].split("=");
      document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    }
    // location.href = "";
    // location.reload();
  }

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
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
        home ? (
          <>
            <Link href="/">
              <a onClick={logOut}>Log Out</a>
            </Link>
          </>
        ) : (
          <>
            <Link href="/posts/[id]" as={curPath}>
              <a onClick={logOut}>Log Out</a>
            </Link>
          </>
        )
      ) : home ? (
        <>
          <Link href="/login">
            <a>Log In</a>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/signup">
            <a>Sign Up </a>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/">
            <a onClick={guestLogIn}>Quick LogIn</a>
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
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/posts/[id]" as={curPath}>
            <a onClick={guestLogIn}>Quick LogIn</a>
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
