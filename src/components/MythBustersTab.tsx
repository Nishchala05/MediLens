import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Search, 
  Filter, 
  FileText, 
  Info,
  Maximize2,
  Minimize2,
  Stethoscope,
  Microscope,
  RotateCcw
} from 'lucide-react';
import { AnalysisResult, MedicalMyth, MythVerdict } from '../types';

interface MythBustersTabProps {
  myths: MedicalMyth[];
  currentAnalysis: AnalysisResult | null;
  onAskAI: (mythText: string) => void;
  onOpenReportTab: () => void;
}

export const MythBustersTab: React.FC<MythBustersTabProps> = ({
  myths,
  currentAnalysis,
  onAskAI,
  onOpenReportTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVerdict, setSelectedVerdict] = useState<string>('all');
  const [showOnlyReportApplicable, setShowOnlyReportApplicable] = useState(false);
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Initialize all cards as expanded by default for quick scanning
  const defaultExpanded = useMemo(() => {
    const map: Record<string, boolean> = {};
    myths.forEach((m, idx) => {
      // Expand the first 3 by default, or all if fewer than 5
      map[m.id] = idx < 4;
    });
    return map;
  }, [myths]);

  // Merge default expanded state
  const isExpanded = (id: string) => {
    return expandedCardIds[id] !== undefined ? expandedCardIds[id] : (defaultExpanded[id] ?? true);
  };

  const toggleExpand = (id: string) => {
    setExpandedCardIds(prev => ({
      ...prev,
      [id]: !isExpanded(id)
    }));
  };

  const expandAll = () => {
    const map: Record<string, boolean> = {};
    myths.forEach(m => { map[m.id] = true; });
    setExpandedCardIds(map);
  };

  const collapseAll = () => {
    const map: Record<string, boolean> = {};
    myths.forEach(m => { map[m.id] = false; });
    setExpandedCardIds(map);
  };

  // Filtered myths list
  const filteredMyths = useMemo(() => {
    return myths.filter(myth => {
      // Verdict filter
      if (selectedVerdict !== 'all' && myth.verdict !== selectedVerdict) {
        return false;
      }
      // Report applicability filter
      if (showOnlyReportApplicable && !myth.isApplicableToReport) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesMyth = myth.myth.toLowerCase().includes(q);
        const matchesFact = myth.theFact.toLowerCase().includes(q);
        const matchesWhy = myth.why.toLowerCase().includes(q);
        const matchesParam = myth.relatedParameters?.some(p => p.toLowerCase().includes(q));
        const matchesBook = myth.textbookBasis.textbookName.toLowerCase().includes(q);
        if (!matchesMyth && !matchesFact && !matchesWhy && !matchesParam && !matchesBook) {
          return false;
        }
      }
      return true;
    });
  }, [myths, selectedVerdict, showOnlyReportApplicable, searchQuery]);

  const handleCopyMyth = (myth: MedicalMyth) => {
    const textToCopy = `🧪 MYTH BUSTER: ${myth.myth}
VERDICT: ${myth.verdict}

THE FACT:
${myth.theFact}

WHY:
${myth.why}

IN THIS REPORT:
${myth.inThisReport}

TEXTBOOK BASIS:
${myth.textbookBasis.textbookName} (${myth.textbookBasis.edition || ''}) - ${myth.textbookBasis.chapterOrSection}

EVIDENCE DISCIPLINE:
• Textbook Fact: ${myth.evidenceDiscipline.textbookFact}
• Interpretation: ${myth.evidenceDiscipline.interpretation}
• Clinical Uncertainty: ${myth.evidenceDiscipline.uncertainty}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(myth.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Verdict style badge helper
  const getVerdictBadge = (verdict: MythVerdict) => {
    switch (verdict) {
      case 'Myth':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300 shadow-2xs">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Myth
          </span>
        );
      case 'Context-Dependent':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            Context-Dependent
          </span>
        );
      case 'Partly True':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-900 border border-orange-300 shadow-2xs">
            <Info className="w-3.5 h-3.5 text-orange-700" />
            Partly True
          </span>
        );
      case 'Supported by Evidence':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            Supported by Evidence
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-slate-700/60 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-400/30">
                <ShieldAlert className="w-3.5 h-3.5 text-teal-400" />
                Medical Misconception Buster
              </span>
              <span className="text-[11px] font-semibold text-slate-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/10 hidden sm:inline-block">
                Strict MBBS Textbook Standard
              </span>
            </div>

            {currentAnalysis && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300">Active Report:</span>
                <span className="text-xs font-bold text-teal-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                  {currentAnalysis.reportTitle}
                </span>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
              Lab Report Myth Busters
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Medical tests are frequently misunderstood. We evaluate common laboratory misconceptions, internet myths, and patient anxieties strictly against authorized MBBS medical textbooks—focusing on clarity, underlying physiology, and practical clinical facts.
            </p>
          </div>

          {/* Strict Knowledge Rule Pill Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="font-semibold text-slate-200 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-teal-400" /> Authorized Sources Only:
            </span>
            <span className="bg-slate-800/90 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/80">Harrison's 21e</span>
            <span className="bg-slate-800/90 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/80">Robbins Pathology 10e</span>
            <span className="bg-slate-800/90 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/80">Guyton Physiology 14e</span>
            <span className="bg-slate-800/90 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/80">Harper's Biochemistry 32e</span>
            <span className="bg-slate-800/90 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/80">Park's PSM 27e</span>
            <span className="bg-slate-800/90 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/80">WHO Semen Manual 6e</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search myths by test, parameter, or keyword (e.g. platelets, cholesterol, fasting, TSH)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Verdict Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-slate-500" /> Verdict:
            </span>
            <button
              onClick={() => setSelectedVerdict('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedVerdict === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({myths.length})
            </button>
            <button
              onClick={() => setSelectedVerdict('Myth')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedVerdict === 'Myth'
                  ? 'bg-rose-700 text-white'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200/60'
              }`}
            >
              Myth
            </button>
            <button
              onClick={() => setSelectedVerdict('Context-Dependent')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedVerdict === 'Context-Dependent'
                  ? 'bg-amber-700 text-white'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/60'
              }`}
            >
              Context-Dependent
            </button>
            <button
              onClick={() => setSelectedVerdict('Partly True')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedVerdict === 'Partly True'
                  ? 'bg-orange-700 text-white'
                  : 'bg-orange-50 text-orange-900 hover:bg-orange-100 border border-orange-200/60'
              }`}
            >
              Partly True
            </button>
          </div>

        </div>

        {/* Second Row: Report Relevance Toggle + Global Expand/Collapse */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-3">
            {currentAnalysis && (
              <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showOnlyReportApplicable}
                  onChange={(e) => setShowOnlyReportApplicable(e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-teal-600" />
                  Show myths relevant to my uploaded report ({myths.filter(m => m.isApplicableToReport).length})
                </span>
              </label>
            )}

            {!currentAnalysis && (
              <span className="text-slate-500 italic">
                * Upload or select a report above to highlight misconceptions relevant to your exact lab findings.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={expandAll}
              className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 px-2.5 py-1 rounded hover:bg-slate-100 transition-colors"
            >
              <Maximize2 className="w-3 h-3 text-slate-500" /> Expand All
            </button>
            <button
              onClick={collapseAll}
              className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 px-2.5 py-1 rounded hover:bg-slate-100 transition-colors"
            >
              <Minimize2 className="w-3 h-3 text-slate-500" /> Collapse All
            </button>
          </div>
        </div>

      </div>

      {/* Misconceptions List */}
      {filteredMyths.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
            <Info className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 font-['Outfit']">
            No specific misconceptions were identified for this report based on the authorized textbook sources.
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Try adjusting your search query or verdict filters, or reset filters to review general laboratory misconceptions.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedVerdict('all');
              setShowOnlyReportApplicable(false);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMyths.map((myth, index) => {
            const expanded = isExpanded(myth.id);
            return (
              <div 
                key={myth.id}
                className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs overflow-hidden ${
                  myth.isApplicableToReport 
                    ? 'border-teal-300 ring-1 ring-teal-500/20' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                
                {/* Card Header (Always Visible) */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100">
                  <div className="flex-1 space-y-1.5">
                    
                    {/* Badge Row */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-['Outfit'] flex items-center gap-1">
                        🧪 Myth #{index + 1}
                      </span>

                      {getVerdictBadge(myth.verdict)}

                      {myth.isApplicableToReport && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-900 bg-teal-100/80 px-2.5 py-0.5 rounded-full border border-teal-300">
                          <Check className="w-3 h-3 text-teal-700" />
                          Applicable to this report
                        </span>
                      )}

                      {myth.relatedParameters && myth.relatedParameters.length > 0 && (
                        <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                          {myth.relatedParameters.slice(0, 3).join(', ')}
                        </span>
                      )}
                    </div>

                    {/* The Myth Statement */}
                    <div className="pt-1">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-700 mr-2 inline-block">
                        MYTH:
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit'] inline leading-snug">
                        "{myth.myth}"
                      </h3>
                    </div>

                  </div>

                  {/* Actions Right */}
                  <div className="self-end sm:self-center flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onAskAI(`Explain this lab myth in simple terms: "${myth.myth}" and how it connects to authorized MBBS textbooks.`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200/90 transition-colors cursor-pointer"
                      title="Ask MediLens AI about this misconception"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                      <span>Ask AI</span>
                    </button>

                    <button
                      onClick={() => handleCopyMyth(myth)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Copy Myth details"
                    >
                      {copiedId === myth.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => toggleExpand(myth.id)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <span>{expanded ? 'Collapse' : 'Expand'}</span>
                      {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                </div>

                {/* Collapsible Content */}
                {expanded && (
                  <div className="p-4 sm:p-6 space-y-5 bg-slate-50/40">
                    
                    {/* 1. THE FACT */}
                    <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-900 font-['Outfit']">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>THE FACT (Authorized MBBS Textbook Guidance)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        {myth.theFact}
                      </p>
                    </div>

                    {/* 2. WHY (Physiology / Pathology / Biochemistry) */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-900 font-['Outfit']">
                        <Microscope className="w-4 h-4 text-indigo-600" />
                        <span>WHY (Physiological & Pathological Mechanism)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {myth.why}
                      </p>
                    </div>

                    {/* 3. IN THIS LAB REPORT */}
                    <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200/70 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-900 font-['Outfit']">
                        <FileText className="w-4 h-4 text-teal-700" />
                        <span>IN THIS LAB REPORT</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                        {myth.inThisReport}
                      </p>
                    </div>

                    {/* 4. EVIDENCE DISCIPLINE (Textbook Fact / Interpretation / Uncertainty) */}
                    <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/90 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 font-['Outfit']">
                        <ShieldAlert className="w-4 h-4 text-slate-600" />
                        <span>Evidence Discipline & Uncertainty Guardrails</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-1">
                          <span className="font-bold text-teal-800 block text-[11px] uppercase tracking-wider">
                            📖 Textbook Fact
                          </span>
                          <p className="text-slate-600 leading-relaxed">
                            {myth.evidenceDiscipline.textbookFact}
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-1">
                          <span className="font-bold text-indigo-800 block text-[11px] uppercase tracking-wider">
                            🔍 Interpretation
                          </span>
                          <p className="text-slate-600 leading-relaxed">
                            {myth.evidenceDiscipline.interpretation}
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-1">
                          <span className="font-bold text-amber-800 block text-[11px] uppercase tracking-wider">
                            ⚠️ Clinical Uncertainty
                          </span>
                          <p className="text-slate-600 leading-relaxed">
                            {myth.evidenceDiscipline.uncertainty}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 5. TEXTBOOK BASIS */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-200/60">
                      <div className="flex items-center gap-1.5 font-medium text-slate-700">
                        <BookOpen className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>
                          <strong>Textbook Basis:</strong> {myth.textbookBasis.textbookName} ({myth.textbookBasis.edition || 'Latest Edition'}) • {myth.textbookBasis.chapterOrSection}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                          onClick={() => onAskAI(`What does ${myth.textbookBasis.textbookName} say about this misconception: "${myth.myth}"?`)}
                          className="text-xs text-teal-700 hover:text-teal-900 font-bold hover:underline flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          Ask AI about textbook source
                        </button>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* Safety & Educational Mandate Footer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">
            Important Educational Boundary:
          </p>
          <p className="text-amber-800 leading-relaxed">
            The Myth Busters tab is designed solely for health education and clinical clarification. It does not diagnose medical conditions, recommend medication alterations, or replace direct clinical consultation with a qualified medical doctor. Always discuss your laboratory report with your healthcare provider.
          </p>
        </div>
      </div>

    </div>
  );
};
