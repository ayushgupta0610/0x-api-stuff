import dotenv from 'dotenv';
import { ethers } from "ethers";
import axios from 'axios';
dotenv.config();

const walletAddress = '0x804EB4b94F7765c815cff8d3019a7380F0A3A24f'; // Replace with the actual wallet address
const headers = {"0x-api-key": `${process.env.ZEROX_API_KEY}`}; // Get your live API key from the 0x Dashboard (https://dashboard.0x.org/apps)

const params = {
    sellToken: '0xAfb89a09D82FBDE58f18Ac6437B3fC81724e4dF6', // DOG
    buyToken: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC
    sellAmount: '3000000000000000000000', // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
    takerAddress: walletAddress, // Address that will make the trade
};

async function getQuoteOfSwap(sellToken: string, buyToken: string, sellAmount: string, takerAddress: string) {
    try {
        const params = {
            sellToken,
            buyToken,
            sellAmount,
            takerAddress,
        };
        const response = await axios.get(
            "https://base.api.0x.org/swap/v1/quote", { headers, params }
        );
        console.log("response.data: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching swap quote:', error);
        throw error;
    }
}

// The example is for Ethereum mainnet https://api.0x.org. Refer to the 0x Cheat Sheet for all supported endpoints: https://0x.org/docs/introduction/0x-cheat-sheet
async function main() {
    try {
        const getQuoteResponse = await getQuoteOfSwap(params.sellToken, params.buyToken, params.sellAmount, params.takerAddress);
        const quoteData = getQuoteResponse;

        // Connect to the Base network
        const provider = new ethers.providers.JsonRpcProvider(`${process.env.NETWORK_URL}`);
        const wallet = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);

        const tx = await wallet.sendTransaction({
            from: wallet.address,
            to: quoteData.to,
            data: quoteData.data,
            value: quoteData.value,
            gasPrice: quoteData.gasPrice,
            gasLimit: quoteData.gas,
          });
        
          const receipt = await tx.wait();
          console.log('Swap transaction confirmed:', receipt.transactionHash);
    } catch (error) {
        console.error('Failed to fetch wallet assets:', error);
    }
}

main();
// getQuoteOfSwap(params.sellToken, params.buyToken, params.sellAmount, params.takerAddress);