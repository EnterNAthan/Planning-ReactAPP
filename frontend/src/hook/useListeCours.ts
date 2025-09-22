import { useState, useEffect } from 'react';
import { Ressource, SAE } from '../types/types';

//hook qui permet de géré le changement de semestre et le comptage des cours par semestre
export const useListeCours = (ressources: Ressource[], saes: SAE[]) => {
    const [semestreSelectionne, setSemestreSelectionne] = useState<number | undefined>();

    // Auto-sélectionne le premier semestre s'il y en a un
    useEffect(() => {
        if ((ressources.length > 0 || saes.length > 0) && !semestreSelectionne) {
            const premierSemestre = ressources[0]?.semestre_id || saes[0]?.semestre_id;
            if (premierSemestre) {
                setSemestreSelectionne(premierSemestre);
            }
        }
    }, [ressources, saes, semestreSelectionne]);

    const getTotalCours = (semestreId: number): number => {
        const ressourcesCount = ressources.filter(r => r.semestre_id === semestreId).length;
        const saesCount = saes.filter(s => s.semestre_id === semestreId).length;
        return ressourcesCount + saesCount;
    };

    return {
        semestreSelectionne,
        setSemestreSelectionne,
        getTotalCours
    };
};
