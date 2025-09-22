import React from "react";

// card principale  pour le style et l'effet ombre
export function Card({children, className = ''}: {children: React.ReactNode; className?: string}) {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
        {children}
      </div>
    );
  }


  // CardContent le contenue de la card avec le padding du contenus
  export function CardContent({children, className = ''}: {children: React.ReactNode; className?: string}) {
    return (
      <div className={`p-6 ${className}`}>
        {children}
      </div>
    );
  }
