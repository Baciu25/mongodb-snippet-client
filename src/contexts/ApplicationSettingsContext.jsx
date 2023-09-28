// for now we just manage darkMode boolean here ( stored in localStorage )
import { useState, createContext } from "react";
export const ApplicationSettingsContext = createContext(null);

export const ApplicationSettingsProvider = ({ children }) => {
  // for the editor + navbar
  const initialThemeState =
    localStorage.getItem("darkMode") === "true" ? true : false;
  const [darkMode, setDarkMode] = useState(initialThemeState);

  const toggleDarkMode = () => {
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  };

  return (
    <ApplicationSettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ApplicationSettingsContext.Provider>
  );
};
