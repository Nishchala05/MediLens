import React, { useState } from 'react';
import { Plus, Trash2, ArrowRight, Activity } from 'lucide-react';
import { Language, DEFAULT_LANGUAGE } from '../types';
import { getTranslation } from '../i18n/translations';

interface ManualEntryFormProps {
  onSubmit: (parameters: Array<{ name: string; value: string | number; unit?: string }>) => void;
  isLoading: boolean;
  currentLanguage?: Language;
}

export const ManualEntryForm: React.FC<ManualEntryFormProps> = ({
  onSubmit,
  isLoading,
  currentLanguage = DEFAULT_LANGUAGE
}) => {
  const t = getTranslation(currentLanguage?.code || 'en');
  const [entries, setEntries] = useState<Array<{ name: string; value: string; unit: string }>>([
    { name: 'Hemoglobin (Hb)', value: '10.2', unit: 'g/dL' },
    { name: 'Platelet Count', value: '135', unit: 'x10^3/uL' }
  ]);

  const quickPresets = [
    { name: 'Hemoglobin (Hb)', unit: 'g/dL', defaultVal: '9.8' },
    { name: 'Platelet Count', unit: 'x10^3/uL', defaultVal: '85' },
    { name: 'Total Cholesterol', unit: 'mg/dL', defaultVal: '245' },
    { name: 'Fasting Blood Glucose', unit: 'mg/dL', defaultVal: '115' },
    { name: 'TSH (Thyroid)', unit: 'uIU/mL', defaultVal: '6.5' },
    { name: 'Urine Protein', unit: 'Qualitative', defaultVal: '1+ Trace' },
    { name: 'Serum Creatinine', unit: 'mg/dL', defaultVal: '1.4' },
    { name: 'SGPT / ALT', unit: 'U/L', defaultVal: '75' }
  ];

  const handleAddRow = () => {
    setEntries([...entries, { name: '', value: '', unit: '' }]);
  };

  const handleRemoveRow = (index: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index: number, field: 'name' | 'value' | 'unit', val: string) => {
    const updated = [...entries];
    updated[index][field] = val;
    setEntries(updated);
  };

  const handleSelectQuick = (preset: typeof quickPresets[0]) => {
    // Check if already in list
    const exists = entries.some(e => e.name.toLowerCase() === preset.name.toLowerCase());
    if (!exists) {
      setEntries([...entries, { name: preset.name, value: preset.defaultVal, unit: preset.unit }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = entries
      .filter((e) => e.name.trim() && e.value.trim())
      .map((e) => ({
        name: e.name.trim(),
        value: isNaN(Number(e.value)) ? e.value.trim() : Number(e.value),
        unit: e.unit.trim()
      }));

    if (valid.length > 0) {
      onSubmit(valid);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-5">
      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-['Outfit'] flex items-center gap-2">
          <Activity className="w-4 h-4 text-teal-600" />
          <span>{t.tabs.enterManually}</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {currentLanguage?.code !== 'en' 
            ? `Enter test values to generate an explanation in ${currentLanguage?.nativeName || 'English'}` 
            : 'Type your test results or click a quick-add chip below to get a plain-English explanation'}
        </p>
      </div>

      {/* Quick Add Chips */}
      <div>
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Quick-Add Common Tests:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickPresets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectQuick(p)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 border border-slate-200 text-slate-700 transition-colors"
            >
              + {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Parameter Input Rows */}
      <div className="space-y-2.5">
        <div className="grid grid-cols-12 gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
          <span className="col-span-5 sm:col-span-5">Test Parameter</span>
          <span className="col-span-4 sm:col-span-4">Result Value</span>
          <span className="col-span-2 sm:col-span-2">Unit</span>
          <span className="col-span-1 text-right">Del</span>
        </div>

        {entries.map((entry, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-center">
            <input
              type="text"
              required
              value={entry.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="e.g. Hemoglobin"
              className="col-span-5 sm:col-span-5 px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              required
              value={entry.value}
              onChange={(e) => handleChange(index, 'value', e.target.value)}
              placeholder="e.g. 9.8"
              className="col-span-4 sm:col-span-4 px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono"
            />
            <input
              type="text"
              value={entry.unit}
              onChange={(e) => handleChange(index, 'unit', e.target.value)}
              placeholder="e.g. g/dL"
              className="col-span-2 sm:col-span-2 px-2 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-500"
            />
            <div className="col-span-1 text-right">
              <button
                type="button"
                disabled={entries.length <= 1}
                onClick={() => handleRemoveRow(index)}
                className="p-1.5 text-slate-400 hover:text-rose-500 disabled:opacity-30 transition-colors"
                title="Remove parameter"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Row Control and Submit */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
        <button
          type="button"
          onClick={handleAddRow}
          className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-teal-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Another Test Parameter</span>
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-teal-700/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          <span>{isLoading ? t.upload.analyzing : (currentLanguage?.code !== 'en' ? `Explain in ${currentLanguage?.nativeName || 'Selected Language'}` : 'Explain My Report')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
