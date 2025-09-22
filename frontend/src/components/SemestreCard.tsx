// src/components/SemestreCard.tsx
import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import Button from './ui/button';
import { SemestreTable } from './ui/cardTable';
import { Semestre } from '../types/types';
import { FormModal, FormField } from './modals';

// Configuration des champs pour semestres (adaptée à votre interface)
const semestreFields: FormField[] = [
  {
    name: 'nom',
    label: 'Nom du semestre',
    type: 'text',
    required: true,
    placeholder: 'Ex: S1'
  },
  {
    name: 'annee',
    label: 'Année',
    type: 'text',
    required: true,
    placeholder: 'Ex: 2023-2024'
  },
  {
    name: 'actif',
    label: 'Statut',
    type: 'select',
    required: true,
    options: [
      { value: '1', label: 'Actif' },
      { value: '0', label: 'Inactif' }
    ]
  }
];

interface SemestreCardProps {
  semestres: Semestre[];
  loading: boolean;
  error: string | null;
  onCreate: (semestre: Omit<Semestre, 'id'>) => Promise<void>;
  onEdit: (semestre: Semestre) => Promise<void>;
  onDelete: (semestre: Semestre) => Promise<void>;
}

function SemestreCard({ semestres, loading, error, onEdit, onDelete, onCreate }: SemestreCardProps) {
  // États pour les modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentSemestre, setCurrentSemestre] = useState<Semestre | null>(null);

  // Gestion de la modal de création
  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  // Gestion de la modal d'édition
  const openEditModal = (semestre: Semestre) => {
    setCurrentSemestre(semestre);
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setCurrentSemestre(null);
    setEditModalOpen(false);
  };

  // Handlers pour les actions
  const handleCreate = async (data: Omit<Semestre, 'id'>) => {
    await onCreate(data);
    closeCreateModal();
  };

  const handleEdit = async (data: Omit<Semestre, 'id'>) => {
    if (currentSemestre) {
      // Création du semestre complet avec l'ID existant
      const updatedSemestre: Semestre = {
        ...data,
        id: currentSemestre.id
      };
      await onEdit(updatedSemestre);
      closeEditModal();
    }
  };

  const handleEditClick = (semestre: Semestre) => {
    openEditModal(semestre);
  };

  // Formatage des données pour le tableau
  const tableData = semestres.map(semestre => ({
    id: semestre.id,
    nom: semestre.nom,
    annee: semestre.annee,
    periode: "Sept. - Jan.",
    statut: semestre.actif === '1' ? "Actif" : "Inactif",
    enCours: semestre.actif === '1',
  }));

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Chargement des semestres...</div>
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
      {/* TITRE ET BOUTON EXISTANTS */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 p-5">
          Gestion des semestres
        </h2>
        <Button onClick={openCreateModal} className='mr-3'>
          Nouveau semestre
        </Button>
      </div>
      {/* CARD AVEC TABLEAU */}
      <Card className="w-full">
        <CardContent className="p-0">
          <SemestreTable
            data={tableData}
            onEdit={handleEditClick}
            onDelete={onDelete}
            emptyMessage="Aucun semestre créé"
          />
        </CardContent>
      </Card>

      {/* MODAL DE CRÉATION */}
      <FormModal<Omit<Semestre, 'id'>>
        isOpen={createModalOpen}
        onClose={closeCreateModal}
        onSubmit={handleCreate}
        title="Nouveau Semestre"
        fields={semestreFields}
        submitButtonText="Créer"
      />

      {/* MODAL D'ÉDITION */}
      <FormModal<Omit<Semestre, 'id'>>
        isOpen={editModalOpen}
        onClose={closeEditModal}
        onSubmit={handleEdit}
        title="Modifier Semestre"
        fields={semestreFields}
        initialData={currentSemestre ? {
          nom: currentSemestre.nom,
          annee: currentSemestre.annee,
          actif: currentSemestre.actif
        } : {}}
        submitButtonText="Modifier"
      />
    </div>
  );
}

export default SemestreCard;
