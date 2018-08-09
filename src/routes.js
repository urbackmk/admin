import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Events = Loadable({
  loader: () => import('./views/Events'),
  loading: Loading,
});

const MoCs = Loadable({
  loader: () => import('./views/MoCs'),
  loading: Loading,
});

const Researchers = Loadable({
  loader: () => import('./views/Researchers'),
  loading: Loading,
});

const Resources = Loadable({
  loader: () => import('./views/Resources'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/events', name: 'Events', component: Events },
  { path: '/mocs', name: 'MoCs', component: MoCs },
  { path: '/researchers', name: 'Researchers', component: Researchers },
  { path: '/resources', name: 'Resources', component: Resources },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
