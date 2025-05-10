/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/fe/types';
import { guideMenu } from './guideMenu';
import baseFetchApi from '../utils/baseFetchApi';

const AppMenu = () => {
  const [model, setModel] = useState<AppMenuItem[]>([]);
  
  const getMenus = async () => {
    return await baseFetchApi('/api/cmn/menu', { method: 'GET' });
  };

  useEffect(() => {
    getMenus().then(res => {
      const menus = res.data;
      menus.push(guideMenu);
      setModel(menus);
    });
  }, []);

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
