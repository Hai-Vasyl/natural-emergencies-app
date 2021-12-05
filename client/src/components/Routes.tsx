import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes as Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Disasters from '../pages/Disasters';
import Disaster from '../pages/Disaster';
import Map from '../pages/Map';
import DisasterMod from '../pages/DisasterMod';
import Regions from '../pages/Regions';
import RegionMod from '../pages/RegionMod';
import Users from '../pages/Users';
import User from '../pages/User';
import NotFound from '../pages/NotFound';
import { Store } from '../redux/store';

interface IRoute {
  path: string;
  element: JSX.Element;
}

const Routes: React.FC = () => {
  const { user } = useSelector((state: Store) => state);

  const mainRoutes: IRoute[] = [
    { path: '/', element: <Home /> },
    { path: '/map', element: <Map /> },
    { path: '/disasters', element: <Disasters /> },
    { path: '/disasters/:id', element: <Disaster /> },
    { path: '/regions', element: <Regions /> },
  ];

  const routes = {
    user: [
      ...mainRoutes,
      { path: '/users', element: <Users /> },
      { path: '/users/:id', element: <User /> },
    ],
    admin: [
      ...mainRoutes,
      { path: '/disasters/create', element: <DisasterMod /> },
      { path: '/disasters/edit/:id', element: <DisasterMod /> },
      { path: '/regions/create', element: <RegionMod /> },
      { path: '/regions/edit', element: <RegionMod /> },
      { path: '/users', element: <Users /> },
      { path: '/users/:id', element: <User /> },
    ],
    unregistered: [...mainRoutes],
  };

  const routerMapper = (routes: IRoute[]) => {
    return routes.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ));
  };

  return (
    <Switch>
      {routerMapper(routes[user.role || 'unregistered'])}
      <Route path={'/*'} element={<NotFound />} />
    </Switch>
  );
};

export default Routes;
