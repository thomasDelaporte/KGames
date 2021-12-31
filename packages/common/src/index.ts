export const COMMON = true;

export enum GameMode {
    GEOQUIZZ,
    IMPOSTEUR,
    INFILTRER,
    KCULTURE,
    SPYFALL,
}

export enum LobbyStep {
    PLAYERS,
    SELECT_GAME,
    CONFIGURATION_GAME,
    GAME,
    RESULT
}

export enum GeoquizzQuestionType {
    TEXT,
    IMAGE,
    AUDIO,
    BAC,
    ORDER
}