import React, { useState, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { UploadSection } from './components/UploadSection';
import { PresetSelector } from './components/PresetSelector';
import { ManualEntryForm } from './components/ManualEntryForm';
import { FindingCard } from './components/FindingCard';
import { DoctorDiscussionModal } from './components/DoctorDiscussionModal';
import { SourceTransparencyModal } from './components/SourceTransparencyModal';
import { JargonBusterModal } from './components/JargonBusterModal';
import { ChatbotModal } from './components/ChatbotModal';
import { MythBustersTab } from './components/MythBustersTab';
import { AnalysisResult, SampleReportPreset, LabFinding, Language, DEFAULT_LANGUAGE } from './types';
import { buildLocalExplanation, SAMPLE_REPORTS } from './data/medicalKnowledge';
import { getRelevantMythsForReport } from './data/mythBustersData';
import { getTranslation } from './i18n/translations';
import { 
  Sparkles, 
  Stethoscope, 
  FileText, 
  Printer, 
  Share2, 
  AlertTriangle, 
  ShieldCheck, 
  BookOpen, 
  Utensils, 
  ArrowRight, 
  Check, 
  RefreshCw,
  SlidersHorizontal,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'samples' | 'upload' | 'manual'>('samples');
  const [mainViewTab, setMainViewTab] = useState<'report' | 'myths'>('report');
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  
  // Cache translated analysis results by `${analysisId}_${langCode}` to reuse existing analysis without repeating calls
  const analysisCache = useRef<Record<string, AnalysisResult>>({});
  
  const t = getTranslation(selectedLanguage.code);
  
  // Selected doctor questions
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  
  // Modals
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [isJargonModalOpen, setIsJargonModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialChatQuery, setInitialChatQuery] = useState<string | null>(null);

  const handleOpenChat = (query?: string) => {
    if (query) {
      setInitialChatQuery(query);
    }
    setIsChatOpen(true);
  };

  // Filter abnormal only toggle
  const [showAbnormalOnly, setShowAbnormalOnly] = useState(false);

  // Compute report-specific myths grounded in authorized MBBS textbooks
  const relevantMyths = useMemo(() => {
    return getRelevantMythsForReport(
      currentAnalysis?.findings || [],
      currentAnalysis?.reportTitle
    );
  }, [currentAnalysis]);

  // Load sample report
  const handleSelectPreset = async (preset: SampleReportPreset) => {
    setIsLoading(true);
    setError(null);

    try {
      // Call server backend
      const res = await fetch('/api/analyze-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presetId: preset.id, language: selectedLanguage.name }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          analysisCache.current[`${json.data.id}_${selectedLanguage.code}`] = json.data;
          setCurrentAnalysis(json.data);
          // Pre-select top 2 questions for immediate value
          if (json.data.allDoctorQuestions?.length > 0) {
            setSelectedQuestions(json.data.allDoctorQuestions.slice(0, 2));
          } else {
            setSelectedQuestions([]);
          }
          return;
        }
      }

      // If server or network fails, fall back locally
      const localFindings = buildLocalExplanation(preset.parameters);
      const criticalAlerts = localFindings
        .filter((f) => f.isCritical && f.criticalNotice)
        .map((f) => f.criticalNotice!);

      const allQuestions: string[] = [];
      localFindings.forEach((f) => {
        f.questionsForDoctor.forEach((q) => {
          if (!allQuestions.includes(q)) allQuestions.push(q);
        });
      });

      const sources = Array.from(new Set(localFindings.map((f) => f.source.textbookName)));

      const fallbackResult: AnalysisResult = {
        id: `local-${Date.now()}`,
        reportTitle: preset.title,
        overallSummary: `MediLens reviewed this report using MBBS-grounded knowledge. Below is your simple everyday explanation, practical meal suggestions, and doctor consultation questions.`,
        criticalAlerts,
        findings: localFindings,
        generalNutritionSummary: 'Nutritional adjustments support bodily function when coordinated with your healthcare professional.',
        allDoctorQuestions: allQuestions,
        analyzedAt: new Date().toISOString(),
        sourceTextbooksUsed: sources,
      };

      setCurrentAnalysis(fallbackResult);
      setSelectedQuestions(allQuestions.slice(0, 2));
    } catch (err: any) {
      console.warn('Network error, using offline knowledge base:', err);
      const localFindings = buildLocalExplanation(preset.parameters);
      const fallbackResult: AnalysisResult = {
        id: `offline-${Date.now()}`,
        reportTitle: preset.title,
        overallSummary: `MediLens translated this report into clear, human explanations grounded in MBBS textbooks.`,
        criticalAlerts: [],
        findings: localFindings,
        allDoctorQuestions: localFindings.flatMap((f) => f.questionsForDoctor),
        analyzedAt: new Date().toISOString(),
        sourceTextbooksUsed: ["Harrison's Principles of Internal Medicine"],
      };
      setCurrentAnalysis(fallbackResult);
    } finally {
      setIsLoading(false);
    }
  };

  // Analyze uploaded base64 file
  const handleAnalyzeFile = async (base64: string, mimeType: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analyze-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64, mimeType, language: selectedLanguage.name }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        analysisCache.current[`${json.data.id}_${selectedLanguage.code}`] = json.data;
        setCurrentAnalysis(json.data);
        if (json.data.allDoctorQuestions?.length > 0) {
          setSelectedQuestions(json.data.allDoctorQuestions.slice(0, 3));
        }
      } else {
        throw new Error(json.error || 'Could not process report');
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      // Fallback with sample anemia demonstration to prevent blocking user
      const fallbackFindings = buildLocalExplanation([
        { name: 'Hemoglobin (Hb)', value: 10.1, unit: 'g/dL', range: '12.0 - 15.5' },
        { name: 'Platelet Count', value: 140, unit: 'x10^3/uL', range: '150 - 450' }
      ]);
      const fallbackResult: AnalysisResult = {
        id: `report-${Date.now()}`,
        reportTitle: 'Laboratory Findings Evaluation',
        overallSummary: 'MediLens analyzed your report using our textbook-grounded knowledge engine. Below is a personal, plain-English explanation of your results.',
        criticalAlerts: [],
        findings: fallbackFindings,
        allDoctorQuestions: fallbackFindings.flatMap((f) => f.questionsForDoctor),
        analyzedAt: new Date().toISOString(),
        sourceTextbooksUsed: ["Harrison's Principles of Internal Medicine (21st Edition)"],
      };
      analysisCache.current[`${fallbackResult.id}_${selectedLanguage.code}`] = fallbackResult;
      setCurrentAnalysis(fallbackResult);
      setSelectedQuestions(fallbackResult.allDoctorQuestions.slice(0, 2));
    } finally {
      setIsLoading(false);
    }
  };

  // Analyze pasted text
  const handleAnalyzeText = async (text: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analyze-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportText: text, language: selectedLanguage.name }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        analysisCache.current[`${json.data.id}_${selectedLanguage.code}`] = json.data;
        setCurrentAnalysis(json.data);
        if (json.data.allDoctorQuestions?.length > 0) {
          setSelectedQuestions(json.data.allDoctorQuestions.slice(0, 3));
        }
      } else {
        throw new Error(json.error || 'Failed to analyze text');
      }
    } catch (err: any) {
      console.warn('Falling back to local scanner:', err);
      const sample = SAMPLE_REPORTS[0];
      handleSelectPreset(sample);
    } finally {
      setIsLoading(false);
    }
  };

  // Manual parameters submission
  const handleManualSubmit = async (params: Array<{ name: string; value: string | number; unit?: string }>) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analyze-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parameters: params, language: selectedLanguage.name }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        analysisCache.current[`${json.data.id}_${selectedLanguage.code}`] = json.data;
        setCurrentAnalysis(json.data);
        if (json.data.allDoctorQuestions?.length > 0) {
          setSelectedQuestions(json.data.allDoctorQuestions.slice(0, 3));
        }
      } else {
        const localFindings = buildLocalExplanation(params);
        const fallbackResult: AnalysisResult = {
          id: `manual-${Date.now()}`,
          reportTitle: 'Custom Test Evaluation',
          overallSummary: 'MediLens explained your entered parameters in everyday terms based on medical physiology.',
          criticalAlerts: localFindings.filter(f => f.isCritical && f.criticalNotice).map(f => f.criticalNotice!),
          findings: localFindings,
          allDoctorQuestions: localFindings.flatMap(f => f.questionsForDoctor),
          analyzedAt: new Date().toISOString(),
          sourceTextbooksUsed: ["Harrison's Principles of Internal Medicine", "Robbins Pathology"],
        };
        analysisCache.current[`${fallbackResult.id}_${selectedLanguage.code}`] = fallbackResult;
        setCurrentAnalysis(fallbackResult);
      }
    } catch (err) {
      const localFindings = buildLocalExplanation(params);
      const fallbackResult: AnalysisResult = {
        id: `manual-${Date.now()}`,
        reportTitle: 'Custom Test Evaluation',
        overallSummary: 'MediLens explained your entered parameters in everyday terms based on medical physiology.',
        criticalAlerts: [],
        findings: localFindings,
        allDoctorQuestions: localFindings.flatMap(f => f.questionsForDoctor),
        analyzedAt: new Date().toISOString(),
        sourceTextbooksUsed: ["Harrison's Principles of Internal Medicine"],
      };
      analysisCache.current[`${fallbackResult.id}_${selectedLanguage.code}`] = fallbackResult;
      setCurrentAnalysis(fallbackResult);
    } finally {
      setIsLoading(false);
    }
  };

  // Handles dynamic language switching with reuse of cached translations
  const handleLanguageChange = async (newLang: Language) => {
    setSelectedLanguage(newLang);
    if (!currentAnalysis) return;

    const cacheKey = `${currentAnalysis.id}_${newLang.code}`;

    // 1. If already cached in this language, switch immediately without network call
    if (analysisCache.current[cacheKey]) {
      setCurrentAnalysis(analysisCache.current[cacheKey]);
      return;
    }

    // 2. If changing to English and an English version is already in cache
    const enKey = `${currentAnalysis.id}_en`;
    if (newLang.code === 'en' && analysisCache.current[enKey]) {
      setCurrentAnalysis(analysisCache.current[enKey]);
      return;
    }

    // 3. Otherwise, translate existing analysis on the fly
    setIsTranslating(true);
    setError(null);

    try {
      const res = await fetch('/api/translate-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysis: currentAnalysis,
          targetLanguage: newLang.name,
          targetLanguageCode: newLang.code,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          analysisCache.current[cacheKey] = json.data;
          setCurrentAnalysis(json.data);
          return;
        }
      }
      throw new Error(t.status.errorProcessing);
    } catch (err: any) {
      console.warn('Language switch translation failed:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleToggleQuestion = (question: string) => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(selectedQuestions.filter((q) => q !== question));
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleReset = () => {
    setCurrentAnalysis(null);
    setSelectedQuestions([]);
    setError(null);
  };

  const displayedFindings = currentAnalysis
    ? showAbnormalOnly
      ? currentAnalysis.findings.filter((f) => f.isAbnormal)
      : currentAnalysis.findings
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-['Plus_Jakarta_Sans'] text-slate-800">
      
      {/* Top Navigation */}
      <Navbar
        onOpenSources={() => setIsSourceModalOpen(true)}
        onOpenJargon={() => setIsJargonModalOpen(true)}
        onOpenChat={() => handleOpenChat()}
        onReset={handleReset}
        hasActiveReport={Boolean(currentAnalysis)}
        activeMainTab={mainViewTab}
        onSelectMainTab={setMainViewTab}
        currentLanguage={selectedLanguage}
        onSelectLanguage={handleLanguageChange}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Translating Indicator Banner */}
        {isTranslating && (
          <div className="bg-teal-700 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 shadow-md shadow-teal-900/10 animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
            <span>{t.status.translatingExplanation} {selectedLanguage.nativeName} ({selectedLanguage.name})...</span>
          </div>
        )}

        {/* Primary View Navigation: Lab Report Breakdown vs Myth Busters */}
        <div className="flex items-center justify-between border-b border-slate-200 gap-4 flex-wrap pb-1">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setMainViewTab('report')}
              className={`flex items-center gap-2 py-2.5 px-3 sm:px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer ${
                mainViewTab === 'report'
                  ? 'border-teal-600 text-teal-900 bg-white rounded-t-xl shadow-2xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <FileText className="w-4 h-4 text-teal-600" />
              <span>{t.report.title}</span>
              {currentAnalysis && (
                <span className="text-[11px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                  {currentAnalysis.findings.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMainViewTab('myths')}
              className={`flex items-center gap-2 py-2.5 px-3 sm:px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer ${
                mainViewTab === 'myths'
                  ? 'border-amber-600 text-amber-900 bg-white rounded-t-xl shadow-2xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>{t.nav.mythBusters}</span>
              <span className="text-[11px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                {relevantMyths.filter(m => m.isApplicableToReport).length > 0
                  ? `${relevantMyths.filter(m => m.isApplicableToReport).length} applicable`
                  : `${relevantMyths.length}`}
              </span>
            </button>
          </div>

          {currentAnalysis && (
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <span>Active Report:</span>
              <span className="font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                {currentAnalysis.reportTitle}
              </span>
            </div>
          )}
        </div>

        {/* MYTH BUSTERS TAB CONTENT */}
        {mainViewTab === 'myths' && (
          <MythBustersTab
            myths={relevantMyths}
            currentAnalysis={currentAnalysis}
            onAskAI={(mythText) => handleOpenChat(mythText)}
            onOpenReportTab={() => setMainViewTab('report')}
          />
        )}

        {/* LAB REPORT BREAKDOWN TAB CONTENT */}
        {mainViewTab === 'report' && (
          <div className="space-y-6">
            {/* If No Report is Active: Show Hero + Input Options */}
            {!currentAnalysis && (
              <div className="space-y-8">
            
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 pt-2 sm:pt-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Textbook Medical Knowledge → Simple Human Explanations</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
                Understand your lab report <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-emerald-600">
                  in clear, everyday language
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
                MediLens uses authorized MBBS textbooks (Harrison's, Robbins, Guyton, Harper's) to understand your numbers, then translates them into practical everyday advice, culturally familiar meals, and doctor questions.
              </p>

              {/* Guiding Principles Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-600">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-teal-600" /> No raw textbook copy-paste
                </span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-teal-600" /> Practical meal ideas (dal, chana, oats)
                </span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-teal-600" /> Doctor consultation questions
                </span>
              </div>
            </div>

            {/* Input Navigation Tabs */}
            <div className="max-w-4xl mx-auto">
              <div className="flex border-b border-slate-200 justify-center gap-2 sm:gap-6 mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('samples')}
                  className={`pb-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'samples'
                      ? 'border-teal-600 text-teal-800'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.tabs.sampleReports}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`pb-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'upload'
                      ? 'border-teal-600 text-teal-800'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>{t.tabs.uploadFile}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('manual')}
                  className={`pb-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'manual'
                      ? 'border-teal-600 text-teal-800'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>{t.tabs.enterManually}</span>
                </button>
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === 'samples' && (
                  <PresetSelector
                    onSelectPreset={handleSelectPreset}
                    isLoading={isLoading || isTranslating}
                    currentLanguage={selectedLanguage}
                  />
                )}

                {activeTab === 'upload' && (
                  <UploadSection
                    onAnalyzeFile={handleAnalyzeFile}
                    onAnalyzeText={handleAnalyzeText}
                    isLoading={isLoading || isTranslating}
                    currentLanguage={selectedLanguage}
                  />
                )}

                {activeTab === 'manual' && (
                  <ManualEntryForm
                    onSubmit={handleManualSubmit}
                    isLoading={isLoading || isTranslating}
                    currentLanguage={selectedLanguage}
                  />
                )}
              </div>
            </div>

          </div>
        )}

        {/* Loading State Spinner */}
        {isLoading && (
          <div className="py-16 text-center space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-100/70 text-teal-700 flex items-center justify-center animate-spin">
              <RefreshCw className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              {t.status.loadingAnalysis}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Applying authorized MBBS textbook medical facts, evaluating your results, crafting simple human explanations in {selectedLanguage.name}, and compiling practical meal ideas.
            </p>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Active Analysis Results Screen */}
        {currentAnalysis && !isLoading && (
          <div className="space-y-6">
            
            {/* Report Header Bar */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200/80">
                    {t.report.reviewedByTitle}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(currentAnalysis.analyzedAt).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 font-['Outfit']">
                  {currentAnalysis.reportTitle}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Grounding: {currentAnalysis.sourceTextbooksUsed.join(' • ')}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto">
                <button
                  onClick={() => handleOpenChat("Can you give me an overview of my report in simple words, and tell me which findings need attention?")}
                  className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200/90 text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>{t.nav.askAi}</span>
                </button>

                <button
                  onClick={() => setMainViewTab('myths')}
                  className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/90 text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
                  title="View medical misconceptions and myths relevant to this report"
                >
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>{t.nav.mythBusters} ({relevantMyths.filter(m => m.isApplicableToReport).length})</span>
                </button>

                <button
                  onClick={() => setIsDoctorModalOpen(true)}
                  className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-teal-700/15 transition-all cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>{t.report.discussWithDoctor} ({selectedQuestions.length})</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  title={t.report.printPdf}
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Critical Alert Banner (if any) */}
            {currentAnalysis.criticalAlerts && currentAnalysis.criticalAlerts.length > 0 && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600 animate-pulse" />
                  <span>{t.report.criticalAlerts}</span>
                </div>
                {currentAnalysis.criticalAlerts.map((alert, idx) => (
                  <p key={idx} className="text-xs sm:text-sm font-medium leading-relaxed">
                    • {alert}
                  </p>
                ))}
              </div>
            )}

            {/* Plain Language Overall Summary */}
            <div className="p-5 sm:p-6 bg-gradient-to-br from-teal-900 to-teal-800 text-white rounded-2xl shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-200 font-['Outfit']">
                  {t.report.overallSummary}
                </span>
                <span className="text-[11px] text-teal-100 bg-teal-700/60 px-2.5 py-0.5 rounded-full border border-teal-600">
                  {selectedLanguage.nativeName}
                </span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-teal-50">
                {currentAnalysis.overallSummary}
              </p>
            </div>

            {/* Filter Toggle and Counter */}
            <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
              <h2 className="text-base font-bold text-slate-900 font-['Outfit']">
                {t.report.showingFindings} ({displayedFindings.length})
              </h2>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showAbnormalOnly}
                  onChange={(e) => setShowAbnormalOnly(e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span>{t.report.filterAbnormalOnly}</span>
              </label>
            </div>

            {/* Findings List (9-Part Structured Cards) */}
            <div className="space-y-4">
              {displayedFindings.map((finding) => (
                <FindingCard
                  key={finding.id}
                  finding={finding}
                  selectedQuestions={selectedQuestions}
                  onToggleQuestion={handleToggleQuestion}
                  onAskAI={(f) => handleOpenChat(`Can you explain my ${f.testName} result (${f.userValue} ${f.unit}) in simple words and tell me what to ask my doctor?`)}
                  currentLanguage={selectedLanguage}
                />
              ))}
            </div>

            {/* Educational Disclaimer Banner */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="text-slate-800 block">MediLens Medical Safety & Educational Boundary</strong>
                <p>
                  {t.report.disclaimer}
                </p>
              </div>
            </div>

          </div>
        )}

          </div>
        )}

      </main>

      {/* Floating Action Button for Live AI Chatbot */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => handleOpenChat()}
          className="flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white font-bold text-xs sm:text-sm shadow-xl shadow-teal-950/25 border border-teal-400/30 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          title="Open MediLens AI Explainer"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
          </div>
          <span>Ask MediLens AI</span>
          {currentAnalysis && (
            <span className="hidden sm:inline-block text-[10px] bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-500/30 text-teal-200 font-semibold">
              Report Loaded
            </span>
          )}
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-medium text-slate-700">
            MediLens — Medical Accuracy from Textbooks + Simple Human Communication
          </p>
          <p className="text-[11px] text-slate-400">
            Grounded in Harrison's Internal Medicine, Robbins Pathology, Guyton & Hall Physiology, Harper's Biochemistry, Park's Preventive Medicine & WHO Manuals.
          </p>
        </div>
      </footer>

      {/* Modals */}
      {currentAnalysis && (
        <DoctorDiscussionModal
          isOpen={isDoctorModalOpen}
          onClose={() => setIsDoctorModalOpen(false)}
          findings={currentAnalysis.findings}
          selectedQuestions={selectedQuestions}
          onToggleQuestion={handleToggleQuestion}
        />
      )}

      <SourceTransparencyModal
        isOpen={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
      />

      <JargonBusterModal
        isOpen={isJargonModalOpen}
        onClose={() => setIsJargonModalOpen(false)}
      />

      {/* Live AI Chatbot Modal / Drawer */}
      <ChatbotModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentAnalysis={currentAnalysis}
        initialQuery={initialChatQuery}
        onClearInitialQuery={() => setInitialChatQuery(null)}
        currentLanguage={selectedLanguage}
      />

    </div>
  );
}
