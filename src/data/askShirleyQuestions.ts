export type AskShirleyCategory =
  | "all"
  | "design"
  | "projects"
  | "ai"
  | "research"
  | "creative"
  | "career"
  | "personal";

export type AskShirleyQuestion = {
  id: string;
  number: string;
  text: string;
  category: Exclude<AskShirleyCategory, "all">;
};

export const ASK_SHIRLEY_CATEGORIES: { id: AskShirleyCategory; label: string }[] = [
  { id: "all", label: "All Questions" },
  { id: "design", label: "Design & Philosophy" },
  { id: "projects", label: "Projects" },
  { id: "ai", label: "AI & Technology" },
  { id: "research", label: "Research" },
  { id: "creative", label: "Creative Process" },
  { id: "career", label: "Career & Work" },
  { id: "personal", label: "Personal" },
];

export const ASK_SHIRLEY_QUESTIONS: AskShirleyQuestion[] = [
  {
    id: "personal-project",
    number: "01",
    text: "What makes a project feel personal to you?",
    category: "personal",
  },
  {
    id: "portfolio-design",
    number: "02",
    text: "Why do you design your portfolio the way you do?",
    category: "design",
  },
  {
    id: "problems-enjoy",
    number: "03",
    text: "What kind of problems do you enjoy solving?",
    category: "career",
  },
  {
    id: "tech-art",
    number: "04",
    text: "How do you think about the relationship between technology and art?",
    category: "creative",
  },
  {
    id: "good-ai-design",
    number: "05",
    text: "What does good AI design mean to you?",
    category: "ai",
  },
  {
    id: "proud-projects",
    number: "06",
    text: "What projects are you most proud of and why?",
    category: "projects",
  },
  {
    id: "echo-learn",
    number: "07",
    text: "What did you learn from building Echo?",
    category: "projects",
  },
  {
    id: "nommi-inspire",
    number: "08",
    text: "What inspired Nommi and what problem does it solve?",
    category: "projects",
  },
  {
    id: "research-vs-build",
    number: "09",
    text: "How do you approach research vs. building products?",
    category: "research",
  },
  {
    id: "work-environment",
    number: "10",
    text: "What kind of work environment helps you thrive?",
    category: "career",
  },
  {
    id: "design-principles",
    number: "11",
    text: "What design principles guide your work?",
    category: "design",
  },
  {
    id: "next-opportunity",
    number: "12",
    text: "What are you looking for in your next opportunity?",
    category: "career",
  },
  {
    id: "creativity-systems",
    number: "13",
    text: "How do you balance creativity and systems thinking?",
    category: "creative",
  },
  {
    id: "memorable-portfolio",
    number: "14",
    text: "What do you think makes a portfolio memorable?",
    category: "design",
  },
  {
    id: "currently-curious",
    number: "15",
    text: "What are you currently curious about?",
    category: "personal",
  },
  {
    id: "money-no-matter",
    number: "16",
    text: "What would you be working on if money didn't matter?",
    category: "personal",
  },
  {
    id: "uncertainty",
    number: "17",
    text: "How do you deal with uncertainty in complex projects?",
    category: "research",
  },
  {
    id: "past-self",
    number: "18",
    text: "What advice would you give to your past self?",
    category: "personal",
  },
  {
    id: "shaped-by",
    number: "19",
    text: "What books, ideas, or people have shaped you?",
    category: "creative",
  },
  {
    id: "misunderstand",
    number: "20",
    text: "What's something people usually misunderstand about you?",
    category: "personal",
  },
];

export function questionsForCategory(category: AskShirleyCategory): AskShirleyQuestion[] {
  if (category === "all") return ASK_SHIRLEY_QUESTIONS;
  return ASK_SHIRLEY_QUESTIONS.filter((q) => q.category === category);
}
