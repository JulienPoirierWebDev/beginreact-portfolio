// Dark mode exercise

import {createContext, useContext, useState} from "react";

const ThemeContext = createContext({theme:'dark'});

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((curr) => {
      return curr === 'light' ? 'dark' : 'light';
    })  }

  const isDark = theme === "dark";
  const isLight = theme === "light";

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
