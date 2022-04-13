import { Connection } from '@solana/web3.js';

export default async function balance(req, res) {
  try {
    const url = `https://api.devnet.solana.com`;
    const connection = new Connection(url, 'confirmed');
    // console.log(connection)
    const balance = await connection.getLargestAccounts();
    res.status(200).json(balance);
  } catch (error) {
    res.status(500).json(error);
  }
}