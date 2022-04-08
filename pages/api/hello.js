// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import * as solanaWeb3 from '@solana/web3.js';


export default function handler(req, res) {
  // fetch(url, {
  //   method: 'POST',
  //   url: 'http://localhost:8899',
  //   headers: { 'Content-Type': 'application/json' },
  //   body:  '{"jsonrpc":"2.0","id":1, "method":"getLargestAccounts"}'
  // })
  //   .then(apiResponse => apiResponse.json())
  //   .then(data => res.send(data))
  //   .catch(error => res.send(error));
  const web3 = require("@solana/web3.js");
  (async () => {
    const solana = new web3.Connection("http://sample-endpoint-name.network.quiknode.pro/token-goes-here/");
    console.log(await solana.getLargestAccounts());
  })();


  // res.status(200).json({ name: 'John Doe' })
}


// import * as web3 from '@solana/web3.js';

// (async () => {
//   // Connect to cluster
//   var connection = new web3.Connection(
//     web3.clusterApiUrl('devnet'),
//     'confirmed',
//   );

//   // Generate a new wallet keypair and airdrop SOL
//   var wallet = web3.Keypair.generate();
//   var airdropSignature = await connection.requestAirdrop(
//     wallet.publicKey,
//     web3.LAMPORTS_PER_SOL,
//   );

//   //wait for airdrop confirmation
//   await connection.confirmTransaction(airdropSignature);

//   // get account info
//   // account data is bytecode that needs to be deserialized
//   // serialization and deserialization is program specific
//   let account = await connection.getAccountInfo(wallet.publicKey);
//   console.log(account);
// })();