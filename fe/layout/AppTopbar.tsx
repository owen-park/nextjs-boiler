/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { AppTopbarRef } from '@/fe/types';
import { LayoutContext } from './context/layoutcontext';
import { Menu } from 'primereact/menu';
import baseFetchApi from '@/fe/utils/baseFetchApi';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const router = useRouter();
  const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  const menu = useRef<Menu>(null);
  const toast = useRef<any>(null);
  const [displayConfirmation, setDisplayConfirmation] = useState(false);

  const logout = async () => {
    const res = await baseFetchApi('/api/auth/logout', { method: 'POST' });

    if (res.status === 'SUCCESS') {
      setDisplayConfirmation(false);
      router.push('/auth/login');
    } else {
      toast.current.show({ severity:'error', summary: 'Error', detail:'Logout Failed', life: 2000 });
    }
  };

  const overlayMenuItems = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => setDisplayConfirmation(true),
    },
  ];

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current
  }));

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    menu.current?.toggle(event);
  };

  const confirmationDialogFooter = (
    <>
      <Button type="button" label="No" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
      <Button type="button" label="Yes" icon="pi pi-check" onClick={() => logout()} text autoFocus />
    </>
  );

  return (
    <div className="layout-topbar">
      <Link href="/" className="layout-topbar-logo">
        <span className="font-bold" style={{ color: 'var(--primary-color)' }}>OWEN APP</span>
      </Link>

      <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
        <i className="pi pi-bars" />
      </button>

      <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
        <i className="pi pi-ellipsis-v" />
      </button>

      <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
        <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-user" onClick={toggleMenu}></i>
          <span>Profile</span>
          <Menu className="mt-3" ref={menu} model={overlayMenuItems} popup />
          <Dialog header="Confirmation" visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
            <div className="flex align-items-center">
              <span>Are you sure you want to logout?</span>
            </div>
          </Dialog>
        </button>
      </div>
      <Toast ref={toast} />
    </div>
  );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
