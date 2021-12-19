interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_API: string;
    readonly WS: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}