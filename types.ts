
export interface CmsContent {
  hero: {
    tagline: string;
    titleLine1: string;
    typingPhrases: string[];
  };
  services: {
    title: string;
    subtitle: string;
    cards: { id: string; title: string; description: string }[];
    keyTechnologies: { id: string; name: string }[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: { id: string; title: string; description: string }[];
  };
  projects: {
    title: string;
    subtitle: string;
    list: { id: string; name: string; description: string }[];
    featuredArticles: { id: string; image: string; title: string; description: string }[];
  };
  pricing: PricingSection;
  blog: BlogSection;
  about: AboutSection;
  contact: ContactSection;
  testimonials: {
    title: string;
    subtitle: string;
    list: { id: string; quote: string; name: string; handle: string; rating: number }[];
  };
  faq: {
    title: string;
    subtitle: string;
    questions: { id: string; question: string; answer: string }[];
  };
  footer: {
    tagline: string;
    copyright: string;
  };
  chatbot: ChatbotData;
  voiceNavigation: {
    commands: VoiceCommand[];
  };
}

export interface PricingSection {
  title: string;
  subtitle: string;
  plans: {
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    isFeatured: boolean;
  }[];
}

export interface BlogSection {
  title: string;
  subtitle: string;
  posts: {
    id: string;
    image: string;
    title: string;
    excerpt: string;
  }[];
}

export interface AboutSection {
  title: string;
  subtitle: string;
  description: string;
}

export interface ContactSection {
  title: string;
  subtitle: string;
  phone: string;
  email: string;
}

export interface KnowledgeItem {
    id: string;
    type: 'text' | 'file' | 'url';
    name: string;
    source?: string;
    content: string;
}

export interface ChatAgent {
    id: string;
    name: string;
    systemInstruction: string;
    knowledgeIds: string[];
    temperature?: number;
    maxOutputTokens?: number;
}

export interface ChatbotData {
    defaultAgentId: string | null;
    agents: ChatAgent[];
    knowledgeBase: KnowledgeItem[];
}

export interface VoiceCommand {
    id: string;
    keywords: string[];
    type: 'navigate' | 'action' | 'quick_view';
    target: string;
    feedback: string;
}