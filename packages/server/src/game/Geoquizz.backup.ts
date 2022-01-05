export class Geoquizz extends Game {

    private questionsPlayed: Set<any> = new Set();
    private questionInterval: NodeJS.Timeout;

    private answers: Record<number, Record<string, any>> = {};
    private scores: Record<string, number> = {};

    private currentQuestion: number = 0;
    private timer: number = 10;

    public configuration: any = {
        theme: 'Aucune idée',
        time: 10000
    }

    public start(): void {

        console.log('start game');

        this.hasStarded = true;

        this.pickQuestion();
        this.questionInterval = setInterval(this.update.bind(this), 1000);
    }

    public reset(): void {
                
        this.questionsPlayed = new Set();
        clearInterval(this.questionInterval);

        this.start();
    }

    private pickQuestion() {

        if(this.currentQuestion !== 0)
            this.lobby.broadcast('questionretrieve');

        if( questions.length === this.questionsPlayed.size ) {
            return clearInterval(this.questionInterval);
        }

        let question = questions[Math.floor(Math.random() * questions.length)];
        
        while( this.questionsPlayed.has(question) )
            question = questions[Math.floor(Math.random() * questions.length)];

        this.currentQuestion += 1;
        this.questionsPlayed.add(question);

        this.lobby.broadcast('question', { ...question, number: this.currentQuestion, time: this.configuration.time } );
    }

    private update() {

        if(this.timer > 0) {
            this.timer -= 1;
            this.lobby.broadcast('timer', { timer: this.timer });
        } else {

            this.timer = 10; //this.configuration.time;
            this.pickQuestion();
        }
    }

    public on(action: string, data: any, player: Player): void {
        
        console.log(action, data, player.id);

        if(action === 'response') {

            if(!this.answers[this.currentQuestion])
                this.answers[this.currentQuestion] = [];

            this.answers[this.currentQuestion][player.id] = data.response;


            if( questions.length === this.questionsPlayed.size && this.answers[this.currentQuestion].length === this.lobby.players.size ) {
                console.log('TOUTES LES QUESTIONS SONT FINIS');

                this.currentQuestion = 1;
                
                const firstUserToCheck = Array.from(this.lobby.players)[0];
                const question = Array.from(this.questionsPlayed)[0];
                const answer = this.answers[this.currentQuestion][firstUserToCheck.id];
                
                this.lobby.broadcast('updatestep', { step: 5, question, answer, number: this.currentQuestion });
            }
        } else if(action === 'validquestion') {
            console.log('question valid', this.currentQuestion);
        }
    }
}