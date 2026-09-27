import React from 'react';
import { SAMPLE_REPORTS } from '../data/medicalKnowledge';
import { SampleReportPreset, Language, DEFAULT_LANGUAGE } from '../types';
import { getTranslation } from '../i18n/translations';
import { 
  Heart, 
  Droplet, 
  Activity, 
  Dna, 
  Flame, 
  TestTube2, 
  ChevronRight, 
  Sparkles 
} from 'lucide-react';

interface PresetSelectorProps {
  onSelectPreset: (preset: SampleReportPreset) => void;
  isLoading: boolean;
  currentLanguage?: Language;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  onSelectPreset,
  isLoading,
  currentLanguage = DEFAULT_LANGUAGE
}) => {
  const t = getTranslation(currentLanguage?.code || 'en');
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'lipid':
        return <Heart className="w-4 h-4 text-rose-500" />;
      case 'hematology':
        return <Droplet className="w-4 h-4 text-red-500" />;
      case 'diabetes':
        return <Activity className="w-4 h-4 text-amber-500" />;
      case 'thyroid':
        return <Flame className="w-4 h-4 text-purple-500" />;
      case 'semen':
        return <Dna className="w-4 h-4 text-blue-500" />;
      default:
        return <TestTube2 className="w-4 h-4 text-teal-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-['Outfit'] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>{t.home.sampleHeading}</span>
          </h2>
          <p className="text-xs text-slate-500">
            {t.home.sampleSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SAMPLE_REPORTS.map((preset) => (
          <button
            key={preset.id}
            disabled={isLoading}
            onClick={() => onSelectPreset(preset)}
            className="group text-left p-4 rounded-xl border border-slate-200/90 bg-white hover:border-teal-500/80 hover:shadow-md hover:shadow-teal-600/5 transition-all duration-150 flex flex-col justify-between disabled:opacity-50"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-teal-50 transition-colors">
                  {getCategoryIcon(preset.category)}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
                  {preset.badge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1 font-['Outfit']">
                {preset.title}
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-1">
                {preset.subtitle}
              </p>
              <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                {preset.description}
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700 group-hover:translate-x-0.5 transition-transform">
              <span>{currentLanguage?.code !== 'en' ? `Explain in ${currentLanguage?.nativeName}` : 'View Plain-English Guide'}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
