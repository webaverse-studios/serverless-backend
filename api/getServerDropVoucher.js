import { ethers } from "ethers";

const types = {
    NFTVoucher: [
        { name: "tokenId", type: "uint256" },
        { name: "contentURL", type: "string" },
        { name: "balance", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "expiry", type: "uint256" },
    ],
};
const SIGNING_DOMAIN_NAME = "Webaverse-voucher";
const SIGNING_DOMAIN_VERSION = "1";
const chainId = process.env.VOUCHER_SIGN_CHAINID; // Polygon Mainnet ChainID
const domain = {
    name: SIGNING_DOMAIN_NAME,
    version: SIGNING_DOMAIN_VERSION,
    verifyingContract: process.env.VOUCHER_SIGN_WEBAVERSEADDRESS, // webaverse smart contract address
    chainId,
};

const getServerDropVoucher = async (req, res) => {
    const { signData } = req.body;
    console.log("Input Server signData: ", signData);

    let signer = new ethers.Wallet(
        process.env.VOUCHER_SIGN_PRIVATE_KEY // private key
    );

    const signature = await signer._signTypedData(domain, types, signData);
    console.log("created Signature: ", signature);
    return res.json({
        ...signData,
        signature,
    });
}

export default getServerDropVoucher;
