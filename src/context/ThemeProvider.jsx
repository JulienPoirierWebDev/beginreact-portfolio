// Dark mode exercise

import {createContext, useContext, useEffect, useState} from "react";



const ThemeContext = createContext({theme:'light'});

export const ThemeProvider = ({ children }) => {
  const THEME_KEY = "theme";

  const [theme, setTheme] = useState('light');

  const isDark = theme === "dark";
  const isLight = theme === "light";

  useEffect(() => {
      const themeLocalStorage = window.localStorage.getItem(THEME_KEY);

      let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      const handleChange = () => {
        setTheme(mediaQuery.matches ? 'dark' : 'light')
      }

      mediaQuery.addEventListener("change", handleChange)

      if(themeLocalStorage !== undefined) {
        setTheme(themeLocalStorage)
        return;
      }


      if (mediaQuery.matches) {
        handleChange()
      }



    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }

  }, [])


  const toggleTheme = () => {
    setTheme((curr) => {
      const newTheme = curr === 'light' ? 'dark' : 'light';
      window.localStorage.setItem(THEME_KEY, newTheme )

      return newTheme;
    })  }

  const values = {
    theme,
    toggleTheme,
    isDark,
    isLight
  }

  return (
      <ThemeContext.Provider value={values}>
        {children}
      </ThemeContext.Provider>);
};

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  if(!themeContext) {
    throw new Error("Use ThemeContext must be used inside ThemeProvider")
  } else {
    return themeContext;
  }
};
