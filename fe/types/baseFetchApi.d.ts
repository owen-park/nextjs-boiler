interface INextOptions {
  tags: string[];
};

export interface IRequestOptions {
  method?: string;
  headers?: Headers;
  mode?: string;
  cache?: string;
  body?: Record<string, any> | string;
};

export interface IDefaultOptions {
  headers: {
    'Content-type': string;
  };
  mode: string;
};
