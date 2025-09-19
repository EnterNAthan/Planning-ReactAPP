/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //pallete inspiré de shadcn (https://ui.shadcn.com/docs/colors)
        // PALETTE PRINCIPALE (Noir & Blanc style shadcn)
        background: 'hsl(0 0% 100%)',           // Blanc pur
        foreground: 'hsl(240 10% 3.9%)',       // Noir profond
        
        // Couleurs primaires (noirs/gris)
        primary: {
          DEFAULT: 'hsl(240 9% 9%)',            // Noir principal
          foreground: 'hsl(0 0% 98%)',          // Blanc sur noir
        },
        
        // Couleurs secondaires (gris)
        secondary: {
          DEFAULT: 'hsl(240 4.8% 95.9%)',       // Gris très clair
          foreground: 'hsl(240 5.9% 10%)',      // Noir sur gris clair
        },
        
        // Gris neutres pour textes
        muted: {
          DEFAULT: 'hsl(240 4.8% 95.9%)',       // Gris clair
          foreground: 'hsl(240 3.8% 46.1%)',    // Gris moyen
        },
        
        // Accents (gris foncé)
        accent: {
          DEFAULT: 'hsl(240 4.8% 95.9%)',       // Gris clair
          foreground: 'hsl(240 5.9% 10%)',      // Noir
        },
        
        // Cards et popovers
        card: {
          DEFAULT: 'hsl(0 0% 100%)',            // Blanc
          foreground: 'hsl(240 10% 3.9%)',      // Noir
        },
        
        // Bordures
        border: 'hsl(240 5.9% 90%)',           // Gris très clair
        input: 'hsl(240 5.9% 90%)',            // Gris bordure input
        ring: 'hsl(240 10% 3.9%)',             // Focus ring noir
        
        // États spéciaux (gardons un peu de couleur pour l'UX)
        destructive: {
          DEFAULT: 'hsl(0 84.2% 60.2%)',        // Rouge pour delete
          foreground: 'hsl(0 0% 98%)',          // Blanc sur rouge
        },

        // 🎓 COULEURS SPÉCIFIQUES PLANNING (en noir/gris)
        planning: {
          cours: 'hsl(240 9% 9%)',              // Noir pour cours
          tp: 'hsl(240 5% 25%)',                // Gris foncé pour TP
          td: 'hsl(240 4% 40%)',                // Gris moyen pour TD
          examen: 'hsl(240 9% 9%)',             // Noir pour examens
        }
      },
      
      // Mode sombre
      screens: {
        'dark': {'raw': '(prefers-color-scheme: dark)'},
      }
    },
  },
  plugins: [],
}
