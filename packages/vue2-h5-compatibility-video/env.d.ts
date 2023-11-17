/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly type: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
