import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export default function Home() {
  const SOLperLAM = 0.000000001;                       // A lamport has a value of 0.000000001 SOL.
  const [accounts, setAccounts] = useState(null);      // 20 largest accounts
  const [conversion, setConversion] = useState(null);  // exchange rate - SOL : USD
  const [currency, setCurrency] = useState('SOL');     // currency toggle SOL : USD
  const [accountsError, setAccountsError] = useState('');        // top accounts solana api errors
  const [conversionError, setConversionError] = useState('');    // conversion api error
  
  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await fetch('/api/solana', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      const accountsData = await response.json();

      if (Object.keys(accountsData).length === 0) {      // empty object from solana API denotes error
        setAccountsError('Cannot grab accounts right now, try again later.')
      } else {
        setAccounts(Object.values(accountsData.value));
        setAccountsError('')                             // clear error cache
      }
    }

    const fetchConversion = async () => {
      const response = await fetch('/api/converter', {
        method: 'GET',
      });
      const conversion = await response.json();
      // console.log(conversion)

      if (conversion.message) {
        setConversionError(conversion.message)
      } else {
        setConversion(conversion.last_price_usd)
        setConversionError('')                          // clear error cache
      }
    }

    fetchAccounts();
    fetchConversion();
  }, []);

  // add USD, SOL keys/conversions to accounts for viz
  // if we fetched accounts + conversion
  if (accounts && conversionError.length === 0) {
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

  let display;
  if (accounts) {                 // all data are available
    display = renderLineChart
  } else {                        // deal with funk
    if (conversionError.length > 0 || accountsError.length > 0) {     // display the API error(s)
      display = <h1>{conversionError} {accountsError}</h1>
    } else {
      <h1>... LOADING ...</h1>    // why doesn't ever render
    }
  }
    

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
        {display}
        {/* i'm sorry........ */}

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
