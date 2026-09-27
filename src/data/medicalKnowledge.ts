import { LabCategory, LabFinding, SampleReportPreset, TextbookSource } from '../types';

export interface MedicalKnowledgeItem {
  key: string;
  testName: string;
  category: LabCategory;
  standardUnit: string;
  defaultRange: string;
  minNormal: number;
  maxNormal: number;
  criticalLow?: number;
  criticalHigh?: number;
  
  // Pedagogical Plain-Language Fields
  termDefinition: {
    term: string;
    simpleMeaning: string;
  };
  whatDoesItMean: string;   // 1. What does it mean? (1-2 sentences)
  whyDoesItHappen: string;  // 2. Why does it happen? (Cause -> effect physiology in everyday terms)
  limits: {                 // 4. What can and cannot be concluded?
    canConclude: string[];
    cannotConclude: string[];
  };

  whatIsThis: string;
  whyDoesItMatter: string;
  highMeaning: {
    simpleSummary: string;
    possibleAssociations: string[];
    whatCanIDo: string;
    meals?: {
      breakfast: { items: string[]; why: string };
      lunch: { items: string[]; why: string };
      snack: { items: string[]; why: string };
      dinner: { items: string[]; why: string };
    };
    doctorQuestions: string[];
  };
  lowMeaning: {
    simpleSummary: string;
    possibleAssociations: string[];
    whatCanIDo: string;
    meals?: {
      breakfast: { items: string[]; why: string };
      lunch: { items: string[]; why: string };
      snack: { items: string[]; why: string };
      dinner: { items: string[]; why: string };
    };
    doctorQuestions: string[];
  };
  normalMeaning: {
    simpleSummary: string;
    whatCanIDo: string;
    doctorQuestions: string[];
  };
  source: TextbookSource;
  safetyDisclaimer: string;
}

export const MEDICAL_KNOWLEDGE_BASE: Record<string, MedicalKnowledgeItem> = {
  // 1. Hemoglobin
  hemoglobin: {
    key: 'hemoglobin',
    testName: 'Hemoglobin (Hb)',
    category: 'hematology',
    standardUnit: 'g/dL',
    defaultRange: '12.0 - 15.5 g/dL (Adult Female: 12.0-15.0, Adult Male: 13.5-17.5)',
    minNormal: 12.0,
    maxNormal: 17.5,
    criticalLow: 7.0,
    criticalHigh: 20.0,
    termDefinition: {
      term: 'Hemoglobin',
      simpleMeaning: 'The iron-rich protein inside red blood cells that carries oxygen from your lungs to the rest of your body.'
    },
    whatDoesItMean: 'Hemoglobin is an iron-containing protein that travels in your blood, delivering fresh oxygen to your brain, muscles, and vital organs.',
    whyDoesItHappen: 'Your body needs dietary iron, vitamin B12, and healthy bone marrow to manufacture hemoglobin. When iron stores drop or blood is lost, fewer hemoglobin units are made, so less oxygen reaches your tissues and you may feel fatigued.',
    limits: {
      canConclude: [
        'Your blood currently carries less oxygen per milliliter than the standard reference benchmark.',
        'The finding indicates reduced red blood cell oxygen carrying capacity.'
      ],
      cannotConclude: [
        'A single number cannot determine the root cause (e.g. dietary intake, gut absorption, or blood loss).',
        'It cannot replace an in-person physical exam or additional tests (like serum ferritin) to pinpoint the exact cause.'
      ]
    },
    whatIsThis: 'Hemoglobin is an iron-rich protein inside your red blood cells. Its main job is to pick up oxygen in your lungs and deliver it to every organ and tissue throughout your body.',
    whyDoesItMatter: 'When hemoglobin is lower than expected, your tissues receive less oxygen, which can make you feel tired, lightheaded, or short of breath during everyday activities.',
    lowMeaning: {
      simpleSummary: 'Your hemoglobin value is below the laboratory\'s reported range. This means your blood may not be carrying oxygen as effectively as usual.',
      possibleAssociations: [
        'Nutritional factors (such as lower dietary iron, vitamin B12, or folate levels)',
        'Blood loss (from heavy menstrual cycles, digestive bleeding, or injury)',
        'Temporary decrease during recovery from illness',
        'Decreased red blood cell production or inherited hemoglobin traits'
      ],
      whatCanIDo: 'Depending on the underlying cause, nutrition can be one supportive part of the picture. You can discuss including iron-rich and vitamin C-rich foods in your meals while speaking with a healthcare professional to identify the exact cause.',
      meals: {
        breakfast: {
          items: ['Oats cooked with warm milk or plant milk, topped with a handful of crushed almonds or raisins', 'Poha enriched with roasted peanuts and fresh coriander leaves'],
          why: 'Oats and nuts offer gentle dietary iron, while starting your day with balanced complex carbohydrates sustains energy.'
        },
        lunch: {
          items: ['Cooked dal (lentils) or chickpeas (chana) with brown rice or roti', 'Freshly steamed spinach (palak) or methi sabzi with a squeeze of fresh lemon juice'],
          why: 'Dal and chickpeas provide plant-based iron, and the vitamin C from lemon juice significantly enhances plant iron absorption in your gut.'
        },
        snack: {
          items: ['Roasted chana (Bengal gram) with a small piece of jaggery (gud)', 'Fresh seasonal fruit like guava, orange, or amla'],
          why: 'Roasted chana provides convenient protein and iron, while vitamin C from fresh fruits aids iron uptake.'
        },
        dinner: {
          items: ['Rajma (kidney beans) or mixed lentil khichdi with mixed vegetable sabzi', 'Warm vegetable soup with tender beans or lentils'],
          why: 'Legumes like rajma supply both protein and iron in an easily digestible evening meal.'
        }
      },
      doctorQuestions: [
        'What is the most likely reason for my lower hemoglobin level?',
        'Do I need additional tests, such as serum ferritin or vitamin B12, to check my nutrient stores?',
        'Would an iron supplement be appropriate for me, or should we monitor this with dietary adjustments first?'
      ]
    },
    highMeaning: {
      simpleSummary: 'Your hemoglobin value is above the laboratory\'s reference range, meaning there is a higher concentration of red blood cells in your circulation.',
      possibleAssociations: [
        'Dehydration (lower fluid volume makes blood cells appear more concentrated)',
        'Living at high altitudes where lower oxygen levels stimulate red cell production',
        'Smoking or chronic respiratory considerations',
        'Bone marrow overproduction conditions'
      ],
      whatCanIDo: 'Make sure you are drinking enough water throughout the day, as mild dehydration is a frequent temporary contributor. Discuss the finding with your doctor to review your hydration and lifestyle factors.',
      doctorQuestions: [
        'Could mild dehydration have influenced this result?',
        'Are there any follow-up tests or oxygen checks needed?'
      ]
    },
    normalMeaning: {
      simpleSummary: 'Your hemoglobin level is within the standard expected reference range, suggesting healthy oxygen-carrying capacity.',
      whatCanIDo: 'Continue eating a well-balanced diet featuring diverse whole grains, lentils, fresh vegetables, and adequate hydration.',
      doctorQuestions: ['Are there any other blood count markers I should maintain awareness of during regular checkups?']
    },
    source: {
      textbookName: "Harrison's Principles of Internal Medicine (21st Edition)",
      edition: '21st Edition',
      chapterOrSection: 'Chapter 93: Anemia and Polycythemia',
      citationDetail: 'Harrison\'s Internal Medicine, Section on Erythrocyte Disorders & Hemoglobin Oxygen Transport.'
    },
    safetyDisclaimer: 'Food alone may not explain or correct every cause of low hemoglobin. A qualified healthcare professional should determine the specific underlying cause.'
  },

  // 2. Platelet Count
  platelets: {
    key: 'platelets',
    testName: 'Platelet Count',
    category: 'hematology',
    standardUnit: 'x10^3/uL',
    defaultRange: '150 - 450 x10^3/uL (150,000 - 450,000 /uL)',
    minNormal: 150,
    maxNormal: 450,
    criticalLow: 50,
    criticalHigh: 900,
    termDefinition: {
      term: 'Platelets (Thrombocytes)',
      simpleMeaning: 'Tiny cell fragments in your blood that stick together like sticky patches to seal cuts and stop bleeding.'
    },
    whatDoesItMean: 'Platelets are your body\'s natural band-aids that clump together to stop blood leaks when vessels are injured.',
    whyDoesItHappen: 'Platelets are continuously manufactured in your bone marrow. Recent viral infections (such as dengue or viral fevers), medications, or immune clearing can temporarily break down platelets faster than your bone marrow makes them.',
    limits: {
      canConclude: [
        'Your platelet count is currently below the standard reference threshold on this specific blood sample.',
        'Clotting time may take longer if numbers drop significantly.'
      ],
      cannotConclude: [
        'A mildly low count does not mean spontaneous severe bleeding will occur.',
        'It cannot diagnose dengue, leukemia, or autoimmune disease without clinical review.',
        'Home remedies (like papaya leaf extracts) do not replace medical management or clinical monitoring.'
      ]
    },
    whatIsThis: 'Platelets (thrombocytes) are tiny cell fragments in your bloodstream that clump together to form clots when a blood vessel is damaged, stopping you from bleeding too easily.',
    whyDoesItMatter: 'When platelets drop significantly below normal, your body takes longer to stop minor bleeds, and you might notice easier bruising or small pinprick red spots under the skin.',
    lowMeaning: {
      simpleSummary: 'Your platelet count is below the laboratory\'s reported range. In medical terms, this is referred to as thrombocytopenia.',
      possibleAssociations: [
        'Recent viral infection recovery (such as dengue, flu, or other common viral illnesses)',
        'Certain medications that temporarily affect bone marrow activity',
        'Nutritional factors affecting blood cell formation (such as vitamin B12 or folate)',
        'Immune system reactions where antibodies clear platelets faster than usual'
      ],
      whatCanIDo: 'Rest comfortably and avoid strenuous contact sports or activities that could lead to physical injury or cuts. Note: There is no authorized evidence that eating specific fruits like papaya will directly cure low platelets; platelet recovery depends on medical treatment of the underlying cause.',
      meals: {
        breakfast: {
          items: ['Soft warm porridge or cooked oats with chopped soft fruits', 'Idli or steamed whole grain preparation with gentle sambar'],
          why: 'Gentle, nourishing foods are easy to digest while your immune system recovers from any preceding illness.'
        },
        lunch: {
          items: ['Steamed rice with light moong dal and soft-cooked bottle gourd (lauki) or pumpkin sabzi', 'Fresh curd (yogurt)'],
          why: 'Light lentils provide mild protein without burdening digestion, while curd supports healthy gut flora.'
        },
        snack: {
          items: ['Fresh coconut water or warm herbal chamomile/tulsi tea', 'A small bowl of stewed apples or banana'],
          why: 'Adequate hydration supports good circulation while recovering from viral infections.'
        },
        dinner: {
          items: ['Warm khichdi prepared with split moong dal and rice, seasoned with a touch of cumin and turmeric', 'Clear vegetable broth'],
          why: 'Comforting, easily digestible meals provide balanced nutrition during viral recovery phases.'
        }
      },
      doctorQuestions: [
        'What do you believe is causing this decrease in my platelet count?',
        'How frequently should I repeat this complete blood count to track my platelet trend?',
        'What warning signs (like unusual bleeding, petechiae, or gum bleeds) require emergency evaluation?'
      ]
    },
    highMeaning: {
      simpleSummary: 'Your platelet count is above the laboratory\'s reference range (thrombocytosis).',
      possibleAssociations: [
        'Reaction to acute or chronic inflammation or recent tissue healing',
        'Iron deficiency (body sometimes produces more platelets in response to low iron)',
        'Recent surgery, infection, or trauma',
        'Primary bone marrow conditions'
      ],
      whatCanIDo: 'Stay well hydrated with clean water and avoid smoking. Have your doctor check for any quiet inflammatory triggers or concurrent iron changes.',
      doctorQuestions: [
        'Is this elevated count likely a temporary reactive response to recent inflammation or iron status?',
        'When should we re-test to see if platelets have settled back to normal?'
      ]
    },
    normalMeaning: {
      simpleSummary: 'Your platelet count is within the healthy reference range, supporting normal blood clotting capacity.',
      whatCanIDo: 'Maintain balanced hydration and regular general wellness habits.',
      doctorQuestions: ['Are all cell lines on my complete blood count balanced?']
    },
    source: {
      textbookName: "Robbins & Cotran Pathologic Basis of Disease (10th Edition)",
      edition: '10th Edition',
      chapterOrSection: 'Chapter 14: Diseases of White Blood Cells, Lymph Nodes, Spleen, and Thymus / Platelet Disorders',
      citationDetail: 'Robbins Pathology, Section on Megakaryocyte Kinetics & Thrombocytopenia.'
    },
    safetyDisclaimer: 'Do not rely on food fads or unverified home remedies to treat low platelets. A significant or sudden platelet drop requires prompt medical consultation.'
  },

  // 3. White Blood Cells (Leucocytes)
  wbc: {
    key: 'wbc',
    testName: 'Total Leucocyte Count (WBC)',
    category: 'hematology',
    standardUnit: 'x10^3/uL',
    defaultRange: '4.0 - 11.0 x10^3/uL (4,000 - 11,000 /uL)',
    minNormal: 4.0,
    maxNormal: 11.0,
    criticalLow: 2.0,
    criticalHigh: 30.0,
    termDefinition: {
      term: 'Leucocytes (White Blood Cells)',
      simpleMeaning: 'The defense cells made in bone marrow that circulate to protect your body against infections and inflammation.'
    },
    whatDoesItMean: 'White blood cells are your immune system\'s patrol units that defend against bacteria, viruses, and foreign invaders.',
    whyDoesItHappen: 'When your body encounters an infection or physical tissue stress, bone marrow releases more white blood cells into the bloodstream to fight it off, raising the total count.',
    limits: {
      canConclude: [
        'Your circulating immune cell count is outside the standard reference range on this sample.',
        'The immune system is reacting to a recent infection, physical stress, or recovery phase.'
      ],
      cannotConclude: [
        'A high count does not tell whether an infection is bacterial or viral without a differential count and symptoms.',
        'It cannot prove you need antibiotics; viral infections also trigger immune responses.'
      ]
    },
    whatIsThis: 'Leucocytes (white blood cells) are protective cells made in your bone marrow that circulate through your blood to defend your body against infections, microbes, and foreign invaders.',
    whyDoesItMatter: 'Your WBC count gives doctors a window into your immune system. Higher numbers often signal that your body is actively fighting off a challenge, while lower numbers suggest lower defense reserves.',
    highMeaning: {
      simpleSummary: 'Your white blood cell count is higher than the standard range (leucocytosis). This is a common, natural reaction when the body is responding to an infection, physical stress, or inflammation.',
      possibleAssociations: [
        'Recent or ongoing bacterial, viral, or fungal infection',
        'Physical trauma, intense exercise, or emotional stress',
        'Inflammatory conditions or tissue healing',
        'Medication side effects (such as corticosteroids)'
      ],
      whatCanIDo: 'Focus on restful sleep, drink plenty of warm fluids, and consult your doctor to evaluate any accompanying symptoms such as fever, sore throat, or cough.',
      meals: {
        breakfast: {
          items: ['Warm porridge or soft vegetable upma with a warm cup of herbal ginger-tulsi tea'],
          why: 'Hydrating, warm breakfasts comfort the throat and provide gentle morning fuel without stress.'
        },
        lunch: {
          items: ['Steamed rice with vegetable dal and freshly cooked greens (palak or drumstick leaves)', 'Fresh curd'],
          why: 'Lentils provide necessary amino acids for immune antibody production, while curd supplies beneficial probiotics.'
        },
        snack: {
          items: ['Seasonal citrus fruit (orange, sweet lime/mosambi, or guava)'],
          why: 'Natural vitamin C provides antioxidant support to your immune cells.'
        },
        dinner: {
          items: ['Wholesome vegetable or chicken soup with soft whole-wheat roti and light dal'],
          why: 'Clear soups maintain fluid balance and provide easily absorbed electrolytes.'
        }
      },
      doctorQuestions: [
        'Does my differential white cell count (neutrophils, lymphocytes) give a clearer picture of whether an infection is present?',
        'Do I need an antibiotic or specific targeted treatment, or is this resolving on its own?'
      ]
    },
    lowMeaning: {
      simpleSummary: 'Your white blood cell count is below the expected range (leucopenia), which means your circulating immune defense cells are temporarily reduced.',
      possibleAssociations: [
        'Recovery period after certain viral infections (e.g. viral fevers)',
        'Nutritional deficiencies (such as vitamin B12, folate, or copper)',
        'Autoimmune reactions or medication effects'
      ],
      whatCanIDo: 'Practice careful hand hygiene, eat freshly cooked and thoroughly washed foods, and avoid unnecessary exposure to individuals with active infections.',
      doctorQuestions: [
        'What could have caused this drop in my white blood cell count?',
        'Are there specific hygiene or infection precautions I should follow until we repeat the test?'
      ]
    },
    normalMeaning: {
      simpleSummary: 'Your white blood cell count is in the normal range, indicating balanced immune defense reserves.',
      whatCanIDo: 'Support your immune system with nutritious diverse meals, good sleep, and regular physical activity.',
      doctorQuestions: ['Is my differential count also well-balanced?']
    },
    source: {
      textbookName: "Guyton and Hall Textbook of Medical Physiology (14th Edition)",
      edition: '14th Edition',
      chapterOrSection: 'Chapter 34: Resistance of the Body to Infection: I. Leukocytes, Granulocytes, Monocyte-Macrophage System',
      citationDetail: 'Guyton & Hall Physiology, Section on Leukocyte Genesis and Functions in Immunity.'
    },
    safetyDisclaimer: 'An elevated or reduced white cell count is a signpost, not a final diagnosis. Clinical correlation with physical symptoms is essential.'
  },

  // 4. Total Cholesterol & Lipid Profile
  cholesterol: {
    key: 'cholesterol',
    testName: 'Total Cholesterol',
    category: 'lipid',
    standardUnit: 'mg/dL',
    defaultRange: '< 200 mg/dL (Desirable: < 200, Borderline: 200-239, High: >= 240)',
    minNormal: 120,
    maxNormal: 200,
    criticalHigh: 350,
    termDefinition: {
      term: 'Total Cholesterol',
      simpleMeaning: 'A waxy, fat-like substance that travels in your blood, used by your body to build cell walls, hormones, and vitamin D.'
    },
    whatDoesItMean: 'Total cholesterol measures the combined amount of fat-carrying particles circulating in your bloodstream.',
    whyDoesItHappen: 'Your liver creates most of your cholesterol, and your diet contributes the rest. When dietary saturated fats are high or metabolism slows, your liver produces more cholesterol than the body clears, causing blood levels to rise.',
    limits: {
      canConclude: [
        'Circulating blood cholesterol is currently above the optimal reference threshold.',
        'Long-term elevation is a recognized factor that increases cardiovascular workload over years.'
      ],
      cannotConclude: [
        'A single reading cannot determine whether you have clogged arteries or predict an immediate heart attack.',
        'It cannot assess your total risk without examining HDL, LDL, triglycerides, blood pressure, and smoking history.'
      ]
    },
    whatIsThis: 'Cholesterol is a waxy, fat-like substance that your liver produces and that you also obtain from certain foods. Your body uses it to build healthy cell membranes and create essential hormones and vitamin D.',
    whyDoesItMatter: 'When circulating cholesterol stays above recommended levels for extended periods, excess particles can gradually build up in your artery walls, making it harder for blood to flow smoothly to your heart and brain.',
    highMeaning: {
      simpleSummary: 'Your cholesterol value is above the reference range shown on your report. Diet, family background, and lifestyle can all influence blood lipid levels.',
      possibleAssociations: [
        'Diet rich in saturated fats and refined carbohydrates',
        'Lower levels of daily physical activity',
        'Family tendencies or genetic lipid handling factors',
        'Thyroid slowdown (hypothyroidism) or metabolic considerations'
      ],
      whatCanIDo: 'You can focus on balanced meals, appropriate soluble fiber-rich foods, and regular physical activity where suitable. Discuss your result with your healthcare professional to evaluate your overall cardiovascular picture.',
      meals: {
        breakfast: {
          items: ['Rolled oats cooked in water or skim milk, topped with a spoon of chia seeds and sliced apple or berries', 'Methi (fenugreek) or vegetable paratha cooked with minimal oil on a dry skillet'],
          why: 'Oats contain beta-glucan, a soluble fiber supported by evidence to help bind cholesterol in the digestive tract and assist in its gentle excretion.'
        },
        lunch: {
          items: ['A generous bowl of mixed vegetable salad (cucumber, tomato, grated carrot) before meal', 'Chana (chickpea) or rajma curry prepared with heart-friendly vegetable oil, accompanied by brown rice or multi-millet roti'],
          why: 'Soluble fiber from legumes and vegetables helps reduce cholesterol absorption while providing long-lasting fullness.'
        },
        snack: {
          items: ['A small handful (approx. 20-25g) of unsalted walnuts or almonds', 'Roasted makhana (foxnuts) seasoned lightly with roasted cumin and turmeric'],
          why: 'Tree nuts provide healthy unsaturated fats and plant sterols that support a favorable lipid balance.'
        },
        dinner: {
          items: ['Steamed or stir-fried seasonal vegetables (beans, broccoli, cauliflower, carrots) with grilled tofu or lentil soup (dal)', 'Whole grain roti'],
          why: 'A vegetable-forward evening meal keeps saturated fat intake low while delivering protective phytonutrients.'
        }
      },
      doctorQuestions: [
        'How do my other lipid markers, such as LDL (bad cholesterol) and HDL (good cholesterol), look alongside this total number?',
        'Would lifestyle and nutritional adjustments be our primary plan, or is medication indicated based on my overall risk factors?',
        'When should we schedule a follow-up lipid profile to evaluate progress?'
      ]
    },
    lowMeaning: {
      simpleSummary: 'Your total cholesterol is unusually low (hypocholesterolemia).',
      possibleAssociations: [
        'Malabsorption or low dietary fat/calorie intake',
        'Hyperthyroidism (overactive thyroid)',
        'Liver health changes where cholesterol synthesis is lower'
      ],
      whatCanIDo: 'Discuss your overall nutrition and energy levels with your doctor to make sure your body is absorbing nutrients adequately.',
      doctorQuestions: ['Could my low cholesterol level indicate any nutritional or thyroid imbalance?']
    },
    normalMeaning: {
      simpleSummary: 'Your total cholesterol is within the desirable reference range, supporting cardiovascular wellness.',
      whatCanIDo: 'Continue maintaining regular physical exercise, eating fiber-rich foods, and scheduling routine annual health checks.',
      doctorQuestions: ['Are my HDL and LDL proportions also in healthy balance?']
    },
    source: {
      textbookName: "Harper's Illustrated Biochemistry (32nd Edition)",
      edition: '32nd Edition',
      chapterOrSection: 'Chapter 26: Cholesterol Synthesis, Transport, and Excretion',
      citationDetail: 'Harper\'s Biochemistry, Section on Lipoprotein Metabolism, Atherogenesis & Reverse Cholesterol Transport.'
    },
    safetyDisclaimer: 'Dietary guidance is general education and does not replace medical lipid management prescribed by your physician.'
  },

  // 5. Triglycerides
  triglycerides: {
    key: 'triglycerides',
    testName: 'Triglycerides',
    category: 'lipid',
    standardUnit: 'mg/dL',
    defaultRange: '< 150 mg/dL (Normal: < 150, Borderline: 150-199, High: 200-499)',
    minNormal: 50,
    maxNormal: 150,
    criticalHigh: 500,
    termDefinition: {
      term: 'Triglycerides',
      simpleMeaning: 'The main type of stored fat in your body, formed when you consume more calories or sugars than your body burns right away.'
    },
    whatDoesItMean: 'Triglycerides are energy-storing fat droplets circulating through your blood between meals.',
    whyDoesItHappen: 'When you eat refined carbohydrates, sugars, or excess calories, your liver converts the unused fuel into triglycerides and sends them into the bloodstream for storage.',
    limits: {
      canConclude: [
        'Your blood contains more circulating stored-energy fats than the standard fasting benchmark.',
        'Dietary choices and physical activity directly influence this number.'
      ],
      cannotConclude: [
        'A single elevated value cannot diagnose permanent metabolic disease without repeat fasting testing.',
        'It cannot measure heart artery blockage directly.'
      ]
    },
    whatIsThis: 'Triglycerides are the primary form of fat stored in your body. When you eat more calories or simple carbohydrates than your body needs right away, the excess is converted into triglycerides.',
    whyDoesItMatter: 'Elevated triglycerides, especially alongside high LDL or low HDL, are linked with metabolic slowdown and increased strain on blood vessels and the pancreas.',
    highMeaning: {
      simpleSummary: 'Your triglyceride level is above the recommended range. Triglyceride levels are particularly responsive to dietary choices, physical activity, and sugar intake.',
      possibleAssociations: [
        'Higher intake of refined sugars, sweetened beverages, or white flour foods',
        'Alcohol consumption',
        'Sedentary lifestyle or weight accumulation around the waist',
        'Insulin resistance, prediabetes, or hypothyroidism'
      ],
      whatCanIDo: 'Cut back on sugary drinks, packaged sweets, and highly refined grains. Replace them with whole legumes, vegetables, and brisk daily walking.',
      meals: {
        breakfast: {
          items: ['Vegetable daliya (cracked wheat) with green peas and carrots', 'Moong dal chilla with mint chutney'],
          why: 'Complex fiber without added sugars keeps morning glucose and insulin surges steady.'
        },
        lunch: {
          items: ['Dal tadka with minimal oil, generous portion of cabbage or beans sabzi, and 1-2 multigrain rotis'],
          why: 'Abundant dietary fiber slows carbohydrate digestion, helping prevent triglyceride surges.'
        },
        snack: {
          items: ['Roasted chana or sliced cucumber and tomato slices with lemon juice'],
          why: 'Provides a crunchy, satisfying snack without the refined flour or trans-fats found in fried snacks.'
        },
        dinner: {
          items: ['Light vegetable stew with brown rice or lentil soup with steamed leafy greens'],
          why: 'A lighter dinner avoids heavy nighttime fat storage.'
        }
      },
      doctorQuestions: [
        'Could insulin resistance or blood sugar levels be contributing to my elevated triglycerides?',
        'How much of an improvement might I expect from 8-12 weeks of focused dietary and exercise changes?'
      ]
    },
    lowMeaning: {
      simpleSummary: 'Your triglyceride value is below standard reference ranges, which is rarely a medical concern unless accompanied by severe malnutrition.',
      possibleAssociations: ['Very low-fat diet', 'Malabsorption', 'Hyperthyroidism'],
      whatCanIDo: 'Ensure you are getting enough wholesome healthy fats, such as seeds, nuts, and appropriate cooking oils.',
      doctorQuestions: ['Is my general nutritional intake balanced?']
    },
    normalMeaning: {
      simpleSummary: 'Your triglyceride level is within the healthy reference range.',
      whatCanIDo: 'Continue enjoying wholesome, balanced meals and staying active.',
      doctorQuestions: ['Does my complete lipid panel look balanced?']
    },
    source: {
      textbookName: "Park's Textbook of Preventive and Social Medicine (27th Edition)",
      edition: '27th Edition',
      chapterOrSection: 'Chapter 6: Epidemiology of Chronic Non-Communicable Diseases - Coronary Heart Disease',
      citationDetail: 'Park\'s Preventive Medicine, Section on Dyslipidemia and Dietary Prevention.'
    },
    safetyDisclaimer: 'Very high triglycerides (above 500 mg/dL) require prompt medical attention due to the risk of pancreatic inflammation.'
  },

  // 6. Fasting Blood Glucose & HbA1c
  glucose: {
    key: 'glucose',
    testName: 'Fasting Blood Glucose',
    category: 'diabetes',
    standardUnit: 'mg/dL',
    defaultRange: '70 - 99 mg/dL (Normal: 70-99, Prediabetes: 100-125, Diabetes: >= 126)',
    minNormal: 70,
    maxNormal: 99,
    criticalLow: 54,
    criticalHigh: 400,
    termDefinition: {
      term: 'Fasting Blood Glucose',
      simpleMeaning: 'The concentration of sugar in your blood after not eating overnight, representing the main energy source for your body\'s cells.'
    },
    whatDoesItMean: 'Fasting blood glucose measures how effectively your body maintains normal sugar levels after 8 to 12 hours without food.',
    whyDoesItHappen: 'Insulin acts like a key that unlocks cell doors so sugar can leave your blood and enter cells for fuel. When cells become sluggish in responding to insulin, sugar builds up in the blood, causing fasting levels to rise.',
    limits: {
      canConclude: [
        'Fasting blood sugar is elevated above the standard benchmark on this test.',
        'Your body requires more insulin or more effort to keep resting sugar balanced.'
      ],
      cannotConclude: [
        'A single test cannot diagnose diabetes definitively; medical guidelines require repeat confirmation or an HbA1c test.',
        'It does not mean you must cut out all carbohydrates, but rather choose whole grains and dietary fiber.'
      ]
    },
    whatIsThis: 'Fasting blood glucose measures the concentration of sugar (glucose) in your blood after an overnight fast (typically 8 to 12 hours without eating).',
    whyDoesItMatter: 'Glucose is your body\'s primary energy currency. If fasting levels stay elevated, it indicates that insulin (the hormone that shuttles sugar into your cells) may not be working as efficiently as needed.',
    highMeaning: {
      simpleSummary: 'Your fasting blood sugar is above the standard range. This suggests your body may be experiencing insulin resistance or reduced insulin response.',
      possibleAssociations: [
        'Prediabetes or impaired fasting glucose',
        'Diabetes mellitus',
        'Recent physical illness, high stress, or lack of sleep prior to the blood draw',
        'Medication effects (such as steroids or blood pressure medications)'
      ],
      whatCanIDo: 'Choose whole foods over refined carbohydrates, take a 10-15 minute gentle walk after meals, and review your findings with a doctor for confirmatory testing like an HbA1c test.',
      meals: {
        breakfast: {
          items: ['Steel-cut oats with cinnamon and flaxseeds', 'Vegetable besan (gram flour) chilla with green coriander chutney'],
          why: 'Gram flour and oats have a lower glycemic impact, preventing sudden spikes in morning glucose.'
        },
        lunch: {
          items: ['Salad of cucumber, radish, and tomato first', 'Sprouted moong dal or rajma with small portion of brown rice or whole-wheat roti, alongside bhindi (okra) or methi sabzi'],
          why: 'Starting your meal with fiber (salad) creates a mesh in the intestine that slows carbohydrate absorption.'
        },
        snack: {
          items: ['A handful of roasted unsalted peanuts or walnuts', 'Fresh amla (Indian gooseberry) or green tea'],
          why: 'Healthy fats and protein provide steady fullness without a glucose surge.'
        },
        dinner: {
          items: ['Mixed vegetable and paneer or tofu stir-fry with a bowl of yellow moong dal'],
          why: 'Keeping dinner rich in protein and non-starchy vegetables prevents overnight blood sugar elevation.'
        }
      },
      doctorQuestions: [
        'Do you recommend getting an HbA1c test to see my average blood sugar over the past 3 months?',
        'What specific fasting and post-meal targets should I aim for?',
        'Can structured dietary changes and exercise help reverse this value back into the normal range?'
      ]
    },
    lowMeaning: {
      simpleSummary: 'Your blood sugar is below 70 mg/dL (hypoglycemia).',
      possibleAssociations: [
        'Prolonged fasting beyond 12 hours',
        'Diabetes medications or insulin if taken without adequate food',
        'Excessive alcohol on an empty stomach'
      ],
      whatCanIDo: 'If feeling shaky, sweaty, or dizzy, consume 15 grams of fast-acting carbohydrate (like fruit juice or glucose) immediately and speak with your doctor.',
      doctorQuestions: ['Could my medications or prolonged fasting have caused this low reading?']
    },
    normalMeaning: {
      simpleSummary: 'Your fasting blood sugar is within the optimal healthy reference range.',
      whatCanIDo: 'Continue your balanced diet and consistent movement habits.',
      doctorQuestions: ['Should I check HbA1c periodically as part of routine checkups?']
    },
    source: {
      textbookName: "Harrison's Principles of Internal Medicine (21st Edition)",
      edition: '21st Edition',
      chapterOrSection: 'Chapter 396: Diabetes Mellitus: Management and Complications',
      citationDetail: 'Harrison\'s Internal Medicine, Section on Glucose Homeostasis and Glycemic Criteria.'
    },
    safetyDisclaimer: 'Do not adjust or stop prescribed diabetes medications on your own. Always consult your physician.'
  },

  // 7. Thyroid Stimulating Hormone (TSH)
  tsh: {
    key: 'tsh',
    testName: 'Thyroid Stimulating Hormone (TSH)',
    category: 'thyroid',
    standardUnit: 'uIU/mL',
    defaultRange: '0.45 - 4.50 uIU/mL (Varies slightly by lab & pregnancy status)',
    minNormal: 0.45,
    maxNormal: 4.50,
    criticalLow: 0.05,
    criticalHigh: 20.0,
    termDefinition: {
      term: 'TSH (Thyroid Stimulating Hormone)',
      simpleMeaning: 'A signaling hormone released by the pituitary gland in the brain that tells your thyroid gland how much hormone to make.'
    },
    whatDoesItMean: 'TSH acts like a thermostat in your body: when thyroid activity slows down, your brain turns up TSH to urge it to produce more.',
    whyDoesItHappen: 'Your pituitary gland continuously samples circulating thyroid hormone levels. If your thyroid produces slightly less thyroxine, the pituitary raises TSH secretion to stimulate it and maintain normal metabolism.',
    limits: {
      canConclude: [
        'The brain is sending a higher signal than standard to stimulate thyroid hormone production.',
        'This pattern frequently occurs with mild or subclinical thyroid adjustments.'
      ],
      cannotConclude: [
        'A single isolated high TSH cannot diagnose permanent thyroid disease; levels fluctuate with sleep, stress, and time of day.',
        'It cannot determine if lifelong thyroid medication is needed without checking Free T4 and consulting a doctor.'
      ]
    },
    whatIsThis: 'TSH is a hormone made by your pituitary gland (a master gland in your brain). It acts like a manager that signals your thyroid gland in your neck to produce thyroid hormones (T3 and T4), which control your body\'s metabolism.',
    whyDoesItMatter: 'When your thyroid gland slows down and produces fewer hormones, your brain releases MORE TSH to urge it to work harder. Conversely, if your thyroid produces too much, your brain drops TSH production.',
    highMeaning: {
      simpleSummary: 'Your TSH is above the standard reference range. Because TSH and thyroid output operate like a thermostat, an elevated TSH often indicates your thyroid gland may be working more sluggishly than usual.',
      possibleAssociations: [
        'Subclinical or overt hypothyroidism (underactive thyroid)',
        'Autoimmune thyroiditis (such as Hashimoto\'s)',
        'Recovery phase after temporary thyroid inflammation',
        'Iodine variations or medication interactions'
      ],
      whatCanIDo: 'Eat balanced, whole foods and speak with your doctor. Doctors typically check Free T4 and Free T3 alongside TSH before making any diagnosis or treatment plan.',
      meals: {
        breakfast: {
          items: ['Warm porridge made with oats or daliya, with pumpkin seeds and a boiled egg or milk'],
          why: 'Pumpkin seeds provide dietary zinc and selenium, trace minerals involved in thyroid hormone metabolism.'
        },
        lunch: {
          items: ['Cooked brown rice or roti with dal, alongside thoroughly cooked vegetables like carrots, bell peppers, or beans'],
          why: 'Thoroughly cooking cruciferous vegetables diminishes any natural goitrogenic compounds while preserving vitamins.'
        },
        snack: {
          items: ['A handful of soaked almonds or walnuts, or a seasonal fresh fruit'],
          why: 'Nuts supply wholesome fats and antioxidants that support metabolic health.'
        },
        dinner: {
          items: ['Mixed vegetable and lentil stew or khichdi with iodized salt in normal culinary moderation'],
          why: 'Adequate, moderate culinary iodine supports healthy thyroid hormone synthesis without excess.'
        }
      },
      doctorQuestions: [
        'Should we check my Free T4 and Free T3 levels to see if my actual thyroid hormone levels are affected?',
        'Do I have symptoms of an underactive thyroid, such as unexplained fatigue, cold intolerance, or dry skin?',
        'Would you suggest monitoring this with a repeat test in 6 to 8 weeks before considering any medication?'
      ]
    },
    lowMeaning: {
      simpleSummary: 'Your TSH is below the reference range, suggesting your thyroid gland may be producing more hormone than needed (hyperthyroidism).',
      possibleAssociations: [
        'Hyperthyroidism or overactive thyroid nodule',
        'Thyroiditis in its early phase',
        'High dosage of thyroid replacement medication'
      ],
      whatCanIDo: 'Avoid excessive intake of kelp or high-iodine supplements, and schedule a medical visit to review thyroid hormone levels.',
      doctorQuestions: [
        'Do we need to check Free T3 and Free T4 to confirm whether hyperthyroidism is present?',
        'Are there any heart rate checks or symptom evaluations we should perform?'
      ]
    },
    normalMeaning: {
      simpleSummary: 'Your TSH level is within the standard reference range, indicating balanced brain-to-thyroid signaling.',
      whatCanIDo: 'Continue balanced nutrition with standard iodized table salt and wholesome foods.',
      doctorQuestions: ['Does this result match well with my overall energy and metabolism?']
    },
    source: {
      textbookName: "Davidson's Principles and Practice of Medicine (24th Edition)",
      edition: '24th Edition',
      chapterOrSection: 'Chapter 20: Endocrine Disease - Thyroid Function Tests',
      citationDetail: 'Davidson\'s Medicine, Section on Hypothalamic-Pituitary-Thyroid Axis.'
    },
    safetyDisclaimer: 'Never start, stop, or change thyroid medication doses based solely on a single lab sheet. A medical evaluation is necessary.'
  },

  // 8. Urine Routine - Protein in Urine
  urine_protein: {
    key: 'urine_protein',
    testName: 'Urine Protein / Albumin',
    category: 'urine',
    standardUnit: 'Qualitative',
    defaultRange: 'Negative / Nil (< 10-20 mg/dL)',
    minNormal: 0,
    maxNormal: 0,
    criticalHigh: 3,
    termDefinition: {
      term: 'Proteinuria (Urine Protein)',
      simpleMeaning: 'The presence of proteins (such as albumin) in urine where healthy kidney filters usually keep them inside the bloodstream.'
    },
    whatDoesItMean: 'This test checks whether protein molecules are slipping past the tiny filters inside your kidneys into your urine.',
    whyDoesItHappen: 'Healthy kidney filters (glomeruli) prevent proteins from leaving your blood. When filter pores stretch from high blood pressure, temporary fever, intense exercise, or irritation, protein spills into urine.',
    limits: {
      canConclude: [
        'Protein was detected in the specific urine sample analyzed.',
        'The kidney filtration barrier allowed some protein molecules through at the time of collection.'
      ],
      cannotConclude: [
        'Trace or mild protein does not mean you have kidney failure or permanent kidney damage.',
        'Temporary non-kidney factors like exercise, fever, dehydration, or posture can cause transient proteinuria.'
      ]
    },
    whatIsThis: 'Protein is a vital building block in your blood that normally stays inside your blood vessels. Your kidneys contain millions of microscopic filters (glomeruli) that keep large protein molecules from leaking out into your urine.',
    whyDoesItMatter: 'Only tiny, negligible traces of protein normally escape into urine. Finding detectable protein (proteinuria) means the kidney filters may be under temporary or ongoing strain.',
    highMeaning: {
      simpleSummary: 'Protein was detected in your urine sample (e.g. Trace, 1+, 2+, or positive). Because urine findings can have temporary or underlying causes, this result is best interpreted alongside your other tests and clinical history.',
      possibleAssociations: [
        'Temporary non-kidney factors: strenuous exercise, fever, dehydration, or prolonged standing before the test',
        'Urinary tract infection (UTI) with accompanying white blood cells in urine',
        'Early kidney filter strain related to blood pressure or blood sugar',
        'Kidney glomerular or tubular conditions'
      ],
      whatCanIDo: 'Stay well-hydrated with plain water, avoid high-sodium processed foods, and speak with your doctor to see if a repeat morning urine sample or urine culture is indicated.',
      meals: {
        breakfast: {
          items: ['Light vegetable poha or steamed idlis with mild coconut chutney', 'Fresh herbal mint tea'],
          why: 'Gentle, lower-sodium breakfast foods do not overload kidney filtration.'
        },
        lunch: {
          items: ['Steamed rice with light moong dal and bottle gourd (lauki) or ridge gourd (turai) sabzi', 'Fresh cucumber slices'],
          why: 'Moong dal and high-water vegetables like gourd are gentle on renal filtration.'
        },
        snack: {
          items: ['Fresh seasonal fruit like apple, pear, or papaya'],
          why: 'Naturally low in sodium, fresh fruits provide gentle potassium and hydration.'
        },
        dinner: {
          items: ['Light vegetable khichdi or soft phulkas with mildly spiced dal and boiled vegetables'],
          why: 'A light evening meal with controlled salt helps prevent fluid retention.'
        }
      },
      doctorQuestions: [
        'Could this protein finding be a temporary result of recent exercise, fever, or mild dehydration?',
        'Do you recommend checking a morning urine sample or a Urine Albumin-to-Creatinine Ratio (UACR)?',
        'How do my blood pressure and blood creatinine levels look alongside this test?'
      ]
    },
    lowMeaning: {
      simpleSummary: 'Protein is negative / absent in urine, which is the desired normal finding.',
      possibleAssociations: ['Healthy kidney glomerular filtration'],
      whatCanIDo: 'Maintain healthy hydration and balanced salt intake.',
      doctorQuestions: ['Is my general urinalysis clear of any infection indicators?']
    },
    normalMeaning: {
      simpleSummary: 'No protein detected in urine (Negative / Nil). This is a reassuring sign of healthy kidney filtration.',
      whatCanIDo: 'Keep drinking adequate water daily and avoid excessive intake of over-the-counter painkiller pills (NSAIDs).',
      doctorQuestions: ['Are all other urine parameters within expected ranges?']
    },
    source: {
      textbookName: "Robbins & Cotran Pathologic Basis of Disease (10th Edition)",
      edition: '10th Edition',
      chapterOrSection: 'Chapter 20: The Kidney - Glomerular Diseases and Proteinuria',
      citationDetail: 'Robbins Pathology, Section on Glomerular Filtration Barrier Integrity.'
    },
    safetyDisclaimer: 'Trace protein can be temporary (orthostatic or exercise-related). A persistent presence requires medical kidney evaluation.'
  },

  // 9. Semen Analysis
  semen_analysis: {
    key: 'semen_analysis',
    testName: 'Semen Analysis (Count & Motility)',
    category: 'semen',
    standardUnit: 'million/mL & %',
    defaultRange: 'Count: >= 15 million/mL | Motility: >= 40% total | Morphology: >= 4% normal',
    minNormal: 15,
    maxNormal: 200,
    criticalLow: 5,
    termDefinition: {
      term: 'Semen Analysis',
      simpleMeaning: 'A laboratory evaluation that counts sperm cells and checks how well they move (motility) and are shaped (morphology).'
    },
    whatDoesItMean: 'Semen analysis provides a snapshot of sperm numbers and movement compared to standard WHO reference benchmarks.',
    whyDoesItHappen: 'Sperm cells take about two months to develop in the body and are sensitive to temperature, recent fever, stress, and lifestyle habits. Because counts naturally fluctuate from week to week, a single lower reading is common and expected.',
    limits: {
      canConclude: [
        'Specific parameters fell below WHO 6th edition reference limits on this specific test sample.',
        'A repeat evaluation in 4 to 8 weeks is standard clinical guidance to establish consistency.'
      ],
      cannotConclude: [
        'It NEVER determines fertility or infertility; many individuals with values below benchmarks conceive naturally.',
        'A single test cannot diagnose permanent reproductive dysfunction.'
      ]
    },
    whatIsThis: 'A semen analysis evaluates several characteristics of a semen sample: sperm concentration (how many sperm are in a given volume), motility (how actively and effectively sperm move), and morphology (the shape and structure of sperm).',
    whyDoesItMatter: 'These numbers provide baseline information about reproductive health. Because semen parameters naturally fluctuate from week to week based on fever, sleep, abstinence days, and stress, a single sample does not diagnose fertility or infertility.',
    lowMeaning: {
      simpleSummary: 'One or more values on your semen analysis are below the WHO lower reference limits shown on the report. This is an objective observation, not a permanent diagnosis of infertility.',
      possibleAssociations: [
        'Recent fever, viral illness, or elevated testicular temperature in the past 2-3 months',
        'Abstinence period shorter than 2 days or longer than 7 days prior to collection',
        'Lifestyle habits, including smoking, alcohol, irregular sleep, or frequent hot baths',
        'Varicocele, hormone variations, or nutritional factors'
      ],
      whatCanIDo: 'Adopt healthy daily lifestyle habits: avoid wearing tight restrictive clothing, stay away from smoking and alcohol, ensure 7-8 hours of sound sleep, and discuss repeat testing with a specialist after 2-3 months (the complete sperm production cycle).',
      meals: {
        breakfast: {
          items: ['Oatmeal or whole grain daliya with walnuts, pumpkin seeds, and a glass of milk or plant milk'],
          why: 'Walnuts and pumpkin seeds are rich in zinc and omega-3 fatty acids, which play an important role in cellular membrane health.'
        },
        lunch: {
          items: ['Cooked lentils (dal) or chickpeas (chana) with brown rice or roti, served with dark green leafy vegetables (spinach) and carrots'],
          why: 'Dark leafy greens provide natural dietary folate and beta-carotene, antioxidants that protect cells from oxidative stress.'
        },
        snack: {
          items: ['Fresh pomegranate, oranges, or a small handful of mixed nuts (almonds and cashews)'],
          why: 'Antioxidant-rich fresh fruits help neutralize reactive oxygen species in bodily tissues.'
        },
        dinner: {
          items: ['Paneer, tofu, or lean protein preparation with plenty of colorful bell peppers, tomatoes, and whole grain rotis'],
          why: 'Lycopene from cooked tomatoes and diverse dietary antioxidants support general cellular resilience.'
        }
      },
      doctorQuestions: [
        'How significantly do recent illness, fever, or collection timing influence this specific sample?',
        'Do you recommend repeating the semen analysis in 4 to 8 weeks for a dependable comparison?',
        'Would you recommend an ultrasound (for varicocele) or a hormone panel (FSH, LH, Testosterone)?'
      ]
    },
    highMeaning: {
      simpleSummary: 'Your sperm concentration is robust and above the standard reference baseline.',
      possibleAssociations: ['Healthy testicular production and abstinence timing within expected parameters'],
      whatCanIDo: 'Maintain positive wellness, nutrition, and exercise habits.',
      doctorQuestions: ['Are motility and morphology proportions also in healthy alignment?']
    },
    normalMeaning: {
      simpleSummary: 'Your semen parameters meet or exceed the standard WHO lower reference benchmarks.',
      whatCanIDo: 'Continue maintaining active, tobacco-free, balanced lifestyle habits.',
      doctorQuestions: ['Do all three components (count, movement, shape) look well-balanced together?']
    },
    source: {
      textbookName: 'WHO Laboratory Manual for the Examination and Processing of Human Semen (6th Edition)',
      edition: '6th Edition',
      chapterOrSection: 'Chapter 2: Standard Semen Analysis & Reference Limits',
      citationDetail: 'WHO Semen Manual 2021, Lower Reference Limits for Human Semen Characteristics.'
    },
    safetyDisclaimer: 'A semen analysis is only one component of reproductive evaluation. Never interpret one isolated test as a final verdict on fertility.'
  },

  // 10. Serum Creatinine (Kidney Function)
  creatinine: {
    key: 'creatinine',
    testName: 'Serum Creatinine',
    category: 'kft',
    standardUnit: 'mg/dL',
    defaultRange: '0.6 - 1.2 mg/dL (Female: 0.5-1.1, Male: 0.7-1.3)',
    minNormal: 0.6,
    maxNormal: 1.2,
    criticalHigh: 4.0,
    termDefinition: {
      term: 'Serum Creatinine',
      simpleMeaning: 'A natural waste product produced by normal muscle breakdown that healthy kidneys continuously filter out into urine.'
    },
    whatDoesItMean: 'Creatinine serves as a steady marker to assess how efficiently your kidneys are clearing everyday metabolic waste from your blood.',
    whyDoesItHappen: 'Muscles break down creatine at a steady rate every day. Because healthy kidneys filter out nearly all of it, a rise in bloodstream creatinine indicates that kidney filtration rate is running slower than usual.',
    limits: {
      canConclude: [
        'Serum creatinine is higher than the standard reference threshold for your demographic.',
        'Estimated kidney filtration capacity may be reduced relative to standard benchmarks.'
      ],
      cannotConclude: [
        'It cannot distinguish between temporary dehydration versus chronic kidney changes without clinical history.',
        'It cannot diagnose kidney disease on its own without physician review and urine testing.'
      ]
    },
    whatIsThis: 'Creatinine is a natural waste product generated by your muscles during everyday movement. Healthy kidneys continuously filter creatinine out of your blood and excrete it through your urine.',
    whyDoesItMatter: 'Because creatinine is produced at a relatively constant rate, measuring its level in your bloodstream provides a direct window into how efficiently your kidneys are filtering wastes.',
    highMeaning: {
      simpleSummary: 'Your serum creatinine level is above the laboratory\'s reference range. This indicates that your kidneys may be filtering blood at a slower rate than standard.',
      possibleAssociations: [
        'Dehydration or reduced fluid intake prior to the blood test',
        'Recent intense heavy weight training or high dietary meat/creatine supplement intake',
        'Medication effects (such as pain relief NSAIDs, certain antibiotics, or blood pressure drugs)',
        'Acute kidney strain or chronic kidney filtration changes'
      ],
      whatCanIDo: 'Drink plenty of water to ensure adequate hydration, avoid non-prescription painkiller pills (NSAIDs like ibuprofen), and have your doctor review your eGFR (estimated filtration rate).',
      meals: {
        breakfast: {
          items: ['Warm porridge made with oats or rice flakes (poha), lightly seasoned with herbs', 'Fresh apple slices'],
          why: 'Apples are naturally low in potassium and sodium, making them gentle on kidney filtration.'
        },
        lunch: {
          items: ['Steamed white or brown rice with mild yellow moong dal and gourd sabzi (lauki or tori)', 'Small portion of cucumber salad'],
          why: 'Moong dal is easy to digest, while bottle gourd provides high hydration without electrolyte strain.'
        },
        snack: {
          items: ['Fresh papaya or pear cubes', 'Warm plain water or light ginger tea'],
          why: 'Provides refreshing hydration without added sodium or artificial additives.'
        },
        dinner: {
          items: ['Soft whole-wheat rotis with boiled vegetable sabzi (carrots, green beans) and light lentil soup'],
          why: 'A mild, freshly prepared dinner helps maintain stable blood pressure and fluid balance overnight.'
        }
      },
      doctorQuestions: [
        'What is my calculated eGFR (estimated glomerular filtration rate) based on this creatinine value?',
        'Could temporary dehydration or any current medication be contributing to this reading?',
        'What steps can we take to protect my kidney function moving forward?'
      ]
    },
    lowMeaning: {
      simpleSummary: 'Your creatinine is lower than standard reference values.',
      possibleAssociations: ['Low muscle mass', 'Strict low-protein diet or advanced age', 'Pregnancy'],
      whatCanIDo: 'Maintain adequate dietary protein from lentils, dairy, and whole foods suitable for your health goals.',
      doctorQuestions: ['Is my general muscle strength and nutrition adequate?']
    },
    normalMeaning: {
      simpleSummary: 'Your serum creatinine is in the normal range, indicating healthy kidney filtration capacity.',
      whatCanIDo: 'Keep drinking adequate water daily and maintain healthy blood pressure.',
      doctorQuestions: ['Does my overall kidney function panel look healthy?']
    },
    source: {
      textbookName: "Harrison's Principles of Internal Medicine (21st Edition)",
      edition: '21st Edition',
      chapterOrSection: 'Chapter 304: Cellular and Molecular Biology of the Kidney / Azotemia',
      citationDetail: 'Harrison\'s Internal Medicine, Section on Glomerular Filtration & Creatinine Kinetics.'
    },
    safetyDisclaimer: 'Significantly elevated creatinine requires prompt medical evaluation to protect kidney filtration.'
  },

  // 11. SGPT / ALT (Liver Function)
  alt: {
    key: 'alt',
    testName: 'SGPT / ALT (Alanine Aminotransferase)',
    category: 'lft',
    standardUnit: 'U/L',
    defaultRange: '7 - 56 U/L (Varies by laboratory and sex)',
    minNormal: 7,
    maxNormal: 56,
    criticalHigh: 500,
    termDefinition: {
      term: 'ALT / SGPT (Alanine Aminotransferase)',
      simpleMeaning: 'An enzyme found mainly inside liver cells that helps turn proteins into cellular energy.'
    },
    whatDoesItMean: 'ALT is a sensitive marker of liver cell health; when liver cells experience irritation or strain, ALT spills into the bloodstream.',
    whyDoesItHappen: 'Healthy liver cells keep ALT safely stored inside their walls. If liver cells undergo strain from fatty buildup, alcohol, certain medications, or viral irritation, their membranes become permeable, leaking ALT into the blood.',
    limits: {
      canConclude: [
        'Liver cells have released more enzyme into the bloodstream than the standard reference benchmark.',
        'The liver is experiencing some degree of metabolic strain or cellular irritation.'
      ],
      cannotConclude: [
        'It cannot measure actual synthetic liver function (which is evaluated by albumin, bilirubin, and clotting factors).',
        'It does not diagnose cirrhosis or permanent liver damage on its own without imaging and viral evaluation.'
      ]
    },
    whatIsThis: 'ALT (SGPT) is an enzyme found mostly inside your liver cells. Its job is to help convert proteins into usable cellular energy.',
    whyDoesItMatter: 'When liver cells experience irritation, inflammation, or metabolic stress, ALT can leak out into your bloodstream, causing blood levels to rise above normal.',
    highMeaning: {
      simpleSummary: 'Your SGPT/ALT value is above the laboratory\'s reference range. This indicates that your liver cells may be under mild or temporary stress.',
      possibleAssociations: [
        'Fatty liver changes (hepatic steatosis related to weight or diet)',
        'Recent alcohol intake or use of certain medications/supplements',
        'Recent viral illness or viral hepatitis',
        'Strenuous unaccustomed muscular exertion'
      ],
      whatCanIDo: 'Minimize alcohol completely, reduce ultra-processed foods and added sugars, and consult your doctor for an abdominal ultrasound or further liver evaluation.',
      meals: {
        breakfast: {
          items: ['Oatmeal cooked in water with crushed flaxseeds and fresh berries or papaya', 'Warm green tea or lemon-infused water'],
          why: 'Antioxidants and soluble fiber assist in steady metabolic processing without overloading liver fat pathways.'
        },
        lunch: {
          items: ['Steamed rice with moong or toor dal, plenty of leafy greens (spinach, methi), and lightly spiced cauliflower or beans'],
          why: 'Cruciferous vegetables and greens contain sulfur compounds that support natural liver detoxification enzymes.'
        },
        snack: {
          items: ['A small bowl of fresh curd (yogurt) with roasted cumin powder', 'A crisp fresh apple'],
          why: 'Probiotic-rich yogurt supports the gut-liver axis by maintaining a healthy intestinal barrier.'
        },
        dinner: {
          items: ['Light vegetable khichdi or soft rotis with steamed vegetables and a warm bowl of clear vegetable soup'],
          why: 'An early, light dinner allows the liver to focus on restorative metabolic processes overnight.'
        }
      },
      doctorQuestions: [
        'Is this mild elevation likely linked to fatty liver, medication, or a recent virus?',
        'Do you suggest an ultrasound of the abdomen to check my liver structure?',
        'What lifestyle changes will be most effective in bringing this enzyme back to normal?'
      ]
    },
    lowMeaning: {
      simpleSummary: 'Your ALT level is within normal lower boundaries, which is normal.',
      possibleAssociations: ['Healthy liver cell stability'],
      whatCanIDo: 'Continue maintaining balanced eating and regular movement.',
      doctorQuestions: ['Are all other liver enzymes (SGOT, Bilirubin) normal?']
    },
    normalMeaning: {
      simpleSummary: 'Your SGPT/ALT is within the expected healthy range, indicating healthy liver cellular integrity.',
      whatCanIDo: 'Maintain a wholesome diet with minimal alcohol and moderate body weight.',
      doctorQuestions: ['Is my complete liver panel healthy?']
    },
    source: {
      textbookName: "Robbins & Cotran Pathologic Basis of Disease (10th Edition)",
      edition: '10th Edition',
      chapterOrSection: 'Chapter 18: The Liver and Gallbladder - Hepatic Injury Patterns',
      citationDetail: 'Robbins Pathology, Section on Transaminases as Biomarkers of Hepatocellular Integrity.'
    },
    safetyDisclaimer: 'Elevated liver enzymes should be monitored until they normalize. Avoid alcohol and unverified herbal detoxes.'
  }
};

/**
 * Pre-configured Sample Reports for Instant 1-Click Exploration
 */
export const SAMPLE_REPORTS: SampleReportPreset[] = [
  {
    id: 'sample-anemia',
    title: 'Complete Blood Count — Low Hemoglobin',
    category: 'hematology',
    badge: 'Anemia / Low Iron',
    subtitle: 'Hemoglobin 9.8 g/dL with mild red cell microcytosis',
    description: 'A classic routine blood test showing mild fatigue-associated lower hemoglobin and MCV, ideal for learning about practical iron nutrition and doctor discussion points.',
    sampleText: `COMPLETE BLOOD COUNT (CBC) REPORT
Patient: Sample Patient (34Y / Female)
Referred by: Dr. Sharma, MD

Test Name                     Result     Unit      Reference Range
------------------------------------------------------------------
Hemoglobin (Hb)               9.8        g/dL      12.0 - 15.5  [LOW]
Total Leucocyte Count (WBC)   6.8        x10^3/uL  4.0 - 11.0   [NORMAL]
Platelet Count                210        x10^3/uL  150 - 450    [NORMAL]
RBC Count                     3.9        mil/uL    4.0 - 5.2    [BORDERLINE]
MCV (Mean Corpuscular Vol)    76         fL        80 - 100     [LOW]
MCH                           24         pg        27 - 33      [LOW]
Serum Ferritin                11         ng/mL     15 - 150     [LOW]

Impression: Microcytic hypochromic picture suggestive of iron store depletion. Clinical correlation advised.`,
    parameters: [
      { name: 'Hemoglobin (Hb)', value: 9.8, unit: 'g/dL', range: '12.0 - 15.5' },
      { name: 'Total Leucocyte Count (WBC)', value: 6.8, unit: 'x10^3/uL', range: '4.0 - 11.0' },
      { name: 'Platelet Count', value: 210, unit: 'x10^3/uL', range: '150 - 450' }
    ]
  },
  {
    id: 'sample-cholesterol',
    title: 'Lipid Profile — High Cholesterol & Triglycerides',
    category: 'lipid',
    badge: 'Heart / Lipids',
    subtitle: 'Total Cholesterol 248 mg/dL, Triglycerides 220 mg/dL',
    description: 'Shows elevated lipid markers with practical, evidence-grounded high-fiber meal suggestions (oats, dal, chana, walnuts) and cardiovascular consultation questions.',
    sampleText: `LIPID PROFILE REPORT
Patient: Sample Patient (48Y / Male)
Fasting Status: 12 Hours Fasting

Test Name                     Result     Unit      Reference Range
------------------------------------------------------------------
Total Cholesterol             248        mg/dL     < 200        [HIGH]
Triglycerides                 220        mg/dL     < 150        [HIGH]
HDL Cholesterol (Good)        38         mg/dL     > 40         [LOW]
LDL Cholesterol (Calculated)  166        mg/dL     < 100        [HIGH]
VLDL Cholesterol              44         mg/dL     < 30         [HIGH]
Total / HDL Ratio             6.5                  < 4.5        [ELEVATED]

Impression: Mixed dyslipidemia pattern. Dietary modification and cardiovascular risk assessment recommended.`,
    parameters: [
      { name: 'Total Cholesterol', value: 248, unit: 'mg/dL', range: '< 200' },
      { name: 'Triglycerides', value: 220, unit: 'mg/dL', range: '< 150' }
    ]
  },
  {
    id: 'sample-platelets',
    title: 'Post-Viral Recovery — Low Platelet Count',
    category: 'hematology',
    badge: 'Platelets / Thrombocytopenia',
    subtitle: 'Platelets 92,000 /uL after recent fever recovery',
    description: 'Demonstrates MediLens’s safe, evidence-based guidance: avoiding false claims like papaya cures while providing real textbook-supported rest and warning sign awareness.',
    sampleText: `HAEMATOLOGY INVESTIGATION
Patient: Sample Patient (29Y / Male)
Clinical Note: Day 7 post-viral fever recovery

Test Name                     Result     Unit      Reference Range
------------------------------------------------------------------
Platelet Count                92         x10^3/uL  150 - 450    [LOW]
Hemoglobin                    13.8       g/dL      13.5 - 17.5  [NORMAL]
Total Leucocytes (WBC)        4.2        x10^3/uL  4.0 - 11.0   [NORMAL]
Hematocrit (PCV)              41.5       %         40.0 - 50.0  [NORMAL]

Impression: Moderate thrombocytopenia post-viral illness. Advise repeat CBC after 48-72 hours to confirm recovery trajectory.`,
    parameters: [
      { name: 'Platelet Count', value: 92, unit: 'x10^3/uL', range: '150 - 450' },
      { name: 'Hemoglobin (Hb)', value: 13.8, unit: 'g/dL', range: '13.5 - 17.5' },
      { name: 'Total Leucocyte Count (WBC)', value: 4.2, unit: 'x10^3/uL', range: '4.0 - 11.0' }
    ]
  },
  {
    id: 'sample-thyroid',
    title: 'Thyroid Function Test — Elevated TSH',
    category: 'thyroid',
    badge: 'Thyroid / Hormones',
    subtitle: 'TSH 6.8 uIU/mL with borderline Free T4',
    description: 'Explains thyroid hormone signaling in clear thermostat analogies without jumping to lifelong disorder labels, offering practical doctor consultation steps.',
    sampleText: `THYROID FUNCTION PANEL (CLIA)
Patient: Sample Patient (41Y / Female)

Test Name                     Result     Unit      Reference Range
------------------------------------------------------------------
TSH (Ultrasensitive)          6.82       uIU/mL    0.45 - 4.50  [HIGH]
Free T4 (Thyroxine)           1.02       ng/dL     0.82 - 1.77  [NORMAL]
Free T3 (Triiodothyronine)    2.8        pg/mL     2.3 - 4.2    [NORMAL]

Impression: Subclinical thyroid pattern. Recommend clinical correlation and repeat evaluation in 6-8 weeks before medical intervention.`,
    parameters: [
      { name: 'TSH', value: 6.82, unit: 'uIU/mL', range: '0.45 - 4.50' }
    ]
  },
  {
    id: 'sample-urine',
    title: 'Urine Routine & Microscopy — Trace Protein',
    category: 'urine',
    badge: 'Urine / Kidneys',
    subtitle: 'Urine Protein 1+ with normal pus cells',
    description: 'Translates urine findings simply: explains why proteins belong in the blood, what kidney filters do, and why repeat morning checks help verify temporary causes.',
    sampleText: `URINALYSIS (ROUTINE & MICROSCOPY)
Patient: Sample Patient (36Y / Male)
Sample: Spot Midstream Urine

Physical Examination:
  Color: Pale Yellow
  Appearance: Clear
  Specific Gravity: 1.020 (1.005 - 1.030)
  pH: 6.0 (4.5 - 8.0)

Chemical Examination:
  Protein / Albumin: 1+ (approx. 30 mg/dL) [PRESENT]
  Glucose: Nil [NORMAL]
  Ketones: Negative
  Bilirubin: Negative

Microscopic Examination:
  Pus Cells (WBC): 2 - 4 / HPF (Normal: 0-5)
  RBC: Nil
  Epithelial Cells: 1 - 2 / HPF
  Casts / Crystals: None seen`,
    parameters: [
      { name: 'Urine Protein', value: '1+ (30 mg/dL)', unit: 'Qualitative', range: 'Negative' }
    ]
  },
  {
    id: 'sample-semen',
    title: 'Semen Analysis — Volume, Count & Motility',
    category: 'semen',
    badge: 'Semen Analysis',
    subtitle: 'Sperm concentration 12 mil/mL, progressive motility 28%',
    description: 'Respectful, objective, and supportive analysis explaining parameters clearly and emphasizing that single tests fluctuate and never diagnose fertility status.',
    sampleText: `SEMEN EXAMINATION REPORT (WHO 6th Edition Criteria)
Patient: Sample Patient (31Y / Male)
Period of Abstinence: 3 Days
Liquefaction Time: 25 Minutes

Parameter                     Result     Unit          WHO Lower Limit
----------------------------------------------------------------------
Volume                        2.2        mL            >= 1.4 mL
Sperm Concentration           12.0       million/mL    >= 15.0 million/mL  [MILDLY LOW]
Total Sperm Count             26.4       million/ejac  >= 39.0 million     [MILDLY LOW]
Total Motility (PR + NP)      36         %             >= 42 %             [BORDERLINE]
Progressive Motility (PR)     28         %             >= 30 %             [BORDERLINE]
Normal Morphology             3.5        %             >= 4.0 %            [BORDERLINE]
Vitality                      68         %             >= 54 %             [NORMAL]
Leukocytes                    0.4        million/mL    < 1.0 million/mL    [NORMAL]

Note: Biological variation in semen parameters is well recognized. Repeat evaluation after 4-8 weeks is standard clinical practice.`,
    parameters: [
      { name: 'Sperm Concentration', value: 12.0, unit: 'million/mL', range: '>= 15.0' },
      { name: 'Progressive Motility', value: 28, unit: '%', range: '>= 30' }
    ]
  },
  {
    id: 'sample-glucose',
    title: 'Comprehensive Glycemic Panel — Glucose & HbA1c',
    category: 'diabetes',
    badge: 'Diabetes / Blood Sugar',
    subtitle: 'Fasting Blood Glucose 118 mg/dL, HbA1c 6.2%',
    description: 'Clear breakdown of impaired fasting glucose and HbA1c without panic, featuring meal-sequencing habits (salad before dal/roti) and walking recommendations.',
    sampleText: `DIABETES & METABOLIC INVESTIGATION
Patient: Sample Patient (52Y / Female)
Fasting Duration: 10 Hours

Test Name                     Result     Unit      Reference Range
------------------------------------------------------------------
Fasting Blood Sugar (FBS)     118        mg/dL     70 - 99      [ELEVATED - Prediabetes]
HbA1c (Glycated Hemoglobin)   6.2        %         < 5.7        [ELEVATED - Prediabetes]
Estimated Average Glucose     131        mg/dL     < 117        [ELEVATED]
Serum Creatinine              0.8        mg/dL     0.6 - 1.1    [NORMAL]

Impression: Glycemic values in the impaired fasting / prediabetes range. Lifestyle intervention and clinical follow-up advised.`,
    parameters: [
      { name: 'Fasting Blood Glucose', value: 118, unit: 'mg/dL', range: '70 - 99' },
      { name: 'HbA1c', value: 6.2, unit: '%', range: '< 5.7' }
    ]
  },
  {
    id: 'sample-liver',
    title: 'Liver Function Test — SGPT / ALT Elevation',
    category: 'lft',
    badge: 'Liver / LFT',
    subtitle: 'SGPT / ALT 74 U/L, SGOT / AST 58 U/L',
    description: 'Explains liver enzyme leakage in everyday terms, dispels detox myths, and outlines gut-liver axis meal ideas and doctor ultrasound discussion points.',
    sampleText: `LIVER FUNCTION TEST (LFT)
Patient: Sample Patient (44Y / Male)

Test Name                     Result     Unit      Reference Range
------------------------------------------------------------------
SGPT / ALT                    74         U/L       7 - 56       [HIGH]
SGOT / AST                    58         U/L       8 - 48       [HIGH]
Total Bilirubin               0.9        mg/dL     0.2 - 1.2    [NORMAL]
Direct Bilirubin              0.25       mg/dL     < 0.3        [NORMAL]
Alkaline Phosphatase (ALP)    92         U/L       44 - 147     [NORMAL]
Total Protein                 7.4        g/dL      6.0 - 8.3    [NORMAL]
Serum Albumin                 4.4        g/dL      3.5 - 5.2    [NORMAL]

Impression: Mild hepatocellular transaminase elevation. Clinical correlation and lifestyle review recommended.`,
    parameters: [
      { name: 'SGPT / ALT', value: 74, unit: 'U/L', range: '7 - 56' },
      { name: 'SGOT / AST', value: 58, unit: 'U/L', range: '8 - 48' }
    ]
  }
];

/**
 * Local Deterministic Analysis Builder:
 * Takes input parameters and maps them to verified MBBS textbook knowledge
 * producing the required 9-part structured human explanation with practical meal ideas.
 */
export function buildLocalExplanation(parameters: Array<{ name: string; value: string | number; unit?: string; range?: string }>): LabFinding[] {
  const findings: LabFinding[] = [];

  for (const param of parameters) {
    const rawName = param.name.toLowerCase();
    let matchedKey: string | null = null;

    if (rawName.includes('hemo') || rawName.includes('hb')) matchedKey = 'hemoglobin';
    else if (rawName.includes('platelet') || rawName.includes('thrombo')) matchedKey = 'platelets';
    else if (rawName.includes('leuco') || rawName.includes('wbc') || rawName.includes('white blood')) matchedKey = 'wbc';
    else if (rawName.includes('triglyceride')) matchedKey = 'triglycerides';
    else if (rawName.includes('cholesterol') || rawName.includes('lipid')) matchedKey = 'cholesterol';
    else if (rawName.includes('glucose') || rawName.includes('sugar') || rawName.includes('fbs')) matchedKey = 'glucose';
    else if (rawName.includes('tsh') || rawName.includes('thyroid')) matchedKey = 'tsh';
    else if (rawName.includes('protein') || rawName.includes('albumin') || rawName.includes('urine')) matchedKey = 'urine_protein';
    else if (rawName.includes('semen') || rawName.includes('sperm') || rawName.includes('motility')) matchedKey = 'semen_analysis';
    else if (rawName.includes('creatinine') || rawName.includes('kft') || rawName.includes('rft')) matchedKey = 'creatinine';
    else if (rawName.includes('alt') || rawName.includes('sgpt') || rawName.includes('ast') || rawName.includes('sgot') || rawName.includes('liver')) matchedKey = 'alt';

    if (!matchedKey || !MEDICAL_KNOWLEDGE_BASE[matchedKey]) {
      // Create a sensible general finding
      continue;
    }

    const item = MEDICAL_KNOWLEDGE_BASE[matchedKey];
    const numVal = typeof param.value === 'number' ? param.value : parseFloat(String(param.value));
    const isNaNVal = isNaN(numVal);

    let status: LabFinding['status'] = 'normal';
    let isAbnormal = false;
    let isCritical = false;
    let criticalNotice: string | undefined = undefined;

    if (item.key === 'urine_protein') {
      const strVal = String(param.value).toLowerCase();
      if (strVal.includes('neg') || strVal.includes('nil') || strVal === '0') {
        status = 'normal';
      } else {
        status = 'present';
        isAbnormal = true;
      }
    } else if (!isNaNVal) {
      if (item.criticalLow && numVal <= item.criticalLow) {
        status = 'critical_low';
        isAbnormal = true;
        isCritical = true;
        criticalNotice = `Important Alert: Value (${numVal} ${item.standardUnit}) is significantly lower than standard thresholds. Please seek prompt medical consultation.`;
      } else if (item.criticalHigh && numVal >= item.criticalHigh) {
        status = 'critical_high';
        isAbnormal = true;
        isCritical = true;
        criticalNotice = `Important Alert: Value (${numVal} ${item.standardUnit}) is significantly elevated. Please seek prompt medical evaluation.`;
      } else if (numVal < item.minNormal) {
        status = 'low';
        isAbnormal = true;
      } else if (numVal > item.maxNormal) {
        status = 'high';
        isAbnormal = true;
      } else {
        status = 'normal';
      }
    }

    // Determine explanation variant based on status
    const isLowStatus = status === 'low' || status === 'critical_low';
    const isHighStatus = status === 'high' || status === 'critical_high' || status === 'present';
    const activeMeaning = isLowStatus ? item.lowMeaning : isHighStatus ? item.highMeaning : item.normalMeaning;

    // Build meal ideas if available
    let simpleDailyExamples: LabFinding['simpleDailyExamples'] = undefined;
    const meaningWithMeals = (isLowStatus ? item.lowMeaning : isHighStatus ? item.highMeaning : null) as {
      meals?: {
        breakfast: { items: string[]; why: string };
        lunch: { items: string[]; why: string };
        snack: { items: string[]; why: string };
        dinner: { items: string[]; why: string };
      };
      possibleAssociations?: string[];
    } | null;

    if (meaningWithMeals && meaningWithMeals.meals) {
      const m = meaningWithMeals.meals;
      simpleDailyExamples = [
        {
          meal: 'Breakfast',
          foodItems: m.breakfast.items,
          why: m.breakfast.why,
          culturalPracticalItems: ['Oats', 'Poha with peanuts', 'Methi roti', 'Moong dal chilla']
        },
        {
          meal: 'Lunch',
          foodItems: m.lunch.items,
          why: m.lunch.why,
          culturalPracticalItems: ['Dal / lentils', 'Chickpeas (chana)', 'Rajma', 'Steamed spinach (palak)']
        },
        {
          meal: 'Evening Snack',
          foodItems: m.snack.items,
          why: m.snack.why,
          culturalPracticalItems: ['Roasted chana with gud', 'Fresh seasonal fruit', 'Walnuts / Almonds']
        },
        {
          meal: 'Dinner',
          foodItems: m.dinner.items,
          why: m.dinner.why,
          culturalPracticalItems: ['Khichdi with mixed dal', 'Vegetable sabzi', 'Lentil soup']
        }
      ];
    }

    const finding: LabFinding = {
      id: `${item.key}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      testName: item.testName,
      category: item.category,
      userValue: param.value,
      numericValue: !isNaNVal ? numVal : undefined,
      unit: param.unit || item.standardUnit,
      referenceRange: param.range || item.defaultRange,
      status,
      isAbnormal,
      isCritical,
      criticalNotice,
      
      // Plain-Language Pedagogical 5-Step Structure
      termDefinition: item.termDefinition,
      whatDoesItMean: item.whatDoesItMean || item.whatIsThis,
      whyDoesItHappen: item.whyDoesItHappen || item.whyDoesItMatter,
      whatItMeansInThisReport: isAbnormal 
        ? `${item.testName} was reported as ${param.value} ${param.unit || item.standardUnit}, which is ${status === 'low' || status === 'critical_low' ? 'lower than' : 'higher than'} the standard reference range (${param.range || item.defaultRange}). ${activeMeaning.simpleSummary}`
        : `${item.testName} was reported as ${param.value} ${param.unit || item.standardUnit}, which is within standard laboratory limits (${param.range || item.defaultRange}). ${activeMeaning.simpleSummary}`,
      whatCanAndCannotBeConcluded: item.limits || {
        canConclude: [
          `Your test value is ${param.value} ${param.unit || item.standardUnit}.`,
          `This value compares against a reference range of ${param.range || item.defaultRange}.`
        ],
        cannotConclude: [
          'A single test value cannot diagnose a medical condition on its own.',
          'It cannot replace a medical evaluation by a qualified doctor.'
        ]
      },

      // Backward-compatible fields
      yourResultSummary: `${item.testName}: ${param.value} ${param.unit || item.standardUnit} (${isAbnormal ? (status === 'low' ? 'Below reported range' : 'Above reported range') : 'Within standard reported range'} of ${param.range || item.defaultRange})`,
      whatIsThis: item.whatIsThis,
      whyDoesItMatter: item.whyDoesItMatter,
      whatCouldBeAssociated: (meaningWithMeals && meaningWithMeals.possibleAssociations) ? meaningWithMeals.possibleAssociations : ['Typical healthy physiological variation within expected boundaries.'],
      whatCanIDo: activeMeaning.whatCanIDo,
      simpleDailyExamples,
      questionsForDoctor: activeMeaning.doctorQuestions,
      source: item.source,
      safetyDisclaimer: item.safetyDisclaimer
    };

    findings.push(finding);
  }

  return findings;
}
