/**
 * Centralized UI Translations for MediLens
 * Supports English, Hindi, Kannada, Telugu, Tamil, Malayalam, Bengali, Marathi, Gujarati, Punjabi, etc.
 */

export interface UITranslation {
  // Navigation
  nav: {
    brandSubtitle: string;
    labReportBreakdown: string;
    mythBusters: string;
    mbbsSources: string;
    medicalTerms: string;
    askAi: string;
    newReport: string;
    installApp: string;
  };

  // Tabs
  tabs: {
    sampleReports: string;
    uploadFile: string;
    enterManually: string;
  };

  // Home / Overview
  home: {
    sampleHeading: string;
    sampleSubtitle: string;
    selectPresetPrompt: string;
  };

  // Upload Section
  upload: {
    uploadTab: string;
    pasteTab: string;
    dragDrop: string;
    supports: string;
    chooseFile: string;
    takePhoto: string;
    pastePrompt: string;
    pastePlaceholder: string;
    analyzeButton: string;
    analyzing: string;
    removeFile: string;
  };

  // Report View
  report: {
    title: string;
    overallSummary: string;
    criticalAlerts: string;
    urgentDoctorAttention: string;
    filterAbnormalOnly: string;
    filterAll: string;
    showingFindings: string;
    discussWithDoctor: string;
    printPdf: string;
    shareSummary: string;
    copied: string;
    generalNutrition: string;
    sourceTextbooks: string;
    disclaimer: string;
    reviewedByTitle: string;
    reanalyzing: string;
    analyzedOn: string;
  };

  // Finding Card
  finding: {
    simpleMeaning: string;
    whatDoesItMean: string;
    whyDoesItHappen: string;
    whatItMeansInReport: string;
    clinicalBoundaries: string;
    canConclude: string;
    cannotConclude: string;
    groundedInTextbooks: string;
    practicalMeals: string;
    breakfast: string;
    lunch: string;
    eveningSnack: string;
    dinner: string;
    doctorQuestions: string;
    safetyNote: string;
    askAiAboutThis: string;
    statusNormal: string;
    statusLow: string;
    statusHigh: string;
    statusCritical: string;
    statusBorderline: string;
    copiedQuestion: string;
    selectForDoctor: string;
    selectedForDoctor: string;
  };

  // Chatbot
  chat: {
    title: string;
    subtitle: string;
    liveBadge: string;
    inputPlaceholder: string;
    send: string;
    typing: string;
    suggestedHeader: string;
    disclaimer: string;
    clearChat: string;
    askAboutParam: string;
  };

  // Status & Notifications
  status: {
    loadingAnalysis: string;
    translatingExplanation: string;
    errorProcessing: string;
    networkFallback: string;
    noFindings: string;
    analyzingImage: string;
  };
}

export const TRANSLATIONS: Record<string, UITranslation> = {
  en: {
    nav: {
      brandSubtitle: 'MBBS-Grounded Medical Lab Report Explainer',
      labReportBreakdown: 'Lab Report Breakdown',
      mythBusters: 'Myth Busters',
      mbbsSources: 'MBBS Sources',
      medicalTerms: 'Medical Terms',
      askAi: 'Ask MediLens',
      newReport: 'New Report',
      installApp: 'Install App',
    },
    tabs: {
      sampleReports: 'Sample Reports',
      uploadFile: 'Upload File / Photo',
      enterManually: 'Enter Values Manually',
    },
    home: {
      sampleHeading: 'Explore Verified Clinical Sample Reports',
      sampleSubtitle: 'Choose a realistic sample lab report to explore our plain-language, MBBS-grounded explanations, practical meal suggestions, and doctor discussion points.',
      selectPresetPrompt: 'Select a sample report to analyze:',
    },
    upload: {
      uploadTab: 'Upload Lab Report (Photo or PDF)',
      pasteTab: 'Paste Lab Text or Notes',
      dragDrop: 'Drag and drop your lab report here, or click to browse',
      supports: 'Supports clear photos (JPG, PNG) or laboratory PDF exports',
      chooseFile: 'Choose File',
      takePhoto: 'Take Photo',
      pastePrompt: 'Paste raw text from your lab report or doctor notes',
      pastePlaceholder: 'e.g., Hemoglobin 10.2 g/dL, Platelets 130,000, Total Cholesterol 245 mg/dL...',
      analyzeButton: 'Analyze Lab Report with MediLens',
      analyzing: 'Analyzing Report...',
      removeFile: 'Remove file',
    },
    report: {
      title: 'Lab Report Breakdown',
      overallSummary: 'Overall Report Summary',
      criticalAlerts: 'Critical Medical Alerts',
      urgentDoctorAttention: 'Please share these results promptly with your doctor or emergency healthcare provider.',
      filterAbnormalOnly: 'Abnormal only',
      filterAll: 'All parameters',
      showingFindings: 'Showing',
      discussWithDoctor: 'Discuss with Doctor',
      printPdf: 'Print / Save PDF',
      shareSummary: 'Share Summary',
      copied: 'Copied to clipboard!',
      generalNutrition: 'General Nutritional Guidance',
      sourceTextbooks: 'Textbook Reference Foundations',
      disclaimer: 'Educational & Explanatory Tool: MediLens is grounded in authorized MBBS medical textbooks to help you understand lab reports. It does not provide medical diagnoses or replace consultations with licensed physicians.',
      reviewedByTitle: 'Report Assessment Overview',
      reanalyzing: 'Updating analysis...',
      analyzedOn: 'Analyzed on',
    },
    finding: {
      simpleMeaning: 'Simple Meaning',
      whatDoesItMean: '1. What Does It Mean?',
      whyDoesItHappen: '2. Why Does It Happen?',
      whatItMeansInReport: '3. What It Means in This Report',
      clinicalBoundaries: '4. Clinical Boundaries & Limits',
      canConclude: 'What this CAN indicate',
      cannotConclude: 'What this CANNOT conclude alone',
      groundedInTextbooks: '5. Grounded in MBBS Medical Textbooks',
      practicalMeals: 'Practical Everyday Meal Ideas',
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      eveningSnack: 'Evening Snack',
      dinner: 'Dinner',
      doctorQuestions: 'Key Questions for Your Doctor',
      safetyNote: 'Safety & Clinical Note',
      askAiAboutThis: 'Ask MediLens about this',
      statusNormal: 'Within Standard Range',
      statusLow: 'Below Reported Range',
      statusHigh: 'Above Reported Range',
      statusCritical: 'Significantly Abnormal',
      statusBorderline: 'Borderline',
      copiedQuestion: 'Copied question!',
      selectForDoctor: 'Select for doctor discussion',
      selectedForDoctor: 'Selected for doctor visit',
    },
    chat: {
      title: 'Ask MediLens Assistant',
      subtitle: 'Empathetic, textbook-grounded answers about your results',
      liveBadge: 'Live MBBS Engine',
      inputPlaceholder: 'Ask any question about your report...',
      send: 'Send',
      typing: 'MediLens is consulting medical textbooks...',
      suggestedHeader: 'Suggested Questions Grounded in Your Report:',
      disclaimer: 'MediLens AI answers are for educational purposes grounded in medical textbooks. Always consult your doctor for diagnosis and clinical treatment plans.',
      clearChat: 'Clear chat',
      askAboutParam: 'Ask about this test',
    },
    status: {
      loadingAnalysis: 'Analyzing report with MBBS-grounded medical knowledge...',
      translatingExplanation: 'Translating explanation into',
      errorProcessing: 'Could not process report. Please try again.',
      networkFallback: 'Connection issue. Using verified offline medical knowledge.',
      noFindings: 'No findings match the selected filter.',
      analyzingImage: 'Reading and interpreting your laboratory report...',
    },
  },

  hi: {
    nav: {
      brandSubtitle: 'एमबीबीएस पाठ्यपुस्तकों पर आधारित मेडिकल लैब रिपोर्ट विश्लेषक',
      labReportBreakdown: 'लैब रिपोर्ट विवरण',
      mythBusters: 'भ्रांतियां और तथ्य',
      mbbsSources: 'एमबीबीएस संदर्भ',
      medicalTerms: 'चिकित्सा शब्दावली',
      askAi: 'मेडीलेंस से पूछें',
      newReport: 'नई रिपोर्ट',
      installApp: 'ऐप इंस्टॉल करें',
    },
    tabs: {
      sampleReports: 'नमूना रिपोर्ट',
      uploadFile: 'फ़ाइल / फ़ोटो अपलोड करें',
      enterManually: 'स्वयं मान दर्ज करें',
    },
    home: {
      sampleHeading: 'सत्यापित नैदानिक नमूना रिपोर्ट देखें',
      sampleSubtitle: 'हमारी सरल भाषा, एमबीबीएस संदर्भों, व्यावहारिक भोजन सुझावों और डॉक्टर से पूछने योग्य प्रश्नों को समझने के लिए नमूना रिपोर्ट चुनें।',
      selectPresetPrompt: 'विश्लेषण के लिए एक नमूना रिपोर्ट चुनें:',
    },
    upload: {
      uploadTab: 'लैब रिपोर्ट अपलोड करें (फ़ोटो या पीडीएफ)',
      pasteTab: 'लैब पाठ या नोट्स पेस्ट करें',
      dragDrop: 'अपनी लैब रिपोर्ट यहां खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें',
      supports: 'स्पष्ट तस्वीरें (JPG, PNG) या प्रयोगशाला PDF निर्यात समर्थित हैं',
      chooseFile: 'फ़ाइल चुनें',
      takePhoto: 'फ़ोटो लें',
      pastePrompt: 'अपनी लैब रिपोर्ट या डॉक्टर के नोट्स से पाठ पेस्ट करें',
      pastePlaceholder: 'उदा. हीमोग्लोबिन 10.2 g/dL, प्लेटलेट्स 130,000, कुल कोलेस्ट्रॉल 245 mg/dL...',
      analyzeButton: 'मेडीलेंस से लैब रिपोर्ट का विश्लेषण करें',
      analyzing: 'रिपोर्ट का विश्लेषण हो रहा है...',
      removeFile: 'फ़ाइल हटाएं',
    },
    report: {
      title: 'लैब रिपोर्ट का विश्लेषण',
      overallSummary: 'समग्र रिपोर्ट सारांश',
      criticalAlerts: 'महत्वपूर्ण चेतावनी सूचनाएं',
      urgentDoctorAttention: 'कृपया इन परिणामों को तुरंत अपने चिकित्सक या आपातकालीन स्वास्थ्य प्रदाता को दिखाएं।',
      filterAbnormalOnly: 'केवल असामान्य',
      filterAll: 'सभी पैरामीटर',
      showingFindings: 'दिखा रहे हैं',
      discussWithDoctor: 'डॉक्टर से चर्चा करें',
      printPdf: 'प्रिंट / पीडीएफ सहेजें',
      shareSummary: 'सारांश साझा करें',
      copied: 'कॉपी कर लिया गया!',
      generalNutrition: 'सामान्य पोषण मार्गदर्शन',
      sourceTextbooks: 'पाठ्यपुस्तक संदर्भ आधार',
      disclaimer: 'शैक्षणिक व व्याख्यात्मक साधन: मेडीलेंस लैब रिपोर्ट को समझने में मदद के लिए अधिकृत एमबीबीएस पाठ्यपुस्तकों पर आधारित है। यह चिकित्सा निदान या डॉक्टर के परामर्श का विकल्प नहीं है।',
      reviewedByTitle: 'रिपोर्ट मूल्यांकन अवलोकन',
      reanalyzing: 'विश्लेषण अपडेट हो रहा है...',
      analyzedOn: 'विश्लेषण तिथि',
    },
    finding: {
      simpleMeaning: 'सरल अर्थ',
      whatDoesItMean: '१. इसका क्या अर्थ है?',
      whyDoesItHappen: '२. यह क्यों होता है?',
      whatItMeansInReport: '३. इस रिपोर्ट में इसका क्या अर्थ है?',
      clinicalBoundaries: '४. नैदानिक सीमाएं व निष्कर्ष',
      canConclude: 'यह क्या दर्शा सकता है',
      cannotConclude: 'केवल इससे क्या निष्कर्ष नहीं निकाला जा सकता',
      groundedInTextbooks: '५. अधिकृत एमबीबीएस पाठ्यपुस्तकों पर आधारित',
      practicalMeals: 'व्यावहारिक दैनिक आहार सुझाव',
      breakfast: 'सुबह का नाश्ता',
      lunch: 'दोपहर का भोजन',
      eveningSnack: 'शाम का नाश्ता',
      dinner: 'रात का भोजन',
      doctorQuestions: 'डॉक्टर से पूछने योग्य मुख्य प्रश्न',
      safetyNote: 'सुरक्षा और नैदानिक सलाह',
      askAiAboutThis: 'इस जांच के बारे में मेडीलेंस से पूछें',
      statusNormal: 'सामान्य सीमा के भीतर',
      statusLow: 'सामान्य सीमा से कम',
      statusHigh: 'सामान्य सीमा से अधिक',
      statusCritical: 'अत्यधिक असामान्य',
      statusBorderline: 'सीमांत (बॉर्डरलाइन)',
      copiedQuestion: 'प्रश्न कॉपी किया गया!',
      selectForDoctor: 'डॉक्टर चर्चा हेतु चुनें',
      selectedForDoctor: 'डॉक्टर चर्चा हेतु चयनित',
    },
    chat: {
      title: 'मेडीलेंस सहायक से पूछें',
      subtitle: 'आपकी रिपोर्ट पर पाठ्यपुस्तकों पर आधारित सहानुभूतिपूर्ण उत्तर',
      liveBadge: 'लाइव एमबीबीएस इंजन',
      inputPlaceholder: 'अपनी रिपोर्ट के बारे में कोई भी प्रश्न पूछें...',
      send: 'भेजें',
      typing: 'मेडीलेंस मेडिकल किताबों का संदर्भ ले रहा है...',
      suggestedHeader: 'आपकी रिपोर्ट पर आधारित सुझाए गए प्रश्न:',
      disclaimer: 'मेडीलेंस उत्तर केवल शैक्षिक उद्देश्यों के लिए हैं। हमेशा निदान और उपचार के लिए अपने डॉक्टर से परामर्श करें।',
      clearChat: 'बातचीत साफ़ करें',
      askAboutParam: 'इस जांच के बारे में पूछें',
    },
    status: {
      loadingAnalysis: 'एमबीबीएस ज्ञान के साथ रिपोर्ट का विश्लेषण किया जा रहा है...',
      translatingExplanation: 'विवरण का अनुवाद किया जा रहा है:',
      errorProcessing: 'रिपोर्ट प्रोसेस नहीं हो सकी। कृपया पुनः प्रयास करें।',
      networkFallback: 'कनेक्शन समस्या। ऑफलाइन मेडिकल ज्ञान का उपयोग हो रहा है।',
      noFindings: 'चयनित फ़िल्टर से कोई परिणाम मेल नहीं खाता।',
      analyzingImage: 'आपकी प्रयोगशाला रिपोर्ट को पढ़ा और समझा जा रहा है...',
    },
  },

  kn: {
    nav: {
      brandSubtitle: 'MBBS ಪಠ್ಯಪುಸ್ತಕಗಳ ಆಧಾರಿತ ವೈದ್ಯಕೀಯ ಲ್ಯಾಬ್ ವರದಿ ವಿವರಣೆಗಾರ',
      labReportBreakdown: 'ಲ್ಯಾಬ್ ವರದಿ ವಿಶ್ಲೇಷಣೆ',
      mythBusters: 'ತಪ್ಪು ಕಲ್ಪನೆಗಳು ಮತ್ತು ಸತ್ಯ',
      mbbsSources: 'MBBS ಆಕರಗಳು',
      medicalTerms: 'ವೈದ್ಯಕೀಯ ಪದಗಳು',
      askAi: 'MediLens ಅನ್ನು ಕೇಳಿ',
      newReport: 'ಹೊಸ ವರದಿ',
      installApp: 'ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ',
    },
    tabs: {
      sampleReports: 'ಮಾದರಿ ವರದಿಗಳು',
      uploadFile: 'ಫೈಲ್ / ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      enterManually: 'ಮೌಲ್ಯಗಳನ್ನು ನಮೂದಿಸಿ',
    },
    home: {
      sampleHeading: 'ಪರಿಶೀಲಿಸಿದ ವೈದ್ಯಕೀಯ ಮಾದರಿ ವರದಿಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
      sampleSubtitle: 'ಸರಳ ಭಾಷೆ, MBBS ಆಧಾರಿತ ವಿವರಣೆಗಳು, ಪ್ರಾಯೋಗಿಕ ಆಹಾರ ಸಲಹೆಗಳು ಮತ್ತು ವೈದ್ಯರೊಂದಿಗೆ ಚರ್ಚಿಸಬೇಕಾದ ಪ್ರಶ್ನೆಗಳನ್ನು ತಿಳಿಯಲು ಮಾದರಿ ವರದಿಯನ್ನು ಆರಿಸಿ.',
      selectPresetPrompt: 'ವಿಶ್ಲೇಷಿಸಲು ಒಂದು ಮಾದರಿ ವರದಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
    },
    upload: {
      uploadTab: 'ಲ್ಯಾಬ್ ವರದಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ (ಫೋಟೋ ಅಥವಾ PDF)',
      pasteTab: 'ವರದಿಯ ಪಠ್ಯವನ್ನು ಪೇಸ್ಟ್ ಮಾಡಿ',
      dragDrop: 'ನಿಮ್ಮ ಲ್ಯಾಬ್ ವರದಿಯನ್ನು ಇಲ್ಲಿ ಡ್ರ್ಯಾಗ್ ಮಾಡಿ ಅಥವಾ ಆಯ್ಕೆ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
      supports: 'ಸ್ಪಷ್ಟ ಫೋಟೋಗಳು (JPG, PNG) ಅಥವಾ PDF ವರದಿಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ',
      chooseFile: 'ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ',
      takePhoto: 'ಫೋಟೋ ತೆಗೆಯಿರಿ',
      pastePrompt: 'ನಿಮ್ಮ ಲ್ಯಾಬ್ ವರದಿ ಅಥವಾ ವೈದ್ಯರ ಟಿಪ್ಪಣಿಗಳ ಪಠ್ಯವನ್ನು ಪೇಸ್ಟ್ ಮಾಡಿ',
      pastePlaceholder: 'ಉದಾ: Hemoglobin 10.2 g/dL, Platelets 130,000, Total Cholesterol 245 mg/dL...',
      analyzeButton: 'MediLens ಮೂಲಕ ವರದಿ ವಿಶ್ಲೇಷಿಸಿ',
      analyzing: 'ವರದಿಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      removeFile: 'ಫೈಲ್ ತೆಗೆದುಹಾಕಿ',
    },
    report: {
      title: 'ಲ್ಯಾಬ್ ವರದಿ ವಿವರಣೆ',
      overallSummary: 'ಒಟ್ಟಾರೆ ವರದಿ ಸಾರಾಂಶ',
      criticalAlerts: 'ತುರ್ತು ವೈದ್ಯಕೀಯ ಎಚ್ಚರಿಕೆಗಳು',
      urgentDoctorAttention: 'ದಯವಿಟ್ಟು ಈ ಫಲಿತಾಂಶಗಳನ್ನು ತಕ್ಷಣವೇ ನಿಮ್ಮ ವೈದ್ಯರಿಗೆ ಅಥವಾ ತುರ್ತು ಚಿಕಿತ್ಸಾ ಸಿಬ್ಬಂದಿಗೆ ತೋರಿಸಿ.',
      filterAbnormalOnly: 'ಅಸಹಜ ಮಾತ್ರ',
      filterAll: 'ಎಲ್ಲಾ ಅಂಶಗಳು',
      showingFindings: 'ತೋರಿಸಲಾಗುತ್ತಿದೆ',
      discussWithDoctor: 'ವೈದ್ಯರೊಂದಿಗೆ ಚರ್ಚಿಸಿ',
      printPdf: 'ಪ್ರಿಂಟ್ / PDF ಉಳಿಸಿ',
      shareSummary: 'ಸಾರಾಂಶ ಹಂಚಿಕೊಳ್ಳಿ',
      copied: 'ಕ್ಲಿಪ್‌ಬೋರ್ಡ್‌ಗೆ ನಕಲಿಸಲಾಗಿದೆ!',
      generalNutrition: 'ಸಾಮಾನ್ಯ ಪೌಷ್ಟಿಕಾಂಶ ಮಾರ್ಗದರ್ಶನ',
      sourceTextbooks: 'ಪಠ್ಯಪುಸ್ತಕ ಆಧಾರ ಗ್ರಂಥಗಳು',
      disclaimer: 'ಶೈಕ್ಷಣಿಕ ಮತ್ತು ವಿವರಣಾತ್ಮಕ ಸಾಧನ: MediLens ಲ್ಯಾಬ್ ವರದಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮಾನ್ಯತೆ ಪಡೆದ MBBS ಪಠ್ಯಪುಸ್ತಕಗಳನ್ನು ಆಧರಿಸಿದೆ. ಇದು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯ ಅಥವಾ ವೈದ್ಯರ ಭೇಟಿಗೆ ಪರ್ಯಾಯವಲ್ಲ.',
      reviewedByTitle: 'ವರದಿ ಮೌಲ್ಯಮಾಪನ ಅವಲೋಕನ',
      reanalyzing: 'ವಿಶ್ಲೇಷಣೆ ನವೀಕರಿಸಲಾಗುತ್ತಿದೆ...',
      analyzedOn: 'ವಿಶ್ಲೇಷಿಸಿದ ದಿನಾಂಕ',
    },
    finding: {
      simpleMeaning: 'ಸರಳ ಅರ್ಥ',
      whatDoesItMean: '೧. ಇದರ ಅರ್ಥವೇನು?',
      whyDoesItHappen: '೨. ಇದು ಏಕೆ ಸಂಭವಿಸುತ್ತದೆ?',
      whatItMeansInReport: '೩. ಈ ವರದಿಯಲ್ಲಿ ಇದರ ಅರ್ಥವೇನು?',
      clinicalBoundaries: '೪. ವೈದ್ಯಕೀಯ ಮಿತಿಗಳು ಮತ್ತು ತೀರ್ಮಾನಗಳು',
      canConclude: 'ಇದು ಏನನ್ನು ಸೂಚಿಸಬಹುದು',
      cannotConclude: 'ಕೇವಲ ಇದರಿಂದ ಏನನ್ನು ತೀರ್ಮಾನಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ',
      groundedInTextbooks: '೫. MBBS ವೈದ್ಯಕೀಯ ಪಠ್ಯಪುಸ್ತಕಗಳ ಆಧಾರ',
      practicalMeals: 'ದೈನಂದಿನ ಪ್ರಾಯೋಗಿಕ ಆಹಾರ ಸಲಹೆಗಳು',
      breakfast: 'ಬೆಳಗಿನ ಉಪಹಾರ',
      lunch: 'ಮಧ್ಯಾಹ್ನದ ಊಟ',
      eveningSnack: 'ಸಂಜೆಯ ಲಘು ಉಪಹಾರ',
      dinner: 'ರಾತ್ರಿಯ ಊಟ',
      doctorQuestions: 'ವೈದ್ಯರಿಗೆ ಕೇಳಬೇಕಾದ ಪ್ರಮುಖ ಪ್ರಶ್ನೆಗಳು',
      safetyNote: 'ಸುರಕ್ಷತೆ ಮತ್ತು ವೈದ್ಯಕೀಯ ಎಚ್ಚರಿಕೆ',
      askAiAboutThis: 'ಈ ಪರೀಕ್ಷೆಯ ಬಗ್ಗೆ MediLens ಅನ್ನು ಕೇಳಿ',
      statusNormal: 'ಸಾಮಾನ್ಯ ವ್ಯಾಪ್ತಿಯಲ್ಲಿದೆ',
      statusLow: 'ಸಾಮಾನ್ಯ ವ್ಯಾಪ್ತಿಗಿಂತ ಕಡಿಮೆ',
      statusHigh: 'ಸಾಮಾನ್ಯ ವ್ಯಾಪ್ತಿಗಿಂತ ಹೆಚ್ಚು',
      statusCritical: 'ಗಣನೀಯವಾಗಿ ಅಸಹಜವಾಗಿದೆ',
      statusBorderline: 'ಗಡಿರೇಖೆಯಲ್ಲಿದೆ (ಬಾರ್ಡರ್‌ಲೈನ್)',
      copiedQuestion: 'ಪ್ರಶ್ನೆ ನಕಲಿಸಲಾಗಿದೆ!',
      selectForDoctor: 'ವೈದ್ಯರ ಚರ್ಚೆಗೆ ಆಯ್ಕೆಮಾಡಿ',
      selectedForDoctor: 'ವೈದ್ಯರ ಭೇಟಿಗೆ ಆಯ್ಕೆಯಾಗಿದೆ',
    },
    chat: {
      title: 'MediLens ಸಹಾಯಕರನ್ನು ಕೇಳಿ',
      subtitle: 'ನಿಮ್ಮ ಫಲಿತಾಂಶಗಳ ಬಗ್ಗೆ ಪಠ್ಯಪುಸ್ತಕ ಆಧಾರಿತ ಸಹಾನುಭೂತಿಯ ಉತ್ತರಗಳು',
      liveBadge: 'ಲೈವ್ MBBS ಎಂಜಿನ್',
      inputPlaceholder: 'ನಿಮ್ಮ ವರದಿಯ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ...',
      send: 'ಕಳುಹಿಸಿ',
      typing: 'MediLens ವೈದ್ಯಕೀಯ ಪಠ್ಯಪುಸ್ತಕಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿದೆ...',
      suggestedHeader: 'ನಿಮ್ಮ ವರದಿ ಆಧಾರಿತ ಸಲಹಾ ಪ್ರಶ್ನೆಗಳು:',
      disclaimer: 'MediLens ಉತ್ತರಗಳು ಶೈಕ್ಷಣಿಕ ಉದ್ದೇಶಕ್ಕಾಗಿ ಮಾತ್ರ. ರೋಗನಿರ್ಣಯ ಮತ್ತು ಚಿಕಿತ್ಸೆಗಾಗಿ ಯಾವಾಗಲೂ ನಿಮ್ಮ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      clearChat: 'ಸಂಭಾಷಣೆ ಅಳಿಸಿ',
      askAboutParam: 'ಈ ಪರೀಕ್ಷೆಯ ಬಗ್ಗೆ ಕೇಳಿ',
    },
    status: {
      loadingAnalysis: 'MBBS ಜ್ಞಾನದೊಂದಿಗೆ ವರದಿಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      translatingExplanation: 'ವಿವರಣೆಯನ್ನು ಭಾಷಾಂತರಿಸಲಾಗುತ್ತಿದೆ:',
      errorProcessing: 'ವರದಿಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.',
      networkFallback: 'ನೆಟ್‌ವರ್ಕ್ ಸಮಸ್ಯೆ. ಆಫ್‌ಲೈನ್ ವೈದ್ಯಕೀಯ ಜ್ಞಾನವನ್ನು ಬಳಸಲಾಗುತ್ತಿದೆ.',
      noFindings: 'ಆಯ್ಕೆಮಾಡಿದ ಫಿಲ್ಟರ್‌ಗೆ ಯಾವುದೇ ಫಲಿತಾಂಶ ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.',
      analyzingImage: 'ನಿಮ್ಮ ಪ್ರಯೋಗಾಲಯ ವರದಿಯನ್ನು ಓದಲಾಗುತ್ತಿದೆ...',
    },
  },

  te: {
    nav: {
      brandSubtitle: 'MBBS పాఠ్యపుస్తకాల ఆధారిత మెడికల్ ల్యాబ్ రిపోర్ట్ వివరణకర్త',
      labReportBreakdown: 'ల్యాబ్ రిపోర్ట్ వివరాలు',
      mythBusters: 'అపోహలు & నిజాలు',
      mbbsSources: 'MBBS ఆధారాలు',
      medicalTerms: 'వైద్య పదాలు',
      askAi: 'MediLens ని అడగండి',
      newReport: 'కొత్త నివేదిక',
      installApp: 'యాప్ ఇన్‌స్టాల్ చేయండి',
    },
    tabs: {
      sampleReports: 'నమూనా నివేదికలు',
      uploadFile: 'ఫైల్ / ఫోటో అప్‌లోడ్ చేయండి',
      enterManually: 'విలువలను నమోదు చేయండి',
    },
    home: {
      sampleHeading: 'ధృవీకరించబడిన క్లినికల్ నమూనా నివేదికలను చూడండి',
      sampleSubtitle: 'సులభమైన వివరణలు, MBBS ఆధారిత సమాచారం, ఆహార సూచనలు మరియు డాక్టర్‌ను అడగవలసిన ప్రశ్నలను తెలుసుకోవడానికి నమూనా నివేదికను ఎంచుకోండి.',
      selectPresetPrompt: 'విశ్లేషించడానికి ఒక నమూనా నివేదికను ఎంచుకోండి:',
    },
    upload: {
      uploadTab: 'ల్యాబ్ రిపోర్ట్ అప్‌లోడ్ చేయండి (ఫోటో లేదా PDF)',
      pasteTab: 'రిపోర్ట్ టెక్స్ట్ పేస్ట్ చేయండి',
      dragDrop: 'మీ ల్యాబ్ నివేదికను ఇక్కడ లాగి వదలండి లేదా ఫైల్ ఎంచుకోండి',
      supports: 'స్పష్టమైన ఫోటోలు (JPG, PNG) లేదా ల్యాబ్ PDF నివేదికలు',
      chooseFile: 'ఫైల్ ఎంచుకోండి',
      takePhoto: 'ఫోటో తీయండి',
      pastePrompt: 'మీ ల్యాబ్ రిపోర్ట్ లేదా డాక్టర్ నోట్స్ టెక్స్ట్‌ను పేస్ట్ చేయండి',
      pastePlaceholder: 'ఉదా: Hemoglobin 10.2 g/dL, Platelets 130,000, Total Cholesterol 245 mg/dL...',
      analyzeButton: 'MediLens తో విశ్లేషించండి',
      analyzing: 'రిపోర్ట్ విశ్లేషించబడుతోంది...',
      removeFile: 'ఫైల్ తొలగించండి',
    },
    report: {
      title: 'ల్యాబ్ రిపోర్ట్ విశ్లేషణ',
      overallSummary: 'మొత్తం నివేదిక సారాంశం',
      criticalAlerts: 'ముఖ్యమైన అత్యవసర హెచ్చరికలు',
      urgentDoctorAttention: 'దయచేసి ఈ ఫలితాలను వెంటనే మీ వైద్యుడికి లేదా అత్యవసర ఆరోగ్య సంరక్షణ ప్రదాతకు చూపించండి.',
      filterAbnormalOnly: 'అసాధారణమైనవి మాత్రమే',
      filterAll: 'అన్ని పారామీటర్లు',
      showingFindings: 'చూపిస్తున్నవి',
      discussWithDoctor: 'వైద్యునితో చర్చించండి',
      printPdf: 'ప్రింట్ / PDF సేవ్ చేయండి',
      shareSummary: 'సారాంశం పంచుకోండి',
      copied: 'కాపీ చేయబడింది!',
      generalNutrition: 'సాధారణ పోషకాహార మార్గదర్శకత్వం',
      sourceTextbooks: 'పాఠ్యపుస్తక ఆధార గ్రంథాలు',
      disclaimer: 'విద్యా మరియు వివరణాత్మక సాధనం: MediLens ల్యాబ్ నివేదికలను అర్థం చేసుకోవడానికి గుర్తింపు పొందిన MBBS పాఠ్యపుస్తకాలపై ఆధారపడింది. ఇది వైద్య నిర్ధారణ లేదా డాక్టర్ సంప్రదింపులకు ప్రత్యామ్నాయం కాదు.',
      reviewedByTitle: 'నివేదిక మూల్యాంకన అవలోకనం',
      reanalyzing: 'విశ్లేషణ నవీకరించబడుతోంది...',
      analyzedOn: 'విశ్లేషించిన తేదీ',
    },
    finding: {
      simpleMeaning: 'సరళమైన అర్థం',
      whatDoesItMean: '౧. దీని అర్థం ఏమిటి?',
      whyDoesItHappen: '౨. ఇది ఎందుకు జరుగుతుంది?',
      whatItMeansInReport: '౩. ఈ నివేదికలో దీని అర్థం ఏమిటి?',
      clinicalBoundaries: '౪. క్లినికల్ పరిమితులు మరియు ముగింపులు',
      canConclude: 'ఇది దేనిని సూచించవచ్చు',
      cannotConclude: 'దీని ఆధారంగా మాత్రమే ఏమి నిర్ధారించలేము',
      groundedInTextbooks: '౫. MBBS పాఠ్యపుస్తకాల ఆధారాలు',
      practicalMeals: 'రోజువారీ ఆహార సలహాలు',
      breakfast: 'ఉదయం అల్పాహారం',
      lunch: 'మధ్యాహ్న భోజనం',
      eveningSnack: 'సాయంత్రం చిరుతిండి',
      dinner: 'రాత్రి భోజనం',
      doctorQuestions: 'డాక్టర్‌ను అడగవలసిన ముఖ్యమైన ప్రశ్నలు',
      safetyNote: 'భద్రత మరియు క్లినికల్ సూచన',
      askAiAboutThis: 'ఈ పరీక్ష గురించి MediLens ని అడగండి',
      statusNormal: 'సాధారణ పరిధిలో ఉంది',
      statusLow: 'సాధారణ పరిధి కంటే తక్కువ',
      statusHigh: 'సాధారణ పరిధి కంటే ఎక్కువ',
      statusCritical: 'తీవ్రంగా అసాధారణమైనది',
      statusBorderline: 'సరిహద్దులో ఉంది (బోర్డర్‌లైన్)',
      copiedQuestion: 'ప్రశ్న కాపీ చేయబడింది!',
      selectForDoctor: 'డాక్టర్ చర్చకు ఎంచుకోండి',
      selectedForDoctor: 'డాక్టర్ సందర్శనకు ఎంపిక చేయబడింది',
    },
    chat: {
      title: 'MediLens సహాయకుడిని అడగండి',
      subtitle: 'మీ ఫలితాలపై పాఠ్యపుస్తక ఆధారిత సానుభూతిపూర్వక సమాధానాలు',
      liveBadge: 'లైవ్ MBBS ఇంజిన్',
      inputPlaceholder: 'మీ నివేదిక గురించి ఏదైనా ప్రశ్న అడగండి...',
      send: 'పంపండి',
      typing: 'MediLens వైద్య పుస్తకాలను పరిశీలిస్తోంది...',
      suggestedHeader: 'మీ రిపోర్ట్ ఆధారిత సూచించిన ప్రశ్నలు:',
      disclaimer: 'MediLens సమాధానాలు విద్యా ప్రయోజనాల కోసం మాత్రమే. చికిత్స కోసం ఎల్లప్పుడూ వైద్యుడిని సంప్రదించండి.',
      clearChat: 'చాట్ తొలగించండి',
      askAboutParam: 'ఈ పరీక్ష గురించి అడగండి',
    },
    status: {
      loadingAnalysis: 'MBBS సమాచారంతో నివేదిక విశ్లేషించబడుతోంది...',
      translatingExplanation: 'వివరణను అనువదిస్తోంది:',
      errorProcessing: 'నివేదిక ప్రాసెస్ చేయడం సాధ్యం కాలేదు. దయచేసి మళ్లీ ప్రయత్నించండి.',
      networkFallback: 'నెట్‌వర్క్ సమస్య. ఆఫ్‌లైన్ మెడికల్ నాలెడ్జ్ ఉపయోగించబడుతోంది.',
      noFindings: 'ఎంచుకున్న ఫిల్టర్‌కు ఫలితాలు లేవు.',
      analyzingImage: 'ల్యాబ్ నివేదికను చదవడం జరుగుతోంది...',
    },
  },

  ta: {
    nav: {
      brandSubtitle: 'MBBS பாடப்புத்தகங்கள் அடிப்படையிலான மருத்துவ ஆய்வக அறிக்கை விளக்க உரை',
      labReportBreakdown: 'ஆய்வக அறிக்கை விளக்கம்',
      mythBusters: 'வதந்திகள் & உண்மைகள்',
      mbbsSources: 'MBBS குறிப்புகள்',
      medicalTerms: 'மருத்துவச் சொற்கள்',
      askAi: 'MediLens-ஐக் கேளுங்கள்',
      newReport: 'புதிய அறிக்கை',
      installApp: 'செயலியை நிறுவுங்கள்',
    },
    tabs: {
      sampleReports: 'மாதிரி அறிக்கைகள்',
      uploadFile: 'கோப்பு / புகைப்படம் பதிவேற்றவும்',
      enterManually: 'மதிப்புகளை உள்ளிடவும்',
    },
    home: {
      sampleHeading: 'சரிபார்க்கப்பட்ட மருத்துவ மாதிரி அறிக்கைகளை ஆராயுங்கள்',
      sampleSubtitle: 'எளிய மொழி விளக்கம், MBBS குறிப்புகள், நடைமுறை உணவுப் பரிந்துரைகள் மற்றும் மருத்துவரிடம் கேட்க வேண்டிய கேள்விகளை அறிய மாதிரி அறிக்கையைத் தேர்ந்தெடுக்கவும்.',
      selectPresetPrompt: 'ஆய்வு செய்ய மாதிரி அறிக்கையைத் தேர்ந்தெடுக்கவும்:',
    },
    upload: {
      uploadTab: 'ஆய்வக அறிக்கையைப் பதிவேற்றவும் (புகைப்படம் அல்லது PDF)',
      pasteTab: 'அறிக்கை உரையை ஒட்டவும்',
      dragDrop: 'உங்கள் அறிக்கையை இங்கே இழுத்து விடவும் அல்லது கோப்பைத் தேர்ந்தெடுக்கவும்',
      supports: 'தெளிவான புகைப்படங்கள் (JPG, PNG) அல்லது PDF கோப்புகள்',
      chooseFile: 'கோப்பைத் தேர்ந்தெடு',
      takePhoto: 'புகைப்படம் எடு',
      pastePrompt: 'உங்கள் ஆய்வக அறிக்கை அல்லது மருத்துவரின் குறிப்புகளை ஒட்டவும்',
      pastePlaceholder: 'எ.கா: Hemoglobin 10.2 g/dL, Platelets 130,000, Total Cholesterol 245 mg/dL...',
      analyzeButton: 'MediLens மூலம் ஆய்வு செய்',
      analyzing: 'அறிக்கை ஆய்வு செய்யப்படுகிறது...',
      removeFile: 'கோப்பை நீக்கு',
    },
    report: {
      title: 'ஆய்வக அறிக்கை விரிவான விளக்கம்',
      overallSummary: 'ஒட்டுமொத்த அறிக்கை சுருக்கம்',
      criticalAlerts: 'முக்கிய அவசர மருத்துவ எச்சரிக்கைகள்',
      urgentDoctorAttention: 'தயவுசெய்து இந்த முடிவுகளை உடனடியாக உங்கள் மருத்துவரிடம் அல்லது அவசர சிகிச்சை மையத்தில் காண்பிக்கவும்.',
      filterAbnormalOnly: 'இயல்புக்கு மாறானவை மட்டும்',
      filterAll: 'அனைத்து அளவீடுகள்',
      showingFindings: 'காட்டப்படுகிறது',
      discussWithDoctor: 'மருத்துவரிடம் ஆலோசிக்கவும்',
      printPdf: 'அச்சிடு / PDF சேமி',
      shareSummary: 'சுருக்கத்தைப் பகிரவும்',
      copied: 'நகலெடுக்கப்பட்டது!',
      generalNutrition: 'பொதுவான ஊட்டச்சத்து வழிகாட்டுதல்',
      sourceTextbooks: 'மருத்துவப் பாடப்புத்தக ஆதாரங்கள்',
      disclaimer: 'கல்வி மற்றும் விளக்கக் கருவி: MediLens ஆய்வக அறிக்கைகளைப் புரிந்துகொள்ள அங்கீகரிக்கப்பட்ட MBBS பாடப்புத்தகங்களை அடிப்படையாகக் கொண்டது. இது மருத்துவ நோயறிதல் அல்லது மருத்துவர் ஆலோசனைக்கு மாற்றாகாது.',
      reviewedByTitle: 'அறிக்கை மதிப்பீட்டு கண்ணோட்டம்',
      reanalyzing: 'ஆய்வு புதுப்பிக்கப்படுகிறது...',
      analyzedOn: 'ஆய்வு செய்யப்பட்ட தேதி',
    },
    finding: {
      simpleMeaning: 'எளிய விளக்கம்',
      whatDoesItMean: '1. இதன் பொருள் என்ன?',
      whyDoesItHappen: '2. இது ஏன் நிகழ்கிறது?',
      whatItMeansInReport: '3. இந்த அறிக்கையில் இதன் முக்கியத்துவம் என்ன?',
      clinicalBoundaries: '4. மருத்துவ எல்லைகள் மற்றும் முடிவுகள்',
      canConclude: 'இது எதைக் குறிக்கலாம்',
      cannotConclude: 'இதைக் கொண்டு மட்டும் எதை முடிவு செய்ய முடியாது',
      groundedInTextbooks: '5. MBBS மருத்துவப் பாடப்புத்தக ஆதாரங்கள்',
      practicalMeals: 'நடைமுறை அன்றாட உணவு ஆலோசனைகள்',
      breakfast: 'காலை உணவு',
      lunch: 'மதிய உணவு',
      eveningSnack: 'மாலை சிற்றுண்டி',
      dinner: 'இரவு உணவு',
      doctorQuestions: 'மருத்துவரிடம் கேட்க வேண்டிய முக்கியக் கேள்விகள்',
      safetyNote: 'பாதுகாப்பு & மருத்துவ எச்சரிக்கை',
      askAiAboutThis: 'இந்த சோதனையைப் பற்றி MediLens-இடம் கேளுங்கள்',
      statusNormal: 'சாதாரண வரம்பிற்குள் உள்ளது',
      statusLow: 'சாதாரண வரம்பை விடக் குறைவு',
      statusHigh: 'சாதாரண வரம்பை விட அதிகம்',
      statusCritical: 'மிகவும் மாறுபட்டது (அபாயகரமானது)',
      statusBorderline: 'விளிம்பு நிலை (Borderline)',
      copiedQuestion: 'கேள்வி நகலெடுக்கப்பட்டது!',
      selectForDoctor: 'மருத்துவர் ஆலோசனைக்காகத் தேர்ந்தெடு',
      selectedForDoctor: 'மருத்துவர் ஆலோசனைக்குத் தேர்ந்தெடுக்கப்பட்டது',
    },
    chat: {
      title: 'MediLens உதவியாளரிடம் கேளுங்கள்',
      subtitle: 'உங்கள் முடிவுகள் குறித்த பாடப்புத்தக அடிப்படையிலான கனிவான பதில்கள்',
      liveBadge: 'நேரடி MBBS என்ஜின்',
      inputPlaceholder: 'உங்கள் அறிக்கை குறித்த ஏதேனும் கேள்வியைக் கேளுங்கள்...',
      send: 'அனுப்பு',
      typing: 'MediLens மருத்துவப் புத்தகங்களை ஆராய்கிறது...',
      suggestedHeader: 'உங்கள் அறிக்கை சார்ந்த பரிந்துரைக்கப்பட்ட கேள்விகள்:',
      disclaimer: 'MediLens பதில்கள் கல்வி நோக்கங்களுக்காக மட்டுமே. சிகிச்சை மற்றும் நோயறிதலுக்கு எப்போதும் மருத்துவரை அணுகவும்.',
      clearChat: 'உரையாடலை அழிக்கவும்',
      askAboutParam: 'இந்த சோதனையைப் பற்றி கேளுங்கள்',
    },
    status: {
      loadingAnalysis: 'MBBS மருத்துவ அறிவுடன் அறிக்கை ஆய்வு செய்யப்படுகிறது...',
      translatingExplanation: 'விளக்கம் மொழிபெயர்க்கப்படுகிறது:',
      errorProcessing: 'அறிக்கையை ஆய்வு செய்ய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
      networkFallback: 'இணைப்புச் சிக்கல். ஆஃப்லைன் மருத்துவ அறிவு பயன்படுத்தப்படுகிறது.',
      noFindings: 'தேர்ந்தெடுக்கப்பட்ட வடிகட்டலுடன் எந்த முடிவுகளும் பொருந்தவில்லை.',
      analyzingImage: 'ஆய்வக அறிக்கை வாசிக்கப்படுகிறது...',
    },
  },

  ml: {
    nav: {
      brandSubtitle: 'MBBS പാഠപുസ്തകങ്ങളെ അടിസ്ഥാനമാക്കിയുള്ള മെഡിക്കൽ ലാബ് റിപ്പോർട്ട് വ്യാഖ്യാതാവ്',
      labReportBreakdown: 'ലാബ് റിപ്പോർട്ട് വിശകലനം',
      mythBusters: 'തെറ്റായ ധാരണകളും യാഥാർത്ഥ്യങ്ങളും',
      mbbsSources: 'MBBS അവലംബങ്ങൾ',
      medicalTerms: 'വൈദ്യശാസ്ത്ര പദങ്ങൾ',
      askAi: 'MediLens-നോട് ചോദിക്കുക',
      newReport: 'പുതിയ റിപ്പോർട്ട്',
      installApp: 'ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യുക',
    },
    tabs: {
      sampleReports: 'മാതൃകാ റിപ്പോർട്ടുകൾ',
      uploadFile: 'ഫയൽ / ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക',
      enterManually: 'മൂല്യങ്ങൾ നൽകുക',
    },
    home: {
      sampleHeading: 'പരിശോധിച്ച ക്ലിനിക്കൽ മാതൃകാ റിപ്പോർട്ടുകൾ കാണുക',
      sampleSubtitle: 'ലളിതമായ വിശദീകരണങ്ങൾ, MBBS അടിസ്ഥാന വിവരങ്ങൾ, ഭക്ഷണ നിർദ്ദേശങ്ങൾ, ഡോക്ടറോട് ചോദിക്കേണ്ട ചോദ്യങ്ങൾ എന്നിവ മനസ്സിലാക്കാൻ ഒരു മാതൃകാ റിപ്പോർട്ട് തിരഞ്ഞെടുക്കുക.',
      selectPresetPrompt: 'വിശകലനം ചെയ്യാൻ ഒരു മാതൃകാ റിപ്പോർട്ട് തിരഞ്ഞെടുക്കുക:',
    },
    upload: {
      uploadTab: 'ലാബ് റിപ്പോർട്ട് അപ്‌ലോഡ് ചെയ്യുക (ഫോട്ടോ അല്ലെങ്കിൽ PDF)',
      pasteTab: 'റിപ്പോർട്ട് ടെക്സ്റ്റ് പേസ്റ്റ് ചെയ്യുക',
      dragDrop: 'നിങ്ങളുടെ ലാബ് റിപ്പോർട്ട് ഇവിടെ ഡ്രാഗ് ചെയ്യുക അല്ലെങ്കിൽ ഫയൽ തിരഞ്ഞെടുക്കുക',
      supports: 'വ്യക്തമായ ഫോട്ടോകൾ (JPG, PNG) അല്ലെങ്കിൽ ലബോറട്ടറി PDF ഫയലുകൾ',
      chooseFile: 'ഫയൽ തിരഞ്ഞെടുക്കുക',
      takePhoto: 'ഫോട്ടോ എടുക്കുക',
      pastePrompt: 'നിങ്ങളുടെ ലാബ് റിപ്പോർട്ട് അല്ലെങ്കിൽ ഡോക്ടറുടെ കുറിപ്പുകൾ പേസ്റ്റ് ചെയ്യുക',
      pastePlaceholder: 'ഉദാ: Hemoglobin 10.2 g/dL, Platelets 130,000, Total Cholesterol 245 mg/dL...',
      analyzeButton: 'MediLens വഴി റിപ്പോർട്ട് വിശകലനം ചെയ്യുക',
      analyzing: 'റിപ്പോർട്ട് വിശകലനം ചെയ്യുന്നു...',
      removeFile: 'ഫയൽ നീക്കം ചെയ്യുക',
    },
    report: {
      title: 'ലാബ് റിപ്പോർട്ട് വിവരണം',
      overallSummary: 'മൊത്തത്തിലുള്ള റിപ്പോർട്ട് സംഗ്രഹം',
      criticalAlerts: 'ഗുരുതരമായ മെഡിക്കൽ മുന്നറിയിപ്പുകൾ',
      urgentDoctorAttention: 'ദയവായി ഈ ഫലങ്ങൾ എത്രയും വേഗം നിങ്ങളുടെ ഡോക്ടറെയോ അടിയന്തര ആരോഗ്യ പ്രവർത്തകരെയോ കാണിക്കുക.',
      filterAbnormalOnly: 'അസാധാരണമായവ മാത്രം',
      filterAll: 'എല്ലാ ഘടകങ്ങളും',
      showingFindings: 'കാണിക്കുന്നത്',
      discussWithDoctor: 'ഡോക്ടറോട് ചർച്ച ചെയ്യുക',
      printPdf: 'പ്രിന്റ് / PDF സേവ് ചെയ്യുക',
      shareSummary: 'സംഗ്രഹം പങ്കിടുക',
      copied: 'പകർത്തി!',
      generalNutrition: 'പൊതുവായ പോഷകാഹാര മാർഗ്ഗനിർദ്ദേശം',
      sourceTextbooks: 'മെഡിക്കൽ പാഠപുസ്തക അടിസ്ഥാനങ്ങൾ',
      disclaimer: 'വിദ്യാഭ്യാസപരവും വിശദീകരണാത്മകവുമായ ടൂൾ: ലാബ് റിപ്പോർട്ടുകൾ മനസ്സിലാക്കാൻ സഹായിക്കുന്നതിന് അംഗീകൃത MBBS പാഠപുസ്തകങ്ങളെ അടിസ്ഥാനമാക്കിയുള്ളതാണ് MediLens. ഇത് മെഡിക്കൽ രോഗനിർണയത്തിനോ ഡോക്ടറുടെ ഉപദേശത്തിനോ പകരമല്ല.',
      reviewedByTitle: 'റിപ്പോർട്ട് വിലയിരുത്തൽ അവലോകനം',
      reanalyzing: 'വിശകലനം അപ്‌ഡേറ്റ് ചെയ്യുന്നു...',
      analyzedOn: 'വിശകലനം ചെയ്ത തീയതി',
    },
    finding: {
      simpleMeaning: 'ലളിതമായ അർത്ഥം',
      whatDoesItMean: '1. ഇതിന്റെ അർത്ഥമെന്ത്?',
      whyDoesItHappen: '2. ഇത് എന്ത് കൊണ്ട് സംഭവിക്കുന്നു?',
      whatItMeansInReport: '3. ഈ റിപ്പോർട്ടിൽ ഇതിന്റെ പ്രാധാന്യമെന്ത്?',
      clinicalBoundaries: '4. ക്ലിനിക്കൽ പരിധികളും നിഗമനങ്ങളും',
      canConclude: 'ഇത് എന്തിനെ സൂചിപ്പിക്കാം',
      cannotConclude: 'ഇത് കൊണ്ട് മാത്രം എന്ത് നിഗമനത്തിൽ എത്താൻ കഴിയില്ല',
      groundedInTextbooks: '5. MBBS മെഡിക്കൽ പാഠപുസ്തകങ്ങളുടെ അടിസ്ഥാനം',
      practicalMeals: 'പ്രായോഗിക ദൈനംദിന ഭക്ഷണ നിർദ്ദേശങ്ങൾ',
      breakfast: 'പ്രഭാതഭക്ഷണം',
      lunch: 'ഉച്ചഭക്ഷണം',
      eveningSnack: 'വൈകുന്നേരത്തെ ലഘുഭക്ഷണം',
      dinner: 'അത്താഴം',
      doctorQuestions: 'ഡോക്ടറോട് ചോദിക്കേണ്ട പ്രധാന ചോദ്യങ്ങൾ',
      safetyNote: 'സുരക്ഷയും ക്ലിനിക്കൽ മുൻകരുതലുകളും',
      askAiAboutThis: 'ഈ പരിശോധനയെക്കുറിച്ച് MediLens-നോട് ചോദിക്കുക',
      statusNormal: 'സാധാരണ പരിധിയിൽ',
      statusLow: 'സാധാരണ പരിധിയേക്കാൾ കുറവ്',
      statusHigh: 'സാധാരണ പരിധിയേക്കാൾ കൂടുതൽ',
      statusCritical: 'വളരെ അസാധാരണം',
      statusBorderline: 'ബോർഡർലൈൻ',
      copiedQuestion: 'ചോദ്യം പകർത്തി!',
      selectForDoctor: 'ഡോക്ടറുടെ ചർച്ചയ്ക്കായി തിരഞ്ഞെടുക്കുക',
      selectedForDoctor: 'ഡോക്ടറെ കാണിക്കാൻ തിരഞ്ഞെടുത്തു',
    },
    chat: {
      title: 'MediLens അസിസ്റ്റന്റിനോട് ചോദിക്കുക',
      subtitle: 'നിങ്ങളുടെ ലാബ് ഫലങ്ങളെക്കുറിച്ചുള്ള സൗഹൃദപരമായ ഉത്തരങ്ങൾ',
      liveBadge: 'തത്സമയ MBBS എഞ്ചിൻ',
      inputPlaceholder: 'നിങ്ങളുടെ റിപ്പോർട്ടിനെക്കുറിച്ച് എന്തെങ്കിലും ചോദിക്കുക...',
      send: 'അയക്കുക',
      typing: 'MediLens മെഡിക്കൽ പുസ്തകങ്ങൾ പരിശോധിക്കുന്നു...',
      suggestedHeader: 'നിങ്ങളുടെ റിപ്പോർട്ടിനെ അടിസ്ഥാനമാക്കിയുള്ള നിർദ്ദേശിത ചോദ്യങ്ങൾ:',
      disclaimer: 'MediLens ഉത്തരങ്ങൾ വിദ്യാഭ്യാസ ആവശ്യങ്ങൾക്ക് മാത്രമുള്ളതാണ്. രോഗനിർണയത്തിനും ചികിത്സയ്ക്കും എല്ലായ്പ്പോഴും ഡോക്ടറെ സമീപിക്കുക.',
      clearChat: 'ചാറ്റ് മായ്‌ക്കുക',
      askAboutParam: 'ഈ ടെസ്റ്റിനെക്കുറിച്ച് ചോദിക്കുക',
    },
    status: {
      loadingAnalysis: 'MBBS അറിവോടെ റിപ്പോർട്ട് വിശകലനം ചെയ്യുന്നു...',
      translatingExplanation: 'വിശദീകരണം വിവർത്തനം ചെയ്യുന്നു:',
      errorProcessing: 'റിപ്പോർട്ട് പ്രോസസ്സ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.',
      networkFallback: 'നെറ്റ്‌വർക്ക് തകരാർ. ഓഫ്‌ലൈൻ മെഡിക്കൽ വിവരങ്ങൾ ഉപയോഗിക്കുന്നു.',
      noFindings: 'തിരഞ്ഞെടുത്ത ഫിൽട്ടറുമായി ഫലങ്ങളൊന്നും പൊരുത്തപ്പെടുന്നില്ല.',
      analyzingImage: 'ലാബ് റിപ്പോർട്ട് വായിക്കുന്നു...',
    },
  },

  bn: {
    nav: {
      brandSubtitle: 'এমবিবিএস পাঠ্যপুস্তক ভিত্তিক মেডিকেল ল্যাব রিপোর্ট ব্যাখ্যাকর্তা',
      labReportBreakdown: 'ল্যাব রিপোর্ট বিশ্লেষণ',
      mythBusters: 'ভুল ধারণা ও আসল তথ্য',
      mbbsSources: 'এমবিবিএস তথ্যসূত্র',
      medicalTerms: 'চিকিৎসা পরিভাষা',
      askAi: 'MediLens-কে জিজ্ঞাসা করুন',
      newReport: 'নতুন রিপোর্ট',
      installApp: 'অ্যাপ ইনস্টল করুন',
    },
    tabs: {
      sampleReports: 'নমুনা রিপোর্ট',
      uploadFile: 'ফাইল / ছবি আপলোড করুন',
      enterManually: 'মান নিজে লিখুন',
    },
    home: {
      sampleHeading: 'যাচাইকৃত ক্লিনিকাল নমুনা রিপোর্ট দেখুন',
      sampleSubtitle: 'সহজ ভাষায় ব্যাখ্যা, এমবিবিএস তথ্যসূত্র, খাবারের পরামর্শ এবং ডাক্তারের সাথে আলোচনার বিষয়গুলো দেখতে একটি নমুনা রিপোর্ট বেছে নিন।',
      selectPresetPrompt: 'বিশ্লেষণের জন্য একটি নমুনা রিপোর্ট নির্বাচন করুন:',
    },
    upload: {
      uploadTab: 'ল্যাব রিপোর্ট আপলোড করুন (ছবি বা PDF)',
      pasteTab: 'রিপোর্টের টেক্সট পেস্ট করুন',
      dragDrop: 'আপনার ল্যাব রিপোর্টটি এখানে টেনে আনুন বা ফাইল বেছে নিন',
      supports: 'স্পষ্ট ছবি (JPG, PNG) বা ল্যাবরেটরি PDF রিপোর্ট',
      chooseFile: 'ফাইল বাছুন',
      takePhoto: 'ছবি তুলুন',
      pastePrompt: 'আপনার ল্যাব রিপোর্ট বা ডাক্তারের প্রেসক্রিপশনের লেখা পেস্ট করুন',
      pastePlaceholder: 'যেমন: Hemoglobin 10.2 g/dL, Platelets 130,000, Total Cholesterol 245 mg/dL...',
      analyzeButton: 'MediLens দিয়ে রিপোর্ট বিশ্লেষণ করুন',
      analyzing: 'রিপোর্ট বিশ্লেষণ করা হচ্ছে...',
      removeFile: 'ফাইল সরান',
    },
    report: {
      title: 'ল্যাব রিপোর্ট বিশদ ব্যাখ্যা',
      overallSummary: 'সামগ্রিক রিপোর্ট সারাংশ',
      criticalAlerts: 'জরুরি সতর্কতা বিজ্ঞপ্তি',
      urgentDoctorAttention: 'অনুগ্রহ করে অবিলম্বে এই ফলাফলগুলি আপনার ডাক্তার বা জরুরি চিকিৎসাকেন্দ্রে দেখান।',
      filterAbnormalOnly: 'কেবলমাত্র অস্বাভাবিক',
      filterAll: 'সকল মান',
      showingFindings: 'প্রদর্শিত হচ্ছে',
      discussWithDoctor: 'ডাক্তারের সাথে আলোচনা করুন',
      printPdf: 'প্রিন্ট / PDF সংরক্ষণ করুন',
      shareSummary: 'সারাংশ শেয়ার করুন',
      copied: 'কপি করা হয়েছে!',
      generalNutrition: 'সাধারণ পুষ্টি পরামর্শ',
      sourceTextbooks: 'পাঠ্যপুস্তক তথ্যসূত্র ভিত্তি',
      disclaimer: 'শিক্ষামূলক ও ব্যাখ্যামূলক মাধ্যম: MediLens ল্যাব রিপোর্ট সহজে বুঝতে সাহায্য করার জন্য অনুমোদিত MBBS পাঠ্যপুস্তকের ওপর ভিত্তি করে তৈরি। এটি কোনো ডাক্তারি নির্ণয় বা চিকিৎসকের বিকল্প নয়।',
      reviewedByTitle: 'রিপোর্ট মূল্যায়ন পর্যালোচনা',
      reanalyzing: 'বিশ্লেষণ আপডেট করা হচ্ছে...',
      analyzedOn: 'বিশ্লেষণের তারিখ',
    },
    finding: {
      simpleMeaning: 'সহজ অর্থ',
      whatDoesItMean: '১. এর অর্থ কী?',
      whyDoesItHappen: '২. এটি কেন ঘটে?',
      whatItMeansInReport: '৩. এই রিপোর্টে এর গুরুত্ব কী?',
      clinicalBoundaries: '৪. ক্লিনিকাল সীমাবদ্ধতা ও সিদ্ধান্ত',
      canConclude: 'এটি কী ইঙ্গিত করতে পারে',
      cannotConclude: 'শুধুমাত্র এটি দিয়ে কী নিশ্চিত করা যায় না',
      groundedInTextbooks: '৫. এমবিবিএস চিকিৎসা পাঠ্যপুস্তকের ভিত্তি',
      practicalMeals: 'দৈনন্দিন খাবারের ব্যবহারিক পরামর্শ',
      breakfast: 'সকালের নাস্তা',
      lunch: 'দুপুরের খাবার',
      eveningSnack: 'সন্ধ্যার হালকা খাবার',
      dinner: 'রাতের খাবার',
      doctorQuestions: 'ডাক্তারকে জিজ্ঞাসা করার মতো মূল প্রশ্নসমূহ',
      safetyNote: 'সুরক্ষা ও ক্লিনিকাল সতর্কতা',
      askAiAboutThis: 'এই টেস্ট সম্পর্কে MediLens-কে জিজ্ঞাসা করুন',
      statusNormal: 'স্বাভাবিক সীমার মধ্যে',
      statusLow: 'স্বাভাবিক সীমার নিচে',
      statusHigh: 'স্বাভাবিক সীমার উপরে',
      statusCritical: 'অত্যধিক অস্বাভাবিক',
      statusBorderline: 'সীমান্তবর্তী (বর্ডারলাইন)',
      copiedQuestion: 'প্রশ্ন কপি করা হয়েছে!',
      selectForDoctor: 'ডাক্তার আলোচনার জন্য বাছুন',
      selectedForDoctor: 'ডাক্তার সাক্ষাতের জন্য নির্বাচিত',
    },
    chat: {
      title: 'MediLens সহকারীর সাথে কথা বলুন',
      subtitle: 'আপনার টেস্টের ফলাফলের ওপর নির্ভরযোগ্য ও সহানুভূতিশীল উত্তর',
      liveBadge: 'লাইভ এমবিবিএস ইঞ্জিন',
      inputPlaceholder: 'আপনার রিপোর্ট সম্পর্কে যেকোনো প্রশ্ন জিজ্ঞাসা করুন...',
      send: 'পাঠান',
      typing: 'MediLens চিকিৎসা বই অনুসন্ধান করছে...',
      suggestedHeader: 'আপনার রিপোর্টের ওপর ভিত্তি করে সাজেস্ট করা প্রশ্ন:',
      disclaimer: 'MediLens-এর উত্তর কেবল শিক্ষামূলক উদ্দেশ্যে। রোগ নির্ণয় ও চিকিৎসার জন্য সর্বদা চিকিৎসকের পরামর্শ নিন।',
      clearChat: 'চ্যাট মুছুন',
      askAboutParam: 'এই টেস্ট সম্পর্কে জিজ্ঞাসা করুন',
    },
    status: {
      loadingAnalysis: 'এমবিবিএস জ্ঞানভাণ্ডারের সাহায্যে রিপোর্ট বিশ্লেষণ করা হচ্ছে...',
      translatingExplanation: 'ব্যাখ্যা অনুবাদ করা হচ্ছে:',
      errorProcessing: 'রিপোর্ট প্রসেস করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
      networkFallback: 'নেটওয়ার্ক সমস্যা। অফলাইন মেডিকেল জ্ঞান ব্যবহার করা হচ্ছে।',
      noFindings: 'নির্বাচিত ফিল্টারের সাথে কোনো ফলাফল পাওয়া যায়নি।',
      analyzingImage: 'আপনার ল্যাব রিপোর্ট পড়া হচ্ছে...',
    },
  },

  mr: {
    nav: {
      brandSubtitle: 'MBBS पाठ्यपुस्तकांवर आधारित वैद्यकीय लॅब रिपोर्ट विश्लेषक',
      labReportBreakdown: 'लॅब रिपोर्ट विश्लेषण',
      mythBusters: 'गैरसमज आणि तथ्ये',
      mbbsSources: 'MBBS संदर्भ',
      medicalTerms: 'वैद्यकीय संज्ञा',
      askAi: 'MediLens ला विचारा',
      newReport: 'नवीन रिपोर्ट',
      installApp: 'ॲप इंस्टॉल करा',
    },
    tabs: {
      sampleReports: 'नमुना रिपोर्ट',
      uploadFile: 'फाइल / फोटो अपलोड करा',
      enterManually: 'मूल्ये स्वतः भरा',
    },
    home: {
      sampleHeading: 'तपासलेले वैद्यकीय नमुना रिपोर्ट्स पहा',
      sampleSubtitle: 'सोपी भाषा, MBBS संदर्भ, व्यावहारिक आहाराच्या कल्पना आणि डॉक्टरांशी चर्चा करण्याचे मुद्दे समजून घेण्यासाठी एक नमुना रिपोर्ट निवडा.',
      selectPresetPrompt: 'विश्लेषणासाठी एक नमुना रिपोर्ट निवडा:',
    },
    upload: {
      uploadTab: 'लॅब रिपोर्ट अपलोड करा (फोटो किंवा PDF)',
      pasteTab: 'रिपोर्ट मजकूर पेस्ट करा',
      dragDrop: 'तुमचा लॅब रिपोर्ट येथे ड्रॅग करा किंवा फाईल निवडा',
      supports: 'स्पष्ट फोटो (JPG, PNG) किंवा प्रयोगशाळेचे PDF रिपोर्ट्स',
      chooseFile: 'फाइल निवडा',
      takePhoto: 'फोटो काढा',
      pastePrompt: 'तुमच्या लॅब रिपोर्टचा मजकूर किंवा डॉक्टरांच्या नोंदी पेस्ट करा',
      pastePlaceholder: 'उदा. Hemoglobin 10.2 g/dL, Platelets 130,000, Total Cholesterol 245 mg/dL...',
      analyzeButton: 'MediLens सह रिपोर्ट विश्लेषण करा',
      analyzing: 'रिपोर्टचे विश्लेषण होत आहे...',
      removeFile: 'फाइल काढा',
    },
    report: {
      title: 'लॅब रिपोर्टचे तपशीलवार विश्लेषण',
      overallSummary: 'एकूण रिपोर्ट सारांश',
      criticalAlerts: 'महत्त्वाच्या वैद्यकीय सूचना',
      urgentDoctorAttention: 'कृपया हे निकाल ताबडतोब तुमच्या डॉक्टरांना किंवा आपत्कालीन आरोग्य केंद्रात दाखवा.',
      filterAbnormalOnly: 'केवळ असामान्य',
      filterAll: 'सर्व घटक',
      showingFindings: 'दाखवत आहे',
      discussWithDoctor: 'डॉक्टरांशी चर्चा करा',
      printPdf: 'प्रिंट / PDF सेव्ह करा',
      shareSummary: 'सारांश शेअर करा',
      copied: 'कॉपी झाले!',
      generalNutrition: 'सामान्य पोषण मार्गदर्शन',
      sourceTextbooks: 'वैद्यकीय पाठ्यपुस्तक संदर्भ',
      disclaimer: 'शैक्षणिक आणि स्पष्टीकरणात्मक साधन: MediLens लॅब रिपोर्ट समजून घेण्यासाठी अधिकृत MBBS पाठ्यपुस्तकांवर आधारित आहे. हे वैद्यकीय निदान किंवा डॉक्टरांच्या सल्ल्याचा पर्याय नाही.',
      reviewedByTitle: 'रिपोर्ट मूल्यांकन आढावा',
      reanalyzing: 'विश्लेषण अपडेट होत आहे...',
      analyzedOn: 'विश्लेषण तारीख',
    },
    finding: {
      simpleMeaning: 'सोपा अर्थ',
      whatDoesItMean: '१. याचा काय अर्थ होतो?',
      whyDoesItHappen: '२. हे का घडते?',
      whatItMeansInReport: '३. या रिपोर्टमध्ये याचा काय अर्थ आहे?',
      clinicalBoundaries: '४. वैद्यकीय मर्यादा आणि निष्कर्ष',
      canConclude: 'हे काय दर्शवू शकते',
      cannotConclude: 'केवळ यावरून काय ठरवता येत नाही',
      groundedInTextbooks: '५. MBBS पाठ्यपुस्तकांचा आधार',
      practicalMeals: 'दैनंदिन आहाराच्या व्यावहारिक कल्पना',
      breakfast: 'सकाळचा नाश्ता',
      lunch: 'दुपारचे जेवण',
      eveningSnack: 'संध्याकाळचा हलका नाश्ता',
      dinner: 'रात्रीचे जेवण',
      doctorQuestions: 'डॉक्टरांना विचारण्यासारखे महत्त्वाचे प्रश्न',
      safetyNote: 'सुरक्षितता आणि वैद्यकीय सूचना',
      askAiAboutThis: 'या चाचणीबद्दल MediLens ला विचारा',
      statusNormal: 'सामान्य मर्यादेत',
      statusLow: 'सामान्य मर्यादेपेक्षा कमी',
      statusHigh: 'सामान्य मर्यादेपेक्षा जास्त',
      statusCritical: 'लक्षणीयरीत्या असामान्य',
      statusBorderline: 'सीमावर्ती (Borderline)',
      copiedQuestion: 'प्रश्न कॉपी केला!',
      selectForDoctor: 'डॉक्टरांशी चर्चेसाठी निवडा',
      selectedForDoctor: 'डॉक्टरांच्या भेटीसाठी निवडले',
    },
    chat: {
      title: 'MediLens सहाय्यकाला विचारा',
      subtitle: 'तुमच्या चाचणी निकालांवर पाठ्यपुस्तकांवर आधारित आश्वासक उत्तरे',
      liveBadge: 'थेट MBBS इंजिन',
      inputPlaceholder: 'तुमच्या रिपोर्टबद्दल कोणताही प्रश्न विचारा...',
      send: 'पाठवा',
      typing: 'MediLens वैद्यकीय पुस्तकांचा संदर्भ घेत आहे...',
      suggestedHeader: 'तुमच्या रिपोर्टवर आधारित सुचवलेले प्रश्न:',
      disclaimer: 'MediLens ची उत्तरे केवळ शैक्षणिक माहितीसाठी आहेत. उपचारांसाठी नेहमी डॉक्टरांचा सल्ला घ्या.',
      clearChat: 'चॅट साफ करा',
      askAboutParam: 'या चाचणीबद्दल विचारा',
    },
    status: {
      loadingAnalysis: 'MBBS ज्ञानासह रिपोर्टचे विश्लेषण केले जात आहे...',
      translatingExplanation: 'स्पष्टीकरण भाषांतरित केले जात आहे:',
      errorProcessing: 'रिपोर्ट प्रक्रिया करता आला नाही. कृपया पुन्हा प्रयत्न करा.',
      networkFallback: 'नेटवर्क समस्या. ऑफलाइन वैद्यकीय ज्ञान वापरले जात आहे.',
      noFindings: 'निवडलेल्या फिल्टरशी कोणतेही निकाल जुळत नाहीत.',
      analyzingImage: 'लॅब रिपोर्ट वाचला जात आहे...',
    },
  },

  gu: {
    nav: {
      brandSubtitle: 'MBBS પાઠ્યપુસ્તકો પર આધારિત મેડિકલ લેબ રિપોર્ટ વિશ્લેષક',
      labReportBreakdown: 'લેબ રિપોર્ટ વિગતો',
      mythBusters: 'ગેરમાન્યતાઓ અને સત્ય',
      mbbsSources: 'MBBS સંદર્ભો',
      medicalTerms: 'તબીબી શબ્દો',
      askAi: 'MediLens ને પૂછો',
      newReport: 'નવો રિપોર્ટ',
      installApp: 'એપ ઇન્સ્ટોલ કરો',
    },
    tabs: {
      sampleReports: 'નમૂના રિપોર્ટ્સ',
      uploadFile: 'ફાઇલ / ફોટો અપલોડ કરો',
      enterManually: 'જાતે મૂલ્યો દાખલ કરો',
    },
    home: {
      sampleHeading: 'ચકાસાયેલ તબીબી નમૂના રિપોર્ટ્સ જુઓ',
      sampleSubtitle: 'સરળ ભાષા, MBBS સંદર્ભો, વ્યવહારુ આહાર સલાહ અને ડૉક્ટર સાથે ચર્ચા કરવાના મુદ્દાઓ સમજવા માટે એક નમૂના રિપોર્ટ પસંદ કરો.',
      selectPresetPrompt: 'વિશ્લેષણ માટે નમૂના રિપોર્ટ પસંદ કરો:',
    },
    upload: {
      uploadTab: 'લેબ રિપોર્ટ અપલોડ કરો (ફોટો અથવા PDF)',
      pasteTab: 'રિપોર્ટ લખાણ પેસ્ટ કરો',
      dragDrop: 'તમારો લેબ રિપોર્ટ અહીં ખેંચો અથવા ફાઇલ પસંદ કરો',
      supports: 'સ્પષ્ટ ફોટો (JPG, PNG) અથવા પ્રયોગશાળાના PDF રિપોર્ટ્સ',
      chooseFile: 'ફાઇલ પસંદ કરો',
      takePhoto: 'ફોટો લો',
      pastePrompt: 'તમારા લેબ રિપોર્ટ અથવા ડૉક્ટરની નોંધનું લખાણ પેસ્ટ કરો',
      pastePlaceholder: 'દા.ત. Hemoglobin 10.2 g/dL, Platelets 130,000, Total Cholesterol 245 mg/dL...',
      analyzeButton: 'MediLens વડે રિપોર્ટ તપાસો',
      analyzing: 'રિપોર્ટનું વિશ્લેષણ થઈ રહ્યું છે...',
      removeFile: 'ફાઇલ દૂર કરો',
    },
    report: {
      title: 'લેબ રિપોર્ટનું વિગતવાર વિશ્લેષણ',
      overallSummary: 'સમગ્ર રિપોર્ટનો સારાંશ',
      criticalAlerts: 'મહત્વપૂર્ણ તબીબી ચેતવણીઓ',
      urgentDoctorAttention: 'કૃપા કરીને આ પરિણામો તાત્કાલિક તમારા ડૉક્ટર અથવા ઇમરજન્સી હેલ્થકેર સેન્ટરને બતાવો.',
      filterAbnormalOnly: 'માત્ર અસામાન્ય',
      filterAll: 'બધા પરિમાણો',
      showingFindings: 'દર્શાવી રહ્યું છે',
      discussWithDoctor: 'ડૉક્ટર સાથે ચર્ચા કરો',
      printPdf: 'પ્રિન્ટ / PDF સેવ કરો',
      shareSummary: 'સારાંશ શેર કરો',
      copied: 'કોપી થઈ ગયું!',
      generalNutrition: 'સામાન્ય પોષણ માર્ગદર્શન',
      sourceTextbooks: 'પાઠ્યપુસ્તક સંદર્ભ પાયા',
      disclaimer: 'શૈક્ષણિક અને સમજૂતી સાધન: MediLens લેબ રિપોર્ટને સરળતાથી સમજવા માટે માન્ય MBBS પાઠ્યપુસ્તકો પર આધારિત છે. આ તબીબી નિદાન અથવા ડૉક્ટરની મુલાકાતનો વિકલ્પ નથી.',
      reviewedByTitle: 'રિપોર્ટ મૂલ્યાંકન ઝાંખી',
      reanalyzing: 'વિશ્લેષણ અપડેટ થઈ રહ્યું છે...',
      analyzedOn: 'વિશ્લેષણ તારીખ',
    },
    finding: {
      simpleMeaning: 'સરળ અર્થ',
      whatDoesItMean: '૧. આનો અર્થ શું થાય છે?',
      whyDoesItHappen: '૨. આ કેમ થાય છે?',
      whatItMeansInReport: '૩. આ રિપોર્ટમાં આનો અર્થ શું છે?',
      clinicalBoundaries: '૪. તબીબી સીમાઓ અને તારણો',
      canConclude: 'આ શું દર્શાવી શકે છે',
      cannotConclude: 'માત્ર આનાથી શું નક્કી કરી શકાતું નથી',
      groundedInTextbooks: '૫. MBBS તબીબી પુસ્તકોનો આધાર',
      practicalMeals: 'રોજિંદા આહારના વ્યવહારુ વિચારો',
      breakfast: 'સવારનો નાસ્તો',
      lunch: 'બપોરનું ભોજન',
      eveningSnack: 'સાંજનો હળવો નાસ્તો',
      dinner: 'રાતનું ભોજન',
      doctorQuestions: 'ડૉક્ટરને પૂછવા જેવા મુખ્ય પ્રશ્નો',
      safetyNote: 'સુરક્ષા અને તબીબી નોંધ',
      askAiAboutThis: 'આ ટેસ્ટ વિશે MediLens ને પૂછો',
      statusNormal: 'સામાન્ય મર્યાદામાં',
      statusLow: 'સામાન્ય મર્યાદાથી ઓછું',
      statusHigh: 'સામાન્ય મર્યાદાથી વધુ',
      statusCritical: 'નોંધપાત્ર રીતે અસામાન્ય',
      statusBorderline: 'બોર્ડરલાઇન',
      copiedQuestion: 'પ્રશ્ન કોપી થયો!',
      selectForDoctor: 'ડૉક્ટર સાથે ચર્ચા માટે પસંદ કરો',
      selectedForDoctor: 'ડૉક્ટરની મુલાકાત માટે પસંદ કરેલ',
    },
    chat: {
      title: 'MediLens સહાયકને પૂછો',
      subtitle: 'તમારા રિપોર્ટ પર પુસ્તકો આધારિત સહાનુભૂતિપૂર્ણ જવાબો',
      liveBadge: 'લાઈવ MBBS એન્જિન',
      inputPlaceholder: 'તમારા રિપોર્ટ વિશે કોઈ પણ પ્રશ્ન પૂછો...',
      send: 'મોકલો',
      typing: 'MediLens મેડિકલ પુસ્તકો તપાસી રહ્યું છે...',
      suggestedHeader: 'તમારા રિપોર્ટ આધારિત સૂચવેલા પ્રશ્નો:',
      disclaimer: 'MediLens ના જવાબો માત્ર શૈક્ષણિક માહિતી માટે છે. નિદાન અને સારવાર માટે હંમેશા તમારા ડૉક્ટરની સલાહ લો.',
      clearChat: 'ચેટ સાફ કરો',
      askAboutParam: 'આ ટેસ્ટ વિશે પૂછો',
    },
    status: {
      loadingAnalysis: 'MBBS જ્ઞાન સાથે રિપોર્ટનું વિશ્લેષણ થઈ રહ્યું છે...',
      translatingExplanation: 'સમજૂતી અનુવાદિત થઈ રહી છે:',
      errorProcessing: 'રિપોર્ટ પ્રોસેસ થઈ શક્યો નથી. કૃપા કરીને ફરી પ્રયાસ કરો.',
      networkFallback: 'નેટવર્ક સમસ્યા. ઑફલાઇન તબીબી જ્ઞાનનો ઉપયોગ થઈ રહ્યો છે.',
      noFindings: 'પસંદ કરેલા ફિલ્ટર સાથે કોઈ પરિણામ મળ્યું નથી.',
      analyzingImage: 'લેબ રિપોર્ટ વાંચવામાં આવી રહ્યો છે...',
    },
  },

  pa: {
    nav: {
      brandSubtitle: 'MBBS ਪਾਠ-ਪੁਸਤਕਾਂ ਅਧਾਰਿਤ ਮੈਡੀਕਲ ਲੈਬ ਰਿਪੋਰਟ ਵਿਆਖਿਆਕਾਰ',
      labReportBreakdown: 'ਲੈਬ ਰਿਪੋਰਟ ਵੇਰਵਾ',
      mythBusters: 'ਵਹਿਮ-ਭਰਮ ਅਤੇ ਸੱਚ',
      mbbsSources: 'MBBS ਸਰੋਤ',
      medicalTerms: 'ਮੈਡੀਕਲ ਸ਼ਬਦਾਵਲੀ',
      askAi: 'MediLens ਤੋਂ ਪੁੱਛੋ',
      newReport: 'ਨਵੀਂ ਰਿਪੋਰਟ',
      installApp: 'ਐਪ ਇੰਸਟਾਲ ਕਰੋ',
    },
    tabs: {
      sampleReports: 'ਨਮੂਨਾ ਰਿਪੋਰਟਾਂ',
      uploadFile: 'ਫਾਈਲ / ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ',
      enterManually: 'ਮੁੱਲ ਖ਼ੁਦ ਦਰਜ ਕਰੋ',
    },
    home: {
      sampleHeading: 'ਪ੍ਰਮਾਣਿਤ ਕਲੀਨਿਕਲ ਨਮੂਨਾ ਰਿਪੋਰਟਾਂ ਵੇਖੋ',
      sampleSubtitle: 'ਸੌਖੀ ਭਾਸ਼ਾ, MBBS ਹਵਾਲੇ, ਖੁਰਾਕ ਦੇ ਵਿਹਾਰਕ ਸੁਝਾਅ ਅਤੇ ਡਾਕਟਰ ਨਾਲ ਵਿਚਾਰਨ ਯੋਗ ਨੁਕਤੇ ਸਮਝਣ ਲਈ ਨਮੂਨਾ ਰਿਪੋਰਟ ਚੁਣੋ।',
      selectPresetPrompt: 'ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਇੱਕ ਨਮੂਨਾ ਰਿਪੋਰਟ ਚੁਣੋ:',
    },
    upload: {
      uploadTab: 'ਲੈਬ ਰਿਪੋਰਟ ਅੱਪਲੋਡ ਕਰੋ (ਫੋਟੋ ਜਾਂ PDF)',
      pasteTab: 'ਰਿਪੋਰਟ ਦਾ ਲਿਖਤੀ ਮੂਲ ਟੈਕਸਟ ਪੇਸਟ ਕਰੋ',
      dragDrop: 'ਆਪਣੀ ਲੈਬ ਰਿਪੋਰਟ ਇੱਥੇ ਖਿੱਚੋ ਜਾਂ ਫਾਈਲ ਚੁਣੋ',
      supports: 'ਸਾਫ਼ ਫੋਟੋਆਂ (JPG, PNG) ਜਾਂ ਲੈਬਾਰਟਰੀ PDF ਰਿਪੋਰਟਾਂ',
      chooseFile: 'ਫਾਈਲ ਚੁਣੋ',
      takePhoto: 'ਫੋਟੋ ਲਵੋ',
      pastePrompt: 'ਆਪਣੀ ਲੈਬ ਰਿਪੋਰਟ ਜਾਂ ਡਾਕਟਰ ਦੇ ਨੋਟਸ ਪੇਸਟ ਕਰੋ',
      pastePlaceholder: 'ਜਿਵੇਂ: Hemoglobin 10.2 g/dL, Platelets 130,000, Total Cholesterol 245 mg/dL...',
      analyzeButton: 'MediLens ਨਾਲ ਰਿਪੋਰਟ ਦੀ ਜਾਂਚ ਕਰੋ',
      analyzing: 'ਰਿਪੋਰਟ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...',
      removeFile: 'ਫਾਈਲ ਹਟਾਓ',
    },
    report: {
      title: 'ਲੈਬ ਰਿਪੋਰਟ ਦਾ ਵਿਸਤ੍ਰਿਤ ਵਿਸ਼ਲੇਸ਼ਣ',
      overallSummary: 'ਸਮੁੱਚੀ ਰਿਪੋਰਟ ਦਾ ਸਾਰ',
      criticalAlerts: 'ਜ਼ਰੂਰੀ ਮੈਡੀਕਲ ਚੇਤਾਵਨੀਆਂ',
      urgentDoctorAttention: 'ਕਿਰਪਾ ਕਰਕੇ ਇਹ ਨਤੀਜੇ ਤੁਰੰਤ ਆਪਣੇ ਡਾਕਟਰ ਜਾਂ ਐਮਰਜੈਂਸੀ ਸਿਹਤ ਸੰਭਾਲ ਕੇਂਦਰ ਨੂੰ ਦਿਖਾਓ।',
      filterAbnormalOnly: 'ਸਿਰਫ਼ ਅਸਧਾਰਨ',
      filterAll: 'ਸਾਰੇ ਪੈਰਾਮੀਟਰ',
      showingFindings: 'ਦਿਖਾ ਰਹੇ ਹਾਂ',
      discussWithDoctor: 'ਡਾਕਟਰ ਨਾਲ ਗੱਲਬਾਤ ਕਰੋ',
      printPdf: 'ਪ੍ਰਿੰਟ / PDF ਸੇਵ ਕਰੋ',
      shareSummary: 'ਸਾਰ ਸਾਂਝਾ ਕਰੋ',
      copied: 'ਕਾਪੀ ਹੋ ਗਿਆ!',
      generalNutrition: 'ਆਮ ਪੋਸ਼ਣ ਸੰਬੰਧੀ ਸੇਧ',
      sourceTextbooks: 'ਪਾਠ-ਪੁਸਤਕ ਆਧਾਰ',
      disclaimer: 'ਵਿੱਦਿਅਕ ਅਤੇ ਵਿਆਖਿਆਤਮਕ ਸਾਧਨ: MediLens ਲੈਬ ਰਿਪੋਰਟਾਂ ਨੂੰ ਸਮਝਣ ਲਈ ਪ੍ਰਵਾਨਿਤ MBBS ਪਾਠ-ਪੁਸਤਕਾਂ ਉੱਤੇ ਅਧਾਰਿਤ ਹੈ। ਇਹ ਡਾਕਟਰੀ ਨਿਦਾਨ ਜਾਂ ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਦਾ ਬਦਲ ਨਹੀਂ ਹੈ।',
      reviewedByTitle: 'ਰਿਪੋਰਟ ਮੁਲਾਂਕਣ ਸੰਖੇਪ',
      reanalyzing: 'ਵਿਸ਼ਲੇਸ਼ਣ ਅੱਪਡੇਟ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...',
      analyzedOn: 'ਵਿਸ਼ਲੇਸ਼ਣ ਮਿਤੀ',
    },
    finding: {
      simpleMeaning: 'ਸਰਲ ਅਰਥ',
      whatDoesItMean: '੧. ਇਸਦਾ ਕੀ ਅਰਥ ਹੈ?',
      whyDoesItHappen: '੨. ਇਹ ਕਿਉਂ ਹੁੰਦਾ ਹੈ?',
      whatItMeansInReport: '੩. ਇਸ ਰਿਪੋਰਟ ਵਿੱਚ ਇਸਦਾ ਕੀ ਮਤਲਬ ਹੈ?',
      clinicalBoundaries: '੪. ਡਾਕਟਰੀ ਸੀਮਾਵਾਂ ਅਤੇ ਸਿੱਟੇ',
      canConclude: 'ਇਹ ਕੀ ਦਰਸਾ ਸਕਦਾ ਹੈ',
      cannotConclude: 'ਸਿਰਫ਼ ਇਸ ਨਾਲ ਕੀ ਸਿੱਟਾ ਨਹੀਂ ਕੱਢਿਆ ਜਾ ਸਕਦਾ',
      groundedInTextbooks: '੫. MBBS ਮੈਡੀਕਲ ਪਾਠ-ਪੁਸਤਕਾਂ ਦਾ ਅਧਾਰ',
      practicalMeals: 'ਰੋਜ਼ਾਨਾ ਖੁਰਾਕ ਦੇ ਵਿਹਾਰਕ ਸੁਝਾਅ',
      breakfast: 'ਸਵੇਰ ਦਾ ਨਾਸ਼ਤਾ',
      lunch: 'ਦੁਪਹਿਰ ਦਾ ਖਾਣਾ',
      eveningSnack: 'ਸ਼ਾਮ ਦਾ ਹਲਕਾ ਨਾਸ਼ਤਾ',
      dinner: 'ਰਾਤ ਦਾ ਖਾਣਾ',
      doctorQuestions: 'ਡਾਕਟਰ ਨੂੰ ਪੁੱਛਣ ਵਾਲੇ ਅਹਿਮ ਸਵਾਲ',
      safetyNote: 'ਸੁਰੱਖਿਆ ਅਤੇ ਡਾਕਟਰੀ ਨੋਟ',
      askAiAboutThis: 'ਇਸ ਟੈਸਟ ਬਾਰੇ MediLens ਤੋਂ ਪੁੱਛੋ',
      statusNormal: 'ਆਮ ਸੀਮਾ ਦੇ ਅੰਦਰ',
      statusLow: 'ਆਮ ਸੀਮਾ ਤੋਂ ਘੱਟ',
      statusHigh: 'ਆਮ ਸੀਮਾ ਤੋਂ ਵੱਧ',
      statusCritical: 'ਕਾਫ਼ੀ ਅਸਧਾਰਨ',
      statusBorderline: 'ਬਾਰਡਰਲਾਈਨ',
      copiedQuestion: 'ਸਵਾਲ ਕਾਪੀ ਕੀਤਾ ਗਿਆ!',
      selectForDoctor: 'ਡਾਕਟਰ ਨਾਲ ਗੱਲਬਾਤ ਲਈ ਚੁਣੋ',
      selectedForDoctor: 'ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਉਣ ਲਈ ਚੁਣਿਆ ਗਿਆ',
    },
    chat: {
      title: 'MediLens ਸਹਾਇਕ ਤੋਂ ਪੁੱਛੋ',
      subtitle: 'ਤੁਹਾਡੇ ਨਤੀਜਿਆਂ ਬਾਰੇ ਮੈਡੀਕਲ ਕਿਤਾਬਾਂ ਅਧਾਰਿਤ ਸੁਹਿਰਦ ਜਵਾਬ',
      liveBadge: 'ਲਾਈਵ MBBS ਇੰਜਣ',
      inputPlaceholder: 'ਆਪਣੀ ਰਿਪੋਰਟ ਬਾਰੇ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛੋ...',
      send: 'ਭੇਜੋ',
      typing: 'MediLens ਮੈਡੀਕਲ ਕਿਤਾਬਾਂ ਦੀ ਜਾਂਚ ਕਰ ਰਿਹਾ ਹੈ...',
      suggestedHeader: 'ਤੁਹਾਡੀ ਰਿਪੋਰਟ ਅਧਾਰਿਤ ਸੁਝਾਏ ਗਏ ਸਵਾਲ:',
      disclaimer: 'MediLens ਦੇ ਜਵਾਬ ਸਿਰਫ਼ ਵਿੱਦਿਅਕ ਮਕਸਦ ਲਈ ਹਨ। ਇਲਾਜ ਲਈ ਹਮੇਸ਼ਾ ਆਪਣੇ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।',
      clearChat: 'ਗੱਲਬਾਤ ਸਾਫ਼ ਕਰੋ',
      askAboutParam: 'ਇਸ ਟੈਸਟ ਬਾਰੇ ਪੁੱਛੋ',
    },
    status: {
      loadingAnalysis: 'MBBS ਗਿਆਨ ਨਾਲ ਰਿਪੋਰਟ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...',
      translatingExplanation: 'ਵਿਆਖਿਆ ਦਾ ਅਨੁਵਾਦ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ:',
      errorProcessing: 'ਰਿਪੋਰਟ ਦੀ ਜਾਂਚ ਨਹੀਂ ਹੋ ਸਕੀ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
      networkFallback: 'ਨੈੱਟਵਰਕ ਸਮੱਸਿਆ। ਔਫ਼ਲਾਈਨ ਮੈਡੀਕਲ ਗਿਆਨ ਵਰਤਿਆ ਜਾ ਰਿਹਾ ਹੈ।',
      noFindings: 'ਚੁਣੇ ਹੋਏ ਫਿਲਟਰ ਨਾਲ ਕੋਈ ਨਤੀਜਾ ਮੇਲ ਨਹੀਂ ਖਾਂਦਾ।',
      analyzingImage: 'ਲੈਬ ਰਿਪੋਰਟ ਪੜ੍ਹੀ ਜਾ ਰਹੀ ਹੈ...',
    },
  },
};

/**
 * Helper to get a translation for a given language code with fallback to English
 */
export function getTranslation(langCode: string = 'en'): UITranslation {
  const code = langCode.toLowerCase().slice(0, 2);
  return TRANSLATIONS[code] || TRANSLATIONS['en'];
}
