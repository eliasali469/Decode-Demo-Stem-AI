import { motion, AnimatePresence } from "motion/react";
import { Calculator, Share2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Language, LessonStep } from "../types";

interface QuestionCardProps {
  step: LessonStep;
  language: Language;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  topicTitle: string;
  level: number;
  feedback: { isCorrect: boolean | null; message: string | null; show: boolean };
}

export default function QuestionCard({ step, language, onAnswer, onNext, topicTitle, level, feedback }: QuestionCardProps) {
  const content = step.content[language] || step.content['english'];
  
  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={step.type + content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-surface-container-lowest p-6 md:p-10 lg:p-12 rounded-lg shadow-sm relative overflow-hidden min-h-[400px] flex flex-col"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Calculator className="w-24 h-24 md:w-32 md:h-32 text-primary" />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <span className="font-headline font-bold text-primary text-xs md:text-sm tracking-wide uppercase">
              {topicTitle} • LEVEL {level}
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
              {step.type}
            </span>
          </div>

          <div className="flex-1">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-headline font-bold mb-6 text-on-surface leading-tight">
              {content}
            </h2>

            {step.question && (
              <div className="mt-8 pt-8 border-t border-primary/10">
                <h3 className="text-2xl md:text-3xl font-headline font-black text-primary mb-8">
                  {step.question.text}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {step.question.options.map((opt) => (
                    <motion.button
                      key={opt}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onAnswer(opt)}
                      disabled={feedback.show}
                      className={`group relative p-4 md:p-6 rounded-xl text-center transition-all border-b-4 ${
                        feedback.show && opt === step.question?.correct
                          ? "bg-green-100 border-green-500 text-green-700"
                          : feedback.show && opt !== step.question?.correct
                          ? "bg-red-50 border-red-200 text-red-300 opacity-50"
                          : "bg-surface-container hover:bg-primary-container border-outline-variant hover:border-primary"
                      }`}
                    >
                      <span className={`block font-headline font-black text-2xl md:text-3xl ${
                        feedback.show && opt === step.question?.correct ? "text-green-700" : "text-primary"
                      }`}>{opt}</span>
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence>
                  {feedback.show && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`mt-6 p-4 rounded-xl font-bold text-center ${
                        feedback.isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {feedback.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {step.type !== "challenge" && (
              <div className="mt-8">
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={onNext}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-headline font-bold text-sm shadow-lg shadow-primary/20"
                >
                  {step.type === "complete" ? "Next Level" : "Continue"}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
