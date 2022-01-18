import { Service } from 'typedi';

@Service()
export class SpyfallService {

    private locationsJobs: Array<{ label: string, jobs: Array<string> }> = [
        { label: 'Plage', jobs: [ 'Vacancier' ] },
        { label: 'Navire militaire',  jobs: [ 'Soldat' ] },
        { label: 'Hôpital', jobs: [ 'Médecin' ] },
        { label: 'Théâtre', jobs: [ 'Acteur', 'Comédien' ] },
        { label: 'Banque', jobs: [ 'Banquier' ] },
        { label: 'Elysée', jobs: [ 'Président', 'Première-Dame' ] },
        { label: 'Musée', jobs: [ 'Archiviste' ] },
        { label: 'Lycée', jobs: [ 'Étudiant', 'Bibliothécaire' ] },
        { label: 'Restaurant étoilé', jobs: [ 'Cuisinier' ] },
        { label: 'Salle du trône', jobs: [ 'Bouffon' ] },
        { label: 'Aéroport', jobs: [ '??' ] },
        { label: 'Terrain de foot', jobs: [ 'Footballeur' ] },
        { label: 'Part d\'atraction', jobs: [ 'Mécanicien' ] },
        { label: 'Centre commercial', jobs: [ 'Caissier', 'Client' ] },
        { label: 'Plateau de tournage', jobs: [ 'Acteur', 'Cameraman' ] },
        { label: 'Station de ski', jobs: [ '??' ] },
        { label: 'Zoo', jobs: [ 'Vétérinaire' ] },
        { label: 'Locaux d\'entreprise', jobs: [ 'CEO', 'Employé' ] }
    ];

    public getRounds(quantity: number) {
        return this.locationsJobs.sort(() => Math.random() - Math.random())
            .slice(0, quantity);
    }

    public getLocationsLocals(): Array<string> {
        return this.locationsJobs.map((l: any) => l.label);
    }
}