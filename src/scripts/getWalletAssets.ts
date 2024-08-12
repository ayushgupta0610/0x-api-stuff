import axios from 'axios';

interface Asset {
  asset: {
    id: string;
    name: string;
    symbol: string;
  };
  quantity: string;
  price: number;
  value: number;
}

interface ZerionResponse {
  data: {
    portfolio: {
      positions: {
        fungible: Asset[];
      };
    };
  };
}

const ZERION_API_URL = 'https://api.zerion.io/v1/wallets';
const ZERION_API_KEY = 'zk_dev_5fe544bbf9b04c2fa7606f32a1360257'; // Replace with your actual API key

export async function fetchWalletAssets(walletAddress: string): Promise<Asset[]> {
  try {
    const response = await axios.get<ZerionResponse>(`${ZERION_API_URL}/${walletAddress}/positions/`, {
      headers: {
        'accept': 'application/json',
        'authorization': `Basic ${Buffer.from(`${ZERION_API_KEY}:`).toString('base64')}`
      },
      params: {
        'currency': 'usd',
        'sort': 'value'
      }
    });

    return response.data.data.portfolio.positions.fungible.map(asset => ({
      asset: {
        id: asset.asset.id,
        name: asset.asset.name,
        symbol: asset.asset.symbol
      },
      quantity: asset.quantity,
      price: asset.price,
      value: asset.value
    }));
  } catch (error) {
    console.error('Error fetching wallet assets:', error);
    throw error;
  }
}

// Example usage
async function main() {
  const walletAddress = 'ayushgupta0610.eth'; // Replace with the actual wallet address
  try {
    const assets = await fetchWalletAssets(walletAddress);
    console.log('Wallet assets:', assets);
  } catch (error) {
    console.error('Failed to fetch wallet assets:', error);
  }
}

main();