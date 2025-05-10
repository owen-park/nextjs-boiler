'use client';

import React, { useContext, useState, useRef } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { LayoutContext } from '@/fe/layout/context/layoutcontext';
import { LoginForm, LoginSchema } from '@/fe/types/auth.d';
import baseFetchApi from '@/fe/utils/baseFetchApi';

const LoginPage = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);
  const toast = useRef<any>(null);
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

  const { handleSubmit, control } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (param: LoginForm) => {
    const res = await baseFetchApi('/api/auth/login', {
      method: 'POST',
      body: param,
    });

    if (res.status === 'SUCCESS') {
      router.push('/');
    } else {
      toast.current.show({ severity:'error', summary: 'Error', detail:'Login Failed', life: 2000 });
    }
  };

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <div
          style={{
            borderRadius: '56px',
            padding: '0.3rem',
            background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
          }}
        >
        <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
          <div className="text-center mb-5">
            <div className="text-5xl font-bold mb-3" style={{ color: 'var(--primary-color)' }}>OWEN APP</div>
              <span className="text-600 font-medium">Login to continue</span>
            </div>
            <Toast ref={toast} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-8">
                <label htmlFor="loginId" className="block text-900 text-xl font-medium mb-2">
                  ID
                </label>
                <Controller
                  control={control}
                  name="loginId"
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <InputText  
                      type="text"
                      value={value || ''}
                      onChange={onChange}
                      className={`w-full md:w-30rem mb-5 ${error ? 'p-invalid' : ''}`}
                      style={{ padding: '1rem' }}
                      autoComplete="off"
                    />
                  )}
                />

                <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                  Password
                </label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Password 
                      inputId="password"
                      value={value || ''}
                      onChange={onChange}
                      toggleMask className="w-full mb-5"
                      inputClassName={`w-full p-3 md:w-30rem ${error ? 'p-invalid' : ''}`}
                      autoComplete="off"
                    />
                  )}
                />
                <div className="flex align-items-center justify-content-between mb-5 gap-5">
                  <div className="flex align-items-center">
                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2" disabled />
                    <label htmlFor="rememberme1">Remember me</label>
                  </div>
                  <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                    Forgot password?
                  </a>
                </div>
                <Button type="submit" label="Login" className="w-full p-3 text-xl" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
