export const siteConfig = {
  name: "Neon Noir",
  title: "Neon Noir Portfolio",
  description:
    "High-fidelity, performance-driven interfaces for visionary brands. Bridging the gap between cinematic design and robust engineering.",
  url: "https://neonnoir.design",
  email: "hello@neonnoir.design",
  location: "San Francisco, Grid Sector 4",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    dribbble: "https://dribbble.com",
    twitter: "https://twitter.com",
  },
};

export const navLinks = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export interface Project {
  slug: string;
  title: string;
  category: string;
  categoryColor: "secondary" | "tertiary";
  description: string;
  shortDescription: string;
  image: string;
  tags: string[];
  client: string;
  role: string;
  techStack: string[];
  challenge: string;
  solution: string;
  features: {
    icon: string;
    title: string;
    description: string;
    color: "secondary" | "tertiary";
  }[];
  gallery: { src: string; alt: string; span?: "full" | "half" }[];
  nextProject?: string;
}

export const projects: Project[] = [
  {
    slug: "quantum-ledger",
    title: "Quantum Ledger",
    category: "Fintech",
    categoryColor: "tertiary",
    description:
      "A decentralized finance dashboard with real-time predictive modeling. Dark mode optimized for professional traders.",
    shortDescription:
      "Redefining institutional wealth management through decentralized architecture, predictive AI modeling, and an uncompromising approach to cryptographic security.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYNnJ7dHUvrwqLYFaZBEw8aql06VtiiY-YfVNfBvEnaZLEK0cvhtkVUjwzKA367xHDIu5TQjEmh0FwbngqsPPtpi7lIjOJUPdOD8_nEBBvxRZhIgh78bGL-EhpbenDT5wzfGIJm7uP0gudaTmE9rJtJQIeuknG31hRUw25KCi3f6Anpx7g_KjgV8bih8Yc5YitAIEZMAdZLFR-gcw9w8mGADH-m2Yu0Fg15gOB4xnhLM0zr15nAhknF2idpeAAXkxTN1zHzNW7EaM",
    tags: ["Web App", "Fintech"],
    client: "Aether Financial Group",
    role: "Lead Product Design & Engineering",
    techStack: [
      "React 18",
      "Next.js",
      "WebGL / Three.js",
      "Framer Motion",
      "Tailwind CSS",
      "WebSocket",
    ],
    challenge:
      "Legacy financial institutions face a critical bottleneck: processing high-frequency trading data while maintaining absolute cryptographic integrity across distributed nodes. The existing infrastructure was monolithic, opaque, and inherently susceptible to latency-induced slippage.",
    solution:
      "We architected a bespoke, event-driven ledger interface that visualizes complex algorithmic flows in real-time. By leveraging a WebGL-powered canvas superimposed on a highly optimized React tree, we eliminated UI blocking during massive data ingests, achieving a sustained 60fps rendering of volatile market depth charts.",
    features: [
      {
        icon: "monitoring",
        title: "Real-time Analytics",
        description:
          "Sub-millisecond latency data streams rendered through a custom WebGL pipeline, ensuring traders never miss a micro-fluctuation.",
        color: "secondary",
      },
      {
        icon: "psychology",
        title: "Predictive AI Modeling",
        description:
          "Integration of proprietary neural networks to forecast volume spikes and liquidity drainages before they hit the open order book.",
        color: "tertiary",
      },
      {
        icon: "lock",
        title: "Cryptographic Vault",
        description:
          "Multi-signature biometric authentication layers combined with hardware-level encryption protocols for cold-storage asset management.",
        color: "secondary",
      },
    ],
    gallery: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3321e6EGBPzAtOhbPUgK4uTXdBb3ooN_5J8-8a2LoGPdQm3aBjnr4FgyNKgcARiLPVvwRCvcUtizLGlRCkiXN--DgCNWhsxB5c8yl7VSudCzQzfX5Mkb5h2AoajgIUUVSxfLRRWgAiQk3SUavpwH4NwwObfRQn36xaLNuX_fB4zinx3jjJc6KODiS7VkjAmtNhuSHIOACBatS_ov1ZZXvl2BrI7xoSF1MvXyHY3uWlTLeXcGhmiXTjcHglE_Vzi_DzaPMTVFXbU4",
        alt: "Dark mode UI mobile app showing financial graphs",
        span: "half",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwqfs_3oKMmCaLwr0Nwpe-bvEo1SAOqPUvHvQ-iVxFoSrq7NYNYupO7w_1pXVGoOohTXJB8J_N_EbGdzi-hDVot4_PNBSITH4wHU5qGP-kK-1iwPKL0eW03wzhmFnilO6BSYV60oSHn6z5judjXnO8-dbLlmNyYVxwLJ7uNtW3ZTe2VDWXb6dbyg_seuSStSE2mM6MUcBD1Mv60g7MYuVqpwDy_lhCtOeGpIdKRwJpGK-FnSE4fYkYmfh-acQSAsMm2452l20OkXU",
        alt: "3D data nodes connecting in space",
        span: "half",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCECxc0n82Pf9q7Lf7_p8Yf-lfNMBWsegUdnQpJ6SQswP3ePNYq-CYXGy38M98LStmCR8D1oGqSCUZXbfT2ta6-Rrg2lKVTwEHDGgYgrY8v8K2xzDYGMXWV7bH-qI-IXiofBrxsbNylRgwfG05LOVbo5uRcaGsM0_sTJ83Xw8z9RwvjMFGVSSMhQbZR838YEfxKw5kE60yAA0VlSAcexg9UB2LBth7_xK5UiQItHWvkfzWY4b-3-s6IZJb_gIpu5ZYWWsUjfDstomc",
        alt: "Secure vault biometric interface",
        span: "full",
      },
    ],
    nextProject: "aether-storefront",
  },
  {
    slug: "aether-storefront",
    title: "Aether Storefront",
    category: "E-Commerce",
    categoryColor: "secondary",
    description:
      "A next-generation e-commerce platform with immersive product experiences and lightning-fast checkout flows.",
    shortDescription:
      "Crafting a luxury digital retail experience with 3D product visualization and AI-powered personalization.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmKzGbi-ZC8F00IOa0o4dFXyZp9LOI6Fts4sY8EUp1LhBD0d7_Mn0pNM0G9toFYruxGy2UqK8j49m8VjtxhJFyy0Tv_F-5elj0niE3mJi1srwCz5EnHIPkJrahT6Q-2K_LNTgufrvnTEdwDTDtOPPWpN_DA3W3V8GPKUtfnQGr7CTgsfjMxtq2xxE7GT33T8jvzvT_7e97saQLUMAoG30Mi35annda-QkrvDjkbekicUgZW5V9-q1RVfY_xzQ61BxGpH5CLEdvdYY",
    tags: ["E-Commerce"],
    client: "Aether Collective",
    role: "Frontend Architect",
    techStack: ["Next.js", "Three.js", "Stripe", "Tailwind CSS", "Framer Motion"],
    challenge:
      "Traditional e-commerce platforms fail to create emotional connections with luxury products. Flat images and generic layouts cannot convey the craftsmanship and premium quality that high-end brands demand.",
    solution:
      "We built an immersive storefront with 3D product configurators, cinematic scroll experiences, and a seamless checkout flow that reduced cart abandonment by 34%.",
    features: [
      {
        icon: "view_in_ar",
        title: "3D Product Viewer",
        description:
          "Interactive WebGL-powered product viewer allowing 360° exploration with realistic materials and lighting.",
        color: "secondary",
      },
      {
        icon: "speed",
        title: "Instant Checkout",
        description:
          "One-tap purchasing with Stripe integration and predictive cart optimization reducing friction to zero.",
        color: "tertiary",
      },
      {
        icon: "palette",
        title: "Dynamic Theming",
        description:
          "Each product category features a unique visual identity with adaptive color schemes and micro-animations.",
        color: "secondary",
      },
    ],
    gallery: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmKzGbi-ZC8F00IOa0o4dFXyZp9LOI6Fts4sY8EUp1LhBD0d7_Mn0pNM0G9toFYruxGy2UqK8j49m8VjtxhJFyy0Tv_F-5elj0niE3mJi1srwCz5EnHIPkJrahT6Q-2K_LNTgufrvnTEdwDTDtOPPWpN_DA3W3V8GPKUtfnQGr7CTgsfjMxtq2xxE7GT33T8jvzvT_7e97saQLUMAoG30Mi35annda-QkrvDjkbekicUgZW5V9-q1RVfY_xzQ61BxGpH5CLEdvdYY",
        alt: "Luxury product display",
        span: "full",
      },
    ],
    nextProject: "neuro-sync",
  },
  {
    slug: "neuro-sync",
    title: "Neuro-Sync UI",
    category: "SaaS Interface",
    categoryColor: "tertiary",
    description:
      "A cognitive computing interface that adapts to user behavior patterns in real-time.",
    shortDescription:
      "Building the next evolution of adaptive interfaces with neural feedback loops and predictive UI rendering.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAS961q7JWyvyDvOg591VvDQOpHMa_pkYPre16y2n6zv-gPsMsG_Y-FsxwmLNOiK3HapO36NQ4IOr2zaZ0HTVKA-0dG8Lt3PA0_DWJQ3I3bliEl8FU32YWqBNe_qlRVb6l1JxmE1hNiexR3lnHRpihh8QzRYSsdlNo54rNQIimzhT_D-gsThVHBeT-2TpUoPYBqqvtffUIIA19HTM6FsTPXcgitzGClSgHkj4b02f34KYwtRLa3vYZ8yxuSqR25-DNIyqLgC8sAVtk",
    tags: ["SaaS Interface"],
    client: "Neural Dynamics Inc.",
    role: "Design Engineer",
    techStack: ["React", "TypeScript", "D3.js", "TensorFlow.js", "Tailwind CSS"],
    challenge:
      "Enterprise SaaS dashboards are notoriously complex and unintuitive. Users waste hours navigating dense interfaces that were designed for data, not humans.",
    solution:
      "We developed an adaptive UI framework that learns user behavior patterns and progressively simplifies the interface, surfacing the most relevant tools and data contextually.",
    features: [
      {
        icon: "auto_awesome",
        title: "Adaptive Layout",
        description:
          "The interface evolves based on usage patterns, progressively surfacing relevant tools.",
        color: "secondary",
      },
      {
        icon: "insights",
        title: "Smart Analytics",
        description:
          "AI-driven data visualization that automatically selects optimal chart types for datasets.",
        color: "tertiary",
      },
      {
        icon: "grid_view",
        title: "Modular Widgets",
        description:
          "Drag-and-drop widget system with real-time data binding and cross-widget communication.",
        color: "secondary",
      },
    ],
    gallery: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS961q7JWyvyDvOg591VvDQOpHMa_pkYPre16y2n6zv-gPsMsG_Y-FsxwmLNOiK3HapO36NQ4IOr2zaZ0HTVKA-0dG8Lt3PA0_DWJQ3I3bliEl8FU32YWqBNe_qlRVb6l1JxmE1hNiexR3lnHRpihh8QzRYSsdlNo54rNQIimzhT_D-gsThVHBeT-2TpUoPYBqqvtffUIIA19HTM6FsTPXcgitzGClSgHkj4b02f34KYwtRLa3vYZ8yxuSqR25-DNIyqLgC8sAVtk",
        alt: "SaaS interface dashboard",
        span: "full",
      },
    ],
    nextProject: "onyx-void",
  },
  {
    slug: "onyx-void",
    title: "Onyx & Void",
    category: "Brand Identity",
    categoryColor: "secondary",
    description:
      "A comprehensive brand identity system for a luxury fashion house blending minimalism with digital art.",
    shortDescription:
      "Crafting a complete visual identity system that bridges physical luxury with digital experience design.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDinZlwe5-dS2f9jJqist5dHkGZo2WAJcKQEmADNHrMAblT_4f7q6TUf4JujHP0jsfkG3TcqSej7B_vEDC1MIjJgv6HJypfj7q3n0ExlZoge8dT7j1X6-jtHq4GOp2u2tBBuu3FLCxPiz4bY1g67335f1zG2-61Zq2_Lrplp2zMQO217iuHa1OJ8Hfu_4lrNrdZ-LB70tmncpQ8qRsGqBxnkAgpuoGX-GqA0jrekebEaA8o4QwtgZjl1XnqD76LWJRkqZxN8Uz4q0Q",
    tags: ["Brand Identity"],
    client: "Onyx & Void Fashion",
    role: "Creative Director",
    techStack: ["Figma", "After Effects", "Three.js", "GLSL Shaders"],
    challenge:
      "Luxury fashion brands struggle to maintain their exclusive aura in digital spaces where everyone competes with the same template-based websites and social media formats.",
    solution:
      "We crafted a bespoke digital brand language with custom typography, generative art systems, and immersive web experiences that translate the tactile luxury of physical fashion into compelling digital narratives.",
    features: [
      {
        icon: "brush",
        title: "Generative Visuals",
        description:
          "Custom GLSL shaders create unique, never-repeating visual textures for every campaign.",
        color: "secondary",
      },
      {
        icon: "text_fields",
        title: "Custom Typography",
        description:
          "Bespoke variable font designed to fluidly adapt across digital and physical touchpoints.",
        color: "tertiary",
      },
      {
        icon: "motion_photos_on",
        title: "Motion System",
        description:
          "A comprehensive motion language defining how every element enters, exists, and transitions.",
        color: "secondary",
      },
    ],
    gallery: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDinZlwe5-dS2f9jJqist5dHkGZo2WAJcKQEmADNHrMAblT_4f7q6TUf4JujHP0jsfkG3TcqSej7B_vEDC1MIjJgv6HJypfj7q3n0ExlZoge8dT7j1X6-jtHq4GOp2u2tBBuu3FLCxPiz4bY1g67335f1zG2-61Zq2_Lrplp2zMQO217iuHa1OJ8Hfu_4lrNrdZ-LB70tmncpQ8qRsGqBxnkAgpuoGX-GqA0jrekebEaA8o4QwtgZjl1XnqD76LWJRkqZxN8Uz4q0Q",
        alt: "Brand identity visuals",
        span: "full",
      },
    ],
    nextProject: "quantum-ledger",
  },
];

export const skills = {
  frontend: [
    { name: "React / Next.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Tailwind CSS / Styling", level: 98 },
  ],
  design: [
    "Figma Prototyping",
    "Design Systems",
    "Micro-interactions",
    "Accessibility (a11y)",
  ],
};
