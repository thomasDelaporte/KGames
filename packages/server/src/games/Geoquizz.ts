import { Game } from './Game';

export class Geoquizz extends Game {

    public configuration: any = {
        questionCountries: 5,
        questionFlags: 5,
        questionCapitals: 5
    }

    public start(): void {
        //throw new Error('Method not implemented.');
    }

    public reset(): void {
        //throw new Error('Method not implemented.');
    }
}