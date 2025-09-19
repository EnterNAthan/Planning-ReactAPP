// src/components/tabs/Semestres.tsx
import React from 'react'; 
import button from './ui/button';
import Button from './ui/button';

function SemestresCard() {
  
  const handleNewSemestre = () => {
    // Logique pour ajouter un nouveau semestre
    alert('Ajouter un nouveau semestre');
  }
  
  return (
    <div className="flex items-center justify-between" >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Gestion des Semestres</h2>
        <p className="text-gray-600 font-semibold">Ici vous pourrez gérer vos semestres.</p>
      </div>
      < Button onClick={handleNewSemestre} className="m-6">Ajouter un semestre</Button>
    </div>
  );
}

export default SemestresCard;
