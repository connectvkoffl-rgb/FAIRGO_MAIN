
import { CmsContent } from '../types';
import { v4 as uuidv4 } from 'uuid'; // Simple uuid generator

const defaultKnowledgeId = uuidv4();
const defaultAgentId = uuidv4();

// Default content structure
const defaultContent: CmsContent = {
  hero: {
    tagline: "Introducing World's First AI Calling Technology",
    titleLine1: "We turn your vision into",
    typingPhrases: ['intelligent Voice Agents', 'smarter ride hailing', 'seamless automation'],
  },
  services: {
    title: "Our AI-Driven Services",
    subtitle: "Leverage AI features that boost performance to your business",
    cards: [
      { id: uuidv4(), title: "Automated Solutions for Your Industry", description: "From dispatching rides to managing inventory, our AI handles complex, repetitive tasks so you can focus on growth." },
      { id: uuidv4(), title: "Voice AI Driven Agents", description: "Engage customers with real-time, human-like voice conversations powered by our advanced AI." },
      { id: uuidv4(), title: "AI Development Services", description: "Expert guidance to align technology with your business goals and create a roadmap for success." },
      { id: uuidv4(), title: "Automated Workflows", description: "Design and deploy intelligent systems that operate consistently with zero human oversight." }
    ],
    keyTechnologies: [
        { id: uuidv4(), name: "Conversational AI" },
        { id: uuidv4(), name: "Natural Language Processing" },
        { id: uuidv4(), name: "Speech Recognition (STT)" },
        { id: uuidv4(), name: "Speech Synthesis (TTS)" },
        { id: uuidv4(), name: "Cloud Infrastructure" },
        { id: uuidv4(), name: "Machine Learning" },
    ]
  },
  process: {
      title: "Process is Result",
      subtitle: "The real outcome is only as strong as the system behind it.",
      steps: [
          { id: uuidv4(), title: "Map Accessibility and Define Fair Value", description: "Map user needs with omni-channel flows (IVR, SMS). We establish a driver-first Fair Value Proposition with low commissions and guaranteed income to build a motivated and stable fleet." },
          { id: uuidv4(), title: "Deploy AI Dispatch and Omni-Channel Tech", description: "Deploy our core AI Dispatch Matcher to optimize rides and minimize deadhead miles. Our AI integrates with all booking channels for a hyper-efficient platform delivering sub-5-minute wait times." },
          { id: uuidv4(), title: "Optimize Fairness and Scale Ecosystem", description: "Activate our AI Bias Prevention Framework and scale the ecosystem with key partners for driver financing and tech advantage, creating a transparent, ethical, and scalable ride-hailing platform." }
      ]
  },
  projects: {
    title: "Our Flagship Projects",
    subtitle: "See how we turn bold ideas into automated AI solutions carefully crafted to optimize, scale, and deliver measurable results.",
    list: [
      { id: uuidv4(), name: "AI IVR", description: "An intelligent Interactive Voice Response system that understands natural language, resolving customer queries without complex menus." },
      { id: uuidv4(), name: "AI Agentic Platform", description: "A comprehensive platform for building, deploying, and managing autonomous AI agents for various business tasks." },
      { id: uuidv4(), name: "Workflow Automation", description: "End-to-end automation of complex business processes, from data entry to decision making, reducing manual effort." },
      { id: uuidv4(), name: "Voice Agent for Ride Hailing", description: "Our flagship 'Call to Book' system allowing users to book rides through a simple phone call, no app needed." },
    ],
    // FIX: Added missing featuredArticles to prevent runtime errors
    featuredArticles: [
        { id: uuidv4(), image: "https://picsum.photos/seed/article1/500/300", title: "The Rise of AI in Urban Mobility", description: "How AI is reshaping ride-hailing and logistics in smart cities." },
        { id: uuidv4(), image: "https://picsum.photos/seed/article2/500/300", title: "Conversational AI: The New Customer Service Frontline", description: "Beyond chatbots: exploring the power of voice AI agents in customer engagement." },
    ]
  },
  pricing: {
      title: "Plans for Every Scale",
      subtitle: "Choose the right plan to unlock the power of AI for your business.",
      plans: [
          { id: uuidv4(), name: "Starter", price: "29", period: "mo", description: "For individuals and small teams.", features: ["1 AI Agent", "Basic IVR", "1000 API Calls/mo", "Email Support"], isFeatured: false },
          { id: uuidv4(), name: "Business", price: "49", period: "mo", description: "For growing businesses.", features: ["5 AI Agents", "Advanced AI IVR", "10,000 API Calls/mo", "Priority Email Support", "Workflow Automation"], isFeatured: true },
          { id: uuidv4(), name: "Enterprise", price: "199", period: "mo", description: "For large-scale applications.", features: ["Unlimited AI Agents", "Custom IVR Solutions", "Unlimited API Calls", "Dedicated Support", "On-premise Deployment"], isFeatured: false },
          { id: uuidv4(), name: "Ultimate", price: "499", period: "mo", description: "For mission-critical enterprise operations.", features: ["Everything in Enterprise", "24/7 Dedicated Support", "Custom Model Training", "Dedicated Infrastructure"], isFeatured: false },
      ]
  },
  blog: {
      title: "From Our Blog",
      subtitle: "Insights and updates on the world of Voice AI development.",
      posts: [
          { id: uuidv4(), image: "https://picsum.photos/seed/blog1/400/250", title: "The Future is Voice: Trends in AI Development", excerpt: "Explore the latest trends shaping how we interact with technology through voice and what it means for businesses." },
          { id: uuidv4(), image: "https://picsum.photos/seed/blog2/400/250", title: "Building an Effective AI IVR: A Step-by-Step Guide", excerpt: "A technical deep-dive into the architecture and best practices for creating an IVR that customers actually like using." },
          { id: uuidv4(), image: "https://picsum.photos/seed/blog3/400/250", title: "Case Study: How Voice AI Boosted Ride Hailing Accessibility", excerpt: "Learn how our 'Call to Book' feature opened up a new market segment and increased bookings by 30%." },
          { id: uuidv4(), image: "https://picsum.photos/seed/blog4/400/250", title: "Beyond the Beep: How AI IVR is Revolutionizing Customer Service", excerpt: "Discover how AI-powered Interactive Voice Response systems understand natural language to solve customer issues without frustrating menus." },
          { id: uuidv4(), image: "https://picsum.photos/seed/blog5/400/250", title: "From Hold Music to Helpful Conversations: The AI IVR Revolution", excerpt: "An inside look at how AI is transforming frustrating call center experiences into efficient, helpful, and human-like interactions." }
      ]
  },
  about: {
      title: "About FAIRGO",
      subtitle: "We are a collective of innovators dedicated to democratizing AI technology.",
      description: "FAIRGO is the flagship AI Framework initiative based on a PPP model with government collaborations from a technology incubator focused on building ethical and accessible solutions. Our ecosystem includes Fairgo, A Voice AI powered Ride Hailing Platform, FairForge, our development arm that crafts robust AI platforms, and Fair Bazaar, our custom suite for AI-driven commerce platform and about 50+ other comprehensive features. Together, we are committed to creating technology that empowers businesses and improves lives."
  },
  contact: {
      title: "Get in Touch",
      subtitle: "Have a project in mind or a question for our team? We'd love to hear from you.",
      phone: "+91 96562 00209",
      email: "support@fairgo.ai"
  },
  testimonials: {
    title: "What Our Clients Say",
    subtitle: "Join customers from across India who trust AI to transform their business",
    list: [
      { id: uuidv4(), quote: "The Voice AI agent FAIRGO developed for us has revolutionized our booking process. It's like having a super-efficient employee available 24/7.", name: "Arun Kumar", handle: "@KochiCabs", rating: 5 },
      { id: uuidv4(), quote: "Their AI-powered IVR solution cut down our customer service calls by 40%. The implementation was seamless and the results were immediate.", name: "Priya Nair", handle: "@BangaloreLogistics", rating: 5 },
      { id: uuidv4(), quote: "We wanted to reach customers in rural areas without internet. FAIRGO's 'Call to Book' feature was a game-changer for our e-commerce platform.", name: "Sandeep Menon", handle: "@KeralaCart", rating: 4 },
      { id: uuidv4(), quote: "A transformative partnership. FAIRGO's strategic insights into AI for the Indian market are second to none.", name: "Anjali Verma", handle: "@MumbaiInnovates", rating: 5 }
    ],
  },
  faq: {
      title: "Your Questions Answered",
      subtitle: "Need help? Find fast answers to common questions about our Voice AI solutions.",
      questions: [
          { id: uuidv4(), question: "How does the Voice AI Agent work for ride hailing?", answer: "Customers can simply call a designated number and speak naturally to book a ride, just like talking to a human operator. Our AI understands locations, vehicle types, and can confirm bookings instantly via SMS, no smartphone app needed." },
          { id: uuidv4(), question: "What is an AI IVR and how is it different?", answer: "Unlike traditional IVR systems that rely on keypad inputs ('Press 1 for...'), our AI IVR understands natural language. Callers can state their problem in their own words, and the AI will understand the intent and route them to the right solution or agent, drastically reducing frustration and call time." },
          { id: uuidv4(), question: "Can the Voice AI handle different Indian accents and languages?", answer: "Yes, our models are trained on diverse datasets to understand a wide variety of Indian accents. We also offer multilingual support, allowing you to serve customers in their preferred language, including Malayalam, Hindi, Tamil, and more." },
          { id: uuidv4(), question: "Is this service available internationally?", answer: "Currently, our primary focus is on the Indian market, with specialized support for regional languages and accents. However, our core technology is globally scalable. Please contact us for inquiries about international deployment." },
          { id: uuidv4(), question: "Is the FairGo Ride Hailing platform secure for payments?", answer: "Absolutely. For our 'Call to Book' feature, we use secure payment gateways and methods like UPI payment links sent via SMS, ensuring that transactions are safe and convenient for users without needing an app." }
      ]
  },
  footer: {
      tagline: "Advanced AI solutions, designed for future-focused teams and innovators.",
      copyright: "FAIRGO © 2025."
  },
  chatbot: {
    defaultAgentId: defaultAgentId,
    agents: [
        {
            id: defaultAgentId,
            name: "General Assistant",
            systemInstruction: `You are a friendly and professional assistant for FAIRGO, an AI automation company. Your first goal is to ask for the user's name and their primary interest (e.g., 'ride hailing solutions', 'voice AI agents'). Once you have this information, address them by name and assist with their query concisely and accurately.`,
            knowledgeIds: [defaultKnowledgeId],
            temperature: 0.7,
            maxOutputTokens: 1024,
        }
    ],
    knowledgeBase: [
        {
            id: defaultKnowledgeId,
            type: 'text',
            name: "Core Services Overview",
            content: `FAIRGO offers three core AI services:
- **AI Automation Solutions**: We build systems to automate repetitive tasks and entire workflows. This frees up human teams to focus on strategic work, increasing overall efficiency and productivity. Our automated systems are reliable and can operate 24/7.
- **Custom AI Agents**: We develop intelligent AI agents that are custom-trained on your specific business data and logic. These agents can handle customer service inquiries, streamline internal decision-making, and manage routine operations without manual input.
- **AI Consultancy Services**: We provide expert strategic guidance. Our team helps businesses identify the best opportunities to implement AI, creating a roadmap that aligns technology with core business goals for maximum impact and a strong return on investment.`
        }
    ]
  },
  voiceNavigation: {
    commands: [
      { id: uuidv4(), keywords: ['home', 'go to home', 'main page'], type: 'navigate', target: '#home', feedback: 'Navigating to Home...' },
      { id: uuidv4(), keywords: ['services', 'show me services'], type: 'navigate', target: '#services', feedback: 'Navigating to Services...' },
      { id: uuidv4(), keywords: ['features', 'voice operations'], type: 'navigate', target: '#features', feedback: 'Navigating to Features...' },
      { id: uuidv4(), keywords: ['pricing', 'plans', 'show me pricing', 'can you show me the pricing'], type: 'navigate', target: '#pricing', feedback: 'Navigating to Pricing...' },
      { id: uuidv4(), keywords: ['projects', 'work', 'show me projects', 'i want to see your projects'], type: 'navigate', target: '#projects', feedback: 'Navigating to Projects...' },
      { id: uuidv4(), keywords: ['ai tools', 'tools', 'generator', 'open tools'], type: 'navigate', target: '#tools', feedback: 'Navigating to AI Tools...' },
      { id: uuidv4(), keywords: ['blog', 'blogs', 'posts', 'articles', 'show me blog posts'], type: 'navigate', target: '#blog', feedback: 'Navigating to Blog...' },
      { id: uuidv4(), keywords: ['testimonials', 'reviews', 'show me reviews'], type: 'navigate', target: '#testimonials', feedback: 'Navigating to Testimonials...' },
      { id: uuidv4(), keywords: ['about us', 'about'], type: 'navigate', target: '#about', feedback: 'Navigating to About...' },
      { id: uuidv4(), keywords: ['faq', 'questions', 'show me questions'], type: 'navigate', target: '#faq', feedback: 'Navigating to FAQ...' },
      { id: uuidv4(), keywords: ['contact', 'support', 'contact us'], type: 'navigate', target: '#contact', feedback: 'Navigating to Contact...' },
      { id: uuidv4(), keywords: ['footer for quick view', 'can you show me the footer for quick view', 'quick view footer'], type: 'quick_view', target: '#footer', feedback: 'Quick view: Footer...' },
      { id: uuidv4(), keywords: ['go back', 'back', 'previous page'], type: 'action', target: 'GO_BACK', feedback: 'Going back...' },
      { id: uuidv4(), keywords: ['go forward', 'front', 'next page'], type: 'action', target: 'GO_FORWARD', feedback: 'Going forward...' },
      { id: uuidv4(), keywords: ['open chat', 'start chat'], type: 'action', target: 'OPEN_CHAT', feedback: 'Opening chat...' },
      { id: uuidv4(), keywords: ['close chat', 'end chat'], type: 'action', target: 'CLOSE_CHAT', feedback: 'Closing chat...' },
      { id: uuidv4(), keywords: ['scroll down', 'read the page', 'auto scroll'], type: 'action', target: 'SCROLL_DOWN', feedback: 'Starting auto-scroll...' },
      { id: uuidv4(), keywords: ['stop scrolling', 'stop'], type: 'action', target: 'SCROLL_STOP', feedback: 'Stopping scroll.' },
      { id: uuidv4(), keywords: ['enable voice navigation', 'start voice navigation', 'start listening'], type: 'action', target: 'START_CONTINUOUS', feedback: 'Voice navigation enabled.' },
      { id: uuidv4(), keywords: ['disable voice navigation', 'stop voice navigation', 'stop listening'], type: 'action', target: 'STOP_CONTINUOUS', feedback: 'Voice navigation disabled.' }
    ]
  }
};

const CMS_STORAGE_KEY = 'fairgo_cms_content';

// Initialize with default data if none exists
export const initializeData = (): void => {
  if (!localStorage.getItem(CMS_STORAGE_KEY)) {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(defaultContent));
  }
};

// Get all content data
export const getData = (): CmsContent => {
  const data = localStorage.getItem(CMS_STORAGE_KEY);
  if (data) {
    let parsedData = JSON.parse(data);
    // Gracefully add new sections if they are missing from old data in localStorage
    parsedData = { ...defaultContent, ...parsedData };

    // Also ensure nested objects exist
    parsedData.projects = { ...defaultContent.projects, ...parsedData.projects };
    parsedData.services = { ...defaultContent.services, ...parsedData.services };
    parsedData.chatbot = { ...defaultContent.chatbot, ...parsedData.chatbot };
    parsedData.voiceNavigation = { ...defaultContent.voiceNavigation, ...parsedData.voiceNavigation };


    // Deep merge agents to ensure new properties are added
    if (parsedData.chatbot.agents) {
        parsedData.chatbot.agents = parsedData.chatbot.agents.map((agent: any) => {
            const defaultAgent = defaultContent.chatbot.agents.find(a => a.id === agent.id) || defaultContent.chatbot.agents[0];
            return {...defaultAgent, ...agent};
        });
    }

    return parsedData;
  }
  return defaultContent;
};

// Update content data
export const updateData = (newData: CmsContent): void => {
  localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(newData));
};

// Reset to default data
export const resetToDefaults = (): CmsContent => {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(defaultContent));
    return defaultContent;
};