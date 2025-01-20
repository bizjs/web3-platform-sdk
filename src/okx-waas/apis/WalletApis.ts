import { AssetType } from '../constants';
import { OKXWaasClient } from '../OKXWaasClient';

export class WalletApis {
  constructor(private client: OKXWaasClient) {}

  /**
   * Retrieve the total balance of all tokens and DeFi assets under an account.
   * https://www.okx.com/api/v5/wallet/asset/total-value
   */
  getUserTotalValue(args: {
    accountId: string;
    chains?: string;
    assetType?: AssetType;
    excludeRiskToken?: boolean;
  }): Promise<any[]> {
    const requestPath = '/api/v5/wallet/asset/total-value';
    return this.client.__request('POST', requestPath, args);
  }
}
