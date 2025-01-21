import { OKXWaasClient } from '../../src';

import 'dotenv/config';

function getEnv(name: string) {
  return process.env[name] as string;
}

describe('WalletApis tests', () => {
  let walletApis: OKXWaasClient['walletApis'];
  beforeAll(() => {
    const conf = {
      apiKey: getEnv('OKX_WAAS_API_KEY'),
      secretKey: getEnv('OKX_WAAS_SECRET_KEY'),
      passphrase: getEnv('OKX_WAAS_PASSPHRASE'),
      projectID: getEnv('OKX_WAAS_PROJECT_ID'),
    };
    walletApis = new OKXWaasClient(conf).walletApis;
  });

  test('chain_supportedChains', async () => {
    const data = await walletApis.chain_supportedChains();

    expect(data.length).toBeGreaterThan(1);
    expect(data[0].name).toBe('BTC');
  });

  test('token_currentPrice', async () => {
    const res = await walletApis.token_currentPrice([
      { chainIndex: '1', tokenAddress: '' },
    ]);
    expect(res.length).toBe(1);
    expect(res[0].chainIndex).toBe('1');
  });

  test('token_historicalPrice', async () => {
    const res = await walletApis.token_historicalPrice({
      chainIndex: '1',
    });
    expect(res.length).toBe(1);
    expect(res[0].prices.length).toBeGreaterThan(1);
  });

  test('token_realTimePrice', async () => {
    const res = await walletApis.token_realTimePrice([
      {
        chainIndex: '1',
        tokenAddress: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52', // BNB
      },
    ]);
    expect(res.length).toBe(1);
    expect(res[0].tokenAddress).toBe('0xb8c77482e45f1f44de1745f52c74426c631bdd52');
  });

  test('token_tokenDetail', async () => {
    const res = await walletApis.token_tokenDetail({
      chainIndex: '1',
      tokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    });
    expect(res.length).toBe(1);
    expect(res[0].tokenAddress).toBe(
      '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    );
  });

  test('asset_totalValue', async () => {
    const res = await walletApis.asset_totalValue({
      accountId: '123',
    });
    expect(res.length).toBe(0);
  });

  test('asset_totalValueByAddress', async () => {
    const data = await walletApis.asset_totalValueByAddress({
      address: '0x6c10D68874D0B114227ADBC5504a1eC2c90C4E11',
      chains: '1,5000',
    });
    expect(typeof data[0].totalValue).toBe('string');
    expect(Number(data[0].totalValue)).toBeGreaterThan(0);
  });
});
