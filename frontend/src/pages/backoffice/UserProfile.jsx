import React, { useContext } from 'react';
import ThemeContext from '../../service/ThemeSwitcher';

function UserProfile() {
  const { theme, setTheme, toggleTheme, availableThemes } = useContext(ThemeContext);

  // Configuration des couleurs pour chaque thème
  const themeConfig = {
    light: {
      name: 'Clair',
      description: 'Thème lumineux pour un usage quotidien',
      containerBg: 'bg-white',
      containerText: 'text-black',
      cardBg: 'bg-gray-50',
      cardBorder: 'border-gray-200',
      buttonBg: 'bg-gray-200 hover:bg-gray-300',
      buttonText: 'text-black',
      accent: 'bg-blue-500'
    },
    dark: {
      name: 'Sombre',
      description: 'Thème sombre pour réduire la fatigue oculaire',
      containerBg: 'bg-gray-900',
      containerText: 'text-white',
      cardBg: 'bg-gray-800',
      cardBorder: 'border-gray-700',
      buttonBg: 'bg-gray-700 hover:bg-gray-600',
      buttonText: 'text-white',
      accent: 'bg-blue-400'
    },
    night: {
      name: 'Nuit',
      description: 'Thème nocturne avec des tons indigo et jaunes',
      containerBg: 'bg-indigo-900',
      containerText: 'text-yellow-100',
      cardBg: 'bg-indigo-800',
      cardBorder: 'border-indigo-700',
      buttonBg: 'bg-indigo-700 hover:bg-indigo-600',
      buttonText: 'text-yellow-50',
      accent: 'bg-yellow-500'
    },
    red: {
      name: 'Rouge',
      description: 'Thème rouge chaleureux et énergique',
      containerBg: 'bg-red-900',
      containerText: 'text-pink-100',
      cardBg: 'bg-red-800',
      cardBorder: 'border-red-700',
      buttonBg: 'bg-red-700 hover:bg-red-600',
      buttonText: 'text-white',
      accent: 'bg-pink-500'
    },
    green: {
      name: 'Vert',
      description: 'Thème vert naturel et apaisant',
      containerBg: 'bg-green-900',
      containerText: 'text-lime-100',
      cardBg: 'bg-green-800',
      cardBorder: 'border-green-700',
      buttonBg: 'bg-green-700 hover:bg-green-600',
      buttonText: 'text-white',
      accent: 'bg-lime-500'
    }
  };

  // Obtenir les styles du thème actuel
  const getCurrentThemeStyles = () => {
    return themeConfig[theme] || themeConfig.light;
  };

  const currentStyles = getCurrentThemeStyles();

  // Rendu d'une carte de thème
  const renderThemeCard = (themeName) => {
    const config = themeConfig[themeName];
    const isActive = theme === themeName;

    return (
      <div
        key={themeName}
        onClick={() => setTheme(themeName)}
      >
        {/* Aperçu visuel du thème */}
        <div className={` ${config.buttonBg} ${config.containerText}bg-gray-700 w-15 h-15 flex flex-col justify-between rounded-lg`}>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${currentStyles.containerBg} ${currentStyles.containerText}`}>
        {/* Grille des thèmes */}
        <div className='flex justify-around w-[30%]'>
          {availableThemes.map(renderThemeCard)}
        </div>
    </div>
  );
}

export default UserProfile;