// src/components/cards/SAECard.tsx
import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import Button from './ui/button';
import { SAE } from '../types/types';
import { FormModal, FormField } from './modals';

// Configuration des champs pour SAE
const saeFields: FormField[] = [
  {
    name: 'nom',
    label: 'Nom de la SAE',
    type: 'text',
    required: true,
    placeholder: 'Ex: Projet Web Collaboratif'
  },
  {
    name: 'semestre_id',
    label: 'Semestre',
    type: 'select',
    required: true,
    options: [] // Sera rempli via props
  }
];

interface SAECardProps {
  saes: SAE[];
  loading: boolean;
  error: string | null;
  onCreate: (sae: Omit<SAE, 'id'>) => Promise<void>;
  onEdit: (sae: SAE) => Promise<void>;
  onDelete: (sae: SAE) => Promise<void>;
  semestres?: Array<{ id: number, nom: string }>; // Pour les options du select
}

function SAECard({
  saes,
  loading,
  error,
  onEdit,
  onDelete,
  onCreate,
  semestres = []
}: SAECardProps) {
  // États pour les modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentSAE, setCurrentSAE] = useState<SAE | null>(null);

  // Mise à jour des champs avec les options de semestre
  const fieldsWithOptions: FormField[] = saeFields.map(field => {
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

  const openEditModal = (sae: SAE) => {
    setCurrentSAE(sae);
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setCurrentSAE(null);
    setEditModalOpen(false);
  };

  // Handlers
  const handleCreate = async (data: Omit<SAE, 'id'>) => {
    await onCreate({
      ...data,
      semestre_id: parseInt(data.semestre_id.toString()) // Conversion en number
    });
    closeCreateModal();
  };

  const handleEdit = async (data: Omit<SAE, 'id'>) => {
    if (currentSAE) {
      const updatedSAE: SAE = {
        ...data,
        id: currentSAE.id,
        semestre_id: parseInt(data.semestre_id.toString())
      };
      await onEdit(updatedSAE);
      closeEditModal();
    }
  };

  const handleDeleteClick = (sae: SAE) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${sae.nom}" ?`)) {
      onDelete(sae);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Chargement des SAE...</div>
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
          Gestion des SAE
        </h2>
        <Button onClick={openCreateModal} className='mr-3'>
          Nouvelle SAE
        </Button>
      </div>

      {/* GRILLE DE CARTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {saes.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            Aucune SAE créée
          </div>
        ) : (
          saes.map((sae) => {
            const semestre = semestres.find(s => s.id === sae.semestre_id);

            return (
              <Card key={sae.id} className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  {/* Nom de la SAE */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {sae.nom}
                  </h3>

                  {/* Semestre */}
                  <div className="text-sm text-gray-600 mb-4 flex items-center">
                    <span className="mr-2">👥</span>
                    {semestre?.nom || `Semestre ${sae.semestre_id}`}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => openEditModal(sae)}
                      className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteClick(sae)}
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
      <FormModal<Omit<SAE, 'id'>>
        isOpen={createModalOpen}
        onClose={closeCreateModal}
        onSubmit={handleCreate}
        title="Nouvelle SAE"
        fields={fieldsWithOptions}
        submitButtonText="Créer"
      />

      <FormModal<Omit<SAE, 'id'>>
        isOpen={editModalOpen}
        onClose={closeEditModal}
        onSubmit={handleEdit}
        title="Modifier SAE"
        fields={fieldsWithOptions}
        initialData={currentSAE ? {
          nom: currentSAE.nom,
          semestre_id: currentSAE.semestre_id
        } : {}}
        submitButtonText="Modifier"
      />
    </div>
  );
}

export default SAECard;
