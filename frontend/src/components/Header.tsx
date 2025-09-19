import React from "react";

interface HeaderProps {
    currentWeek: number;
}

function Header({ currentWeek }: HeaderProps) {
    // Fonction pour calculer la semaine courante
    const getSemaineCourante = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    //pour avoir le premier jour on fais le numero du jour(19) - le jour de la semaine en numero (vendredi = 5)
    // donc le debut de semaine = 19 - 5 = 14 + 1 = 15 septembre (lundi)
    startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Lundi
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4); // Vendredi

    return `Semaine ${currentWeek} - ${startOfWeek.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
    })} au ${endOfWeek.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
    })}`;
};
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
                    {/* Coté titre à gauche  */}
                    <div>
                        <h1 className="text-4xl font-bold text-black-900"> Planning  IUT d'Annecy</h1>
                    </div>
                    {/* Coté semaine courante à droite */}
                    <div className="text-rigth">
                        <p className="text-sm text-gray-600">
                            {getSemaineCourante()}
                        </p>
                    </div>
            </div>
        </header>
    )
}

export default Header;