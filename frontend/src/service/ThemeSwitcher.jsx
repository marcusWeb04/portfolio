// src/service/ThemeSwitcher.js
import React, { createContext, useEffect, useState } from 'react';

// Tous les thèmes disponibles
const themes = ['light', 'dark', 'night', 'red', 'green'];

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
  availableThemes: themes,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Charger thème initial depuis localStorage ou système
  useEffect(() => {
    const initializeTheme = () => {
      // 1. Vérifier localStorage
      const saved = localStorage.getItem('theme');
      if (saved && themes.includes(saved)) {
        setTheme(saved);
        applyTheme(saved);
        return;
      }

      // 2. Vérifier préférence système (dark mode)
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
        applyTheme('dark');
        return;
      }

      // 3. Par défaut
      setTheme('light');
      applyTheme('light');
    };

    initializeTheme();

    // Écouter les changements de préférence système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    
    // Supprimer toutes les classes de thème existantes
    themes.forEach((th) => {
      root.classList.remove(`theme-${th}`);
      root.classList.remove(th); // Au cas où tu utilises aussi cette notation
    });
    
    // Ajouter la nouvelle classe
    root.classList.add(`theme-${newTheme}`);
    
    // Sauvegarder en localStorage
    localStorage.setItem('theme', newTheme);
    
    // Optionnel : Ajouter l'attribut data-theme pour CSS
    root.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  // Fonction pour changer directement vers un thème spécifique
  const changeTheme = (newTheme) => {
    if (themes.includes(newTheme)) {
      setTheme(newTheme);
      applyTheme(newTheme);
    } else {
      console.warn(`Thème "${newTheme}" non disponible. Thèmes disponibles:`, themes);
    }
  };

  const value = {
    theme,
    setTheme: changeTheme,
    toggleTheme,
    availableThemes: themes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;