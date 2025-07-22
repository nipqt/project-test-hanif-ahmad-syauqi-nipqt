import { useState, useEffect } from 'react';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      // Sembunyikan header jika scroll ke bawah & sudah melewati tinggi header
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);

    // Cleanup function untuk menghapus listener saat komponen di-unmount
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // Tambahkan background transparan jika sudah di-scroll
  const headerBg = lastScrollY > 50 
    ? 'bg-orange-500/20 shadow-md backdrop-blur-sm' // Background transparan
    : 'bg-orange-500'; // Background solid

  return (
    <header className={`fixed flex justify-between w-screen py-4 px-60 transition-all duration-300 ${headerBg} ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <img src="./src/assets/Suitmedia_Logo.png" alt="Logo_Suitmedia" className="w-[128px] h-[50px]" />
      <nav className="flex items-center text-white text-[18px] gap-6">
        {/* Ganti 'Ideas' dengan style active jika ini halaman ideas */}
        <div className="flex flex-col items-center">
          <div>Work</div>
          <div className="w-full h-[2px] rounded bg-transparent"></div>
        </div>
        <div className="flex flex-col items-center">
          <div>About</div>
          <div className="w-full h-[2px] rounded bg-transparent"></div>
        </div>
        <div className="flex flex-col items-center">
          <div>Services</div>
          <div className="w-full h-[2px] rounded bg-transparent"></div>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">Ideas</span>
          <div className="w-full h-[2px] rounded bg-white"></div>
        </div>
        <div className="flex flex-col items-center">
          <div>Careers</div>
          <div className="w-full h-[2px] rounded bg-transparent"></div>
        </div>
        <div className="flex flex-col items-center">
          <div>Contact</div>
          <div className="w-full h-[2px] rounded bg-transparent"></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;