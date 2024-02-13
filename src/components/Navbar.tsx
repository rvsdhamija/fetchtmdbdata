// Navbar.tsx
import React from 'react';

interface NavbarProps {
  showHome: () => void;
  showPopular: () => void;
  showFavorites: () => void;
  goBack: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ showHome, showPopular, showFavorites, goBack }) => {
  return (
    <div className="navbar">
      <button onClick={showHome}>🏠 Home</button>
      <button onClick={showPopular}>🎬 Popular Movies</button>
      <button onClick={showFavorites}>❤️ Favorite Movies</button>
      <button onClick={goBack}>↩️</button>
    </div>
  );
};

export default Navbar;
