import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Camera, 
  Image as ImageIcon, 
  X, 
  ArrowRight, 
  AlertCircle 
} from 'lucide-react';
import { Language, DEFAULT_LANGUAGE } from '../types';
import { getTranslation } from '../i18n/translations';

interface UploadSectionProps {
  onAnalyzeFile: (base64: string, mimeType: string) => void;
  onAnalyzeText: (text: string) => void;
  isLoading: boolean;
  currentLanguage?: Language;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  onAnalyzeFile,
  onAnalyzeText,
  isLoading,
  currentLanguage = DEFAULT_LANGUAGE
}) => {
  const t = getTranslation(currentLanguage?.code || 'en');
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [selectedFile, setSelectedFile] = useState<{ file: File; preview: string } | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedFile({
        file,
        preview: e.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSubmit = () => {
    if (selectedFile) {
      onAnalyzeFile(selectedFile.preview, selectedFile.file.type || 'image/jpeg');
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pastedText.trim()) {
      onAnalyzeText(pastedText.trim());
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 bg-slate-50/70 p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'upload'
              ? 'bg-white text-teal-800 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UploadCloud className="w-4 h-4 text-teal-600" />
          <span>{t.upload.uploadTab}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('paste')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'paste'
              ? 'bg-white text-teal-800 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4 text-teal-600" />
          <span>{t.upload.pasteTab}</span>
        </button>
      </div>

      <div className="p-5 sm:p-6">
        {activeTab === 'upload' ? (
          <div>
            {!selectedFile ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  dragOver
                    ? 'border-teal-500 bg-teal-50/50'
                    : 'border-slate-300 hover:border-teal-400 bg-slate-50/40'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />

                <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3.5 shadow-2xs">
                  <UploadCloud className="w-7 h-7" />
                </div>

                <h3 className="text-sm font-bold text-slate-800 font-['Outfit'] mb-1">
                  {t.upload.dragDrop}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  {t.upload.supports}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>{t.upload.chooseFile}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition-colors border border-slate-300/80 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-slate-500" />
                    <span>{t.upload.takePhoto}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 truncate">
                    {selectedFile.file.type.startsWith('image/') ? (
                      <img
                        src={selectedFile.preview}
                        alt="Preview"
                        className="w-14 h-14 rounded-lg object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                      </div>
                    )}
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {selectedFile.file.name}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {(selectedFile.file.size / 1024).toFixed(1)} KB • Ready for analysis
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                    title={t.upload.removeFile}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={handleFileSubmit}
                    className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-teal-700/20 flex items-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    <span>{isLoading ? t.upload.analyzing : t.upload.analyzeButton}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleTextSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t.upload.pastePrompt}
              </label>
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder={t.upload.pastePlaceholder}
                rows={6}
                className="w-full p-3 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono text-slate-800"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !pastedText.trim()}
                className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-teal-700/20 flex items-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
              >
                <span>{isLoading ? t.upload.analyzing : t.upload.analyzeButton}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
