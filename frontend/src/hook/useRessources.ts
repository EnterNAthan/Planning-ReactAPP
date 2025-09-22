import { useEffect, useState } from 'react';
import { Ressource } from '../types/types';
import { ressourceAPI } from '../services/api';

export const useRessources = () => {
    // États
    const [ressources, setRessources] = useState<Ressource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // FONCTIONS CRUD - CORRIGÉES
    const onCreate = async (ressource: Omit<Ressource, 'id'>): Promise<void> => {
        try {
            const response = await ressourceAPI.create(ressource);
            setRessources(prev => [...prev, response.data]);
            // Pas de return, juste void
        } catch (error) {
            console.error('Erreur création:', error);
            setError('Impossible de créer la ressource');
            throw error; // On peut throw si nécessaire
        }
    };

    const onEdit = async (ressource: Ressource): Promise<void> => {
        try {
            const { id, ...ressourceData } = ressource;
            const response = await ressourceAPI.update(id!, ressourceData);
            setRessources(prev => prev.map(r => r.id === id ? response.data : r));
        } catch (error) {
            console.error('Erreur modification:', error);
            setError('Impossible de modifier la ressource');
            throw error;
        }
    };

    // CORRECTION : onDelete prend maintenant un objet Ressource, pas un ID
    const onDelete = async (ressource: Ressource): Promise<void> => {
        try {
            await ressourceAPI.delete(ressource.id!);
            setRessources(prev => prev.filter(r => r.id !== ressource.id));
        } catch (error) {
            console.error('Erreur suppression:', error);
            setError('Impossible de supprimer la ressource');
            throw error;
        }
    };

    const loadRessources = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await ressourceAPI.getAll();
            setRessources(response.data);
        } catch (error) {
            console.error('Erreur chargement:', error);
            setError('Impossible de charger les ressources');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRessources();
    }, []);

    return {
        ressources,
        loading,
        error,
        onCreate,   // (ressource: Omit<Ressource, 'id'>) => Promise<void>
        onEdit,     // (ressource: Ressource) => Promise<void>
        onDelete,   // (ressource: Ressource) => Promise<void>
        loadRessources
    };
};
