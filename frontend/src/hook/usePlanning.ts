import { useState } from 'react';

export const usePlanning = () => {
    const [semaineSelectionnee, setSemaineSelectionnee] = useState<number>(getCurrentWeek());
    const [anneeSelectionnee, setAnneeSelectionnee] = useState<number>(new Date().getFullYear());
    const [semestreSelectionne, setSemestreSelectionne] = useState<number | undefined>(undefined);

    function getNumeroSemaine(date: Date): number {
        // Copie de la date pour ne pas modifier l'originale
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        
        // Trouve le jeudi de cette semaine (jeudi détermine l'année de la semaine)
        const dayNum = d.getUTCDay() || 7; // Dimanche = 7 au lieu de 0
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        
        // Premier jour de l'année
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        
        // Calcul du numéro de semaine
        const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
        
        return weekNo;
    }

    function getCurrentWeek(): number {
        return getNumeroSemaine(new Date());
    }

    function getLundiSemaine(numeroSemaine: number, annee: number): Date {
        // 4 janvier est toujours en semaine 1 selon ISO 8601
        const jan4 = new Date(annee, 0, 4);
        
        // Trouve le lundi de la semaine 1
        const dayOfWeek = jan4.getDay() || 7; // Dimanche = 7
        const daysToMonday = dayOfWeek - 1;
        const mondaySemaine1 = new Date(jan4);
        mondaySemaine1.setDate(jan4.getDate() - daysToMonday);
        
        // Calcule le lundi de la semaine voulue
        const lundiVoulu = new Date(mondaySemaine1);
        lundiVoulu.setDate(mondaySemaine1.getDate() + (numeroSemaine - 1) * 7);
        
        return lundiVoulu;
    }

    function getTexteSemaine(numeroSemaine: number, annee: number): string {
        const lundi = getLundiSemaine(numeroSemaine, annee);
        const dimanche = new Date(lundi);
        dimanche.setDate(lundi.getDate() + 6);
        
        const formatDate = (date: Date) => 
            date.toLocaleDateString('fr-FR', { 
                day: '2-digit', 
                month: '2-digit'
            });
        
        return `Semaine ${numeroSemaine} (${formatDate(lundi)} - ${formatDate(dimanche)})`;
    }

    // Gérer le changement de semaine
    const changerSemaine = (nouvelleSemaine: number, nouvelleAnnee: number) => {
        setSemaineSelectionnee(nouvelleSemaine);
        setAnneeSelectionnee(nouvelleAnnee);
    };

    // Gérer le changement de semestre
    const changerSemestre = (nouveauSemestre: number) => {
        setSemestreSelectionne(nouveauSemestre);
    };

    // Fonctions utilitaires pour créneaux
    const ajouterCreneau = (creneau: any) => {
        console.log('Ajouter créneau:', creneau);
    };

    const supprimerCreneau = (creneauId: string) => {
        console.log('Supprimer créneau:', creneauId);
    };

    return {
        semaineSelectionnee,
        anneeSelectionnee,
        semestreSelectionne,        
        setSemaineSelectionnee,
        setAnneeSelectionnee,
        setSemestreSelectionne,     
        getNumeroSemaine,
        getTexteSemaine,
        getLundiSemaine,           
        changerSemaine,
        changerSemestre,
        ajouterCreneau,
        supprimerCreneau
    };
};
