import { OKXWaasClient } from '../OKXWaasClient';
import {
  AssetTotalValueByAddressRequestParams,
  AssetTotalValueByAddressResponse,
  AssetTotalValueRequestParams,
  AssetTotalValueResponse,
  ChainSupportedChainsResponse,
  TokenCurrentPriceRequestParams,
  TokenCurrentPriceResponse,
  TokenHistoricalPriceRequestParams,
  TokenHistoricalPriceResponse,
  TokenRealTimePriceRequestParams,
  TokenRealTimePriceResponse,
  TokenTokenDetailRequestParams,
  TokenTokenDetailResponse,
} from './WalletApis-types';

export class WalletApis {
  constructor(private client: OKXWaasClient) {}

  /**
   * Returns information about all blockchain networks currently supported by Wallet API
   * https://www.okx.com/web3/build/docs/waas/walletapi-api-get-supported-blockchain
   * @returns
   */
  chain_supportedChains() {
    return this.client.__request<ChainSupportedChainsResponse>(
      'GET',
      '/api/v5/wallet/chain/supported-chains'
    );
  }

  token_currentPrice(args: TokenCurrentPriceRequestParams) {
    const requestPath = '/api/v5/wallet/token/current-price';
    return this.client.__request<TokenCurrentPriceResponse>(
      'POST',
      requestPath,
      args
    );
  }

  token_realTimePrice(args: TokenRealTimePriceRequestParams) {
    const requestPath = '/api/v5/wallet/token/real-time-price';
    return this.client.__request<TokenRealTimePriceResponse>(
      'POST',
      requestPath,
      args
    );
  }

  token_historicalPrice(args: TokenHistoricalPriceRequestParams) {
    const requestPath = '/api/v5/wallet/token/historical-price';
    return this.client.__request<TokenHistoricalPriceResponse>(
      'GET',
      requestPath,
      args
    );
  }

  token_tokenDetail(args: TokenTokenDetailRequestParams) {
    const requestPath = '/api/v5/wallet/token/token-detail';
    return this.client.__request<TokenTokenDetailResponse>(
      'GET',
      requestPath,
      args
    );
  }

  asset_totalValueByAddress(args: AssetTotalValueByAddressRequestParams) {
    const requestPath = '/api/v5/wallet/asset/total-value-by-address';
    return this.client.__request<AssetTotalValueByAddressResponse>(
      'GET',
      requestPath,
      args
    );
  }

  /**
   * Retrieve the total balance of all tokens and DeFi assets under an account.
   * https://www.okx.com/web3/build/docs/waas/walletapi-api-total-token-value-account
   */
  asset_totalValue(args: AssetTotalValueRequestParams): Promise<any[]> {
    const requestPath = '/api/v5/wallet/asset/total-value';
    return this.client.__request<AssetTotalValueResponse>(
      'GET',
      requestPath,
      args
    );
  }
}
