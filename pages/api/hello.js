// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const web3 = require("@solana/web3.js");

import { Connection,
         PublicKey,
         LAMPORTS_PER_SOL,
        //  GetLargestAccountsConfig
       } from '@solana/web3.js';

export default async function balance() {
  // try {
    // const {network, address} = req.body;
    const url = `https://api.devnet.solana.com`;
    const connection = new Connection(url, 'confirmed');
    const balance = await connection.getLargestAccounts();
    if (balance === 0 || balance === undefined) {
      throw new Error('Account not funded');
    }
    res.status(200).json(balance);
  // } catch (error) {
  //   let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
  //   res.status(500).json(errorMessage);
  // }
}

// https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getTokenLargestAccounts

// export default function handler(req, res) {
//   fetch(url, {
//     method: `POST`,
//     url: `https://api.devnet.solana.com`,
//     headers: { 'Content-Type': 'application/json' },
//     body:  '{"jsonrpc":"2.0","id":1, "method":"getLargestAccounts"}'
//   })
//     .then(apiResponse => apiResponse.json())
//     .then(data => res.send(data))
//     .catch(error => res.send(error));

//   // res.status(200).json({ name: 'John Doe' })
// }