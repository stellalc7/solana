import { Connection,
         PublicKey,
         LAMPORTS_PER_SOL,
       } from '@solana/web3.js';

export default async function balance(req, res) {
  // try {
    // const {network, address} = req.body;
    const url = `https://api.devnet.solana.com`;
    const connection = new Connection(url, 'confirmed');
    console.log(connection)
    const balance = await connection.getLargestAccounts();
    // if (balance === 0 || balance === undefined) {
    //   throw new Error('Account not funded');
    // }
    res.status(200).json(balance);
  // } catch (error) {
  //   let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
  //   res.status(500).json(errorMessage);
  // }
}