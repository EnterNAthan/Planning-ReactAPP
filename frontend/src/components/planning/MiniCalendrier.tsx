// src/components/planning/MiniCalendrier.tsx
import React, { useState } from 'react';

interface MiniCalendrierProps {
    semaineSelectionnee: number;
    anneeSelectionnee: number;
    onSemaineChange: (semaine: number, annee: number) => void;
    getTexteSemaine: (numeroSemaine: number, annee: number) => string;
    getNumeroSemaine: (date: Date) => number;
}

const MiniCalendrier: React.FC<MiniCalendrierProps> = ({
    semaineSelectionnee,
    anneeSelectionnee,
    onSemaineChange,
    getTexteSemaine,
    getNumeroSemaine
}) => {
    const [moisActuel, setMoisActuel] = useState(new Date());

    // Génère les jours du mois
    const genererJoursMois = (date: Date) => {
        const annee = date.getFullYear();
        const mois = date.getMonth();
        const premierJour = new Date(annee, mois, 1);
        const dernierJour = new Date(annee, mois + 1, 0);
        const jours = [];

        // Jours vides en début de mois (commence par lundi)
        const premierJourSemaine = (premierJour.getDay() + 6) % 7;
        for (let i = 0; i < premierJourSemaine; i++) {
            jours.push(null);
        }

        // Jours du mois
        for (let jour = 1; jour <= dernierJour.getDate(); jour++) {
            jours.push(new Date(annee, mois, jour));
        }

        return jours;
    };

    const jours = genererJoursMois(moisActuel);
    const nomMois = moisActuel.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

    return (
        <div className="h-full flex flex-col">
            {/* MINI CALENDRIER */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-4">
                {/* En-tête du calendrier */}
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => setMoisActuel(new Date(moisActuel.getFullYear(), moisActuel.getMonth() - 1))}
                        className="p-1 hover:bg-gray-100 rounded text-gray-600"
                    >
                        ←
                    </button>

                    <h3 className="font-semibold text-gray-900 capitalize text-sm">
                        {nomMois}
                    </h3>

                    <button
                        onClick={() => setMoisActuel(new Date(moisActuel.getFullYear(), moisActuel.getMonth() + 1))}
                        className="p-1 hover:bg-gray-100 rounded text-gray-600"
                    >
                        →
                    </button>
                </div>

                {/* Jours de la semaine (commence par lundi) */}
                <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-2">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(jour => (
                        <div key={jour} className="text-center font-medium py-1">
                            {jour}
                        </div>
                    ))}
                </div>

                {/* Grille des jours */}
                <div className="grid grid-cols-7 gap-1">
                    {jours.map((jour, index) => {
                        if (!jour) {
                            return <div key={index} className="h-7"></div>;
                        }

                        const numeroSemaineJour = getNumeroSemaine(jour);
                        const isSelected = numeroSemaineJour === semaineSelectionnee && jour.getFullYear() === anneeSelectionnee;
                        const isToday = jour.toDateString() === new Date().toDateString();

                        return (
                            <button
                                key={index}
                                onClick={() => onSemaineChange(numeroSemaineJour, jour.getFullYear())}
                                className={`h-7 text-xs rounded flex items-center justify-center transition-colors
                                        ${isSelected
                                        ? 'bg-gray-900 text-white'
                                        : 'hover:bg-gray-100 text-gray-700'
                                    }
                  ${isToday && !isSelected ? 'ring-1 ring-gray-400' : ''}
                `}
                            >
                                {jour.getDate()}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* INDICATEUR DE SEMAINE SÉLECTIONNÉE avec ton format */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                <div className="text-xs text-gray-600 mb-1">Semaine sélectionnée :</div>
                <div className="font-medium text-gray-900 text-sm">
                    {getTexteSemaine(semaineSelectionnee, anneeSelectionnee)}
                </div>
            </div>
        </div>
    );
};

export default MiniCalendrier;
