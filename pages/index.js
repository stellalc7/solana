import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export default function Home() {
  const [balances, setBalances] = useState(null);      // top 20 balances (lamports to SOL)
  const [conversion, setConversion] = useState(null);  // exchange rate - SOL : USD
  const [currency, setCurrency] = useState('SOL');     // currency toggle SOL : USD
  const [USD, setUSD] = useState([]);                  // balances in USD
  const SOLperLAM = 0.000000001;                       // A lamport has a value of 0.000000001 SOL.
  let solana, dollars;
  
  useEffect(() => {
    const fetchBalances = async () => {
      const response = await fetch('/api/solana', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      const resp = await response.json();
      setBalances(Object.values(resp.value))
      console.log(resp.value)
      // setBalances(resp.value.map(function (balance) { return balance.lamports  * SOLperLAM }));
      // if (balances) setUSD(balances.map(function (balance) { return balance * conversion }));
    }

    const fetchConversion = async () => {
      const response = await fetch('/api/converter', {
        method: 'GET',
      });
      const resp = await response.json();
      setConversion(resp.last_price_usd)
    }

    fetchBalances();
    fetchConversion();
  }, []);           // fix!! infinite rerendering

  if (balances) {
    solana =
      balances.map((balance, idx) => (
        <div key={idx}>{balance.lamports}</div>
      ))

    dollars =
      <></>
      // USD.map((dollar, idx) => (
      //   <div key={idx}>{dollar}</div>
      // ))

    // console.log(balances)

    // var object = USD.reduce((item) => ({'usd': item)} ,{});
  }

  // const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

  const renderLineChart = (
    <LineChart width={600} height={300} data={balances} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="lamports" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="address" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>SOLANA</title>
        <meta name="description" content="Largest Solana account balances" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {renderLineChart}
        <div>TOP 20 SOLANA BALANCES</div>
       🧚‍♀️✨ {currency} ✨🧚‍♀️<br></br><br></br>

        <div>
          { balances && currency === 'SOL' ? solana : dollars }
        </div>
      </main>

      <footer className={styles.footer}>
        <button
          onClick={() => currency === 'SOL' ? setCurrency('USD') : setCurrency('SOL')}
        >
          CONVERT TO {currency === 'SOL' ? ' USD' : ' SOL'}
        </button>
      </footer>
    </div>
  )
}
