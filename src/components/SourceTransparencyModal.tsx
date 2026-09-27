import React from 'react';
import { 
  X, 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle 
} from 'lucide-react';

interface SourceTransparencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourceTransparencyModal: React.FC<SourceTransparencyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const textbooks = [
    {
      title: "Harrison's Principles of Internal Medicine",
      edition: '21st Edition',
      domain: 'Internal Medicine, Hematology & Endocrinology',
      description: 'Used for clinical criteria on anemia, glucose homeostasis, polycythemia, kidney azotemia, and thyroid physiology.'
    },
    {
      title: 'Robbins & Cotran Pathologic Basis of Disease',
      edition: '10th Edition',
      domain: 'Pathology & Cellular Mechanisms',
      description: 'Provides gold-standard understanding of megakaryocyte/platelet kinetics, glomerular filtration barrier, and liver cell transaminases.'
    },
    {
      title: 'Guyton and Hall Textbook of Medical Physiology',
      edition: '14th Edition',
      domain: 'Human Physiology',
      description: 'Underpins bodily oxygen transport, leukocyte immune defenses, and kidney fluid regulation.'
    },
    {
      title: "Harper's Illustrated Biochemistry",
      edition: '32nd Edition',
      domain: 'Biochemistry & Metabolism',
      description: 'Grounding for lipid transport, cholesterol synthesis, and dietary fiber interactions.'
    },
    {
      title: "Park's Textbook of Preventive and Social Medicine",
      edition: '27th Edition',
      domain: 'Preventive Medicine & Nutrition',
      description: 'Provides evidence for dietary soluble fiber, lifestyle risk factor reduction, and culturally practical whole foods.'
    },
    {
      title: "Davidson's Principles and Practice of Medicine",
      edition: '24th Edition',
      domain: 'Clinical Medicine',
      description: 'Referenced for endocrine feedback loops and step-wise doctor consultation workflows.'
    },
    {
      title: 'WHO Semen Examination & Processing Manual',
      edition: '6th Edition (2021)',
      domain: 'Reproductive Biology',
      description: 'Defines lower reference limits for volume, sperm concentration, progressive motility, and morphology.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-700/80 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-teal-200" />
            </div>
            <div>
              <h2 className="text-base font-bold font-['Outfit']">
                MediLens Knowledge Engine & Sources
              </h2>
              <p className="text-xs text-teal-100">
                Textbook Grounding → Plain-English Communication
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-teal-200 hover:text-white rounded-lg hover:bg-teal-700/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {/* Core Philosophy Banner */}
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
            <h3 className="text-sm font-bold text-teal-950 mb-2 font-['Outfit'] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Core Communication Philosophy</span>
            </h3>
            <p className="text-teal-900 mb-3">
              MediLens <strong>does NOT copy or display dense MBBS textbook paragraphs</strong> directly to users. 
              The authorized medical textbooks are our <strong>internal source of medical accuracy</strong>, while our communication style is tailored for everyday people.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 bg-white rounded-lg border border-teal-200/80 text-[11px] font-semibold text-slate-800">
              <span className="text-center">Authorized MBBS Textbook</span>
              <ArrowRight className="w-4 h-4 text-teal-600 hidden sm:block" />
              <span className="text-center">Extract Core Medical Facts</span>
              <ArrowRight className="w-4 h-4 text-teal-600 hidden sm:block" />
              <span className="text-center">Understand Patient's Result</span>
              <ArrowRight className="w-4 h-4 text-teal-600 hidden sm:block" />
              <span className="text-center text-teal-700 font-bold">Simple Everyday Language + Meals</span>
            </div>
          </div>

          {/* List of Authorized Textbooks */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Authorized MBBS Reference Sources
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {textbooks.map((tb, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h4 className="font-bold text-slate-900 text-xs">{tb.title}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 shrink-0">
                      {tb.edition}
                    </span>
                  </div>
                  <p className="text-[11px] text-teal-700 font-medium mb-1.5">{tb.domain}</p>
                  <p className="text-[11px] text-slate-600 leading-normal">{tb.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Safety & Ethical Boundaries */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Medical Safety Boundaries Enforced by MediLens</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-amber-900">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mt-0.5 shrink-0" />
                <span><strong>No Diagnosing:</strong> MediLens discusses general possibilities, never diagnosing specific diseases.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mt-0.5 shrink-0" />
                <span><strong>No Prescriptions:</strong> MediLens provides general educational food guidance, never personalized drug dosages or therapeutic diets.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mt-0.5 shrink-0" />
                <span><strong>No Cure Guarantees:</strong> MediLens does not claim foods (e.g., papaya for platelets) will cure medical abnormalities without rigorous textbook backing.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mt-0.5 shrink-0" />
                <span><strong>Objective Semen Reporting:</strong> Semen analysis parameters are explained without assigning labels of "fertile" or "infertile".</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-teal-700 text-white rounded-lg text-xs font-semibold hover:bg-teal-800 transition-colors"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
};
