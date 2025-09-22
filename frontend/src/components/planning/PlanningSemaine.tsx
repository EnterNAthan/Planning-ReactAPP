// src/components/planning/PlanningSemaine.tsx
import React from 'react';
import MiniCalendrier from './MiniCalendrier';
import ListeCours from './ListeCours';
// import GrillePlanning from './GrillePlanning'; // À créer après
import { usePlanning } from '../../hook/usePlanning';
import { useListeCours } from '../../hook/useListeCours';
import { Ressource, SAE } from '../../types/types';

interface PlanningSemaineProps {
  ressources: Ressource[];
  saes: SAE[];
  semestres: any[];
}

const PlanningSemaine: React.FC<PlanningSemaineProps> = ({
  ressources,
  saes,
  semestres
}) => {
  const planning = usePlanning();
  const listeCours = useListeCours(ressources, saes);

  const handleSemaineChange = (numeroSemaine: number, annee: number) => {
    planning.setSemaineSelectionnee(numeroSemaine);
    planning.setAnneeSelectionnee(annee);
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* COLONNE GAUCHE - 20% */}
      <div className="w-1/5 bg-white shadow-sm border-r p-4 flex flex-col gap-4 overflow-y-auto">
        {/* Mini calendrier */}
        <MiniCalendrier
          semaineSelectionnee={planning.semaineSelectionnee}
          anneeSelectionnee={planning.anneeSelectionnee}
          onSemaineChange={handleSemaineChange}
          getTexteSemaine={planning.getTexteSemaine}
          getNumeroSemaine={planning.getNumeroSemaine}
        />

        {/* Liste des cours */}
        <ListeCours
          ressources={ressources}
          saes={saes}
          semestres={semestres}
          semestreSelectionne={listeCours.semestreSelectionne}
          onSemestreChange={listeCours.setSemestreSelectionne}
        />
      </div>

      {/* COLONNE DROITE - 80% */}
      <div className="w-4/5 p-4">
        <div className="bg-white rounded-lg shadow-sm border h-full">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              📅 {planning.getTexteSemaine(planning.semaineSelectionnee, planning.anneeSelectionnee)}
            </h2>
          </div>
          
          <div className="p-4 h-full">
            {/* Ici sera la grille du planning */}
            <div className="h-full bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
              Grille de planning à créer...
              <br />
              <small>Semaine {planning.semaineSelectionnee}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningSemaine;
