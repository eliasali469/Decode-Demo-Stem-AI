import { motion } from "motion/react";
import { Bolt, Award } from "lucide-react";

interface StatsPanelProps {
  points: number;
  badges: string[];
  level: number;
}

export default function StatsPanel({ points, badges, level }: StatsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Speed Bonus Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-secondary-container p-6 rounded-lg relative overflow-hidden flex flex-col items-center text-center shadow-[0_40px_40px_rgba(253,212,0,0.1)]"
      >
        <img
          alt="Competition Mascot"
          className="w-20 h-20 md:w-24 md:h-24 mb-4"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYmvORhsm8O_uz6xpkIzdTidu7oNNF0SWEmTHsrSDEaV2xVQjnSwPIPfqHLqNhjMDJPMaATiL7Rs2mB7TnG2HSWC62QlOpRYRGVdmn59hme-54W1skbFm2OR0zcnsDTj1pu1vCoajHTDUE_XQ-7HeTNOc16_wEI-GA89iPy9HAp_4on9dQbuo3AEy86UxPqbCdDyzuBNjp9xm3FMIqm4X7-d6I4sTq0fgr75FadlRMgd7eD6bfaL6V_sAl9Ooco5WWmPA3f7R67w"
          referrerPolicy="no-referrer"
        />
        <h4 className="font-headline font-extrabold text-on-secondary-container text-lg md:text-xl">Speed Bonus Active!</h4>
        <p className="text-xs md:text-sm font-medium text-on-secondary-container/80 mt-2">
          Answer in under 5 seconds to double your points!
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="bg-surface-container-low p-6 rounded-lg">
        <h5 className="font-headline font-bold mb-4 text-on-surface-variant flex items-center gap-2">
          <Bolt className="w-5 h-5 text-primary fill-primary" /> Current Heat
        </h5>
        <div className="space-y-4">
          {[
            { label: "Total Points", value: points.toString(), color: "text-primary" },
            { label: "Current Level", value: `Level ${level}`, color: "text-tertiary" },
            { label: "Global Rank", value: "#2,401", color: "text-on-surface", highlight: true },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`flex items-center justify-between p-3 bg-surface-container-lowest rounded-xl ${
                stat.highlight ? "border-2 border-secondary-container" : ""
              }`}
            >
              <span className="text-xs md:text-sm font-bold">{stat.label}</span>
              <span className={`font-headline font-black text-sm md:text-base ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-surface-container-low p-6 rounded-lg">
        <h5 className="font-headline font-bold mb-4 text-on-surface-variant flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" /> My Badges
        </h5>
        <div className="flex flex-wrap gap-3">
          {badges.length > 0 ? (
            badges.map((badge) => (
              <motion.div
                key={badge}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-surface-container-lowest p-2 rounded-lg flex flex-col items-center gap-1 border border-primary/10"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <span className="text-[8px] font-black uppercase text-center max-w-[60px]">{badge}</span>
              </motion.div>
            ))
          ) : (
            <p className="text-xs text-outline italic">Complete Level 2 to earn your first badge!</p>
          )}
        </div>
      </div>
    </div>
  );
}
