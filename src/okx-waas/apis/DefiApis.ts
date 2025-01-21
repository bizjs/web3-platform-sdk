import { OKXWaasClient } from '../OKXWaasClient';

export class DefiApis {
  constructor(private client: OKXWaasClient) {}

  /**
   * Query user’s balance list
   * https://www.okx.com/web3/build/docs/waas/defi-api-reference-personal-query-balance
   */
  queryUserBalanceList(
    address: string,
    chainId: string,
    tokenAddressList: string[]
  ): Promise<any[]> {
    const requestPath = '/api/v5/defi/user/balance-list';
    const data = {
      chainId,
      address,
      tokenAddressList,
    };
    return this.client.__request('POST', requestPath, data);
  }
}
