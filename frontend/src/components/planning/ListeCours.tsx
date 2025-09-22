// src/components/planning/ListeCours.tsx
import React from 'react';
import { Ressource, SAE } from '../../types/types';

interface ListeCoursProps {
    ressources: Ressource[];
    saes: SAE[];
    semestres: any[];
    semestreSelectionne?: number;
    onSemestreChange: (semestreId: number) => void;
}

interface CoursItem {
    id: number;
    nom: string;
    type: 'ressource' | 'sae';
    couleur: string;
}

const ListeCours: React.FC<ListeCoursProps> = ({
    ressources,
    saes,
    semestres,
    semestreSelectionne,
    onSemestreChange
}) => {

    // Combine ressources et SAE avec leurs couleurs
    const getCoursParSemestre = (semestreId: number): CoursItem[] => {
        const ressourcesFiltrees = ressources
            .filter(r => r.semestre_id === semestreId)
            .map(r => ({
                id: r.id,
                nom: r.nom,
                type: 'ressource' as const,
                couleur: 'bg-blue-500'
            }));

        const saesFiltrees = saes
            .filter(s => s.semestre_id === semestreId)
            .map(s => ({
                id: s.id,
                nom: s.nom,
                type: 'sae' as const,
                couleur: 'bg-green-500'
            }));

        return [...ressourcesFiltrees, ...saesFiltrees];
    };

    // Gestion du drag start
    const handleDragStart = (e: React.DragEvent, cours: CoursItem) => {
        e.dataTransfer.setData('application/json', JSON.stringify({
            id: cours.id,
            nom: cours.nom,
            type: cours.type,
            couleur: cours.couleur
        }));
    };

    const coursActuels = semestreSelectionne
        ? getCoursParSemestre(semestreSelectionne)
        : [];

    return (
        <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                📚 Cours à planifier
            </h3>

            {/* Sélecteur de semestre */}
            <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-2">
                    Semestre :
                </label>
                <select
                    value={semestreSelectionne || ''}
                    onChange={(e) => onSemestreChange(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">Sélectionner un semestre</option>
                    {semestres.map(sem => (
                        <option key={sem.id} value={sem.id}>
                            {sem.nom}
                        </option>
                    ))}
                </select>
            </div>

            {/* Liste des cours */}
            {!semestreSelectionne ? (
                <div className="text-center text-gray-500 text-sm py-8">
                    Sélectionnez un semestre pour voir les cours
                </div>
            ) : coursActuels.length === 0 ? (
                <div className="text-center text-gray-500 text-sm py-8">
                    Aucun cours disponible pour ce semestre
                </div>
            ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {coursActuels.map(cours => (
                        <div
                            key={`${cours.type}-${cours.id}`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, cours)}
                            className={`
                ${cours.couleur} text-white px-3 py-2 rounded-lg cursor-move
                shadow-sm hover:shadow-md transition-all duration-200
                hover:scale-105 select-none
                `}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium truncate">
                                    {cours.nom}
                                </span>
                                <div className="flex items-center gap-2">
                                    {cours.type === 'ressource' ? (
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded">
                                            📖 R
                                        </span>
                                    ) : (
                                        <span className="text-xs bg-white/20 px-2 py-1 rounded">
                                            🎯 SAE
                                        </span>
                                    )}
                                    <span className="text-lg">⋮⋮</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Instructions */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600">
                    <div className="font-medium mb-1">💡 Comment utiliser :</div>
                    <ul className="space-y-1">
                        <li>• Glissez un cours vers le planning</li>
                        <li>• Déposez-le sur un créneau horaire</li>
                        <li>• 📖 = Ressource, 🎯 = SAE</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ListeCours;
