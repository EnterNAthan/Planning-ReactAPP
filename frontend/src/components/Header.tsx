import React from "react";
import { usePlanning } from "../hook/usePlanning";

function Header() {
    const { semaineSelectionnee, anneeSelectionnee, getTexteSemaine } = usePlanning();

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
                {/* Côté titre à gauche */}
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">Planning IUT d'Annecy</h1>
                </div>
                
                {/* Côté semaine courante à droite */}
                <div className="text-right">
                    <p className="text-sm text-gray-600">
                        {getTexteSemaine(semaineSelectionnee, anneeSelectionnee)}
                    </p>
                </div>
            </div>
        </header>
    );
}

export default Header;
