interface ImportMetaEnv {
    readonly SESSION_SECRET: string;
    
    readonly TWITCH_CLIENT: string;
    readonly TWITCH_SECRET: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}