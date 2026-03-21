export const Header = () => {
  return (
    <div className="flex justify-center items-center top-3 w-full z-10 sticky">
      <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        <a href="#home" className="nav-item">
          Home
        </a>
        <a href="#studio" className="nav-item">
          Estudio
        </a>
        <a href="#about" className="nav-item">
          Sobre
        </a>
        <a
          href="#contact"
          className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900"
        >
          Contato
        </a>
      </nav>
    </div>
  );
};
