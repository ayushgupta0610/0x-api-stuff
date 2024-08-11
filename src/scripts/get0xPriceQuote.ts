import axios from 'axios';

interface SwapQuote {
  price: string;
  guaranteedPrice: string;
  estimatedPriceImpact: string;
  to: string;
  data: string;
  value: string;
  gas: string;
  estimatedGas: string;
  gasPrice: string;
  protocolFee: string;
  minimumProtocolFee: string;
  buyTokenAddress: string;
  sellTokenAddress: string;
  buyAmount: string;
  sellAmount: string;
  sources: Array<{ name: string; proportion: string }>;
  orders: Array<any>;
  allowanceTarget: string;
  decodedUniqueId: string;
  sellTokenToEthRate: string;
  buyTokenToEthRate: string;
  expectedSlippage: string;
}

interface MultiSwapQuote {
  overallPrice: string;
  swaps: SwapQuote[];
}

const API_BASE_URL = 'https://api.0x.org';

class ZeroExSwapAPI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getSwapQuote(
    sellToken: string,
    buyToken: string,
    sellAmount: string,
    takerAddress: string
  ): Promise<SwapQuote> {
    try {
      const response = await axios.get(`${API_BASE_URL}/swap/v1/quote`, {
        params: {
          sellToken,
          buyToken,
          sellAmount,
          takerAddress,
        },
        headers: {
          '0x-api-key': this.apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching swap quote:', error);
      throw error;
    }
  }

  async getMultiSwapQuote(
    swaps: Array<{ sellToken: string; buyToken: string; sellAmount: string }>,
    takerAddress: string
  ): Promise<MultiSwapQuote> {
    try {
      const swapQuotes: SwapQuote[] = await Promise.all(
        swaps.map(swap =>
          this.getSwapQuote(swap.sellToken, swap.buyToken, swap.sellAmount, takerAddress)
        )
      );

    const overallPrice = swapQuotes.reduce(
        (total, quote) => total * parseFloat(quote.price),
        1
    ).toString();

    return {
        overallPrice,
        swaps: swapQuotes,
    };
    } catch (error) {
      console.error('Error fetching multi swap quotes:', error);
      throw error;
    }
  }
}

// Example usage
async function main() {
  const apiKey = 'YOUR_0X_API_KEY'; // Replace with your actual 0x API key
  const zeroEx = new ZeroExSwapAPI(apiKey);

  const takerAddress = '0x123...'; // Replace with the actual taker address

  // Single swap example
  try {
    const singleSwapQuote = await zeroEx.getSwapQuote(
      'ETH',
      'DAI',
      '1000000000000000000', // 1 ETH
      takerAddress
    );
    console.log('Single Swap Quote:', singleSwapQuote);
  } catch (error) {
    console.error('Failed to get single swap quote:', error);
  }

  // Multi-swap example
  try {
    const multiSwapQuote = await zeroEx.getMultiSwapQuote(
      [
        { sellToken: 'ETH', buyToken: 'DAI', sellAmount: '500000000000000000' }, // 0.5 ETH
        { sellToken: 'USDC', buyToken: 'DAI', sellAmount: '1000000' }, // 1 USDC
      ],
      takerAddress
    );
    console.log('Multi Swap Quote:', multiSwapQuote);
  } catch (error) {
    console.error('Failed to get multi swap quote:', error);
  }
}

main();