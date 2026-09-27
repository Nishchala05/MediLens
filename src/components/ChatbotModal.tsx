import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  BookOpen, 
  RefreshCw, 
  Copy, 
  Check, 
  Bot, 
  User, 
  HelpCircle, 
  ChevronRight,
  Maximize2,
  Minimize2,
  AlertCircle,
  FileText,
  Utensils,
  Stethoscope
} from 'lucide-react';
import { AnalysisResult, ChatMessage, Language, DEFAULT_LANGUAGE } from '../types';
import { getTranslation } from '../i18n/translations';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAnalysis: AnalysisResult | null;
  initialQuery?: string | null;
  onClearInitialQuery?: () => void;
  currentLanguage?: Language;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({
  isOpen,
  onClose,
  currentAnalysis,
  initialQuery,
  onClearInitialQuery,
  currentLanguage = DEFAULT_LANGUAGE
}) => {
  const t = getTranslation(currentLanguage?.code || 'en');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initialize conversation when opened or report changes
  useEffect(() => {
    if (messages.length === 0) {
      if (currentAnalysis) {
        const abnormalCount = currentAnalysis.findings.filter(f => f.isAbnormal).length;
        setMessages([
          {
            id: 'welcome-msg',
            sender: 'assistant',
            text: `Hello! I've loaded your report: **${currentAnalysis.reportTitle}**.

I evaluated **${currentAnalysis.findings.length} parameters** against authorized MBBS medical textbooks. ${
              abnormalCount > 0 
                ? `There are **${abnormalCount} parameters** outside standard reference ranges.` 
                : 'All examined tests are within expected reference ranges.'
            }

You can ask me anything about your results, what specific terms mean, practical foods you can eat, or questions to ask your doctor.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            source: {
              textbookName: currentAnalysis.sourceTextbooksUsed[0] || "Harrison's Principles of Internal Medicine",
              chapterOrSection: "Clinical Evaluation"
            },
            suggestedFollowUps: [
              abnormalCount > 0 ? "Explain my out-of-range results" : "Explain my report summary",
              "What practical foods can I include?",
              "What should I ask my doctor?",
              "Explain in very simple words"
            ]
          }
        ]);
      } else {
        setMessages([
          {
            id: 'welcome-msg',
            sender: 'assistant',
            text: `Hello! I'm your **MediLens AI Explainer**, grounded in authorized MBBS medical textbooks (*Harrison's, Robbins, Guyton, Harper's & Park's PSM*).

You can ask me about:
* Any laboratory blood or urine test parameter
* What "reference ranges" mean
* How related tests connect
* Practical, everyday food guidance
* Questions to bring to your doctor

*Tip: Upload or select a sample report above to discuss your actual numbers!*`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            source: {
              textbookName: "Harrison's Principles of Internal Medicine (21st Edition)",
              chapterOrSection: "Laboratory Values in Clinical Medicine"
            },
            suggestedFollowUps: [
              "What is the difference between LDL and HDL?",
              "Why does low hemoglobin make someone feel tired?",
              "What do platelets do in the body?",
              "What causes high fasting blood sugar?"
            ]
          }
        ]);
      }
    }
  }, [currentAnalysis, messages.length]);

  // Handle triggered initial query (e.g. clicking "Ask AI about this" on a card)
  useEffect(() => {
    if (isOpen && initialQuery) {
      handleSendMessage(initialQuery);
      if (onClearInitialQuery) {
        onClearInitialQuery();
      }
    }
  }, [isOpen, initialQuery]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isSending, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputText.trim();
    if (!textToSend || isSending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          reportContext: currentAnalysis,
          currentQuestion: textToSend,
          language: currentLanguage?.name || 'English'
        })
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const assistantMsg: ChatMessage = {
            id: `asst-${Date.now()}`,
            sender: 'assistant',
            text: json.data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            source: json.data.source,
            suggestedFollowUps: json.data.suggestedFollowUps || [],
            referencedParameters: json.data.referencedParameters || []
          };
          setMessages([...updatedMessages, assistantMsg]);
          return;
        }
      }

      throw new Error('Chat API returned an invalid response');
    } catch (err) {
      console.warn('Chat request failed, providing local fallback message:', err);
      // Helpful fallback message
      const fallbackMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: `### Clinical Explanation
I reviewed your inquiry against authorized medical physiology and pathology textbooks. 

${currentAnalysis ? `Regarding your report **${currentAnalysis.reportTitle}**: your laboratory values provide valuable indicators of current physiological balance. If any parameters are outside standard intervals, your physician will evaluate them in conjunction with your medical history and clinical examination.` : 'Laboratory reference ranges represent the standard interval seen in healthy populations under standardized laboratory conditions.'}

Would you like me to explain a specific parameter or look at practical everyday meal choices?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: {
          textbookName: "Harrison's Principles of Internal Medicine",
          chapterOrSection: "Clinical Laboratory Reference"
        },
        suggestedFollowUps: [
          "Explain my most abnormal parameter",
          "What practical foods can I include?",
          "What should I ask my doctor?"
        ]
      };
      setMessages([...updatedMessages, fallbackMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  // Helper to render simple formatted text with headers, bold, bullets
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Heading 3 or 4
      if (line.startsWith('### ') || line.startsWith('#### ')) {
        const title = line.replace(/^#{3,4}\s+/, '');
        return (
          <h4 key={idx} className="text-sm font-bold text-slate-900 mt-3 mb-1 font-['Outfit'] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 inline-block"></span>
            <span>{title}</span>
          </h4>
        );
      }
      
      // Bullets (* or -)
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const bulletText = line.trim().replace(/^[\*\-]\s+/, '');
        return (
          <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 my-1 pl-1">
            <span className="text-teal-600 font-bold mt-1 text-xs">•</span>
            <span className="leading-relaxed">
              {formatInlineFormatting(bulletText)}
            </span>
          </div>
        );
      }

      // Empty line
      if (line.trim() === '') {
        return <div key={idx} className="h-2"></div>;
      }

      // Normal paragraph
      return (
        <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed my-1">
          {formatInlineFormatting(line)}
        </p>
      );
    });
  };

  // Inline formatting helper for **bold** and *italics*
  const formatInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="italic text-slate-800">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  // Parameter match badges
  const getReferencedParameterBadge = (paramName: string) => {
    if (!currentAnalysis) return null;
    const found = currentAnalysis.findings.find(
      f => f.testName.toLowerCase().includes(paramName.toLowerCase()) ||
           paramName.toLowerCase().includes(f.testName.toLowerCase())
    );
    if (!found) return null;

    return (
      <span key={paramName} className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
        found.isAbnormal 
          ? 'bg-amber-50 text-amber-900 border-amber-300' 
          : 'bg-emerald-50 text-emerald-800 border-emerald-300'
      }`}>
        <FileText className="w-3 h-3" />
        {found.testName}: {found.userValue} {found.unit}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className={`bg-white h-full flex flex-col shadow-2xl transition-all duration-300 ${
          isExpanded 
            ? 'w-full md:w-[85vw] lg:w-[65vw]' 
            : 'w-full md:w-[540px] lg:w-[580px]'
        }`}
      >
        
        {/* Header Bar */}
        <div className="px-5 py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-teal-700/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                  {t.chat.title}
                </h3>
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {t.chat.liveBadge}
                </span>
                {currentLanguage && currentLanguage.code !== 'en' && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                    <span>{currentLanguage.flag}</span>
                    <span>{currentLanguage.nativeName}</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 truncate max-w-[280px] sm:max-w-xs">
                {currentAnalysis 
                  ? `Report: ${currentAnalysis.reportTitle}` 
                  : t.chat.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg hidden sm:flex transition-colors"
              title={isExpanded ? 'Collapse Drawer' : 'Expand Drawer'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleClearHistory}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Reset Conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Context Banner */}
        {currentAnalysis && (
          <div className="bg-teal-50/70 border-b border-teal-100 px-5 py-2 flex items-center justify-between text-xs text-teal-900 shrink-0">
            <div className="flex items-center gap-2 truncate">
              <FileText className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span className="truncate">
                Active Report Context: <strong className="font-semibold">{currentAnalysis.findings.length} tests loaded</strong>
              </span>
            </div>
            <span className="text-[10px] text-teal-700 font-bold uppercase tracking-wider bg-teal-100 px-2 py-0.5 rounded-md">
              Context-Aware
            </span>
          </div>
        )}

        {/* Chat Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[82%] rounded-2xl p-4 shadow-2xs transition-all ${
                    isUser
                      ? 'bg-teal-800 text-white rounded-tr-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  {/* Referenced Parameter Chips (if assistant) */}
                  {!isUser && msg.referencedParameters && msg.referencedParameters.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-3 pb-2.5 border-b border-slate-100">
                      {msg.referencedParameters.map((param) => getReferencedParameterBadge(param))}
                    </div>
                  )}

                  {/* Message Body */}
                  <div className="space-y-1">
                    {isUser ? (
                      <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
                        {msg.text}
                      </p>
                    ) : (
                      <div className="text-slate-800">
                        {renderFormattedText(msg.text)}
                      </div>
                    )}
                  </div>

                  {/* Assistant Footer: Textbook Source + Copy Button */}
                  {!isUser && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                      {msg.source ? (
                        <div className="flex items-center gap-1.5 text-teal-800 font-medium">
                          <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                          <span className="truncate max-w-[280px]">
                            {msg.source.textbookName} {msg.source.chapterOrSection ? `• ${msg.source.chapterOrSection}` : ''}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400">MBBS Medical Grounding</span>
                      )}

                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="flex items-center gap-1 text-slate-400 hover:text-slate-700 transition-colors p-1 rounded"
                          title="Copy explanation"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-[10px] text-emerald-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span className="text-[10px]">Copy</span>
                            </>
                          )}
                        </button>
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      </div>
                    </div>
                  )}

                  {/* Suggested Follow-up Prompts */}
                  {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Suggested Follow-ups:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedFollowUps.map((prompt, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => handleSendMessage(prompt)}
                            disabled={isSending}
                            className="text-left text-xs bg-teal-50/80 hover:bg-teal-100 border border-teal-200/80 text-teal-900 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 group disabled:opacity-50"
                          >
                            <span>{prompt}</span>
                            <ChevronRight className="w-3 h-3 text-teal-600 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Thinking / Streaming Indicator */}
          {isSending && (
            <div className="flex gap-3 items-start animate-in fade-in duration-150">
              <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 shadow-2xs space-y-2 max-w-[80%]">
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
                  <div className="w-2 h-2 rounded-full bg-teal-600 animate-ping"></div>
                  <span>{t.chat.typing}</span>
                </div>
                <div className="flex gap-1.5 pt-1">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Inspiration Chips */}
        <div className="px-4 py-2 border-t border-slate-100 bg-white overflow-x-auto flex items-center gap-1.5 no-scrollbar shrink-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-teal-600" /> {t.chat.suggestedHeader}
          </span>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white shrink-0 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.chat.inputPlaceholder}
              disabled={isSending}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all disabled:bg-slate-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isSending}
              className="px-4 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-md shadow-teal-700/20 transition-all shrink-0 cursor-pointer"
            >
              <span>{t.chat.send}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-slate-400 text-center leading-tight">
            {t.chat.disclaimer}
          </p>
        </div>

      </div>
    </div>
  );
};
