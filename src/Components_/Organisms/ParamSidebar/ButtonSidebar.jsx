import React from 'react';
import { useSidebar } from './ParamSidebarContext';

const ButtonComponent = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <button className="param-btn"onClick={toggleSidebar}>
      Click (Ajouter Avatar + Nom)
    </button>
  );
};

export default ButtonComponent;
