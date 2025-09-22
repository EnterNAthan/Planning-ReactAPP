import React from "react";
import Modal from "react-modal";


Modal.setAppElement('#root');

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const BaseModal: React.FC<BaseModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    className = "bg-white rounded-lg p-6 max-w-md mx-auto mt-20"
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={className}
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center"
        >
            {/*  HEADER RÉUTILISABLE */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
            </div>

            {/* CONTENU DYNAMIQUE */}
            {children}
        </Modal>
    );
};