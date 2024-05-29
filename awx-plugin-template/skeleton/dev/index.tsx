import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { awxPlugin, AwxPage } from '../src/plugin';

createDevApp()
  .registerPlugin(awxPlugin)
  .addPage({
    element: <AwxPage />,
    title: 'Root Page',
    path: '/awx',
  })
  .render();
