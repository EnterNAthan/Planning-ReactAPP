import axios from "axios";
import { Ressource, SAE, Semestre } from "../types/types";


// configuration de la base URL 
const APÏ_BASE_URL = "http://localhost:5000/";

// service qui créer le lien avec le backend
export const api = axios.create({
    baseURL: APÏ_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

export const semestreAPI = {
    getAll: () => api.get<Semestre[]>("/semestres"),
    getById: (id: number) => api.get<Semestre>(`/semestres/${id}`),
    create:(data: Omit<Semestre, 'id'>) => api.post<Semestre>("/semestres", data),
    update:(id: number, data: Omit<Semestre, 'id'>) => api.put<Semestre>(`/semestres/${id}`, data),
    delete:(id: number) => api.delete<void>(`/semestres/${id}`),
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
    create: (data: Omit<SAE,'id'>) => api.post<SAE>(`/saes`, data),
    update: (id: number, data: Omit<SAE,'id'>) => api.put<SAE>(`/saes/${id}`, data),
    delete: (id: number) => api.delete<void>(`/saes/${id}`),
}

