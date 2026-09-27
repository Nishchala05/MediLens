import { AnalysisResult, LabFinding, ChatMessage } from '../types';

export interface ChatEngineResponse {
  reply: string;
  source: {
    textbookName: string;
    chapterOrSection: string;
  };
  suggestedFollowUps: string[];
  referencedParameters: string[];
}

/**
 * Generates an intelligent, textbook-grounded local response when the AI service is offline
 * or as an immediate fast response engine.
 */
export function generateLocalChatResponse(
  userMessage: string,
  history: ChatMessage[],
  reportContext?: AnalysisResult | null,
  language?: string
): ChatEngineResponse {
  const query = userMessage.toLowerCase().trim();
  const findings: LabFinding[] = reportContext?.findings || [];

  // Helper to find finding by test name
  const findParam = (names: string[]): LabFinding | undefined => {
    return findings.find(f => 
      names.some(n => f.testName.toLowerCase().includes(n.toLowerCase()))
    );
  };

  const referencedParameters: string[] = [];

  // 1. Check if user asks about a specific parameter in their report
  const hemoglobinFinding = findParam(['hemo', 'hb']);
  const plateletFinding = findParam(['platelet', 'thrombo']);
  const cholesterolFinding = findParam(['cholesterol', 'lipid', 'ldl', 'hdl']);
  const glucoseFinding = findParam(['glucose', 'sugar', 'fbs', 'hba1c']);
  const tshFinding = findParam(['tsh', 'thyroid']);
  const urineFinding = findParam(['urine', 'protein', 'albumin']);
  const semenFinding = findParam(['semen', 'sperm']);
  const creatinineFinding = findParam(['creatinine', 'bun', 'kidney', 'kft']);

  // Case A: User asks about Hemoglobin / Anemia
  if (query.includes('hemo') || query.includes('hb') || query.includes('anemia') || query.includes('iron') || query.includes('tired') || query.includes('fatigue')) {
    if (hemoglobinFinding) {
      referencedParameters.push(hemoglobinFinding.testName);
      const isLow = hemoglobinFinding.status === 'low' || hemoglobinFinding.status === 'critical_low';
      
      const reply = `### Understanding Your Hemoglobin Result

**Your Result:** **${hemoglobinFinding.userValue} ${hemoglobinFinding.unit}** (Reference Range: ${hemoglobinFinding.referenceRange})
${isLow ? '⚠️ Your level is below the laboratory reference range.' : '✅ Your level is within the standard range.'}

#### 1. What is Hemoglobin?
Hemoglobin is the specialized iron-containing protein inside your red blood cells. Think of it as a **fleet of delivery vans** carrying fresh oxygen from your lungs to every organ, muscle, and tissue in your body.

${isLow ? `#### 2. Why might you feel tired?
When hemoglobin is lower than reference ranges, fewer "delivery vans" carry oxygen to your tissues. Muscles and brain cells receive slightly less oxygen during everyday activities, which commonly translates to feelings of tiredness, mild lethargy, or getting breathless more quickly. However, fatigue can also stem from sleep, stress, or other factors, so this lab value is one part of the bigger picture.` : ''}

#### 3. Practical Everyday Foods (Iron & Oxygen Support)
* **Lentils & Legumes:** Dal, chickpeas (*chana*), rajma, and moong beans provide plant-based iron.
* **Leafy Greens:** Spinach (*palak*), methi, and drumstick leaves.
* **Absorption Tip:** Pair iron foods with vitamin C (a squeeze of lemon on dal or oranges) to boost non-heme iron absorption.

#### 4. Safety & Doctor Discussion
* Low hemoglobin requires a doctor to investigate *why* (such as dietary intake, digestive absorption, or blood loss). Never take high-dose iron supplements without medical direction.`;

      return {
        reply,
        source: {
          textbookName: "Harrison's Principles of Internal Medicine (21st Edition)",
          chapterOrSection: "Chapter 93: Anemia and Polycythemia"
        },
        suggestedFollowUps: [
          "What foods help increase iron absorption?",
          "Can you give me a full-day meal plan for hemoglobin?",
          "What questions should I ask my doctor about this?"
        ],
        referencedParameters
      };
    }
  }

  // Case B: User asks about Platelets
  if (query.includes('platelet') || query.includes('thrombo') || query.includes('clot') || query.includes('bleed')) {
    if (plateletFinding) {
      referencedParameters.push(plateletFinding.testName);
      const isLow = plateletFinding.status === 'low' || plateletFinding.status === 'critical_low';

      const reply = `### Understanding Your Platelet Count

**Your Result:** **${plateletFinding.userValue} ${plateletFinding.unit}** (Reference Range: ${plateletFinding.referenceRange})
${isLow ? '⚠️ Your platelet count is below the expected reference range.' : '✅ Your platelet count is within the healthy range.'}

#### 1. What are Platelets?
Platelets (thrombocytes) are tiny cell fragments circulating in your blood. Their job is to act like **first-aid band-aids** inside your vessels—whenever a small cut or blood vessel injury happens, platelets quickly gather together to plug the leak and prevent excessive bleeding.

#### 2. Why does this matter?
${isLow 
  ? `When platelet counts fall below reference limits, your blood takes slightly longer to clot. You might notice small bruises appearing easily or minor gum bleeding when brushing. 
  
*Important Medical Note:* Low platelets can occur temporarily from viral infections (like dengue or viral fevers), medications, or immune reactions. They require qualified medical monitoring.` 
  : `Your platelet count is adequate to maintain normal blood clotting and vessel integrity.`}

#### 3. Supportive Nutrition & Common Myths
* **Supportive Nutrition:** Eat balanced, easy-to-digest whole foods—dal, khichdi, vegetable soups, and adequate fluids to support your body while it recovers.
* **The Papaya Leaf Question:** While papaya leaf extract is popular in traditional remedies, textbooks emphasize that **it is not a medical cure or replacement for medical care**. Never substitute home remedies for clinical evaluation.

#### 4. When to seek immediate care
If you notice unusual purple spots on the skin (*petechiae*), black stools, or persistent bleeding, seek immediate clinical evaluation.`;

      return {
        reply,
        source: {
          textbookName: "Robbins & Cotran Pathologic Basis of Disease (10th Edition)",
          chapterOrSection: "Chapter 14: Diseases of White Blood Cells, Lymph Nodes, Spleen, and Thymus (Hemostasis)"
        },
        suggestedFollowUps: [
          "Does dengue fever lower platelets?",
          "What should I avoid doing if my platelets are low?",
          "What questions should I ask my doctor about platelets?"
        ],
        referencedParameters
      };
    }
  }

  // Case C: User asks about Cholesterol / Lipids
  if (query.includes('cholesterol') || query.includes('lipid') || query.includes('hdl') || query.includes('ldl') || query.includes('triglyceride')) {
    if (cholesterolFinding) {
      referencedParameters.push(cholesterolFinding.testName);
    }
    const reply = `### Understanding Cholesterol & Blood Fats

${cholesterolFinding ? `**Your Result:** **${cholesterolFinding.userValue} ${cholesterolFinding.unit}** (Reference Range: ${cholesterolFinding.referenceRange})\n` : ''}
#### 1. What is Cholesterol and what is the difference between HDL and LDL?
Cholesterol is a natural waxy substance your body actually needs to build cell walls and manufacture essential hormones and vitamin D. Because fat doesn't dissolve in watery blood, it travels wrapped inside protein packages called **lipoproteins**:

* **LDL ("Low-Density Lipoprotein"):** Often called the *"delivery truck"*. It carries cholesterol out to tissues. When there is too much LDL over many years, excess fat can settle inside arterial walls like plaque in water pipes.
* **HDL ("High-Density Lipoprotein"):** Often called the *"garbage cleaner truck"*. It travels through vessels, picks up extra cholesterol, and delivers it safely back to the liver for disposal. Higher HDL is protective!
* **Triglycerides:** The storage form of extra calories from carbohydrates, sugars, and oils.

#### 2. Practical Meal-Level Nutrition (Not "Starving")
Rather than completely eliminating all fats, medical textbooks emphasize changing the **type** of fat and adding **soluble fiber**:
* **Soluble Fiber (Pulls cholesterol out):** Oats, barley, beans (*rajma*, chickpeas), and apples.
* **Healthy Oils:** Small measured amounts of mustard oil, olive oil, or groundnut oil instead of deep frying or hydrogenated fats (*dalda/vanaspati*).
* **Culturally Familiar Meal Idea:** Oats or vegetable poha for breakfast; a bowl of chana dal with two multigrain rotis and cucumber salad for lunch.

#### 3. Questions for Your Doctor
* "Is this single cholesterol test enough, or should we do a complete fasting lipid panel (LDL, HDL, Triglycerides)?"
* "Given my family history, what is my overall cardiovascular risk target?"`;

    return {
      reply,
      source: {
        textbookName: "Harper's Illustrated Biochemistry (32nd Edition)",
        chapterOrSection: "Chapter 25: Lipid Transport & Storage; Atherosclerosis"
      },
      suggestedFollowUps: [
        "What is the difference between LDL and HDL?",
        "Can exercise raise my good HDL cholesterol?",
        "What foods lower triglycerides naturally?"
      ],
      referencedParameters: referencedParameters.length ? referencedParameters : ['Cholesterol']
    };
  }

  // Case D: User asks about Blood Sugar / Glucose / Diabetes
  if (query.includes('sugar') || query.includes('glucose') || query.includes('fbs') || query.includes('diabetes') || query.includes('hba1c')) {
    if (glucoseFinding) {
      referencedParameters.push(glucoseFinding.testName);
    }
    const reply = `### Understanding Blood Sugar (Glucose)

${glucoseFinding ? `**Your Result:** **${glucoseFinding.userValue} ${glucoseFinding.unit}** (Reference Range: ${glucoseFinding.referenceRange})\n` : ''}
#### 1. What is Fasting Blood Glucose?
Glucose is the primary fuel that powers your brain, heart, and muscles. When you fast overnight, your liver releases a controlled trickle of glucose to keep organs running. The hormone **insulin** (made by the pancreas) acts like a **door key**, allowing glucose to leave the blood and enter cells.

#### 2. Why does a high number matter?
If insulin keys aren't working smoothly (*insulin resistance*) or aren't enough, glucose stays locked out in the bloodstream. While a borderline high level does not mean permanent diabetes, it is a valuable early signal that lifestyle and nutrition tweaks can restore balance.

#### 3. Practical Daily Plate Method
* **Complex Carbs:** Swap refined white rice and maida for whole wheat rotis, brown rice, steel-cut oats, or millets (*jowar/bajra*).
* **Protein with every meal:** Add dal, boiled chana, eggs, or paneer/tofu to slow down the sugar spike.
* **Movement:** A brisk 15-minute walk right after lunch and dinner helps muscles absorb glucose naturally without needing extra insulin.

#### 4. What to Ask Your Doctor
* "Would an **HbA1c test** (which shows 3-month average sugar) give us a clearer picture?"
* "Are lifestyle modifications suitable to start with before any medication?"`;

    return {
      reply,
      source: {
        textbookName: "Guyton & Hall Textbook of Medical Physiology (14th Edition)",
        chapterOrSection: "Chapter 79: Insulin, Glucagon, and Diabetes Mellitus"
      },
      suggestedFollowUps: [
        "What is the HbA1c test and how does it work?",
        "What are simple breakfast swaps for better blood sugar?",
        "Can a single high sugar test diagnose diabetes?"
      ],
      referencedParameters: referencedParameters.length ? referencedParameters : ['Blood Glucose']
    };
  }

  // Case E: User asks about Thyroid / TSH
  if (query.includes('tsh') || query.includes('thyroid') || query.includes('t3') || query.includes('t4')) {
    if (tshFinding) {
      referencedParameters.push(tshFinding.testName);
    }
    const reply = `### Understanding Thyroid Stimulating Hormone (TSH)

${tshFinding ? `**Your Result:** **${tshFinding.userValue} ${tshFinding.unit}** (Reference Range: ${tshFinding.referenceRange})\n` : ''}
#### 1. The Simple "Thermostat" Analogy
Think of your pituitary gland (in your brain) as a **room thermostat** and your thyroid gland (in your neck) as the **heater**:
* When the heater is running sluggishly (low thyroid hormones T3/T4), the thermostat shouts louder by cranking up **TSH** (*high TSH = sluggish thyroid / hypothyroidism*).
* When the heater is running too hot, the thermostat stops shouting (*low TSH = overactive thyroid / hyperthyroidism*).

#### 2. Strict Medical Caution on Single Tests
Textbooks emphasize: **Never diagnose a permanent endocrine disorder from a single isolated TSH test.** TSH fluctuates with sleep, viral recovery, stress, and time of day. A re-test along with Free T4 and clinical examination is standard medical protocol.

#### 3. General Educational Nutrition
* Ensure adequate dietary iodine (standard iodized table salt).
* Include selenium-rich foods like nuts, seeds, and whole grains.
* Do not start thyroid supplements or drastic herbal tinctures without an endocrinologist or physician.`;

    return {
      reply,
      source: {
        textbookName: "Harrison's Principles of Internal Medicine (21st Edition)",
        chapterOrSection: "Chapter 376: Disorders of the Thyroid Gland"
      },
      suggestedFollowUps: [
        "Why does high TSH mean an underactive thyroid?",
        "What symptoms are typically associated with high TSH?",
        "Should I re-test my TSH at a specific time of day?"
      ],
      referencedParameters: referencedParameters.length ? referencedParameters : ['TSH']
    };
  }

  // Case F: User asks for meal plan / practical diet
  if (query.includes('food') || query.includes('diet') || query.includes('meal') || query.includes('eat') || query.includes('breakfast') || query.includes('dinner')) {
    const abnormalFindings = findings.filter(f => f.isAbnormal);
    const contextName = abnormalFindings.length > 0 ? abnormalFindings[0].testName : 'your overall wellness';

    const reply = `### Practical, Everyday Meal Guide (Focusing on ${contextName})

Here is a balanced, practical day of meals using familiar, whole ingredients that support healthy blood parameters without rigid dieting:

* 🌅 **Breakfast:** Vegetable oats porridge or besan chilla with chopped onions and tomatoes, accompanied by 4–5 soaked almonds.
  * *Why:* Provides soluble fiber and gradual energy release to prevent mid-morning sluggishness.
* ☀️ **Lunch:** Two multigrain rotis (or a moderate bowl of brown/unpolished rice), a generous bowl of yellow dal or chickpeas (*chana*), mixed seasonal sabzi (like beans or spinach), and fresh curd (*dahi*).
  * *Why:* Balanced plant protein and iron paired with fermented dairy for optimal digestive absorption.
* ☕ **Evening Snack:** Roasted makhana (foxnuts) or roasted chana with a cup of green tea or spiced buttermilk (*chaas*).
  * *Why:* Satisfies hunger between meals without unhealthy trans fats or excess sodium.
* 🌙 **Dinner (Light & Early):** Warm vegetable soup followed by a bowl of moong dal khichdi or grilled paneer/tofu with sautéed vegetables.
  * *Why:* Gentle on the digestive system before bedtime, supporting steady cellular repair overnight.

*Note:* This is general health-education guidance based on preventive medicine textbooks (Park's PSM), not a clinical prescription.`;

    return {
      reply,
      source: {
        textbookName: "Park's Textbook of Preventive and Social Medicine (27th Edition)",
        chapterOrSection: "Chapter 11: Nutrition and Health; Dietary Goals"
      },
      suggestedFollowUps: [
        "What can I replace rice with?",
        "Can I eat eggs or fish with this plan?",
        "How much water should I drink daily?"
      ],
      referencedParameters: abnormalFindings.map(f => f.testName)
    };
  }

  // Case G: User asks what questions to ask their doctor
  if (query.includes('doctor') || query.includes('ask') || query.includes('question') || query.includes('consult')) {
    const questions = reportContext?.allDoctorQuestions || [
      "Are any of these findings urgent, or can we address them with lifestyle changes?",
      "Would you recommend repeating this test in 4 to 8 weeks?",
      "Do any medications or supplements I am taking affect these numbers?"
    ];

    const reply = `### Empowering Questions for Your Doctor Consultation

When you meet your healthcare provider, having structured questions ensures a focused, productive discussion. Here are recommended questions based on your report:

${questions.slice(0, 4).map((q, i) => `${i + 1}. **"${q}"**`).join('\n\n')}

#### 💡 Helpful Tip for Your Appointment:
Print or save your MediLens **Doctor Discussion Sheet** (available via the top button). Handing it to your physician allows them to see the questions you care most about within 30 seconds!`;

    return {
      reply,
      source: {
        textbookName: "Harrison's Principles of Internal Medicine (21st Edition)",
        chapterOrSection: "Chapter 1: The Practice of Clinical Medicine"
      },
      suggestedFollowUps: [
        "How do I open the Doctor Discussion Sheet?",
        "Should I fast before my next follow-up test?",
        "Can you explain my out-of-range results again?"
      ],
      referencedParameters: []
    };
  }

  // Case H: User asks about related parameters ("Are these related?")
  if (query.includes('related') || query.includes('relationship') || query.includes('together') || query.includes('connect')) {
    if (findings.length >= 2) {
      const p1 = findings[0];
      const p2 = findings[1];
      referencedParameters.push(p1.testName, p2.testName);

      const reply = `### Analyzing Parameter Relationships

In your report, let's examine how **${p1.testName}** (${p1.userValue} ${p1.unit}) and **${p2.testName}** (${p2.userValue} ${p2.unit}) connect physiologically:

* **In the human body, lab tests rarely operate in silos.** For example:
  * In blood counts, hemoglobin, red blood cells, and platelets are all manufactured inside bone marrow stem cells. If one is altered, doctors inspect the entire complete blood picture.
  * In metabolic panels, blood glucose and lipids (cholesterol/triglycerides) interact closely through insulin sensitivity and liver metabolism.
  * In kidney and liver panels, filtration markers (creatinine/BUN) or enzymes (AST/ALT) provide paired insight into organ workload.

Because individual test variations can have shared nutritional, inflammatory, or hydration roots, your physician reviews your complete panel together rather than treating any single number in isolation.`;

      return {
        reply,
        source: {
          textbookName: "Robbins & Cotran Pathologic Basis of Disease (10th Edition)",
          chapterOrSection: "General Pathology & Organ System Interdependence"
        },
        suggestedFollowUps: [
          `Can you explain ${p1.testName} in detail?`,
          `Can you explain ${p2.testName} in detail?`,
          "Which of my results is the most important to discuss with my doctor?"
        ],
        referencedParameters
      };
    }
  }

  // Case I: Explain entire report / overview
  if (query.includes('entire') || query.includes('whole') || query.includes('all') || query.includes('overview') || query.includes('summary')) {
    if (reportContext) {
      const abnormalCount = findings.filter(f => f.isAbnormal).length;
      const normalCount = findings.length - abnormalCount;

      const reply = `### Comprehensive Overview of Your Report

**Report Title:** ${reportContext.reportTitle}

* **Total Tests Evaluated:** ${findings.length}
* **Within Reference Range:** ${normalCount}
* **Outside Reference Range:** ${abnormalCount}

#### Key Takeaway in Plain English:
${reportContext.overallSummary}

#### Out-of-Range Parameters:
${findings.filter(f => f.isAbnormal).map(f => `* **${f.testName}**: **${f.userValue} ${f.unit}** (Range: ${f.referenceRange}) — ${f.whatIsThis}`).join('\n\n') || "All your tested parameters appear within standard reference intervals!"}

Would you like to explore any specific parameter or look at practical meal choices?`;

      return {
        reply,
        source: {
          textbookName: "Harrison's Principles of Internal Medicine (21st Edition)",
          chapterOrSection: "Laboratory Values of Clinical Importance"
        },
        suggestedFollowUps: [
          "Explain my most abnormal result in simple terms",
          "What practical foods can I start including?",
          "What questions should I bring to my doctor?"
        ],
        referencedParameters: findings.map(f => f.testName)
      };
    }
  }

  // Fallback: General inquiry with report context or open-ended
  if (reportContext && findings.length > 0) {
    const abnormal = findings.find(f => f.isAbnormal) || findings[0];
    referencedParameters.push(abnormal.testName);

    const reply = `### Explaining Your Lab Values

Thank you for your question! In your current report (**${reportContext.reportTitle}**), MediLens evaluated **${findings.length} parameters**.

For example, looking at **${abnormal.testName}**:
* **Your Reported Value:** **${abnormal.userValue} ${abnormal.unit}** (Lab Reference Range: ${abnormal.referenceRange})
* **Simple Definition:** ${abnormal.whatIsThis}
* **Why It Matters:** ${abnormal.whyDoesItMatter}

Would you like me to explain this in simpler words, detail practical foods that support this marker, or compare it with another test from your report?`;

    return {
      reply,
      source: {
        textbookName: abnormal.source.textbookName || "Harrison's Principles of Internal Medicine",
        chapterOrSection: abnormal.source.chapterOrSection || "Clinical Evaluation"
      },
      suggestedFollowUps: [
        `Tell me more about ${abnormal.testName}`,
        "What foods can I eat to support healthy levels?",
        "Explain this in very simple everyday terms"
      ],
      referencedParameters
    };
  }

  // Default when no report loaded yet
  return {
    reply: `### Welcome to MediLens AI Explainer!

I am ready to help you understand your laboratory blood tests and health reports using clear, everyday human explanations grounded in authorized MBBS medical textbooks (*Harrison's, Robbins, Guyton, Harper's, and Park's PSM*).

**How you can use me:**
1. **Upload or select a report** from the top screen to get personalized analysis of your exact numbers.
2. Or ask me any general laboratory question right now! For example:
   * *"What is the difference between LDL and HDL cholesterol?"*
   * *"Why does low hemoglobin make someone feel tired?"*
   * *"What do platelets do in the body?"*
   * *"What does a high TSH test mean?"*

What would you like to explore today?`,
    source: {
      textbookName: "Harrison's Principles of Internal Medicine (21st Edition)",
      chapterOrSection: "Introduction to Clinical Laboratory Testing"
    },
    suggestedFollowUps: [
      "What is the difference between LDL and HDL cholesterol?",
      "Why does low hemoglobin make someone tired?",
      "What are platelets and why are they important?"
    ],
    referencedParameters: []
  };
}
