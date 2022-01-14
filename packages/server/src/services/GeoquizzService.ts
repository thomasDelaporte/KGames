import { Service } from 'typedi';

@Service()
export class GeoquizzService {

    private data: any;

    constructor() {
        console.log('ah');
    }
}