import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export default function Home() {
  const [accounts, setAccounts] = useState(null);      // 20 largest accounts
  const [conversion, setConversion] = useState(null);  // exchange rate - SOL : USD
  const [currency, setCurrency] = useState('SOL');     // currency toggle SOL : USD
  const SOLperLAM = 0.000000001;                       // A lamport has a value of 0.000000001 SOL.
  
  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await fetch('/api/solana', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      const resp = await response.json();
      setAccounts(Object.values(resp.value));
    }

    const fetchConversion = async () => {
      const response = await fetch('/api/converter', {
        method: 'GET',
      });
      const resp = await response.json();
      setConversion(resp.last_price_usd)
    }

    fetchAccounts();
    fetchConversion();
  }, []);

  // add USD, SOL keys/conversions to accounts for viz
  if (accounts) {
    accounts.map(account => {
      account['USD (billion)'] = account.lamports * SOLperLAM * conversion / 1000000000;
      account['SOL (million)'] = account.lamports * SOLperLAM  / 1000000;
    });
  }

  // create labels for viz
  const scaledValues = currency === 'USD' ? 'USD (billion)' : 'SOL (million)';

  const renderLineChart = (
    <LineChart
      width={650}
      height={400}
      data={accounts}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line
        type="monotone"
        dataKey={`${scaledValues}`}
        stroke="#000" />
      <CartesianGrid
        stroke="#2b2b2b"
        strokeDasharray="1 1" />
      <XAxis
        dataKey="address" tick={false}
        label={{ value: "Address", position: "insideBottom", dy: 10}} />
      <YAxis
        label={{ value: `${scaledValues}`, position: "inside", angle: -90, dx: -25 }} />
      <Tooltip />
    </LineChart>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>SOLANA</title>
        <meta name="description" content="20 largest Solana accounts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* HEADER */}
        <div className={styles.header}>
          ✨ 20 Largest Solana Accounts ✨<br></br>
          ({currency})
        </div>

        {/* VISUALIZATION */}
        {accounts ? renderLineChart : <h1>... LOADING ...</h1>}
      </main>

      <footer className={styles.footer}>
        {/* CURRENCY TOGGLE */}
        <button
          onClick={() => currency === 'SOL' ? setCurrency('USD') : setCurrency('SOL')}
        >
          CONVERT TO {currency === 'SOL' ? ' USD' : ' SOL'}
        </button>
      </footer>
    </div>
  )
}
