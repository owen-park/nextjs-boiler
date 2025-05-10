import { IDefaultOptions, IRequestOptions } from '@/fe/types/baseFetchApi.d';

const defaultOptions: IDefaultOptions = {
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  mode: 'cors',
};

const baseFetchApi = (defaultOptions: IDefaultOptions) => async (
  url: string, 
  options: IRequestOptions = {}
) => {
  const requestOptions: any = {
    method: options.method || 'GET',
    headers: new Headers(defaultOptions.headers),
    mode: defaultOptions.mode,
    ...options,
  };

  if (requestOptions.body && typeof requestOptions.body !== 'string') {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default baseFetchApi(defaultOptions);
