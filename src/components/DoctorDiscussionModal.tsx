import React, { useState } from 'react';
import { 
  X, 
  Stethoscope, 
  Printer, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  FileText 
} from 'lucide-react';
import { LabFinding } from '../types';

interface DoctorDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  findings: LabFinding[];
  selectedQuestions: string[];
  onToggleQuestion: (question: string) => void;
}

export const DoctorDiscussionModal: React.FC<DoctorDiscussionModalProps> = ({
  isOpen,
  onClose,
  findings,
  selectedQuestions,
  onToggleQuestion,
}) => {
  const [customNotes, setCustomNotes] = useState('');
  const [customQuestionInput, setCustomQuestionInput] = useState('');
  const [customQuestions, setCustomQuestions] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleAddCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (customQuestionInput.trim()) {
      setCustomQuestions([...customQuestions, customQuestionInput.trim()]);
      setCustomQuestionInput('');
    }
  };

  const handleRemoveCustomQuestion = (index: number) => {
    setCustomQuestions(customQuestions.filter((_, i) => i !== index));
  };

  const handlePrint = () => {
    window.print();
  };

  const generateCopyText = () => {
    let text = `MEDILENS — DOCTOR CONSULTATION DISCUSSION SHEET\nGenerated on: ${new Date().toLocaleDateString()}\n\n`;
    
    text += `KEY LABORATORY FINDINGS TO DISCUSS:\n`;
    findings.filter(f => f.isAbnormal).forEach(f => {
      text += `• ${f.testName}: ${f.userValue} ${f.unit} (Ref: ${f.referenceRange})\n`;
    });

    text += `\nPRIORITIZED QUESTIONS FOR MY DOCTOR:\n`;
    if (selectedQuestions.length === 0 && customQuestions.length === 0) {
      text += `(No specific questions selected yet)\n`;
    } else {
      selectedQuestions.forEach((q, idx) => {
        text += `${idx + 1}. ${q}\n`;
      });
      customQuestions.forEach((q, idx) => {
        text += `${selectedQuestions.length + idx + 1}. ${q} (My note)\n`;
      });
    }

    if (customNotes.trim()) {
      text += `\nPERSONAL SYMPTOMS & NOTES:\n${customNotes}\n`;
    }

    text += `\nNote: This sheet is prepared for educational discussion with my licensed healthcare provider.\n`;
    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCopyText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-['Outfit']">
                Doctor Consultation Sheet
              </h2>
              <p className="text-xs text-slate-500">
                Print or copy this checklist for your next clinic visit
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Summary of Abnormal Values */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-teal-600" />
              <span>Lab Findings for Discussion</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {findings.map((finding) => (
                <div 
                  key={finding.id}
                  className={`p-2.5 rounded-lg border text-xs flex justify-between items-center ${
                    finding.isAbnormal ? 'bg-amber-50/60 border-amber-200' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="font-semibold text-slate-800">{finding.testName}</span>
                  <span className="font-mono text-slate-600">
                    {finding.userValue} {finding.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Doctor Questions */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Prioritized Questions ({selectedQuestions.length + customQuestions.length})
              </h3>
              <span className="text-[11px] text-slate-400">
                Check off questions in the report or add your own
              </span>
            </div>

            {selectedQuestions.length === 0 && customQuestions.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 rounded-lg bg-slate-50 border border-dashed border-slate-200">
                You haven't selected any questions yet. Click on any question in the report cards to select it, or add your custom question below.
              </p>
            ) : (
              <ul className="space-y-2">
                {selectedQuestions.map((q, idx) => (
                  <li 
                    key={idx}
                    className="p-3 rounded-lg bg-teal-50/70 border border-teal-200 text-xs sm:text-sm text-teal-950 flex items-start justify-between gap-2"
                  >
                    <span>{idx + 1}. {q}</span>
                    <button
                      onClick={() => onToggleQuestion(q)}
                      className="text-teal-600 hover:text-teal-800 text-[11px] underline shrink-0"
                    >
                      Remove
                    </button>
                  </li>
                ))}

                {customQuestions.map((q, idx) => (
                  <li 
                    key={`custom-${idx}`}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-start justify-between gap-2"
                  >
                    <span>{selectedQuestions.length + idx + 1}. {q} <em className="text-slate-400">(personal note)</em></span>
                    <button
                      onClick={() => handleRemoveCustomQuestion(idx)}
                      className="text-rose-500 hover:text-rose-700 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Add Custom Question Input */}
            <form onSubmit={handleAddCustomQuestion} className="mt-3 flex gap-2">
              <input
                type="text"
                value={customQuestionInput}
                onChange={(e) => setCustomQuestionInput(e.target.value)}
                placeholder="Add your own question or symptom note..."
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                disabled={!customQuestionInput.trim()}
                className="px-3 py-2 bg-teal-700 text-white rounded-lg text-xs font-medium hover:bg-teal-800 disabled:opacity-50 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Personal Notes / Symptoms */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Personal Symptoms or Medication Notes
            </label>
            <textarea
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g., Feeling fatigued in the late afternoon, currently taking iron supplements with milk, mild headache..."
              rows={3}
              className="w-full p-2.5 text-xs text-slate-800 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-700 text-white text-xs font-medium hover:bg-teal-800 shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Sheet</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
