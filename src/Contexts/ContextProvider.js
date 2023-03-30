import React, { createContext, useContext, useState } from "react";
const UseContext = createContext();

const Initial_layout = {
  logout: false,
};

const ContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("Dark");
  const [settings, setSettings] = useState({});
  const [screenSize, changeScreenSize] = useState(window.innerWidth);
  const [layout, setLayout] = useState(Initial_layout);
  const [ activeSidebar , setActiveSidebar] = useState(screenSize > 900)

  const handleChangeSettings = (value) => {
    setSettings(value);
  };

  function changeLayout(opt, value) {
    setLayout({ ...layout, [opt]: value });
  }

  return (
    <UseContext.Provider
      value={{
        themeMode,
        setThemeMode,
        handleChangeSettings,
        settings,
        screenSize,
        changeScreenSize,
        layout,
        changeLayout,
        activeSidebar, 
        setActiveSidebar
      }}
    >
      {children}
    </UseContext.Provider>
  );
};

export function UseStateContext() {
  return useContext(UseContext);
}

export { UseContext, ContextProvider };
