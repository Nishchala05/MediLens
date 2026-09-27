import React, { useState } from 'react';
import { X, Search, HelpCircle, ArrowRight } from 'lucide-react';

interface JargonBusterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface JargonItem {
  term: string;
  pronunciation?: string;
  category: string;
  medicalDefinition: string;
  simpleHumanMeaning: string;
}

export const JargonBusterModal: React.FC<JargonBusterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const dictionary: JargonItem[] = [
    {
      term: 'Leucocytes',
      pronunciation: 'LOO-kuh-sytes',
      category: 'Blood / Immunity',
      medicalDefinition: 'Heterogeneous cellular components of the hematopoietic and immune defense system.',
      simpleHumanMeaning: 'White blood cells. These are your body’s soldier cells that fight off bacteria, viruses, and infections.'
    },
    {
      term: 'Erythrocytes',
      pronunciation: 'ih-RITH-roh-sytes',
      category: 'Blood / Oxygen',
      medicalDefinition: 'Biconcave enucleated cellular elements containing hemoglobin.',
      simpleHumanMeaning: 'Red blood cells. These are tiny oxygen delivery trucks that ferry oxygen from your lungs to every organ in your body.'
    },
    {
      term: 'Thrombocytes (Platelets)',
      pronunciation: 'THROM-boh-sytes',
      category: 'Blood / Clotting',
      medicalDefinition: 'Circulating cytoplasmic fragments derived from bone marrow megakaryocytes.',
      simpleHumanMeaning: 'Platelets. Tiny cellular band-aids that stick together when you get a cut or scrape to stop you from bleeding.'
    },
    {
      term: 'Hemoglobin (Hb)',
      category: 'Blood / Oxygen',
      medicalDefinition: 'Iron-containing metalloprotein quaternary complex responsible for molecular oxygen transport.',
      simpleHumanMeaning: 'The iron-rich protein inside your red blood cells that carries oxygen and gives your blood its deep red color.'
    },
    {
      term: 'Thrombocytopenia',
      category: 'Hematology',
      medicalDefinition: 'Circulating platelet count below the standardized 2.5th percentile lower reference limit.',
      simpleHumanMeaning: 'Having fewer platelets in your blood than usual, which often happens temporarily after a fever or viral infection.'
    },
    {
      term: 'Mean Corpuscular Volume (MCV)',
      category: 'Red Cells',
      medicalDefinition: 'Average erythrocyte volume calculated in femtoliters.',
      simpleHumanMeaning: 'The physical size of your red blood cells. Helps your doctor see if lower hemoglobin might be related to iron levels (small cells) or vitamin B12 (large cells).'
    },
    {
      term: 'Ferritin',
      category: 'Iron Stores',
      medicalDefinition: 'Intracellular globular protein complex storing elemental iron in a non-toxic ferric form.',
      simpleHumanMeaning: 'Your body’s iron storage bank. While hemoglobin shows how much iron is actively working in your bloodstream, ferritin shows your reserves.'
    },
    {
      term: 'Beta-glucan',
      category: 'Nutrition',
      medicalDefinition: 'Viscous fermentable non-starch polysaccharide composed of D-glucose monomers.',
      simpleHumanMeaning: 'A healthy, jelly-like soluble fiber found in oats and barley that helps trap and carry excess cholesterol out through digestion.'
    },
    {
      term: 'Proteinuria',
      category: 'Urine / Kidneys',
      medicalDefinition: 'Presence of urinary protein excretion exceeding physiological basal threshold values.',
      simpleHumanMeaning: 'Protein appearing in your urine. Because kidneys usually keep valuable proteins inside your bloodstream, finding protein can indicate temporary filter strain.'
    },
    {
      term: 'TSH (Thyroid Stimulating Hormone)',
      category: 'Hormones',
      medicalDefinition: 'Anterior pituitary glycoprotein that stimulates thyrocyte iodide uptake and organification.',
      simpleHumanMeaning: 'The brain’s messenger hormone that urges your thyroid gland to produce energy-controlling metabolism hormones.'
    },
    {
      term: 'Sperm Motility',
      category: 'Semen Analysis',
      medicalDefinition: 'Kinematic propulsion kinetics categorized into progressive and non-progressive trajectories.',
      simpleHumanMeaning: 'How well and actively sperm swim forward. Healthy forward movement is necessary for natural fertilization.'
    },
    {
      term: 'Sperm Morphology',
      category: 'Semen Analysis',
      medicalDefinition: 'Cytomorphological assessment of head, midpiece, and flagellar structural contours.',
      simpleHumanMeaning: 'The shape and physical structure of sperm under a microscope. Standard criteria expect a certain percentage to have ideal contours.'
    },
    {
      term: 'ALT / SGPT',
      category: 'Liver Health',
      medicalDefinition: 'Pyridoxal phosphate-dependent enzyme catalyzing alanine to pyruvate transamination.',
      simpleHumanMeaning: 'A liver enzyme. If liver cells are irritated or storing excess fat, some ALT leaks into the bloodstream, showing higher numbers.'
    },
    {
      term: 'Creatinine',
      category: 'Kidney Function',
      medicalDefinition: 'Breakdown product of muscle creatine phosphate excreted solely by glomerular filtration.',
      simpleHumanMeaning: 'A natural muscle waste product that healthy kidneys constantly filter out. Higher blood levels suggest the kidneys may be filtering more slowly.'
    }
  ];

  const filtered = dictionary.filter(
    (item) =>
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.simpleHumanMeaning.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-['Outfit']">
                Medical Jargon Buster
              </h2>
              <p className="text-xs text-slate-500">
                Medical textbook terms translated into everyday human language
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

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search medical terms (e.g., Leucocytes, Platelets, TSH, Proteinuria)..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* List of Terms */}
        <div className="p-6 overflow-y-auto space-y-4">
          {filtered.length === 0 ? (
            <p className="text-center text-xs text-slate-500 py-8">
              No matching medical terms found.
            </p>
          ) : (
            filtered.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors">
                <div className="flex items-baseline justify-between gap-2 mb-1.5 flex-wrap">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm font-['Outfit']">
                      {item.term}
                    </h3>
                    {item.pronunciation && (
                      <span className="text-[10px] text-slate-400 italic">
                        ({item.pronunciation})
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/60">
                    {item.category}
                  </span>
                </div>

                <div className="space-y-2 mt-2">
                  <div className="text-xs text-slate-500 line-through opacity-75">
                    <strong>Textbook jargon: </strong>{item.medicalDefinition}
                  </div>
                  <div className="text-xs sm:text-sm text-teal-950 font-medium bg-teal-50/60 p-2.5 rounded-lg border border-teal-100 flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Everyday Meaning: </strong>{item.simpleHumanMeaning}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
