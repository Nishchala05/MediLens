/**
 * Medical Lab Report Explainer Types
 */

export type LabCategory = 
  | 'hematology' 
  | 'lipid' 
  | 'diabetes' 
  | 'kft' 
  | 'lft' 
  | 'thyroid' 
  | 'urine' 
  | 'semen' 
  | 'general';

export type FindingStatus = 
  | 'normal' 
  | 'low' 
  | 'high' 
  | 'critical_low' 
  | 'critical_high' 
  | 'borderline'
  | 'present'
  | 'not_applicable';

export interface MealIdea {
  meal: 'Breakfast' | 'Lunch' | 'Evening Snack' | 'Dinner';
  foodItems: string[];
  why: string;
  culturalPracticalItems?: string[];
}

export interface TextbookSource {
  textbookName: string;
  edition?: string;
  chapterOrSection: string;
  citationDetail: string;
}

export interface MedicalTermDefinition {
  term: string;
  simpleMeaning: string;
}

export interface ConcludedLimits {
  canConclude: string[];
  cannotConclude: string[];
}

export interface LabFinding {
  id: string;
  testName: string;
  category: LabCategory;
  userValue: string | number;
  numericValue?: number;
  unit: string;
  referenceRange: string;
  status: FindingStatus;
  isAbnormal: boolean;
  isCritical: boolean;
  criticalNotice?: string;
  
  // Medical Term -> Simple Meaning
  termDefinition?: MedicalTermDefinition;

  // The 5-Step Plain-Language Pedagogical Breakdown
  // 1. What does it mean? (One or two simple sentences)
  whatDoesItMean: string;

  // 2. Why does it happen? (Underlying physiology/pathology/biochemistry in simple cause -> effect terms)
  whyDoesItHappen: string;

  // 3. What does it mean in this report? (Connected specifically to user's reported number)
  whatItMeansInThisReport: string;

  // 4. What can and cannot be concluded? (Clear clinical boundaries and interpretation limits)
  whatCanAndCannotBeConcluded: ConcludedLimits;

  // 5. Textbook basis (Authorized MBBS reference supporting this concept)
  source: TextbookSource;

  // Practical Nutrition & Doctor Visit Guidance
  whatCouldBeAssociated: string[];
  whatCanIDo: string;
  simpleDailyExamples?: MealIdea[];
  questionsForDoctor: string[];
  safetyDisclaimer: string;

  // Compatibility aliases
  yourResultSummary?: string;
  whatIsThis?: string;
  whyDoesItMatter?: string;
}

export type MythVerdict = 
  | 'Myth' 
  | 'Partly True' 
  | 'Context-Dependent' 
  | 'Supported by Evidence';

export interface MedicalMyth {
  id: string;
  myth: string;
  verdict: MythVerdict;
  theFact: string;
  why: string;
  inThisReport: string;
  textbookBasis: {
    textbookName: string;
    edition?: string;
    chapterOrSection: string;
    citationDetail?: string;
  };
  evidenceDiscipline: {
    textbookFact: string;
    interpretation: string;
    uncertainty: string;
  };
  relatedCategory?: LabCategory;
  relatedParameters?: string[];
  isApplicableToReport?: boolean;
}

export interface AnalysisResult {
  id: string;
  reportTitle: string;
  patientName?: string;
  reportDate?: string;
  overallSummary: string;
  criticalAlerts: string[];
  findings: LabFinding[];
  generalNutritionSummary?: string;
  allDoctorQuestions: string[];
  analyzedAt: string;
  sourceTextbooksUsed: string[];
  myths?: MedicalMyth[];
  language?: string;
  languageCode?: string;
}

export interface SampleReportPreset {
  id: string;
  title: string;
  category: LabCategory;
  subtitle: string;
  badge: string;
  description: string;
  sampleText: string;
  parameters: Array<{
    name: string;
    value: string | number;
    unit: string;
    range: string;
  }>;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: {
    textbookName: string;
    chapterOrSection?: string;
  };
  suggestedFollowUps?: string[];
  referencedParameters?: string[];
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
];

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0]; // English

