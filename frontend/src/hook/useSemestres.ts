import react from 'react';
import { useEffect, useState } from 'react';
import { Semestre } from '../types/types';
import { ressourceAPI, semestreAPI } from '../services/api';

// custom hook pour gerer les states et les effect dans l'app
export const useSemestres = () => {

    //  etats
    const [semestres, setSemestres] = useState<Semestre[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //  FONCTIONS CRUD
    const onCreate = async (semestre: Omit<Semestre, 'id'>) => {
        try {
            const response = await semestreAPI.create(semestre);
            // met le semestres dans la liste local donc prev = liste local et ...prev et la liste local avant la copie qu'on copie avec la data
            setSemestres(prev => [...prev, response.data]);
        } catch (error) {
            console.error('Erreur création:', error);
            setError('Impossible de créer le semestre');
        }
    };
    const onEdit = async (semestre: Semestre) => {
        try {
            const { id, ...semestreData } = semestre; //  Extraire l'ID
            const response = await semestreAPI.update(id, semestreData);
            setSemestres(prev => prev.map(s => s.id === id ? response.data : s));
        } catch (error) {
            console.error('Erreur modification:', error);
            setError('Impossible de modifier le semestre');
        }
    };
    // supprime un semestre
    const onDelete = async (semestre: Semestre) => {
        try {
            await semestreAPI.delete(semestre.id);
            setSemestres(prev => prev.filter(s => s.id !== semestre.id));
        } catch (error) {
            console.error('Erreur suppression:', error);
            setError('Impossible de supprimer le semestre');
        }
    };
    // charge les semestres actuelles en faisant un getall
    const loadSemestres = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await semestreAPI.getAll();
            setSemestres(response.data);
        } catch (error) {
            console.error('Erreur chargement:', error);
            setError('Impossible de charger les semestres');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSemestres();
    }, []);

    return {
        semestres,
        loading,
        error,
        onCreate,   //  (semestre: Omit<Semestre, 'id'>) => Promise<void>
        onEdit,     //  (semestre: Semestre) => Promise<void>
        onDelete,   //  (semestre: Semestre) => Promise<void>
        loadSemestres
    };
};