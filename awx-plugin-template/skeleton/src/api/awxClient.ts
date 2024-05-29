import { createApiRef, DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';

export const awxApiRef = createApiRef<AwxApi>({
  id: 'plugin.awx.service',
});

export type Playbook = {
  id: number;
  name: string;
};

export type LaunchPlaybookResponse = {
  id: number;
  status: string;
};

export interface AwxApi {
  getPlaybooks(): Promise<Playbook[]>;
  launchPlaybook(playbookId: number): Promise<LaunchPlaybookResponse>;
}

export class AwxClient implements AwxApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly fetchApi: FetchApi;

  constructor({ discoveryApi, fetchApi }: { discoveryApi: DiscoveryApi; fetchApi: FetchApi }) {
    this.discoveryApi = discoveryApi;
    this.fetchApi = fetchApi;
  }

  async getPlaybooks(): Promise<Playbook[]> {
    const url = await this.discoveryApi.getBaseUrl('proxy');
    const response = await this.fetchApi.fetch(`${url}/awx-api/job_templates/`);
    const data = await response.json();
    return data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));
  }

  async launchPlaybook(playbookId: number): Promise<LaunchPlaybookResponse> {
    const url = await this.discoveryApi.getBaseUrl('proxy');
    const response = await this.fetchApi.fetch(`${url}/awx-api/job_templates/${playbookId}/launch/`, {
      method: 'POST',
    });
    const data = await response.json();
    return {
      id: data.id,
      status: data.status,
    };
  }
}

