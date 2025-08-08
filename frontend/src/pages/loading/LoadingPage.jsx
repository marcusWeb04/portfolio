import React, { useContext, useState } from 'react';
import ThemeContext from '../../service/ThemeSwitcher';

function LoadingPage() {
  const { theme } = useContext(ThemeContext);

  const [themeConfig] = useState([
    {
      name: 'Light',
      containerBg: 'bg-white',
      containerText: 'text-black',
      cardBg: 'bg-gray-50',
    },
    {
      name: 'Dark',
      containerBg: 'bg-gray-900',
      containerText: 'text-white',
      cardBg: 'bg-gray-800',
    },
    {
      name: 'Night',
      containerBg: 'bg-indigo-900',
      containerText: 'text-yellow-100',
      cardBg: 'bg-indigo-800',
    },
    {
      name: 'Red',
      containerBg: 'bg-red-900',
      containerText: 'text-pink-100',
      cardBg: 'bg-red-800',
    },
    {
      name: 'Green',
      containerBg: 'bg-green-900',
      containerText: 'text-lime-100',
      cardBg: 'bg-green-800',
    },
  ]);

  const themeIndexMap = {
    light: 0,
    dark: 1,
    night: 2,
    red: 3,
    green: 4,
  };

  const getCurrentThemeStyles = () => {
    const index = themeIndexMap[theme] ?? 0;
    return themeConfig[index];
  };

  const currentStyles = getCurrentThemeStyles();

  return (
    <div className={`min-h-screen ${currentStyles.containerBg} ${currentStyles.containerText}`}>
      <div className="relative w-full h-screen">
        {/* Carte 1 - Light */}
        <div
          className={`
            w-24 h-24
            ${theme === 'light' ? themeConfig[0].containerBg : themeConfig[0].cardBg}
            rounded-md 
            animated-card-1
          `}
        ></div>

        {/* Carte 2 - Dark */}
        <div
          className={`
            w-24 h-24
            ${theme === 'dark' ? themeConfig[1].containerBg : themeConfig[1].cardBg}
            rounded-md 
            animated-card-2
          `}
        ></div>

        {/* Image centrale */}
        <img
          src="./1.png"
          alt="logo du site internet"
          className="w-24 h-24 rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        {/* Carte 3 - Red */}
        <div
          className={`w-24 h-24 ${themeConfig[3].cardBg} rounded-md absolute 
          animated-card-3`}
        ></div>

        {/* Carte 4 - Green */}
        <div
          className={`w-24 h-24 ${themeConfig[4].cardBg} rounded-md animated-card-4`}
        ></div>
      </div>
    </div>
  );
}

export default LoadingPage;