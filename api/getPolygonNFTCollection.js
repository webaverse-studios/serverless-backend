const fetch = require('node-fetch');

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    '*'
  )
  res.setHeader("Content-Type", "application/json")
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = async (req, res) => {
    const {collectionAddress, walletAddress, network} = req.query;
    const POLYGON_API_KEY = 'bN2G8nP-vDFAnRXksfpd7I7g5f9c0GqD'
    const POLYGON_BASEURL = `https://polygon-mainnet.g.alchemy.com/v2/${POLYGON_API_KEY}/getNFTs/`

    const ETHEREUM_API_KEY = 'OOWUrxHDTRyPmbYOSGyq7izHNQB1QYOv'
    const ETHEREUM_BASEURL = `https://eth-mainnet.g.alchemy.com/v2/${ETHEREUM_API_KEY}/getNFTs/`

    const baseURL = (network === 'ETHEREUM') ? ETHEREUM_BASEURL : POLYGON_BASEURL

    const nftList = await fetch(`${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`,
    {
        method: 'get',
        redirect: 'follow'
    }).then(response => response.json())
    
    return res.json({ nftList });
}

export default allowCors(handler)
