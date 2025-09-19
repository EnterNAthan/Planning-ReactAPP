// src/components/Card.tsx
import React from 'react';

// CARD PRINCIPALE (CONTENEUR)
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`
        /*  STYLE DE BASE */
        bg-white
        border
        border-gray-200
        rounded-xl
        shadow-sm
        
        /* EFFET HOVER SUBTIL */
        hover:shadow-md
        transition-shadow
        duration-200
        
        /* STRUCTURE FLEXBOX */
        flex
        flex-col
        
        /* Classes additionnelles */
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// CARD HEADER (TITRE + ACTION)
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div
      className={`
        /*ESPACEMENT HEADER */
        px-6
        py-4
        
        /* LAYOUT FLEXIBLE */
        flex
        items-start
        justify-between
        
        /* 🔲 SÉPARATEUR OPTIONNEL */
        border-b
        border-gray-100
        
        /* Classes additionnelles */
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// TITRE DE LA CARD
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3
      className={`
        /* STYLE TITRE */
        text-lg
        font-bold
        text-gray-900
        
        /* ESPACEMENT */
        leading-tight
        
        /* Classes additionnelles */
        ${className}
      `}
    >
      {children}
    </h3>
  );
}

// DESCRIPTION/SOUS-TITRE
interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p
      className={`
        /* STYLE DESCRIPTION */
        text-sm
        text-gray-600
        
        /* ESPACEMENT */
        mt-1
        leading-relaxed
        
        /* Classes additionnelles */
        ${className}
      `}
    >
      {children}
    </p>
  );
}

// ⚡ ACTIONS (BOUTONS, MENU, ETC.)
interface CardActionProps {
  children: React.ReactNode;
  className?: string;
}

function CardAction({ children, className = '' }: CardActionProps) {
  return (
    <div
      className={`
        /* POSITION ACTIONS */
        flex
        items-center
        gap-2
        
        /* Classes additionnelles */
        ${className}
      `}
    >
      {children}
    </div>
  );
}
// CONTENU PRINCIPAL
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div
      className={`
        /* CONTENU PRINCIPAL */
        px-6
        py-4
        
        /* CROISSANCE FLEXIBLE */
        flex-1
        
        /* Classes additionnelles */
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// 🦶 FOOTER (ACTIONS PRINCIPALES)
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div
      className={`
        /* STYLE FOOTER */
        px-6
        py-4
        
        /* LAYOUT FOOTER */
        flex
        items-center
        justify-between
        
        /* SÉPARATEUR OPTIONNEL */
        border-t
        border-gray-100
        
        /* Classes additionnelles */
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// EXPORT DE TOUS LES COMPOSANTS
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
};
