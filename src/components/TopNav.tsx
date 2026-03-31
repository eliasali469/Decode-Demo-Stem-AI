import { Languages, Star, Menu, X } from "lucide-react";
import { Language } from "../types";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TopNavProps {
  points: number;
  currentLanguage: Language | null;
  onLanguageChange: (lang: Language) => void;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function TopNav({ points, currentLanguage, onLanguageChange, onMenuToggle, isMenuOpen }: TopNavProps) {
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages: { id: Language; label: string }[] = [
    { id: "english", label: "English Only" },
    { id: "mixed", label: "English + Swahili/Sheng" },
    { id: "swahili", label: "Swahili Only" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md flex justify-between items-center w-full px-4 md:px-6 py-3 md:py-4 border-b border-primary/10">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuToggle}
          className="md:hidden p-2 hover:bg-surface-container rounded-full transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
        </button>
        <span className="text-xl md:text-2xl font-black text-primary font-headline tracking-tight">STEM Lab</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <nav className="flex gap-6">
          <a className="text-on-surface hover:text-primary transition-colors font-headline font-bold text-sm" href="#">Home</a>
          <a className="text-on-surface hover:text-primary transition-colors font-headline font-bold text-sm" href="#">Leaderboard</a>
          <a className="text-primary font-extrabold font-headline text-sm" href="#">Mini-Games</a>
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative">
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="p-2 rounded-full hover:bg-surface-container transition-colors flex items-center gap-1"
          >
            <Languages className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <span className="hidden sm:inline text-xs font-bold text-primary uppercase">
              {currentLanguage === "english" ? "EN" : currentLanguage === "swahili" ? "SW" : "MIX"}
            </span>
          </button>
          
          <AnimatePresence>
            {showLangMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-primary/10 p-2 z-50"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      onLanguageChange(lang.id);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                      currentLanguage === lang.id ? "bg-primary text-white" : "hover:bg-surface-container text-on-surface"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1 bg-secondary-container/20 px-3 py-1.5 rounded-full border border-secondary-container/30">
          <Star className="w-4 h-4 md:w-5 md:h-5 text-secondary-container fill-secondary-container" />
          <span className="text-sm md:text-base font-black text-on-secondary-container">{points}</span>
        </div>

        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-container border-2 border-primary overflow-hidden">
          <img
            alt="Mascot Avatar"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTDX62GOMF-_NAHfWNYt5ITmEXYXnqSgXP0lDkJmFTON9PHEqC8HREgZ3wEDiTV7rImnfYQP4ct8zn1V9-NJsrbqJTbpd6hSy3nlNUhyzx4sWagN1_-SRrQ4anYovDqotVY4lrzNGh-ePrauztS2wm4-SuvO0380mzHAk71FD_gcCl8JIb6noxc5tO0RNdsk7LOeLYnrKbm4Cj-S832yrAwYuoEPXEPmtOV-UV7QB3bMdrHS--Oi8qSRitar3O97kTosyJW3jBpQ"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
