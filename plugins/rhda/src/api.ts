import { createApiRef, DiscoveryApi } from '@backstage/core-plugin-api';

export interface ProviderSummary {
  direct: number;
  transitive: number;
  total: number;
  dependencies: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  remediations: number;
  recommendations: number;
  unscanned: number;
}

export  interface SummaryResponse {
  summary: {
    [provider: string]: ProviderSummary;
  };
}

export interface RHDAExecutorAPI {
  getSummaryReport: (repositorySlug: string, manifestFile: string) => Promise<SummaryResponse>;
  getHTMLReport: (repositorySlug: string, manifestFile: string, reportType: string) => Promise<string>;
}

export const RHDAExecutorAPIRef = createApiRef<RHDAExecutorAPI>({
  id: 'plugin.rhda.service',
});

export class RHDAExecutorClient implements RHDAExecutorAPI {
    discoveryApi: DiscoveryApi;
    constructor({discoveryApi}: {discoveryApi: DiscoveryApi}) {
    this.discoveryApi = discoveryApi;
  }

  private async fetch<T = any>(input: string, init?: RequestInit): Promise<T> {
    // As configured previously for the backend proxy
    const proxyUri = `${await this.discoveryApi.getBaseUrl('proxy')}/rhda`;
    const resp = await fetch(`${proxyUri}${input}`, init);
    if (!resp.ok) {
      throw new Error(`Failed to fetch: ${resp.status} ${resp.statusText}`);
    }

    const contentType = resp.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return await resp.json();
    } 
    return await resp.text();
  }

  async getSummaryReport(repositorySlug: string, manifestFile: string): Promise<SummaryResponse> {
    return await this.fetch<SummaryResponse>(`/report?repositorySlug=${repositorySlug}&manifestFile=${manifestFile}`);
  }

  async getHTMLReport(repositorySlug: string, manifestFile: string, reportType: string): Promise<string> {
    return await this.fetch<string>(`/report?repositorySlug=${repositorySlug}&manifestFile=${manifestFile}&type=${reportType}`);
  }
}