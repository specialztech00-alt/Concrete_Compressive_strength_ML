// ============================================================
// Site Configuration
// ============================================================

export interface SiteConfig {
  language: string;
  brandName: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  brandName: "BlockPredict ML",
};

// ============================================================
// Navigation
// ============================================================

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  links: NavLink[];
  ctaText: string;
}

export const navigationConfig: NavigationConfig = {
  links: [
    { label: "Predict", href: "#predict" },
    { label: "How It Works", href: "#capabilities" },
    { label: "Technology", href: "#architecture" },
    { label: "Research", href: "#research" },
  ],
  ctaText: "Get Started",
};

// ============================================================
// Hero
// ============================================================

export interface HeroConfig {
  title: string;
  subtitleLine1: string;
  subtitleLine2: string;
  ctaText: string;
}

export const heroConfig: HeroConfig = {
  title: "BlockPredict ML",
  subtitleLine1: "Machine learning-powered prediction of compressive strength for rock-fines sandcrete blocks. Trained on 7,776 laboratory specimens.",
  subtitleLine2: "R2 = 0.9994  |  MAPE = 1.55%",
  ctaText: "Start Prediction",
};

// ============================================================
// Capabilities (How It Works section)
// ============================================================

export interface CapabilityItem {
  title: string;
  slug: string;
  description: string;
  image: string;
}

export interface CapabilitiesConfig {
  sectionLabel: string;
  items: CapabilityItem[];
}

export const capabilitiesConfig: CapabilitiesConfig = {
  sectionLabel: "How It Works",
  items: [
    {
      title: "Input Parameters",
      slug: "input-parameters",
      description: "Select your cement brand, mix ratio, water-cement ratio, curing method, and curing age. All inputs are based on standard construction practices and laboratory conditions.",
      image: "images/capability-1.jpg",
    },
    {
      title: "Laboratory Testing",
      slug: "laboratory-testing",
      description: "Our model was trained on 7,776 physically produced and tested block specimens following Nigerian Industrial Standards (NIS), British Standards (BS), and ASTM procedures.",
      image: "images/capability-2.jpg",
    },
    {
      title: "ML Prediction",
      slug: "ml-prediction",
      description: "Five gradient boosting algorithms were compared. Our primary Gradient Boosting Regressor achieves 99.94% accuracy with comprehensive SHAP explainability analysis.",
      image: "images/capability-3.jpg",
    },
    {
      title: "Structural Advice",
      slug: "structural-advice",
      description: "Receive automated structural recommendations aligned with NIS, BS, and ASTM standards. Know immediately if your blocks are suitable for load-bearing applications.",
      image: "images/capability-4.jpg",
    },
  ],
};

// ============================================================
// Capability Detail (sub-pages)
// ============================================================

export interface CapabilityDetailData {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export interface CapabilityDetailConfig {
  sectionLabel: string;
  backLinkText: string;
  prevLabel: string;
  nextLabel: string;
  notFoundText: string;
  capabilities: Record<string, CapabilityDetailData>;
}

export const capabilityDetailConfig: CapabilityDetailConfig = {
  sectionLabel: "Capability",
  backLinkText: "Back to home",
  prevLabel: "Previous",
  nextLabel: "Next",
  notFoundText: "Capability not found.",
  capabilities: {
    "input-parameters": {
      title: "Input Parameters",
      subtitle: "Five key factors that determine compressive strength.",
      paragraphs: [
        "The prediction system accepts five fundamental parameters that directly influence the compressive strength of rock-fines sandcrete blocks. Cement brand selection includes Dangote (highest performing), Lafarge, BUA, and PureChem (lowest performing), based on extensive laboratory testing.",
        "The mix ratio ranges from 1:5 (cement-rich, strongest) to 1:10 (leanest mix). Water-cement ratios of 0.50, 0.55, 0.60, and 0.65 are supported, with lower ratios generally producing stronger blocks.",
        "Curing method and age are critical factors. Submerged curing produces the strongest blocks, followed by sprinkling and open-air curing. Standard testing ages are 7, 14, and 28 days, with strength developing significantly over time.",
      ],
    },
    "laboratory-testing": {
      title: "Laboratory Testing",
      subtitle: "7,776 experimentally generated data points.",
      paragraphs: [
        "The dataset comprises 7,776 physically produced and tested block specimens, generated through a comprehensive factorial experimental design. Every combination of cement brand, mix ratio, water-cement ratio, curing method, and curing age was tested with multiple replicates.",
        "All specimens were prepared and tested in accordance with established standards including Nigerian Industrial Standards (NIS), British Standards (BS), and American Society for Testing and Materials (ASTM) procedures for compressive strength determination.",
        "The experimental design ensures complete coverage of the parameter space, enabling the machine learning model to learn accurate relationships between manufacturing parameters and resulting compressive strength across all tested conditions.",
      ],
    },
    "ml-prediction": {
      title: "ML Prediction Engine",
      subtitle: "Five algorithms compared, one champion selected.",
      paragraphs: [
        "Five state-of-the-art machine learning algorithms were trained and evaluated: Gradient Boosting Regressor (primary), Random Forest, XGBoost, CatBoost, and Decision Tree. All models achieved exceptional performance with R2 values exceeding 0.999.",
        "The Gradient Boosting Regressor was selected as the primary model based on its balance of accuracy, interpretability, and deployment efficiency. Model performance was validated using 5-fold cross-validation with shuffling to ensure robustness.",
        "Comprehensive explainability analysis was performed using SHAP (SHapley Additive exPlanations) values. Curing age emerged as the dominant predictive feature, followed by cement brand, confirming well-established concrete science principles.",
      ],
    },
    "structural-advice": {
      title: "Structural Advice System",
      subtitle: "Standards-aligned recommendations in real-time.",
      paragraphs: [
        "The integrated structural advice module automatically categorizes predicted strength into High, Moderate, or Low classifications and provides actionable recommendations based on Nigerian Industrial Standards (NIS), British Standards (BS), and ASTM/ACI guidelines.",
        "For high-strength predictions (above 3.5 MPa), blocks are deemed suitable for load-bearing structural applications. Moderate strength (2.0-3.5 MPa) indicates acceptability with quality monitoring. Low strength (below 2.0 MPa) triggers recommendations for mix optimization.",
        "Users can select their preferred design standard to receive jurisdiction-specific guidance, making the system practical for engineers, contractors, and quality control professionals working across different regulatory environments.",
      ],
    },
  },
};

// ============================================================
// Architecture (Technology section)
// ============================================================

export interface ArchitectureConfig {
  sectionLabel: string;
  videoPath: string;
  title: string;
  description: string;
}

export const architectureConfig: ArchitectureConfig = {
  sectionLabel: "Technology",
  videoPath: "/videos/cinematic-vision.mp4",
  title: "Gradient Boosting Intelligence",
  description: "Our primary model uses scikit-learn's Gradient Boosting Regressor with 200 estimators, 0.1 learning rate, and max depth of 5. The model achieves R2 = 0.9994, RMSE = 0.0527, MAE = 0.0389, and MAPE = 1.55% on held-out test data. Feature importance analysis confirms curing age as the dominant predictor, aligning with established concrete science.",
};

// ============================================================
// Research (Project findings section)
// ============================================================

export interface ResearchProject {
  title: string;
  year: string;
  discipline: string;
  image: string;
}

export interface ResearchConfig {
  sectionLabel: string;
  projects: ResearchProject[];
}

export const researchConfig: ResearchConfig = {
  sectionLabel: "Research Findings",
  projects: [
    { title: "Cement Brand Study", year: "2026", discipline: "Materials Science", image: "images/research-1.jpg" },
    { title: "Curing Method Analysis", year: "2026", discipline: "Civil Engineering", image: "images/research-2.jpg" },
    { title: "Mix Ratio Optimization", year: "2026", discipline: "Structural Engineering", image: "images/research-3.jpg" },
    { title: "W/C Ratio Effects", year: "2026", discipline: "Concrete Technology", image: "images/research-4.jpg" },
    { title: "7-Day Strength Model", year: "2026", discipline: "Predictive Analytics", image: "images/research-1.jpg" },
    { title: "28-Day Peak Strength", year: "2026", discipline: "Materials Testing", image: "images/research-2.jpg" },
    { title: "Submerged Curing Study", year: "2026", discipline: "Civil Engineering", image: "images/research-3.jpg" },
    { title: "NIS Standards Review", year: "2026", discipline: "Code Compliance", image: "images/research-4.jpg" },
  ],
};

// ============================================================
// Footer
// ============================================================

export interface FooterLinkColumn {
  title: string;
  links: string[];
}

export interface FooterBottomLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  heading: string;
  columns: FooterLinkColumn[];
  copyright: string;
  bottomLinks: FooterBottomLink[];
}

export const footerConfig: FooterConfig = {
  heading: "Predict with confidence.",
  columns: [
    {
      title: "Project",
      links: ["Research Paper", "Dataset", "Model Card", "Documentation"],
    },
    {
      title: "Standards",
      links: ["NIS 87:2000", "BS 6073", "ASTM C90", "ACI 530"],
    },
  ],
  copyright: "\u00A9 2026 BlockPredict ML Research Project. All rights reserved.",
  bottomLinks: [
    { label: "Ethics Statement", href: "#" },
    { label: "Data Privacy", href: "#" },
    { label: "Contact", href: "#" },
  ],
};
