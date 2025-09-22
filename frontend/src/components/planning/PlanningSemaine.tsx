// src/components/planning/PlanningSemaine.tsx - VERSION AVEC PROPS
import React, { useEffect } from 'react';
import MiniCalendrier from './MiniCalendrier';
import ListeCours from './ListeCours';
import GrilleSemaine from './GrilleSemaine';
import { usePlanning } from '../../hook/usePlanning';
import { Ressource, SAE, Semestre } from '../../types/types';

interface PlanningSemaineProps {
  ressources: Ressource[];
  saes: SAE[];
  semestres: Semestre[];
}

const PlanningSemaine: React.FC<PlanningSemaineProps> = ({
  ressources,
  saes,
  semestres
}) => {
    const planning = usePlanning();

    // Debug de l'état du semestre sélectionné
    useEffect(() => {
        console.log('🎯 Semestre sélectionné:', planning.semestreSelectionne);
    }, [planning.semestreSelectionne]);

    // src/components/planning/PlanningSemaine.tsx
return (
    <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    📅 Planning Semaine
                </h1>
                <p className="text-gray-600">
                    Gérez votre planning hebdomadaire par drag & drop
                </p>
                {/* Debug info */}
                <div className="mt-2 text-sm text-blue-600">
                    🎯 Semestre: {planning.semestreSelectionne || 'Non sélectionné'} | 
                    📅 {planning.getTexteSemaine(planning.semaineSelectionnee, planning.anneeSelectionnee)}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4"> {/* Réduire gap de 6 à 4 */}
                {/* Sidebar gauche - Plus compacte */}
                <div className="xl:col-span-1">
                    <div className="sticky top-4 space-y-3"> {/* Sticky pour garder visible + réduire space */}
                        {/* Mini Calendrier - Plus compact */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3"> {/* Réduire padding */}
                            <MiniCalendrier
                                semaineSelectionnee={planning.semaineSelectionnee}
                                anneeSelectionnee={planning.anneeSelectionnee}
                                onSemaineChange={planning.changerSemaine}
                                getTexteSemaine={planning.getTexteSemaine}
                                getNumeroSemaine={planning.getNumeroSemaine}
                            />
                        </div>

                        {/* Liste des cours - Directement après */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3"> {/* Réduire padding */}
                            <ListeCours
                                ressources={ressources}
                                saes={saes}
                                semestres={semestres}
                                semestreSelectionne={planning.semestreSelectionne}
                                onSemestreChange={planning.changerSemestre}
                            />
                        </div>
                    </div>
                </div>

                {/* Grille principale */}
                <div className="xl:col-span-3">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <GrilleSemaine
                            semaineSelectionnee={planning.semaineSelectionnee}
                            anneeSelectionnee={planning.anneeSelectionnee}
                            semestreSelectionne={planning.semestreSelectionne}
                            getTexteSemaine={planning.getTexteSemaine}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default PlanningSemaine;
