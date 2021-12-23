interface ImportMetaEnv {
    readonly VITE_API: string;
    readonly VITE_WS: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}