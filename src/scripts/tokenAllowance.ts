import { ethers } from "ethers";

const privateKey = process.env.PRIVATE_KEY || ""; // Replace with your actual private key
const providerUrl = "https://mainnet.base.org"; // Base mainnet RPC URL
const tokenAddress = "0xAfb89a09D82FBDE58f18Ac6437B3fC81724e4dF6"; // DOG on Base
const ownerAddress = "0x804EB4b94F7765c815cff8d3019a7380F0A3A24f"; // EOA address
const spenderAddress = "0xdef1c0ded9bec7f1a1670819833240f027b25eff"; // 0x API address
const amount = "1000000000000000000"; // 1 DOG

// ERC-20 ABI - we only need the allowance function for this example
const ERC20_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) public returns (bool)",
];

async function approveTokenSpending(
  tokenAddress: string,
  spenderAddress: string,
  amount: string,
  privateKey: string,
  providerUrl: string
): Promise<string> {
  // Create a provider
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  // Create a signer
  const signer = new ethers.Wallet(privateKey, provider);

  // Create contract instance
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);

  try {
    // Call the approve function
    const tx = await tokenContract.approve(spenderAddress, amount);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    console.log(`Approval successful. Transaction hash: ${receipt.hash}`);
    return receipt.hash;
  } catch (error) {
    console.error("Error approving token spending:", error);
    throw error;
  }
}

async function getTokenAllowance(
  tokenAddress: string,
  ownerAddress: string,
  spenderAddress: string,
  providerUrl: string
): Promise<string> {
  // Create a provider
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  // Create contract instance
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

  try {
    // Call the allowance function
    const allowance = await tokenContract.allowance(
      ownerAddress,
      spenderAddress
    );

    // Convert the result to a string (it returns a BigNumber)
    return allowance.toString();
  } catch (error) {
    console.error("Error getting allowance:", error);
    throw error;
  }
}

// Example usage
async function main() {
  try {
    const allowance = await getTokenAllowance(
      tokenAddress,
      ownerAddress,
      spenderAddress,
      providerUrl
    );
    console.log(`Allowance: ${allowance}`);
    // Execute the Approval function in case the allowance is zero
    // Compare two BigNumbers
    if (ethers.BigNumber.from(allowance).lt(ethers.BigNumber.from(amount))) {
      const txHash = await approveTokenSpending(
        tokenAddress,
        spenderAddress,
        amount,
        privateKey,
        providerUrl
      );
      console.log(`Approval transaction hash: ${txHash}`);
    }
  } catch (error) {
    console.error("Failed to get allowance:", error);
  }
}

main();
