// src/hooks/usePlanning.ts
import { useState, useEffect } from 'react';
import { CreneauHoraire, SemaineData } from '../types/types';

export const usePlanning = () => {
    const [semaineSelectionnee, setSemaineSelectionnee] = useState<number>(0);
    const [anneeSelectionnee, setAnneeSelectionnee] = useState<number>(new Date().getFullYear());
    const [planningData, setPlanningData] = useState<SemaineData[]>([]);

    // Calcule le numéro de semaine ISO
    const getNumeroSemaine = (date: Date): number => {
        const target = new Date(date.valueOf());
        const dayNr = (date.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        const firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() !== 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
    };

    // Génère le texte de la semaine avec ton format
    const getTexteSemaine = (numeroSemaine: number, annee: number): string => {
        const startOfWeek = getDebutSemaine(numeroSemaine, annee);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 4); // Vendredi

        return `Semaine ${numeroSemaine} - ${startOfWeek.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
        })} au ${endOfWeek.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
        })}`;
    };

    // Récupère le lundi d'une semaine donnée
    const getDebutSemaine = (numeroSemaine: number, annee: number): Date => {
        const premierJanvier = new Date(annee, 0, 1);
        const joursAjouter = (numeroSemaine - 1) * 7;
        const premierLundi = new Date(premierJanvier);

        // Trouve le premier lundi de l'année
        const jourSemaine = premierJanvier.getDay();
        const joursJusquLundi = jourSemaine === 0 ? 1 : (8 - jourSemaine);
        premierLundi.setDate(premierJanvier.getDate() + joursJusquLundi);

        // Ajoute les semaines
        premierLundi.setDate(premierLundi.getDate() + joursAjouter);
        return premierLundi;
    };

    // Initialise la semaine courante
    useEffect(() => {
        const maintenant = new Date();
        const semaineCourante = getNumeroSemaine(maintenant);
        setSemaineSelectionnee(semaineCourante);
        setAnneeSelectionnee(maintenant.getFullYear());
    }, []);

    // Clé unique pour une semaine
    const getCleSemaine = (numeroSemaine: number, annee: number): string =>
        `${annee}-W${numeroSemaine.toString().padStart(2, '0')}`;

    // Récupère les créneaux de la semaine sélectionnée
    const getCreneauxSemaine = (numeroSemaine: number, annee: number): CreneauHoraire[] => {
        const cle = getCleSemaine(numeroSemaine, annee);
        const semaineData = planningData.find(s => s.semaine === cle);
        return semaineData?.creneaux || [];
    };

    // Ajoute un créneau
    const ajouterCreneau = (creneau: Omit<CreneauHoraire, 'id' | 'semaine'>) => {
        const cleSemaine = getCleSemaine(semaineSelectionnee, anneeSelectionnee);
        const nouveauCreneau: CreneauHoraire = {
            ...creneau,
            id: `${cleSemaine}-${creneau.jour}-${creneau.heureDebut}-${Date.now()}`,
            semaine: cleSemaine
        };

        setPlanningData(prev => {
            const semaineExiste = prev.find(s => s.semaine === cleSemaine);

            if (semaineExiste) {
                return prev.map(s =>
                    s.semaine === cleSemaine
                        ? { ...s, creneaux: [...s.creneaux, nouveauCreneau] }
                        : s
                );
            } else {
                return [...prev, {
                    semaine: cleSemaine,
                    creneaux: [nouveauCreneau]
                }];
            }
        });
    };

    // Supprime un créneau
    const supprimerCreneau = (creneauId: string) => {
        setPlanningData(prev =>
            prev.map(s => ({
                ...s,
                creneaux: s.creneaux.filter(c => c.id !== creneauId)
            }))
        );
    };

    return {
        semaineSelectionnee,
        anneeSelectionnee,
        setSemaineSelectionnee,
        setAnneeSelectionnee,
        planningData,
        getCreneauxSemaine,
        getTexteSemaine,
        getDebutSemaine,
        getNumeroSemaine,
        ajouterCreneau,
        supprimerCreneau
    };
};
