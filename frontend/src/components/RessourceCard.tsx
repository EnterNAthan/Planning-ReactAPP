import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import Button from './ui/button';
import { Ressource } from '../types/types';
import { FormModal, FormField } from './modals';

// Configuration des champs pour ressources
const ressourceFields: FormField[] = [
    {
        name: 'nom',
        label: 'Nom de la ressource',
        type: 'text',
        required: true,
        placeholder: 'Ex: Mathématiques avancées'
    },
    {
        name: 'semestre_id',
        label: 'Semestre',
        type: 'select', // Tu devras passer les options depuis App.tsx
        required: true,
        options: [] // Sera rempli via props
    }
];

interface RessourceCardProps {
    ressources: Ressource[];
    loading: boolean;
    error: string | null;
    onCreate: (ressource: Omit<Ressource, 'id'>) => Promise<void>;
    onEdit: (ressource: Ressource) => Promise<void>;
    onDelete: (ressource: Ressource) => Promise<void>;
    semestres?: Array<{id: number, nom: string}>; // Pour les options du select
}

function RessourceCard({ 
    ressources, 
    loading, 
    error, 
    onEdit, 
    onDelete, 
    onCreate,
    semestres = []
}: RessourceCardProps) {
    // États pour les modals
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentRessource, setCurrentRessource] = useState<Ressource | null>(null);

    // Mise à jour des champs avec les options de semestre
    const fieldsWithOptions: FormField[] = ressourceFields.map(field => {
        if (field.name === 'semestre_id') {
            return {
                ...field,
                options: semestres.map(s => ({ value: s.id.toString(), label: s.nom }))
            };
        }
        return field;
    });

    // Gestion des modals
    const openCreateModal = () => setCreateModalOpen(true);
    const closeCreateModal = () => setCreateModalOpen(false);

    const openEditModal = (ressource: Ressource) => {
        setCurrentRessource(ressource);
        setEditModalOpen(true);
    };
    const closeEditModal = () => {
        setCurrentRessource(null);
        setEditModalOpen(false);
    };

    // Handlers
    const handleCreate = async (data: Omit<Ressource, 'id'>) => {
        await onCreate({
            ...data,
            semestre_id: parseInt(data.semestre_id.toString()) // Conversion en number
        });
        closeCreateModal();
    };

    const handleEdit = async (data: Omit<Ressource, 'id'>) => {
        if (currentRessource) {
            const updatedRessource: Ressource = {
                ...data,
                id: currentRessource.id,
                semestre_id: parseInt(data.semestre_id.toString())
            };
            await onEdit(updatedRessource);
            closeEditModal();
        }
    };

    const handleDeleteClick = (ressource: Ressource) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${ressource.nom}" ?`)) {
            onDelete(ressource);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-gray-500">Chargement des ressources...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-red-500">Erreur : {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* TITRE ET BOUTON */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 p-5">
                    Gestion des ressources
                </h2>
                <Button onClick={openCreateModal} className='mr-3'>
                    Nouvelle ressource
                </Button>
            </div>

            {/* GRILLE DE CARTES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {ressources.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 py-12">
                        Aucune ressource créée
                    </div>
                ) : (
                    ressources.map((ressource) => {
                        const semestre = semestres.find(s => s.id === ressource.semestre_id);
                        
                        return (
                            <Card key={ressource.id} className="hover:shadow-lg transition-shadow duration-200">
                                <CardContent className="p-6">
                                    {/* Nom de la ressource */}
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        {ressource.nom}
                                    </h3>
                                    
                                    {/* Semestre */}
                                    <div className="text-sm text-gray-600 mb-4 flex items-center">
                                        <span className="mr-2">📅</span>
                                        {semestre?.nom || `Semestre ${ressource.semestre_id}`}
                                    </div>
                                    
                                    {/* Actions */}
                                    <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                                        <button
                                            onClick={() => openEditModal(ressource)}
                                            className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                                        >
                                            ✏️ Modifier
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(ressource)}
                                            className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                                        >
                                            🗑️ Supprimer
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>

            {/* MODALS */}
            <FormModal<Omit<Ressource, 'id'>>
                isOpen={createModalOpen}
                onClose={closeCreateModal}
                onSubmit={handleCreate}
                title="Nouvelle Ressource"
                fields={fieldsWithOptions}
                submitButtonText="Créer"
            />

            <FormModal<Omit<Ressource, 'id'>>
                isOpen={editModalOpen}
                onClose={closeEditModal}
                onSubmit={handleEdit}
                title="Modifier Ressource"
                fields={fieldsWithOptions}
                initialData={currentRessource ? {
                    nom: currentRessource.nom,
                    semestre_id: currentRessource.semestre_id
                } : {}}
                submitButtonText="Modifier"
            />
        </div>
    );
}

export default RessourceCard;
