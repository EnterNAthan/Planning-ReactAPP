import React from 'react';

interface TableProps {
    data: any[];
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
    emptyMessage?: string;
}

export function SemestreTable({ data, onEdit, onDelete, emptyMessage = "Aucune donnée" }: TableProps) {
    return (
        <table className="w-full">

            {/* EN-TÊTE FIXE POUR SEMESTRES */}
            <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Nom</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Année</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Période</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Statut</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">En cours</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
            </thead>
            {/* CORPS DU TABLEAU */}
            <tbody>
                {/* test si diff de 0  */}
                {data.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="text-center py-12">
                            <p className="text-gray-500 text-lg">{emptyMessage}</p>
                        </td>
                    </tr>
                ) : (
                    data.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-6 font-medium">{item.nom}</td>
                            <td className="py-4 px-6 text-gray-600">{item.annee}</td>
                            <td className="py-4 px-6 text-gray-600">{item.periode}</td>
                            <td className="py-4 px-6">
                                <span className={`px-2 py-1 text-xs rounded-full ${item.statut === 'Actif'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {item.statut}
                                </span>
                            </td>
                            <td className="py-4 px-6 text-center">
                                {item.enCours ? (
                                    <span className="text-green-500 font-bold">✓</span>
                                ) : (
                                    <span className="text-gray-300">—</span>
                                )}
                            </td>
                            <td className="py-4 px-6">
                                <div className="flex space-x-2">
                                    {/* BOUTON MODIFIER */}
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                                        title="Modifier"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>

                                    {/* BOUTON SUPPRIMER */}
                                    <button
                                        onClick={() => onDelete(item)}
                                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md"
                                        title="Supprimer"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}
