import react from 'react';

interface ButtonProps{
    // Texte du bouton
    children: React.ReactNode;
    // Action au clic
    onClick?: () => void;
    // si le button est desactivé
    disabled?: boolean;
    // si il charge 
    loading?: boolean;
    // css en plus 
    className?: string;
}

function Button({children, onClick, disabled = false, loading = false, className = ""
}: ButtonProps) {
  
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        /* STYLE DE BASE NOIR SHADCN */
        bg-gray-900
        text-white
        font-bold

        /* TAILLE ET ESPACEMENT */
        px-6
        py-3
        
        /*FORME MODERNE */
        rounded-md
        
        /*EFFETS HOVER BRILLANTS */
        hover:bg-gray-800
        hover:shadow-xl
        hover:shadow-gray-500/25
        hover:-translate-y-1
        
        /* EFFET BRILLANT SUBTIL */
        hover:ring-1
        hover:ring-gray-700
        hover:ring-opacity-50
        
        /* ANIMATIONS FLUIDES SHADCN */
        transition-all
        duration-200
        ease-in-out
        
        /* FOCUS NOIR ÉLÉGANT */
        focus:outline-none
        focus:ring-2
        focus:ring-gray-700
        focus:ring-offset-2
        focus:ring-offset-white
        
        /* ÉTAT DÉSACTIVÉ PRO */
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:transform-none
        disabled:hover:shadow-none
        disabled:hover:ring-0
        
        /* RESPONSIVE */
        text-sm
        md:text-base
         + ${className}
        `}
    >
        {loading ? (
        <span className="flex items-center justify-center gap-2">
          {/* SPINNER chargement BLANC ÉLÉGANT */}
          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Chargement...</span>
        </span>
      ) : (
        children
      )}
    </button>
    );
}

export default Button;
