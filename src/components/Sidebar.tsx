import { motion, AnimatePresence } from "motion/react";
import { Home, Trophy, Award, Gamepad2, Lock, X } from "lucide-react";
import { TOPICS } from "../tutorContent";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onTopicSelect: (topicId: string) => void;
  onViewChange: (view: "dashboard" | "games") => void;
  currentTopicId: string;
  currentView: "dashboard" | "games";
}

export default function Sidebar({ isOpen, onClose, onTopicSelect, onViewChange, currentTopicId, currentView }: SidebarProps) {
  const navItems = [
    { icon: Home, label: "Home", id: "dashboard" as const },
    { icon: Gamepad2, label: "Mini-Games", id: "games" as const },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="md:hidden flex justify-end p-4">
        <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full">
          <X className="w-6 h-6 text-primary" />
        </button>
      </div>

      <div className="mb-8 px-6 pt-4 md:pt-0">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center">
            <Gamepad2 className="text-primary w-8 h-8" />
          </div>
          <div>
            <h3 className="font-headline font-bold text-on-surface">STEM Lab</h3>
            <p className="text-xs font-medium text-outline">Level 12 Explorer</p>
          </div>
        </div>
      </div>

      <div className="px-4 mb-8">
        <p className="px-4 text-[10px] font-black uppercase tracking-widest text-outline mb-4">Main Menu</p>
        <nav className="space-y-1 mb-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id);
                if (window.innerWidth < 768) onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-full font-headline font-semibold text-sm transition-all ${
                currentView === item.id
                  ? "bg-primary text-white font-bold shadow-lg shadow-primary/20"
                  : "text-on-surface hover:bg-surface-container"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <p className="px-4 text-[10px] font-black uppercase tracking-widest text-outline mb-4">Curriculum</p>
        <nav className="space-y-1">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => {
                onViewChange("dashboard");
                onTopicSelect(topic.id);
                if (window.innerWidth < 768) onClose();
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-full font-headline font-semibold text-sm transition-all ${
                currentTopicId === topic.id && currentView === "dashboard"
                  ? "bg-surface-container-low text-primary font-bold"
                  : "text-on-surface hover:bg-surface-container"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl">{topic.icon}</span>
                {topic.title}
              </div>
              {topic.isLocked && <Lock className="w-3 h-3 text-outline" />}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto px-6 pb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-secondary-container text-on-secondary-container py-4 rounded-xl font-headline font-bold shadow-[0_4px_0_#594a00] active:translate-y-1 active:shadow-none transition-all"
        >
          Upgrade to Pro
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 z-40 bg-white rounded-r-[2rem] pt-24 pb-8 shadow-[0_40px_40px_rgba(23,106,33,0.06)]">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="md:hidden fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] shadow-2xl overflow-y-auto"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
