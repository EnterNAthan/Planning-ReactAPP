import React from 'react';

// Types pour nos onglets
export type TabType = 'semestres' | 'ressources' | 'saes' | 'planning';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

function Navigation({ activeTab, onTabChange }: NavigationProps) {
  // Configuration des onglets
  const tabs = [
    { id: 'semestres' as TabType, label: 'Semestres', icon: '📚' },
    { id: 'ressources' as TabType, label: 'Ressources', icon: '📖' },
    { id: 'saes' as TabType, label: 'SAE', icon: '🎯' },
    { id: 'planning' as TabType, label: 'Planning', icon: '📅' },
  ];

  return (
    <nav className="bg-gray-50 border-b border-gray-200 px-6">
      <div className="flex justify-center space-x-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              py-4 px-11 border-b-2 font-medium text-2xl transition-colors duration-200
              ${activeTab === tab.id
                  ? 'text-black bg-gray-50 border-b-3.5 border-black'
                  : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50/50'
              }
            `}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
