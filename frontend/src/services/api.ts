import axios from "axios";
import { Ressource, SAE, Semestre } from "../types/types";


// configuration de la base URL 
const API_BASE_URL = "http://127.0.0.1:5000/";

// service qui créer le lien avec le backend
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

export const semestreAPI = {
    getAll: () => api.get<Semestre[]>("/semestres"),
    getById: (id: number) => api.get<Semestre>(`/semestres/${id}`),
    create: (data: Omit<Semestre, 'id'>) => api.post<Semestre>("/semestres", data),
    update: (id: number, data: Omit<Semestre, 'id'>) => api.put<Semestre>(`/semestres/${id}`, data),
    delete: (id: number) => api.delete<void>(`/semestres/${id}`),
    
};

export const ressourceAPI = {
    getAll: () => api.get<Ressource[]>("/ressources"),
    getById: (id: number) => api.get<Ressource>(`/ressources/${id}`),
    create: (data: Omit<Ressource, 'id'>) => api.post<Ressource>("/ressources", data),
    update: (id: number, data: Omit<Ressource, 'id'>) => api.put<Ressource>(`/ressources/${id}`, data),
    delete: (id: number) => api.delete<void>(`/ressources/${id}`),
}

export const saeAPI = {
    getAll: () => api.get<SAE[]>("/saes"),
    getById: (id: number) => api.get<SAE>(`/saes/${id}`),
    create: (data: Omit<SAE, 'id'>) => api.post<SAE>(`/saes`, data),
    update: (id: number, data: Omit<SAE, 'id'>) => api.put<SAE>(`/saes/${id}`, data),
    delete: (id: number) => api.delete<void>(`/saes/${id}`),
}

// src/services/api.ts - Mise à jour planningAPI pour utiliser axios
export const planningAPI = {
    // Récupérer planning par semestre
    getPlanningBySemestre: (semestreId: number) => 
        api.get(`/planning/semestre/${semestreId}`),

    // Créer un nouveau cours dans le planning
    creerPlanning: (planningData: {
        semestre_id: number;
        ressource_id?: number | null;
        sae_id?: number | null;
        jour_semaine: string;
        heure_debut: string;
        heure_fin: string;
        salle: string;
    }) => api.post('/planning', planningData),

    // Supprimer un cours du planning
    supprimerPlanning: (planningId: number) => 
        api.delete(`/planning/${planningId}`),

    // Modifier un cours du planning
    modifierPlanning: (planningId: number, planningData: any) => 
        api.put(`/planning/${planningId}`, planningData)
};
