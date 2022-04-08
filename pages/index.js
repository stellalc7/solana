import Head from 'next/head'
import styles from '../styles/Home.module.css'
import * as solanaWeb3 from '@solana/web3.js';
import React, { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState(null)
  
  console.log(solanaWeb3);

  useEffect(() => {
    const fetchAccount = async () => {
      const response = await fetch(`/api/hello`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      // setData(data)
    }

    fetchAccount();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>{data}</div>
      </main>

      {/* <footer className={styles.footer}>
      </footer> */}
    </div>
  )
}