import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import { sendStatusCode } from 'next/dist/server/api-utils';

export default function Home() {
  const [balances, setBalances] = useState(null);      // top 20 balances (lamports to SOL)
  const [conversion, setConversion] = useState(null);  // exchange rate - SOL : USD
  const [currency, setCurrency] = useState('SOL');     // default currency SOL
  const [USD, setUSD] = useState([]);                  // balances in USD
  // const [SOL, setSOL] = useState([]);                  // balances in SOL
  const SOLperLAM = 0.000000001;
  
  useEffect(() => {
    const fetchBalances = async () => {
      const response = await fetch('/api/solana', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      // if (!response.ok) {
      //   throw new Error(`Error: ${response.status}`);
      // }
      const resp = await response.json();
      setBalances(resp.value.map(function (balance) { return balance.lamports  * SOLperLAM }));
    }

    const fetchConversion = async () => {
      const response = await fetch('/api/converter', {
        method: 'GET',
      });
      // if (!response.ok) {
      //   throw new Error(`Error: ${response.status}`);
      // }
      const resp = await response.json();
      setConversion(resp.last_price_usd)

      setUSD(balances.map(function (balance) { return balance.lamports * conversion }))
    }

    fetchBalances();
    fetchConversion();
  }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>SOLANA</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button
          onClick={() => currency === 'SOL' ? setCurrency('USD') : setCurrency('SOL')}
        >
          {currency}
        </button>

        <div>
          {balances && currency === 'SOL' ?
            balances.map((balance, idx) => (
              <div key={idx}>{balance}</div>
            )) : ''
            }
        </div>
      </main>

      {/* <footer className={styles.footer}>
      </footer> */}
    </div>
  )
}
