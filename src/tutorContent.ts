import { Language, LessonStep, Game } from "./types";

export const TOPICS = [
  { id: "algebra", title: "Algebra Basics", icon: "calculate", isLocked: false },
  { id: "geometry", title: "Geometry", icon: "square", isLocked: true },
  { id: "probability", title: "Probability", icon: "casino", isLocked: true },
  { id: "electricity", title: "Electricity", icon: "bolt", isLocked: true },
  { id: "chemistry", title: "Chemistry", icon: "science", isLocked: true },
  { id: "physics", title: "Physics Basics", icon: "speed", isLocked: true },
  { id: "biology", title: "Biology Advanced", icon: "biotech", isLocked: true },
];

export const ALGEBRA_LESSON: Record<number, LessonStep[]> = {
  1: [
    {
      type: "challenge",
      content: {
        english: "Let's start with a quick puzzle!",
        mixed: "Let's start with a quick puzzle!",
        swahili: "Tuanze na fumbo la haraka!",
      },
      question: {
        text: "If 2x = 10, what is x?",
        options: ["2", "5", "10", "20"],
        correct: "5",
      },
    },
    {
      type: "explanation",
      content: {
        english: "Algebra is just using letters to stand for numbers we don't know yet. Think of 'x' as a hidden box with a number inside.",
        mixed: "Algebra is just using letters to stand for numbers we don't know yet. Think of 'x' as a hidden box with a number inside.",
        swahili: "Algebra ni kutumia herufi badala ya namba ambazo hatujui bado. Fikiria 'x' kama sanduku lililofichwa lenye namba ndani.",
      },
    },
    {
      type: "analogy",
      content: {
        english: "Imagine you are at a market. You buy 2 identical bags of sukuma wiki and pay 100 shillings. To find the price of 1 bag (x), you just divide the total by 2!",
        mixed: "Imagine you are at a market. You buy 2 identical bags of sukuma wiki and pay 100 shillings. To find the price of 1 bag (x), you just divide the total by 2!",
        swahili: "Fikiria uko sokoni. Unanunua mifuko 2 ya sukuma wiki na unalipa shilingi 100. Kujua bei ya mfuko 1 (x), unagawa jumla kwa 2!",
      },
    },
    {
      type: "reinforcement",
      content: {
        english: "",
        mixed: "Sasa, imagine uko sokoni. Unanunua mifuko mbili ya sukuma wiki kwa 100 bob. Kujua bei ya mfuko mmoja (x), unagawa hiyo 100 kwa mbili. Hiyo ndio Algebra!",
        swahili: "Algebra ni rahisi sana! Unagawa tu namba ili kupata jibu la herufi.",
      },
    },
    {
      type: "complete",
      content: {
        english: "Great job! You've mastered the basics of Level 1. Ready for Level 2?",
        mixed: "Great job! You've mastered the basics of Level 1. Ready for Level 2?",
        swahili: "Kazi nzuri! Umemaliza Level 1. Je, uko tayari kwa Level 2?",
      },
    },
  ],
  2: [
    {
      type: "challenge",
      content: {
        english: "Level 2 Challenge!",
        mixed: "Level 2 Challenge!",
        swahili: "Changamoto ya Level 2!",
      },
      question: {
        text: "If x + 5 = 12, what is x?",
        options: ["5", "7", "12", "17"],
        correct: "7",
      },
    },
    {
      type: "explanation",
      content: {
        english: "In algebra, we want to get 'x' all by itself. If something is added to x, we subtract it from both sides to keep things balanced.",
        mixed: "In algebra, we want to get 'x' all by itself. If something is added to x, we subtract it from both sides to keep things balanced.",
        swahili: "Katika algebra, tunataka kupata 'x' peke yake. Ikiwa kitu kimeongezwa kwa x, tunakiondoa pande zote mbili ili kuweka usawa.",
      },
    },
    {
      type: "analogy",
      content: {
        english: "Think of a balance scale. If you have a box (x) and 5 stones on one side, and 12 stones on the other, you must remove 5 stones from both sides to see how many stones are in the box!",
        mixed: "Think of a balance scale. If you have a box (x) and 5 stones on one side, and 12 stones on the other, you must remove 5 stones from both sides to see how many stones are in the box!",
        swahili: "Fikiria mzani. Ikiwa una sanduku (x) na mawe 5 upande mmoja, na mawe 12 upande mwingine, lazima utoe mawe 5 kila upande ili uone sanduku lina mawe mangapi!",
      },
    },
    {
      type: "reinforcement",
      content: {
        english: "",
        mixed: "Fikiria mzani. Kama una box (x) na mawe tano upande mmoja, na mawe kumi na mbili upande mwingine, lazima utoe mawe tano kila upande ili ujue box ina mawe ngapi. Easy, right?",
        swahili: "Algebra ni kama mzani. Unachofanya upande mmoja, lazima ufanye upande mwingine.",
      },
    },
    {
      type: "complete",
      content: {
        english: "Amazing! You've completed Level 2 and earned your first badge!",
        mixed: "Amazing! You've completed Level 2 and earned your first badge!",
        swahili: "Ajabu! Umemaliza Level 2 na umepata beji yako ya kwanza!",
      },
    },
  ],
};

export const CHALLENGE_QUESTIONS = [
  { text: "3x = 15, x = ?", options: ["3", "5", "15", "45"], correct: "5" },
  { text: "x - 4 = 10, x = ?", options: ["6", "14", "10", "4"], correct: "14" },
  { text: "2x + 2 = 10, x = ?", options: ["4", "6", "8", "10"], correct: "4" },
  { text: "x / 2 = 8, x = ?", options: ["4", "16", "8", "2"], correct: "16" },
  { text: "5x = 50, x = ?", options: ["5", "10", "50", "1"], correct: "10" },
];

export const GAMES: Game[] = [
  {
    id: "speed-drill-1",
    type: "speed-drill",
    title: "Speed Drill",
    description: "Solve 5 algebraic puzzles as fast as you can!",
    icon: "timer",
    pointsPerCorrect: 5,
    content: CHALLENGE_QUESTIONS
  },
  {
    id: "true-false-1",
    type: "true-false",
    title: "Quick Fire",
    description: "Decide if the statement is true or false. Quick!",
    icon: "bolt",
    pointsPerCorrect: 3,
    content: [
      { text: "x + x = 2x", correct: true },
      { text: "3x - x = 3", correct: false },
      { text: "x * 0 = x", correct: false },
      { text: "x / x = 1 (if x != 0)", correct: true },
      { text: "2(x + 1) = 2x + 2", correct: true }
    ]
  },
  {
    id: "word-scramble-1",
    type: "word-scramble",
    title: "Term Scramble",
    description: "Unscramble these STEM terms!",
    icon: "spellcheck",
    pointsPerCorrect: 10,
    content: [
      { scrambled: "REBALGA", original: "ALGEBRA" },
      { scrambled: "TENQUOIA", original: "EQUATION" },
      { scrambled: "BALEVIRA", original: "VARIABLE" },
      { scrambled: "COFFIENTIE", original: "COEFFICIENT" }
    ]
  },
  {
    id: "memory-match-1",
    type: "match-pair",
    title: "Memory Match",
    description: "Match the STEM term with its correct definition!",
    icon: "layers",
    pointsPerCorrect: 15,
    content: [
      { term: "Variable", definition: "A letter standing for a number" },
      { term: "Equation", definition: "A mathematical statement with =" },
      { term: "Coefficient", definition: "The number in front of a variable" },
      { term: "Constant", definition: "A number that stays the same" }
    ]
  }
];
