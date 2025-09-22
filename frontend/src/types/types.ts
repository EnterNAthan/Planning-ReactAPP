export interface Semestre{
    id: number;
    nom: string;
    annee: string;
    actif: string;
}

export interface Ressource{
    id: number;
    nom: string;
    semestre_id: number;
}

export interface SAE{
    id: number;
    nom: string;
    semestre_id: number;
}

// pour l'état de sélection
export interface app {
    selectedSemestre: Semestre | null;
    selectedRessource: Ressource | null;
    selectedSae: SAE | null;
}