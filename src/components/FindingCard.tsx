import React, { useState } from 'react';
import { 
  LabFinding,
  Language,
  DEFAULT_LANGUAGE
} from '../types';
import { getTranslation } from '../i18n/translations';
import { 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Utensils, 
  Stethoscope, 
  BookOpen, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Copy, 
  Sparkles,
  Info,
  Coffee,
  Sun,
  Moon
} from 'lucide-react';

interface FindingCardProps {
  finding: LabFinding;
  selectedQuestions: string[];
  onToggleQuestion: (question: string) => void;
  onAskAI?: (finding: LabFinding) => void;
  currentLanguage?: Language;
}

export const FindingCard: React.FC<FindingCardProps> = ({
  finding,
  selectedQuestions,
  onToggleQuestion,
  onAskAI,
  currentLanguage = DEFAULT_LANGUAGE
}) => {
  const t = getTranslation(currentLanguage?.code || 'en');
  const [isExpanded, setIsExpanded] = useState(true);
  const [copiedQuestion, setCopiedQuestion] = useState<string | null>(null);

  const getStatusBadge = () => {
    switch (finding.status) {
      case 'critical_low':
      case 'critical_high':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            {t.finding.statusCritical}
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <ChevronDown className="w-3.5 h-3.5 text-amber-600" />
            {t.finding.statusLow}
          </span>
        );
      case 'high':
      case 'present':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <ChevronUp className="w-3.5 h-3.5 text-amber-600" />
            {t.finding.statusHigh}
          </span>
        );
      case 'normal':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {t.finding.statusNormal}
          </span>
        );
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuestion(text);
    setTimeout(() => setCopiedQuestion(null), 2000);
  };

  return (
    <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
      finding.isCritical 
        ? 'border-rose-300 bg-rose-50/20 shadow-md shadow-rose-100' 
        : finding.isAbnormal 
          ? 'border-amber-200/90 bg-white shadow-xs' 
          : 'border-slate-200 bg-white shadow-2xs'
    }`}>
      
      {/* Critical Alert Warning Bar */}
      {finding.isCritical && finding.criticalNotice && (
        <div className="bg-rose-600 px-4 py-2.5 text-white flex items-center gap-2 text-xs sm:text-sm font-medium">
          <ShieldAlert className="w-4 h-4 shrink-0 text-white animate-bounce" />
          <span>{finding.criticalNotice}</span>
        </div>
      )}

      {/* Card Header: Parameter Name, Result, Range */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight font-['Outfit']">
              {finding.testName}
            </h3>
            {getStatusBadge()}
          </div>
          
          {/* 1. YOUR RESULT */}
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">
              {finding.userValue}
            </span>
            <span className="text-sm font-medium text-slate-500">
              {finding.unit}
            </span>
            <span className="text-xs text-slate-400 ml-2">
              (Lab Reference Range: <strong className="text-slate-600 font-semibold">{finding.referenceRange}</strong>)
            </span>
          </div>
        </div>

        <div className="self-end sm:self-center flex items-center gap-2 flex-wrap">
          {onAskAI && (
            <button
              onClick={() => onAskAI(finding)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 transition-colors cursor-pointer"
              title={`Ask MediLens AI about ${finding.testName}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{t.finding.askAiAboutThis}</span>
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-teal-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span>{isExpanded ? 'Collapse Details' : 'Expand Guide'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Explanation Body */}
      {isExpanded && (
        <div className="p-5 sm:p-6 space-y-6 text-slate-700">

          {/* MEDICAL TERM -> SIMPLE MEANING */}
          {finding.termDefinition && (
            <div className="p-3.5 rounded-xl bg-teal-50/80 border border-teal-200/90 flex items-start gap-3">
              <span className="px-2 py-0.5 rounded-md bg-teal-700 text-white text-[10px] font-bold uppercase tracking-wider shrink-0 mt-0.5">
                {t.finding.simpleMeaning}
              </span>
              <div className="text-xs sm:text-sm text-slate-800">
                <strong className="font-bold text-teal-950">{finding.termDefinition.term}</strong>: {finding.termDefinition.simpleMeaning}
              </div>
            </div>
          )}
          
          {/* STEP 1: WHAT DOES IT MEAN? & STEP 2: WHY DOES IT HAPPEN? */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. What does it mean? */}
            <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 flex flex-col">
              <div className="flex items-center gap-2 text-teal-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Info className="w-4 h-4 text-teal-700" />
                <span>{t.finding.whatDoesItMean}</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-800 font-medium">
                {finding.whatDoesItMean || finding.whatIsThis}
              </p>
            </div>

            {/* 2. Why does it happen? */}
            <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 flex flex-col">
              <div className="flex items-center gap-2 text-teal-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-teal-700" />
                <span>{t.finding.whyDoesItHappen}</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-800">
                {finding.whyDoesItHappen || finding.whyDoesItMatter}
              </p>
            </div>
          </div>

          {/* STEP 3: WHAT DOES IT MEAN IN THIS REPORT? */}
          <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200/80">
            <div className="flex items-center gap-2 text-sky-950 text-xs font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4 text-sky-700" />
              <span>{t.finding.whatItMeansInReport}</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-800">
              {finding.whatItMeansInThisReport || finding.yourResultSummary}
            </p>
          </div>

          {/* STEP 4: WHAT CAN AND CANNOT BE CONCLUDED? */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-teal-700" />
                <span>{t.finding.clinicalBoundaries}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Clinical boundaries & interpretation limits
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* What Can Be Concluded */}
              <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200/70">
                <div className="flex items-center gap-1.5 text-emerald-900 text-xs font-bold mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{t.finding.canConclude}</span>
                </div>
                <ul className="space-y-1.5">
                  {(finding.whatCanAndCannotBeConcluded?.canConclude || [
                    `Your reported test value is ${finding.userValue} ${finding.unit}.`,
                    `The result stands relative to the lab reference range of ${finding.referenceRange}.`
                  ]).map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Cannot Be Concluded */}
              <div className="p-3.5 rounded-lg bg-amber-50/60 border border-amber-200/70">
                <div className="flex items-center gap-1.5 text-amber-900 text-xs font-bold mb-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>{t.finding.cannotConclude}</span>
                </div>
                <ul className="space-y-1.5">
                  {(finding.whatCanAndCannotBeConcluded?.cannotConclude || [
                    'A single laboratory number cannot diagnose a specific disease on its own.',
                    'It cannot replace an in-person clinical physical examination by your doctor.',
                    'Dietary changes alone may not resolve abnormal results without medical guidance.'
                  ]).map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* WHAT COULD BE ASSOCIATED WITH THIS? (General Possibilities) */}
          {finding.whatCouldBeAssociated && finding.whatCouldBeAssociated.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center gap-2 text-slate-900 text-xs font-bold uppercase tracking-wider mb-2.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Possible General Associations</span>
                <span className="text-[10px] font-normal lowercase tracking-normal text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-full ml-auto">
                  General possibilities, not a diagnosis
                </span>
              </div>
              <ul className="space-y-1.5">
                {finding.whatCouldBeAssociated.map((assoc, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>{assoc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* PRACTICAL LIFESTYLE & DIET GUIDANCE */}
          {finding.whatCanIDo && (
            <div className="p-4 rounded-xl bg-teal-50/40 border border-teal-200/60">
              <div className="flex items-center gap-2 text-teal-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Utensils className="w-3.5 h-3.5 text-teal-700" />
                <span>Practical Daily Guidance</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-800">
                {finding.whatCanIDo}
              </p>
            </div>
          )}

          {/* 6. SIMPLE DAILY EXAMPLES (MEAL IDEAS) */}
          {finding.simpleDailyExamples && finding.simpleDailyExamples.length > 0 && (
            <div className="p-5 rounded-xl bg-slate-50/90 border border-slate-200/80">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2 text-slate-900 text-xs font-bold uppercase tracking-wider">
                  <Utensils className="w-4 h-4 text-emerald-600" />
                  <span>{t.finding.practicalMeals}</span>
                </div>
                <span className="text-xs text-slate-500 italic">
                  Grounded in authorized nutritional science • Not a rigid prescription
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {finding.simpleDailyExamples.map((mealIdea, mIdx) => {
                  let MealIcon = Coffee;
                  if (mealIdea.meal === 'Lunch') MealIcon = Sun;
                  if (mealIdea.meal === 'Dinner') MealIcon = Moon;

                  return (
                    <div 
                      key={mIdx} 
                      className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 pb-2 border-b border-slate-100 mb-2">
                          <MealIcon className="w-3.5 h-3.5 text-teal-600" />
                          <span>{mealIdea.meal}</span>
                        </div>
                        <ul className="space-y-1.5 mb-3">
                          {mealIdea.foodItems.map((item, fIdx) => (
                            <li key={fIdx} className="text-xs text-slate-800 font-medium flex items-start gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* The "Why" behind this meal */}
                      <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 leading-snug">
                        <strong className="text-slate-700 font-semibold">Why this helps: </strong>
                        {mealIdea.why}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 7. WHAT SHOULD I ASK MY DOCTOR? */}
          <div className="p-4 rounded-xl bg-white border border-slate-200">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2 text-slate-900 text-xs font-bold uppercase tracking-wider">
                <Stethoscope className="w-4 h-4 text-teal-700" />
                <span>{t.finding.doctorQuestions}</span>
              </div>
              <span className="text-xs text-slate-400">
                Click to add questions to your visit checklist
              </span>
            </div>

            <div className="space-y-2">
              {finding.questionsForDoctor.map((question, qIdx) => {
                const isSelected = selectedQuestions.includes(question);
                return (
                  <div
                    key={qIdx}
                    onClick={() => onToggleQuestion(question)}
                    className={`group flex items-start gap-3 p-3 rounded-lg border text-xs sm:text-sm cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-teal-50/80 border-teal-300 text-teal-950 font-medium'
                        : 'bg-slate-50/50 border-slate-200/80 text-slate-800 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                      isSelected ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300 group-hover:border-teal-500'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="flex-1 leading-snug">{question}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(question);
                      }}
                      className="text-slate-400 hover:text-slate-700 p-1 rounded transition-colors"
                      title="Copy question text"
                    >
                      {copiedQuestion === question ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 5: TEXTBOOK BASIS & SAFETY DISCLAIMER */}
          <div className="pt-4 border-t border-slate-200/80 flex flex-col gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start sm:items-center gap-2 text-slate-700">
                <BookOpen className="w-4 h-4 text-teal-700 shrink-0 mt-0.5 sm:mt-0" />
                <div>
                  <strong className="text-slate-900 font-bold">5. Textbook Basis: </strong>
                  <span className="text-teal-950 font-medium">{finding.source.textbookName}</span>
                  {finding.source.chapterOrSection && (
                    <span className="text-slate-600"> ({finding.source.chapterOrSection})</span>
                  )}
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-teal-100/70 text-teal-800 text-[10px] font-semibold tracking-wide shrink-0">
                Authorized MBBS Knowledge • Plain-Language Teaching
              </span>
            </div>

            {/* Safety Disclaimer */}
            <div className="text-[11px] text-slate-500 italic flex items-start gap-1.5 px-1">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span><strong>Medical Safety Note: </strong>{finding.safetyDisclaimer}</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
