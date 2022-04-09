export default async function conversion(req, res) {
    const response = await fetch('https://coincodex.com/api/coincodex/get_coin/SOL', {
      method: 'GET',
    })
    const rate = await response.json();
    // console.log(resp);
    res.status(200).json(rate);
  }