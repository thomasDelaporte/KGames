export const COMMON = true;

export enum GameMode {
    GEOQUIZZ,
    IMPOSTEUR,
    INFILTRER,
    KCULTURE,
    SPYFALL,
}

export enum GameStep {
    PLAYERS,
    SELECT_GAME,
    CONFIGURATION_GAME,
    GAME,
    RESULT
}

export enum KcultureQuestionType {
    TEXT,
    IMAGE,
    AUDIO,
    BAC,
    ORDER,
    MARKER
}

export enum GeoquizzQuestionType {
    WORLD,
    FLAG,
    CAPITAL
}