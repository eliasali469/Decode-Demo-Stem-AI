import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import QuestionCard from "./components/QuestionCard";
import StatsPanel from "./components/StatsPanel";
import { Language, UserState, LessonStep, Topic, Game } from "./types";
import { TOPICS, ALGEBRA_LESSON, GAMES } from "./tutorContent";
import { Lock, ArrowRight, CheckCircle2, Mail, Trophy, Gamepad2, Share2, Timer, Bolt, SpellCheck, Layers } from "lucide-react";

export default function App() {
  const [user, setUser] = useState<UserState>({
    points: 0,
    level: 1,
    badges: [],
    language: null,
    unlockedTopics: ["algebra"],
    completedLevels: [],
  });

  const [currentTopicId, setCurrentTopicId] = useState("algebra");
  const [stepIndex, setStepIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [currentView, setCurrentView] = useState<"dashboard" | "games">("dashboard");
  const [scrambledInput, setScrambledInput] = useState("");
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  const currentTopic = useMemo(() => TOPICS.find(t => t.id === currentTopicId)!, [currentTopicId]);
  const currentLessonSteps = useMemo(() => {
    const rawSteps = ALGEBRA_LESSON[user.level] || [];
    if (user.language === "english") {
      return rawSteps.filter(s => s.type !== "reinforcement");
    }
    return rawSteps;
  }, [user.level, user.language]);
  const currentStep = currentLessonSteps[stepIndex];

  const handleLanguageSelect = (lang: Language) => {
    setUser(prev => ({ ...prev, language: lang }));
  };

  const handleTopicSelect = (topicId: string) => {
    const topic = TOPICS.find(t => t.id === topicId);
    if (topic?.isLocked) {
      setShowUpgrade(true);
      return;
    }
    setCurrentTopicId(topicId);
    setStepIndex(0);
    setActiveGame(null);
  };

  const handleAnswer = (answer: string | boolean) => {
    if (activeGame) {
      const gameContent = activeGame.content;
      let isCorrect = false;

      if (activeGame.type === "speed-drill") {
        isCorrect = answer === gameContent[challengeIndex].correct;
      } else if (activeGame.type === "true-false") {
        isCorrect = answer === gameContent[challengeIndex].correct;
      } else if (activeGame.type === "word-scramble") {
        isCorrect = answer.toString().toUpperCase() === gameContent[challengeIndex].original;
      } else if (activeGame.type === "match-pair") {
        isCorrect = answer === gameContent[challengeIndex].definition;
      }

      if (isCorrect) {
        setUser(prev => ({ ...prev, points: prev.points + activeGame.pointsPerCorrect }));
        if (challengeIndex < gameContent.length - 1) {
          setChallengeIndex(prev => prev + 1);
          setScrambledInput("");
          setSelectedTerm(null);
        } else {
          setActiveGame(null);
          setChallengeIndex(0);
          setScrambledInput("");
          setSelectedTerm(null);
        }
      }
      return;
    }

    if (currentStep.question && answer === currentStep.question.correct) {
      const pointsToAdd = user.level === 1 ? 10 : 15;
      setUser(prev => ({ ...prev, points: prev.points + pointsToAdd }));
      setStepIndex(prev => prev + 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep.type === "complete") {
      if (user.level === 1) {
        setUser(prev => ({ ...prev, level: 2, completedLevels: [...prev.completedLevels, 1] }));
        setStepIndex(0);
      } else if (user.level === 2) {
        setUser(prev => ({ 
          ...prev, 
          badges: [...new Set([...prev.badges, "Quick Learner", "Algebra Master"])],
          completedLevels: [...prev.completedLevels, 2]
        }));
        setShowUpgrade(true);
      }
    } else {
      setStepIndex(prev => prev + 1);
    }
  };

  const startGame = (game: Game) => {
    setActiveGame(game);
    setChallengeIndex(0);
    setScrambledInput("");
    setIsSidebarOpen(false);
  };

  if (!user.language) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 kitenge-pattern">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center border-4 border-primary/10"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gamepad2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-headline font-black text-on-surface mb-4">Karibu STEM Lab!</h1>
          <p className="text-outline font-medium mb-8">Choose your preferred language to start learning.</p>
          
          <div className="space-y-4">
            {[
              { id: "english", label: "English Only", sub: "Standard learning mode" },
              { id: "mixed", label: "English + Swahili/Sheng", sub: "Mchanganyiko wa lugha" },
              { id: "swahili", label: "Swahili Only", sub: "Lugha ya Kiswahili pekee" },
            ].map((lang) => (
              <motion.button
                key={lang.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLanguageSelect(lang.id as Language)}
                className="w-full p-4 rounded-2xl border-2 border-primary/10 hover:border-primary hover:bg-primary/5 transition-all text-left group"
              >
                <div className="font-headline font-bold text-on-surface group-hover:text-primary">{lang.label}</div>
                <div className="text-xs text-outline">{lang.sub}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <TopNav 
        points={user.points} 
        currentLanguage={user.language} 
        onLanguageChange={handleLanguageSelect}
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onTopicSelect={handleTopicSelect}
        onViewChange={setCurrentView}
        currentTopicId={currentTopicId}
        currentView={currentView}
      />

      <main className="md:ml-72 pt-20 md:pt-24 pb-24 px-4 md:px-6 min-h-screen kitenge-pattern">
        <div className="max-w-5xl mx-auto">
          {currentView === "dashboard" ? (
            <>
              {/* Header Section */}
              <section className="mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                    <span className="inline-block px-4 py-1 bg-tertiary text-on-tertiary rounded-full font-headline font-bold text-[10px] md:text-xs uppercase tracking-widest mb-2">
                      Learning Path
                    </span>
                    <h1 className="text-3xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight leading-tight">
                      {currentTopic.title}
                    </h1>
                  </motion.div>

                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-primary/5 border-2 border-primary/10 p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-primary/10 transition-all"
                    onClick={() => {
                      setCurrentView("games");
                      startGame(GAMES[Math.floor(Math.random() * GAMES.length)]);
                    }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-[0.6rem] font-black text-primary uppercase tracking-widest">Daily Challenge</p>
                      <p className="text-sm font-bold text-on-surface">Earn +50 Bonus Points!</p>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                  <QuestionCard 
                    step={currentStep} 
                    language={user.language!}
                    onAnswer={handleAnswer} 
                    onNext={handleNextStep}
                    topicTitle={currentTopic.title}
                    level={user.level}
                  />
                </div>

                <div className="lg:col-span-4">
                  <StatsPanel points={user.points} badges={user.badges} level={user.level} />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <section>
                <span className="inline-block px-4 py-1 bg-secondary text-on-secondary rounded-full font-headline font-bold text-[10px] md:text-xs uppercase tracking-widest mb-2">
                  Arcade Mode
                </span>
                <h1 className="text-3xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight leading-tight">
                  Mini-Games
                </h1>
                <p className="text-outline mt-2">Challenge your brain with quick STEM drills!</p>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                  {activeGame ? (
                    <div className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl shadow-xl border-4 border-primary/5">
                      <div className="flex justify-between items-center mb-8">
                        <span className="text-xs font-black text-primary uppercase tracking-widest">
                          {activeGame.title} - Question {challengeIndex + 1}/{activeGame.content.length}
                        </span>
                        <button 
                          onClick={() => setActiveGame(null)}
                          className="text-outline hover:text-primary text-xs font-bold"
                        >
                          Quit Game
                        </button>
                      </div>

                      {activeGame.type === "speed-drill" && (
                        <>
                          <h2 className="text-2xl md:text-4xl font-headline font-black text-on-surface mb-12 text-center">
                            {activeGame.content[challengeIndex].text}
                          </h2>
                          <div className="grid grid-cols-2 gap-4">
                            {activeGame.content[challengeIndex].options.map(opt => (
                              <motion.button
                                key={opt}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleAnswer(opt)}
                                className="p-6 rounded-2xl bg-surface-container hover:bg-primary-container text-primary font-headline font-black text-2xl border-b-4 border-outline-variant hover:border-primary transition-all"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </>
                      )}

                      {activeGame.type === "true-false" && (
                        <>
                          <h2 className="text-2xl md:text-4xl font-headline font-black text-on-surface mb-12 text-center">
                            {activeGame.content[challengeIndex].text}
                          </h2>
                          <div className="grid grid-cols-2 gap-4">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAnswer(true)}
                              className="p-8 rounded-2xl bg-green-100 hover:bg-green-200 text-green-700 font-headline font-black text-2xl border-b-4 border-green-300 transition-all"
                            >
                              TRUE
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAnswer(false)}
                              className="p-8 rounded-2xl bg-red-100 hover:bg-red-200 text-red-700 font-headline font-black text-2xl border-b-4 border-red-300 transition-all"
                            >
                              FALSE
                            </motion.button>
                          </div>
                        </>
                      )}

                      {activeGame.type === "word-scramble" && (
                        <div className="text-center">
                          <h2 className="text-4xl md:text-6xl font-headline font-black text-primary mb-4 tracking-widest uppercase">
                            {activeGame.content[challengeIndex].scrambled}
                          </h2>
                          <p className="text-outline mb-8">Unscramble this STEM term!</p>
                          <div className="flex flex-col items-center gap-4">
                            <input 
                              type="text"
                              value={scrambledInput}
                              onChange={(e) => setScrambledInput(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleAnswer(scrambledInput)}
                              placeholder="Type your answer..."
                              className="w-full max-w-md p-4 rounded-2xl border-4 border-primary/10 focus:border-primary outline-none font-headline font-black text-2xl text-center uppercase"
                              autoFocus
                            />
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAnswer(scrambledInput)}
                              className="bg-primary text-white px-12 py-4 rounded-full font-headline font-black text-lg shadow-lg"
                            >
                              Submit
                            </motion.button>
                          </div>
                        </div>
                      )}

                      {activeGame.type === "match-pair" && (
                        <div className="space-y-8">
                          <div className="text-center mb-8">
                            <h2 className="text-2xl font-headline font-black text-on-surface">Match the Pair</h2>
                            <p className="text-outline">Select the term first, then its definition!</p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <h3 className="text-sm font-black text-primary uppercase tracking-widest text-center">Terms</h3>
                              {activeGame.content.map((item: any, idx: number) => (
                                <motion.button
                                  key={`term-${idx}`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setSelectedTerm(item.term)}
                                  disabled={idx < challengeIndex}
                                  className={`w-full p-4 rounded-2xl font-headline font-bold border-2 transition-all ${
                                    idx < challengeIndex 
                                      ? "bg-green-50 border-green-200 text-green-700 opacity-50 cursor-not-allowed" 
                                      : selectedTerm === item.term 
                                        ? "bg-primary border-primary text-white shadow-lg" 
                                        : "bg-surface-container border-outline-variant hover:border-primary text-on-surface"
                                  }`}
                                >
                                  {item.term}
                                  {idx < challengeIndex && <CheckCircle2 className="w-4 h-4 inline ml-2" />}
                                </motion.button>
                              ))}
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-sm font-black text-secondary uppercase tracking-widest text-center">Definitions</h3>
                              {/* Shuffle definitions for a real challenge, but for now just list them */}
                              {activeGame.content.map((item: any, idx: number) => (
                                <motion.button
                                  key={`def-${idx}`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => selectedTerm && handleAnswer(item.definition)}
                                  disabled={!selectedTerm || idx < challengeIndex}
                                  className={`w-full p-4 rounded-2xl font-bold border-2 transition-all min-h-[80px] flex items-center justify-center text-center ${
                                    idx < challengeIndex 
                                      ? "bg-green-50 border-green-200 text-green-700 opacity-50 cursor-not-allowed" 
                                      : !selectedTerm 
                                        ? "bg-surface-container/50 border-dashed border-outline-variant text-outline cursor-not-allowed"
                                        : "bg-surface-container border-outline-variant hover:border-secondary text-on-surface"
                                  }`}
                                >
                                  {item.definition}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {GAMES.map(game => (
                        <motion.div 
                          key={game.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-surface-container-lowest p-6 rounded-3xl shadow-xl border-4 border-primary/5 flex flex-col items-center text-center group hover:border-primary/20 transition-all"
                        >
                          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            {game.icon === "timer" && <Timer className="w-8 h-8 text-primary" />}
                            {game.icon === "bolt" && <Bolt className="w-8 h-8 text-primary" />}
                            {game.icon === "spellcheck" && <SpellCheck className="w-8 h-8 text-primary" />}
                            {game.icon === "layers" && <Layers className="w-8 h-8 text-primary" />}
                          </div>
                          <h3 className="text-xl font-headline font-black text-on-surface mb-2">{game.title}</h3>
                          <p className="text-sm text-outline mb-6 flex-grow">{game.description}</p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => startGame(game)}
                            className="w-full bg-primary text-white py-3 rounded-xl font-headline font-bold shadow-md"
                          >
                            Play
                          </motion.button>
                        </motion.div>
                      ))}

                      {/* Multiplayer Card */}
                      <div className="md:col-span-2 bg-gradient-to-br from-tertiary to-[#003064] p-8 rounded-3xl text-on-tertiary relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                          <div>
                            <h3 className="text-2xl font-headline font-black mb-2">Multiplayer Duel</h3>
                            <p className="opacity-90 max-w-sm">Challenge a classmate to a real-time STEM battle!</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                              <p className="text-[0.6rem] font-bold uppercase tracking-widest opacity-70">Your Room Code</p>
                              <p className="text-2xl font-headline font-black tracking-widest">STEM{Math.floor(100 + Math.random() * 900)}</p>
                            </div>
                            <button className="bg-white/20 p-4 rounded-2xl hover:bg-white/30 transition-colors">
                              <Share2 className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                        <div className="absolute inset-0 opacity-10 pointer-events-none kitenge-pattern scale-150"></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-4">
                  <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant sticky top-24">
                    <div className="flex items-center gap-2 mb-6">
                      <Trophy className="w-5 h-5 text-secondary" />
                      <h3 className="font-headline font-black text-on-surface">Leaderboard</h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        { name: "Elias", points: 1250, rank: 1 },
                        { name: "Sarah", points: 1100, rank: 2 },
                        { name: "Kofi", points: 950, rank: 3 },
                        { name: "You", points: user.points, rank: 4, isMe: true },
                      ].map((player) => (
                        <div key={player.name} className={`flex items-center justify-between p-3 rounded-xl ${player.isMe ? "bg-primary/10 border border-primary/20" : "bg-surface-container"}`}>
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-black ${player.rank === 1 ? "bg-yellow-400 text-yellow-900" : "bg-primary/10 text-primary"}`}>
                              {player.rank || "?"}
                            </span>
                            <span className={`font-bold text-sm ${player.isMe ? "text-primary" : ""}`}>{player.name}</span>
                          </div>
                          <span className="font-headline font-black text-on-surface text-sm">{player.points} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgrade && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowUpgrade(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center border-8 border-secondary-container/20"
            >
              <div className="w-24 h-24 bg-secondary-container/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-12 h-12 text-on-secondary-container" />
              </div>
              <h2 className="text-3xl font-headline font-black text-on-surface mb-4">Unlock the Full Lab!</h2>
              <p className="text-outline font-medium mb-8">
                You've completed the free lesson! Level 3 and advanced topics like Chemistry and Physics are part of the full version.
              </p>
              <div className="space-y-4">
                <button 
                  onClick={() => { setShowUpgrade(false); setShowEmailCapture(true); }}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-headline font-black shadow-lg shadow-primary/20"
                >
                  Join Early Access
                </button>
                <button 
                  onClick={() => setShowUpgrade(false)}
                  className="w-full text-outline font-bold text-sm hover:text-primary transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Email Capture Modal */}
      <AnimatePresence>
        {showEmailCapture && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowEmailCapture(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-headline font-black text-on-surface mb-4">Be the first to know!</h2>
              <p className="text-outline font-medium mb-8">Enter your email to get notified when the full version launches.</p>
              
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full p-4 rounded-2xl border-2 border-primary/10 focus:border-primary outline-none font-bold text-center"
                  onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                />
                <button 
                  onClick={() => {
                    setShowEmailCapture(false);
                    alert("You are now on the early access list! We'll be in touch.");
                  }}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-headline font-black"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
