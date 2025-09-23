// interfaces pour les types de données
export interface Semestre{
    id: number;
    nom: string;
    annee: string;
    actif: string;
}

export interface Ressource{
    type_cours: any;
    id: number;
    nom: string;
    semestre_id: number;
}

export interface SAE{
    id: number;
    nom: string;
    semestre_id: number;
}

export interface CreneauHoraire{
    id: string,
    jour: 'lundi' | 'mardi' |'mercredi'| 'jeudi'| 'vendredi',
    heureDebut: string,//"8:00"
    heureFin: string,//"10:00"
    ressourceId?: number;
    saesId?: number;
    semaine: string; //semaine 45
    type: 'ressource' | 'sae';
}

export interface SemaineData{
    semaine: string,
    creneaux: CreneauHoraire[];
}


// pour l'état de sélection
export interface app {
    selectedSemestre: Semestre | null;
    selectedRessource: Ressource | null;
    selectedSae: SAE | null;
}