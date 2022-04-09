import { Connection } from '@solana/web3.js';

export default async function balance(req, res) {
  try {
    const url = `https://api.devnet.solana.com`;
    const connection = new Connection(url, 'confirmed');
    console.log(connection)
    const balance = await connection.getLargestAccounts();
    res.status(200).json(balance);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}