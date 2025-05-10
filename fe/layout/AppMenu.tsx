/* eslint-disable @next/next/no-img-element */

import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/fe/types';

const AppMenu = () => {
  const model: AppMenuItem[] = [
    {
      label: 'Home',
      items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
    },
    {
      label: 'Guide',
      items: [
        {
          label: 'UI Components',
          items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/guide/uikit/formlayout' },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/guide/uikit/input' },
            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/guide/uikit/floatlabel' },
            { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/guide/uikit/invalidstate' },
            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/guide/uikit/button', class: 'rotated-icon' },
            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/guide/uikit/table' },
            { label: 'List', icon: 'pi pi-fw pi-list', to: '/guide/uikit/list' },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/guide/uikit/tree' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/guide/uikit/panel' },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/guide/uikit/overlay' },
            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/guide/uikit/media' },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/guide/uikit/menu', preventExact: true },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/guide/uikit/message' },
            { label: 'File', icon: 'pi pi-fw pi-file', to: '/guide/uikit/file' },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/guide/uikit/charts' },
            { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/guide/uikit/misc' }
          ]
        },
        {
          label: 'Utilities',
          items: [
            { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/guide/utilities/icons' }
          ]
        },
        {
          label: 'Pages',
          icon: 'pi pi-fw pi-briefcase',
          to: '/pages',
          items: [
            {
              label: 'Auth',
              icon: 'pi pi-fw pi-user',
              items: [
                {
                  label: 'Login',
                  icon: 'pi pi-fw pi-sign-in',
                  to: '/guide/auth/login'
                },
                {
                  label: 'Error',
                  icon: 'pi pi-fw pi-times-circle',
                  to: '/guide/auth/error'
                },
                {
                  label: 'Access Denied',
                  icon: 'pi pi-fw pi-lock',
                  to: '/guide/auth/access'
                }
              ]
            },
            {
              label: 'Crud',
              icon: 'pi pi-fw pi-pencil',
              to: '/guide/pages/crud'
            },
            {
              label: 'Timeline',
              icon: 'pi pi-fw pi-calendar',
              to: '/guide/pages/timeline'
            },
            {
              label: 'Not Found',
              icon: 'pi pi-fw pi-exclamation-circle',
              to: '/guide/pages/notfound'
            },
            {
              label: 'Empty',
              icon: 'pi pi-fw pi-circle-off',
              to: '/guide/pages/empty'
            }
          ]
        },
        {
          label: 'Hierarchy',
          items: [
            {
              label: 'Submenu 1',
              icon: 'pi pi-fw pi-bookmark',
              items: [
                {
                  label: 'Submenu 1.1',
                  icon: 'pi pi-fw pi-bookmark',
                  items: [
                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                  ]
                },
                {
                  label: 'Submenu 1.2',
                  icon: 'pi pi-fw pi-bookmark',
                  items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                }
              ]
            },
            {
              label: 'Submenu 2',
              icon: 'pi pi-fw pi-bookmark',
              items: [
                {
                  label: 'Submenu 2.1',
                  icon: 'pi pi-fw pi-bookmark',
                  items: [
                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                  ]
                },
                {
                  label: 'Submenu 2.2',
                  icon: 'pi pi-fw pi-bookmark',
                  items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                }
              ]
            }
          ]
        }
      ],
    },
  ];

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
