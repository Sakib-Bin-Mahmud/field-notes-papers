import { InterestGroup } from "./types";

// This is the default interest profile. It's editable from the Settings page
// (stored in localStorage after first edit), so this file is only the
// fallback / factory-reset profile.
export const DEFAULT_INTERESTS: InterestGroup[] = [
  {
    id: "sign-lang-accessibility",
    label: "Sign Language Recognition & Accessibility",
    tier: "Core",
    keywords: [
      "sign language recognition",
      "sign language translation",
      "accessibility technology",
      "assistive technology",
    ],
    arxivCategories: ["cs.CV", "cs.HC"],
  },
  {
    id: "multimodal-vlm",
    label: "Multimodal AI & Vision-Language Models",
    tier: "Core",
    keywords: [
      "vision-language model",
      "multimodal learning",
      "multimodal large language model",
      "visual question answering",
    ],
    arxivCategories: ["cs.CV", "cs.CL"],
  },
  {
    id: "low-resource-nlp",
    label: "Low-Resource NLP",
    tier: "Adjacent",
    keywords: [
      "low-resource language",
      "low-resource NLP",
      "multilingual NLP",
      "Bengali NLP",
    ],
    arxivCategories: ["cs.CL"],
  },
  {
    id: "efficient-dl",
    label: "Deep Learning & Model Efficiency",
    tier: "Adjacent",
    keywords: [
      "efficient deep learning",
      "model compression",
      "lightweight neural network",
      "knowledge distillation",
    ],
    arxivCategories: ["cs.LG", "cs.CV"],
  },
  {
    id: "human-centred-ai",
    label: "Human-Centred AI",
    tier: "Broaden",
    keywords: [
      "human-centered AI",
      "human-AI interaction",
      "participatory design AI",
    ],
    arxivCategories: ["cs.HC"],
  },
];

export const INTERESTS_STORAGE_KEY = "paper-tracker:interests";
