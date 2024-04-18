import { OKXWaasClient } from './OKXWaasClient';
import 'dotenv/config';

function getEnv(name: string) {
  return process.env[name] as string;
}

describe('OKXWaasClient tests', () => {
  let client: OKXWaasClient;
  beforeAll(() => {
    const conf = {
      apiKey: getEnv('OKX_WAAS_API_KEY'),
      secretKey: getEnv('OKX_WAAS_SECRET_KEY'),
      passphrase: getEnv('OKX_WAAS_PASSPHRASE'),
    };
    console.log(conf);
    client = new OKXWaasClient(conf);
  });

  test.skip('queryUserBalanceList', async () => {
    const data = await client.defiApis.queryUserBalanceList(
      '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
      '1',
      [
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // ETH
        // https://etherscan.io/tokens
        '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
        '0xB8c77482e45F1F44dE1745F52C74426C631bDD52', // BNB
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
      ]
    );
    expect(data.length).toBe(3);
    expect(Number(data[0].coinAmount)).toBeGreaterThan(1);
  });
});
