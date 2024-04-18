import { createHmac } from 'node:crypto';
import { stringify } from 'qs';

import { DefiApis } from './apis/DefiApis';

export type OKXWaasClientOptions = {
  apiKey: string;
  secretKey: string;
  passphrase: string;
  projectID?: string;
};

export class OKXWaasClient {
  constructor(private options: OKXWaasClientOptions) {}

  defiApis = new DefiApis(this);

  private createSignature(
    method: 'GET' | 'POST',
    requestPath: string,
    params?: Record<string, string>
  ) {
    // Get ISO 8601 timestamp
    const timestamp = new Date().toISOString();

    // build data string
    let dataString = '';
    if (params) {
      dataString =
        method === 'GET' ? `?${stringify(params)}` : JSON.stringify(params);
    }

    // concat sign message
    const message = timestamp + method + requestPath + dataString;

    // create signature
    const hmac = createHmac('sha256', this.options.secretKey);
    hmac.update(message);

    // base64 encoding signature
    const signature = hmac.digest('base64');

    return { signature, timestamp };
  }

  async __request(
    method: 'POST' | 'GET',
    requestPath: string,
    data?: Record<string, any>
  ) {
    const { signature, timestamp } = this.createSignature(
      method,
      requestPath,
      data
    );

    // build headers
    const headers: Record<string, string> = {
      'OK-ACCESS-KEY': this.options.apiKey,
      'OK-ACCESS-SIGN': signature,
      'OK-ACCESS-TIMESTAMP': timestamp,
      'OK-ACCESS-PASSPHRASE': this.options.passphrase,
    };
    if (this.options.projectID) {
      headers['OK-ACCESS-PROJECT'] = this.options.projectID;
    }
    if (method === 'POST') {
      headers['Content-Type'] = 'application/json';
    }

    const opt: RequestInit = { method, headers };
    let search = '';
    if (method === 'POST') {
      opt.body = JSON.stringify(data);
    } else if (method === 'GET') {
      search = `?${stringify(data)}`;
    }

    const url = `https://www.okx.com${requestPath}${search}`;
    const result = await fetch(url, opt)
      .then((res) => res.json())
      .then((resData: any) => {
        // { code: number; msg: string; data: unknown }
        return resData.data;
      });
    return result;
  }
}
