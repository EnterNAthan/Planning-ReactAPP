import { useEffect, useState } from 'react';
import { SAE } from '../types/types';
import { saeAPI } from '../services/api';

export const useSAEs = () => {
    // États
    const [saes, setSAEs] = useState<SAE[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // FONCTIONS CRUD
    const onCreate = async (sae: Omit<SAE, 'id'>): Promise<void> => {
        try {
            const response = await saeAPI.create(sae);
            setSAEs(prev => [...prev, response.data]);
        } catch (error) {
            console.error('Erreur création:', error);
            setError('Impossible de créer la SAE');
            throw error;
        }
    };

    const onEdit = async (sae: SAE): Promise<void> => {
        try {
            const { id, ...saeData } = sae;
            const response = await saeAPI.update(id!, saeData);
            setSAEs(prev => prev.map(s => s.id === id ? response.data : s));
        } catch (error) {
            console.error('Erreur modification:', error);
            setError('Impossible de modifier la SAE');
            throw error;
        }
    };

    const onDelete = async (sae: SAE): Promise<void> => {
        try {
            await saeAPI.delete(sae.id!);
            setSAEs(prev => prev.filter(s => s.id !== sae.id));
        } catch (error) {
            console.error('Erreur suppression:', error);
            setError('Impossible de supprimer la SAE');
            throw error;
        }
    };

    const loadSAEs = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await saeAPI.getAll();
            setSAEs(response.data);
        } catch (error) {
            console.error('Erreur chargement:', error);
            setError('Impossible de charger les SAE');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSAEs();
    }, []);

    return {
        saes,
        loading,
        error,
        onCreate,
        onEdit,
        onDelete,
        loadSAEs
    };
};
