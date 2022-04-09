import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'

export default function Home() {
  const [balances, setBalances] = useState(null);      // top 20 balances (lamports to SOL)
  const [conversion, setConversion] = useState(null);  // exchange rate - SOL : USD
  const [currency, setCurrency] = useState('SOL');     // default currency SOL
  const [USD, setUSD] = useState([]);                  // balances in USD
  // const [SOL, setSOL] = useState([]);                  // balances in SOL
  const SOLperLAM = 0.000000001;
  let solana, dollars;
  
  useEffect(() => {
    const fetchBalances = () => {
      fetch('/api/solana', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => setBalances(data.value.map(function (balance) { return balance.lamports  * SOLperLAM })))
        
        if (conversion) setUSD(balances.map(function (balance) { return balance * conversion }))
    }

    const fetchConversion = () => {
      fetch('/api/converter', {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => setConversion(data.last_price_usd))
    }

    fetchBalances();
    fetchConversion();
  }, [balances, conversion]);
  
  if (balances) {
    solana =
      balances.map((balance, idx) => (
        <div key={idx}>{balance}</div>
      ))

    dollars =
      USD.map((dollar, idx) => (
        <div key={idx}>{dollar}</div>
      ))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SOLANA</title>
        <meta name="description" content="Largest Solana account balances" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button
          onClick={() => currency === 'SOL' ? setCurrency('USD') : setCurrency('SOL')}
        >
          CONVERT TO {currency === 'SOL' ? ' USD' : ' SOL'}
        </button>

        <br></br>

        {currency}<br></br>

        <div>
          { balances && currency === 'SOL' ? solana : dollars }
        </div>
      </main>

      {/* <footer className={styles.footer}>
      </footer> */}
    </div>
  )
}
