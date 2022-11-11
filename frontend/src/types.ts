declare global {
  interface Window {
    SPA_RUNTIME_CONFIGURATION: {
      BACKEND_BASE_URL: string;
    };
  }
}

export interface LocationState {
  from?: {
    pathname: string;
    search: string;
  };
}
