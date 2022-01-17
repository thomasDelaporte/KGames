declare namespace NodeJS {
    interface ProcessEnv {
        readonly SESSION_SECRET: string;

        readonly DATABASE_URL: string;
        readonly SHADOW_DATABSE_URL: string;

        readonly TWITCH_CLIENT: string;
        readonly TWITCH_SECRET: string;

        readonly GOOGLE_CLIENT: string;
        readonly GOOGLE_SECRET: string;
    }
}