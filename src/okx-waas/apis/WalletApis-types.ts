import { AssetType } from '../constants';

export type ChainSupportedChainsResponse = {
  name: string;
  logoUrl: string;
  shortName: string;
  chainIndex: string;
}[];

export type TokenCurrentPriceRequestParams = {
  chainIndex: string;
  /**
   * "", token address, and special format
   */
  tokenAddress: string;
}[];

export type TokenCurrentPriceResponse = {
  chainIndex: string;
  tokenAddress: string;
  time: string;
  price: string;
}[];

export type TokenRealTimePriceRequestParams = {
  chainIndex: string;
  /**
   * "", token address, and special format
   */
  tokenAddress: string;
}[];

export type TokenRealTimePriceResponse = {
  chainIndex: string;
  tokenAddress: string;
  time: string;
  price: string;
}[];

export type TokenHistoricalPriceRequestParams = {
  chainIndex: string;
  tokenAddress?: string;
  limit?: string;
  cursor?: string;
  begin?: string;
  end?: string;
  /**
   * 1m: 1 minute, 5m: 5 minutes, 30m: 30 minutes, 1h: 1 hour, 1d: 1 day (default)
   */
  period?: '1m' | '5m' | '30m' | '1h' | '1d';
};

export type TokenHistoricalPriceResponse = {
  cursor: string;
  prices: { time: string; price: string }[];
}[];

export type TokenTokenDetailRequestParams = {
  chainIndex: string;
  tokenAddress?: string;
};

export type TokenTokenDetailResponse = {
  logoUrl: string;
  officialWebsite: string;
  socialUrls: {
    messageboard?: string[];
    github?: string[];
    twitter?: string[];
    chat?: string[];
    reddit?: string[];
  };
  decimals: string;
  tokenAddress: string;
  chainIndex: string;
  chainName: string;
  symbol: string;
  maxSupply: string;
  totalSupply: string;
  volume24h: string;
  marketCap: string;
}[];

export type AssetTotalValueByAddressRequestParams = {
  address: string;
  // 最多支持 50 个，逗号隔开
  chains?: string;
  // 资产范围，可选值：TOKEN, DEFI, ALL，默认 ALL
  assetType?: AssetType;
  // 默认 true
  excludeRiskToken?: boolean;
};

export type AssetTotalValueByAddressResponse = {
  totalValue: string;
}[];

export type AssetTotalValueRequestParams = {
  accountId: string;
  chains?: string;
  assetType?: AssetType;
  excludeRiskToken?: boolean;
};

export type AssetTotalValueResponse = {
  totalValue: string;
}[];
