import fetch from 'node-fetch';

const getPolygonNFTCollection = async (req, res) => {
    const {collectionAddress, walletAddress} = req.query;
    const POLYGON_API_KEY = 'bN2G8nP-vDFAnRXksfpd7I7g5f9c0GqD'
    const baseURL = `https://polygon-mainnet.g.alchemy.com/v2/${POLYGON_API_KEY}/getNFTs/`
    console.log(baseURL, collectionAddress, walletAddress)
    const nftList = await fetch(`${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`,
    {
        method: 'get',
        redirect: 'follow'
    }).then(response => response.json())
    return res.status(200).json({ nftList });
}

export default getPolygonNFTCollection;
