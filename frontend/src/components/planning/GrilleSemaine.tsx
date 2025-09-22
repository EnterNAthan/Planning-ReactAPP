// src/components/planning/GrilleSemaine.tsx
import React, { useState, useEffect } from 'react';
import { planningAPI } from '../../services/api';

interface CoursPlanning {
    id?: number;
    nom: string;
    type: 'ressource' | 'sae';
    couleur: string;
    ressource_id?: number;
    sae_id?: number;
    jour_semaine: string;
    heure_debut: string;
    heure_fin: string;
    salle: string;
}

interface GrilleSemaineProps {
    semaineSelectionnee: number;
    anneeSelectionnee: number;
    semestreSelectionne?: number;
    getTexteSemaine: (numeroSemaine: number, annee: number) => string;
}

const GrilleSemaine: React.FC<GrilleSemaineProps> = ({
    semaineSelectionnee,
    anneeSelectionnee,
    semestreSelectionne,
    getTexteSemaine
}) => {
    const [coursPlanning, setCoursPlanning] = useState<CoursPlanning[]>([]);
    const [loading, setLoading] = useState(false);

    // Configuration de la grille
    const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    const creneaux = [
        { debut: '08:00', fin: '10:00' },
        { debut: '10:15', fin: '12:15' },
        { debut: '14:00', fin: '16:00' },
        { debut: '16:15', fin: '17:30' }
    ];

    // Charger le planning existant
    useEffect(() => {
        if (semestreSelectionne) {
            chargerPlanning();
        }
    }, [semaineSelectionnee, anneeSelectionnee, semestreSelectionne]);

    const chargerPlanning = async () => {
        if (!semestreSelectionne) return;

        try {
            setLoading(true);
            const response = await planningAPI.getPlanningBySemestre(semestreSelectionne);
            setCoursPlanning(response.data);
        } catch (error) {
            console.error('Erreur chargement planning:', error);
        } finally {
            setLoading(false);
        }
    };

    // Gestion du drop
    const handleDrop = async (e: React.DragEvent, jour: string, creneauIndex: number) => {
        e.preventDefault();

        try {
            const coursData = JSON.parse(e.dataTransfer.getData('application/json'));
            const creneau = creneaux[creneauIndex];

            // Demander la salle à l'utilisateur
            const salle = prompt('Salle :', 'Salle 101');
            if (!salle) return;

            // Créer l'objet planning
            const nouveauCours: CoursPlanning = {
                nom: coursData.nom,
                type: coursData.type,
                couleur: coursData.couleur,
                ressource_id: coursData.type === 'ressource' ? coursData.id : undefined,
                sae_id: coursData.type === 'sae' ? coursData.id : undefined,
                jour_semaine: jour,
                heure_debut: creneau.debut,
                heure_fin: creneau.fin,
                salle: salle
            };

            // Sauvegarder en BDD
            const response = await planningAPI.creerPlanning({
                semestre_id: semestreSelectionne!,
                ressource_id: nouveauCours.ressource_id || null,
                sae_id: nouveauCours.sae_id || null,
                jour_semaine: jour,
                heure_debut: creneau.debut,
                heure_fin: creneau.fin,
                salle: salle
            });

            // Ajouter à l'état local
            setCoursPlanning(prev => [...prev, { ...nouveauCours, id: response.data.id }]);

        } catch (error) {
            console.error('Erreur création planning:', error);
            alert('Erreur lors de l\'ajout du cours au planning');
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    // Supprimer un cours du planning
    const supprimerCours = async (coursId: number) => {
        if (!window.confirm('Supprimer ce cours du planning ?')) return;

        try {
            await planningAPI.supprimerPlanning(coursId);
            setCoursPlanning(prev => prev.filter(c => c.id !== coursId));
        } catch (error) {
            console.error('Erreur suppression:', error);
        }
    };

    // Trouver un cours pour un créneau donné
    const getCoursForCreneau = (jour: string, creneauIndex: number) => {
        const creneau = creneaux[creneauIndex];
        return coursPlanning.find(cours =>
            cours.jour_semaine === jour &&
            cours.heure_debut === creneau.debut &&
            cours.heure_fin === creneau.fin
        );
    };

    if (!semestreSelectionne) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="text-center text-gray-500">
                    <div className="text-4xl mb-4">📅</div>
                    <h3 className="text-lg font-medium mb-2">Planning de la semaine</h3>
                    <p>Sélectionnez un semestre pour voir le planning</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            {/* En-tête du planning */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    📅 Planning - {getTexteSemaine(semaineSelectionnee, anneeSelectionnee)}
                </h3>

                {loading && (
                    <div className="text-sm text-gray-500">Chargement du planning...</div>
                )}
            </div>

            {/* Grille du planning */}
            <div className="overflow-x-auto">
                <div className="min-w-full">
                    {/* En-têtes des jours */}
                    <div className="grid grid-cols-6 gap-2 mb-2">
                        <div className="p-2 text-sm font-medium text-gray-600 text-center">
                            Horaires
                        </div>
                        {jours.map(jour => (
                            <div key={jour} className="p-2 text-sm font-medium text-gray-900 text-center bg-gray-50 rounded">
                                {jour}
                            </div>
                        ))}
                    </div>

                    {/* Créneaux horaires */}
                    {creneaux.map((creneau, creneauIndex) => (
                        <div key={creneauIndex} className="grid grid-cols-6 gap-2 mb-2">
                            {/* Colonne horaires */}
                            <div className="p-3 text-xs text-gray-600 text-center bg-gray-50 rounded font-medium">
                                {creneau.debut}<br />
                                {creneau.fin}
                            </div>

                            {/* Cases pour chaque jour */}
                            {jours.map(jour => {
                                const cours = getCoursForCreneau(jour, creneauIndex);

                                return (
                                    <div
                                        key={jour}
                                        onDrop={(e) => handleDrop(e, jour, creneauIndex)}
                                        onDragOver={handleDragOver}
                                        className={`min-h-[80px] p-2 border-2 border-dashed rounded-lg transition-all ${cours
                                            ? 'border-transparent'
                                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                                            }
                    `}
                                    >
                                        {cours ? (
                                            <div className={`
                        ${cours.couleur} text-white p-2 rounded h-full flex flex-col justify-between
                        shadow-sm hover:shadow-md transition-all cursor-pointer group
                        `}>
                                                <div>
                                                    <div className="font-medium text-xs truncate mb-1">
                                                        {cours.nom}
                                                    </div>
                                                    <div className="text-xs opacity-90">
                                                        📍 {cours.salle}
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-xs">
                                                        {cours.type === 'ressource' ? '📖' : '🎯'}
                                                    </span>
                                                    <button
                                                        onClick={() => cours.id && supprimerCours(cours.id)}
                                                        className="opacity-0 group-hover:opacity-100 text-white hover:text-red-200 transition-opacity"
                                                        title="Supprimer"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                                                Glisser un cours ici
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-xs text-gray-600">
                    <div className="font-medium mb-2">💡 Utilisation :</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>• Glissez un cours de la liste vers un créneau</div>
                        <div>• Cliquez sur ✕ pour supprimer un cours</div>
                        <div>• Les modifications sont sauvegardées automatiquement</div>
                        <div>• 📖 = Ressource | 🎯 = SAE</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrilleSemaine;
