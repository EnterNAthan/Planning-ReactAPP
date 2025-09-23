import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation, { TabType } from './components/Navigation';
import RessourceCard from './components/RessourceCard';
import SAECard from './components/SAECard';
import PlanningSemaine from './components/planning/PlanningSemaine';
import SemestreCard from './components/SemestreCard';
// import pour le backend API ainsi que les hooks
import { Semestre } from './types/types';
import { semestreAPI } from './services/api';
import { useSemestres } from './hook/useSemestres';
import { useRessources } from './hook/useRessources';
import { useSAEs } from './hook/useSAES';

function App() {
  // État pour gérer l'onglet actif
  const [activeTab, setActiveTab] = useState<TabType>('semestres');
  const [currentWeek] = useState(42); // calcul dynamiquement


  // Fonction pour changer d'onglet
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  // utilisation du custom hook Semestres
  const { semestres, loading, error, onCreate, onEdit, onDelete } = useSemestres();
  // hook pour ressources
  const {
    ressources,
    loading: ressourcesLoading,
    error: ressourcesError,
    onCreate: onCreateRessource,
    onEdit: onEditRessource,
    onDelete: onDeleteRessource
  } = useRessources();

  const {
    saes,
    loading: saesLoading,
    error: saesError,
    onCreate: onCreateSAE,
    onEdit: onEditSAE,
    onDelete: onDeleteSAE
  } = useSAEs();


  // Fonction pour rendre le contenu selon l'onglet actif
  const renderTabContent = () => {
    switch (activeTab) {
      case 'semestres':
        return <SemestreCard
          semestres={semestres}
          // recuperation des HOOKS 
          onEdit={onEdit}
          onDelete={onDelete}
          onCreate={onCreate}
          loading={loading}
          error={error}
        />;
      case 'ressources':
        return <RessourceCard
          ressources={ressources}
          onEdit={onEditRessource}
          onDelete={onDeleteRessource}
          onCreate={onCreateRessource}
          loading={ressourcesLoading}
          error={ressourcesError}
          semestres={semestres} // Passe les semestres pour les options
        />;
      case 'saes':
        return <SAECard
          saes={saes}
          onEdit={onEditSAE}
          onDelete={onDeleteSAE}
          onCreate={onCreateSAE}
          loading={saesLoading}
          error={saesError}
          semestres={semestres}
        />;
        case 'planning':
        return <PlanningSemaine
          ressources={ressources}
          saes={saes}
          semestres={semestres}
        />;
      default:
        return <SemestreCard
          semestres={semestres}
          // recuperation des HOOKS 
          onEdit={onEdit}
          onDelete={onDelete}
          onCreate={onCreate}
          loading={loading}
          error={error}
        />;;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fixe */}
      <Header/>

      {/* Navigation par onglets */}
      <Navigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Contenu qui change selon l'onglet */}
      <main>
        {renderTabContent()}
      </main>
    </div>
  );
}

export default App;
