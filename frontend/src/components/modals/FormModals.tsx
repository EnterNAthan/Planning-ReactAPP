import React, { useState } from 'react';
import { BaseModal } from './BaseModals';

export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'textarea' | 'select';
    required?: boolean;
    placeholder?: string;
    min?: number;
    max?: number;
    options?: { value: string; label: string }[]; // Pour les select
}

//interface de notre form 
interface FormModalProps<T extends Record<string, any>> {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: T) => Promise<void>;
    title: string;
    fields: FormField[];
    initialData?: Partial<T>;
    submitButtonText?: string;
}
// prend en parametre n'importe qu'elle valeur
export function FormModal<T extends Record<string, any>>({
    isOpen,
    onClose,
    onSubmit,
    title,
    fields,
    initialData = {},
    submitButtonText = "Valider"
}: FormModalProps<T>) {
    const [formData, setFormData] = useState<Partial<T>>(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Réinitialiser le formulaire quand initialData change
    React.useEffect(() => {
        setFormData(initialData || {});
    }, [JSON.stringify(initialData)]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await onSubmit(formData as T);
            setFormData({});
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    const renderField = (field: FormField) => {
        const value = formData[field.name] || '';

        switch (field.type) {
            case 'textarea':
                return (
                    <textarea
                        id={field.name}
                        name={field.name}
                        value={value}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                    />
                );

            case 'select':
                return (
                    <select
                        id={field.name}
                        name={field.name}
                        value={value}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Sélectionner...</option>
                        {field.options?.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            default:
                return (
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={value}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        min={field.min}
                        max={field.max}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                );
        }
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map(field => (
                    <div key={field.name}>
                        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {renderField(field)}
                    </div>
                ))}

                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'En cours...' : submitButtonText}
                    </button>
                </div>
            </form>
        </BaseModal>
    );
}
