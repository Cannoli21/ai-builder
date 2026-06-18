export type BuilderTool = {
  name: string;
  category: string;
  description: string;
  useCases: string[];
  stack: string[];
  link: string;
};

export const builderTools: BuilderTool[] = [
  {
    name: "Vevaramotion",
    category: "Motion / Product Video",
    description:
      "Browser-based motion editor for cinematic product videos, SaaS walkthroughs, animated promos, and social content without After Effects complexity.",
    useCases: [
      "SaaS product launch videos",
      "Animated walkthroughs",
      "Marketing demos",
      "Social promos",
      "Founder product explainers"
    ],
    stack: ["React", "PixiJS", "GSAP"],
    link: "https://vevaramotion.com/"
  }
];
