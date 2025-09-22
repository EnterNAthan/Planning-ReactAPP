// src/hooks/usePlanning.ts
import { useState } from 'react';

export const usePlanning = () => {
    const [semaineSelectionnee, setSemaineSelectionnee] = useState<number>(getCurrentWeek());
    const [anneeSelectionnee, setAnneeSelectionnee] = useState<number>(new Date().getFullYear());
    const [semestreSelectionne, setSemestreSelectionne] = useState<number | undefined>(undefined); // AJOUTER CETTE LIGNE

    // Calculer le numéro de semaine actuel
    function getCurrentWeek(): number {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const diff = now.getTime() - start.getTime();
        const oneWeek = 1000 * 60 * 60 * 24 * 7;
        return Math.floor(diff / oneWeek) + 1;
    }

    // Calculer le numéro de semaine d'une date donnée
    function getNumeroSemaine(date: Date): number {
        const start = new Date(date.getFullYear(), 0, 1);
        const diff = date.getTime() - start.getTime();
        const oneWeek = 1000 * 60 * 60 * 24 * 7;
        return Math.floor(diff / oneWeek) + 1;
    }

    // Formater le texte de la semaine
    function getTexteSemaine(numeroSemaine: number, annee: number): string {
        return `Semaine ${numeroSemaine} - ${annee}`;
    }

    // Gérer le changement de semaine
    const changerSemaine = (nouvelleSemaine: number, nouvelleAnnee: number) => {
        setSemaineSelectionnee(nouvelleSemaine);
        setAnneeSelectionnee(nouvelleAnnee);
    };

    // Gérer le changement de semestre - AJOUTER CETTE FONCTION
    const changerSemestre = (nouveauSemestre: number) => {
        setSemestreSelectionne(nouveauSemestre);
    };

    // Fonctions utilitaires pour créneaux (si nécessaire plus tard)
    const ajouterCreneau = (creneau: any) => {
        // Logique d'ajout de créneau
        console.log('Ajouter créneau:', creneau);
    };

    const supprimerCreneau = (creneauId: string) => {
        // Logique de suppression de créneau
        console.log('Supprimer créneau:', creneauId);
    };

    return {
        semaineSelectionnee,
        anneeSelectionnee,
        semestreSelectionne,        // AJOUTER
        setSemaineSelectionnee,
        setAnneeSelectionnee,
        setSemestreSelectionne,     // AJOUTER
        getNumeroSemaine,
        getTexteSemaine,           // AJOUTER
        changerSemaine,
        changerSemestre,           // AJOUTER
        ajouterCreneau,
        supprimerCreneau
    };
};
