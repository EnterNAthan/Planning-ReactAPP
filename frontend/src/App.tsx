// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import Navigation, { TabType } from './components/Navigation';
import Semestres from './components/SemestreCard';
import RessourceCard from './components/RessourceCard';
import SAECard from './components/SAECard';
import PlanningSemaine from './components/PlanningSemaine';
// Importez vos autres composants d'onglets ici

function App() {
  // État pour gérer l'onglet actif
  const [activeTab, setActiveTab] = useState<TabType>('semestres');
  const [currentWeek] = useState(42); // Vous calculerez cela dynamiquement

  // Fonction pour changer d'onglet
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  // Fonction pour rendre le contenu selon l'onglet actif
  const renderTabContent = () => {
    switch (activeTab) {
      case 'semestres':
        return <Semestres />;
      case 'ressources':
        return <RessourceCard />;
      case 'saes':
        return <SAECard />;
      case 'planning':
        return <PlanningSemaine />;
      default:
        return <Semestres />;;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fixe */}
      <Header currentWeek={currentWeek} />
      
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
