interface ImportMetaEnv {
    readonly VITE_API: string;
    readonly VITE_WS: string;
    readonly VITE_TWITCH_CLIENT: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}