import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
} from '@backstage/core-plugin-api';
import {RHDAExecutorAPIRef, RHDAExecutorClient} from './api'
import { rootRouteRef } from './routes';

export const rhdaPlugin = createPlugin({
  id: 'rhda',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: RHDAExecutorAPIRef,
      deps: {discoveryApi: discoveryApiRef},
      factory: ({ discoveryApi }) => new RHDAExecutorClient({ discoveryApi }),
    })
  ]
});

export const RhdaPage = rhdaPlugin.provide(
  createRoutableExtension({
    name: 'RhdaPage',
    component: () =>
      import('./components/RhdaOverviewComponent').then(m => m.RhdaOverviewComponent),
    mountPoint: rootRouteRef,
  }),
);
