import { createPlugin, createRoutableExtension, createApiFactory, discoveryApiRef, fetchApiRef, createRouteRef } from '@backstage/core-plugin-api';
import { awxApiRef, AwxClient } from './api/awxClient';

export const rootRouteRef = createRouteRef({
  id: '${{ values.pluginId }}',
});

export const awxPlugin = createPlugin({
  id: '${{ values.pluginId }}',
  apis: [
    createApiFactory({
      api: awxApiRef,
      deps: { discoveryApi: discoveryApiRef, fetchApi: fetchApiRef },
      factory: ({ discoveryApi, fetchApi }) => new AwxClient({ discoveryApi, fetchApi }),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const AwxPage = awxPlugin.provide(
  createRoutableExtension({
    name: 'AwxPage',
    component: () => import('./components/AwxComponent').then(m => m.AwxComponent),
    mountPoint: rootRouteRef,
  }),
);

