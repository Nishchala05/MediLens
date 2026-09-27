import { LabFinding, MedicalMyth, MythVerdict } from '../types';

/**
 * Strict Authorized MBBS Medical Textbooks:
 * - Harrison's Principles of Internal Medicine (21st Edition)
 * - Robbins & Cotran Pathologic Basis of Disease (10th Edition)
 * - Guyton & Hall Textbook of Medical Physiology (14th Edition)
 * - Harper's Illustrated Biochemistry (32nd Edition)
 * - Park's Textbook of Preventive and Social Medicine (27th Edition)
 * - Davidson's Principles and Practice of Medicine (24th Edition)
 * - WHO Laboratory Manual for the Examination and Processing of Human Semen (6th Edition)
 */

export const MASTER_MYTH_DATABASE: MedicalMyth[] = [
  // 1. One Abnormal Value = Disease
  {
    id: 'myth-abnormal-equals-disease',
    myth: 'One abnormal value on a lab test automatically means you have a disease.',
    verdict: 'Context-Dependent',
    theFact: 'An out-of-range value is a statistical finding, not an automatic diagnosis. Reference intervals are statistically constructed to encompass approximately 95% of a healthy reference population. By definition, 5% of completely healthy people will have test numbers lying slightly outside standard reference intervals without having any underlying disorder.',
    why: 'Biological variables are subject to natural physiological fluctuations. Circadian rhythms (such as early-morning cortisol or TSH peaks), recent intense exercise (which can elevate AST or cause transient proteinuria), hydration status (affecting hematocrit and BUN), acute emotional stress, and posture during phlebotomy all shift circulating lab values. In authorized MBBS internal medicine practice, a laboratory finding is a diagnostic clue that must always be interpreted alongside clinical history and physical examination.',
    inThisReport: 'Check your reported parameters against the 95% reference interval. A borderline or single out-of-range number requires your doctor to consider recent hydration, stress, and medications before diagnosing any medical condition.',
    textbookBasis: {
      textbookName: "Harrison's Principles of Internal Medicine",
      edition: '21st Edition',
      chapterOrSection: 'Chapter 1: The Practice of Clinical Medicine & Appendix: Laboratory Values of Clinical Importance',
      citationDetail: 'Harrison\'s Chapter 1 emphasizes that diagnostic reasoning integrates patient history and physical findings with laboratory tests; tests have inherent false-positive and false-negative rates.'
    },
    evidenceDiscipline: {
      textbookFact: 'Reference intervals represent the mean ± 2 standard deviations of a healthy reference cohort, meaning 2.5% of healthy individuals fall below and 2.5% fall above normal limits purely by statistical distribution.',
      interpretation: 'In a comprehensive blood panel with 20 individual parameters, the statistical probability that at least one test falls outside normal limits in a healthy person exceeds 60%.',
      uncertainty: 'Whether an abnormal result in this report is physiological variation, transient fluctuation, or true pathology cannot be determined from the printed values alone.'
    },
    relatedCategory: 'general',
    relatedParameters: ['Hemoglobin', 'Platelet Count', 'TSH', 'Blood Glucose', 'Creatinine', 'AST', 'ALT']
  },

  // 2. Normal Range = Rules Out Disease
  {
    id: 'myth-normal-rules-out-disease',
    myth: 'A test result inside the reference range completely proves that everything is normal and rules out disease.',
    verdict: 'Myth',
    theFact: 'A test result within the reference range does not guarantee the absence of pathology. Many chronic, early-stage, or compensated disorders maintain normal circulating serum values until substantial functional reserve of the target organ has been exhausted.',
    why: 'Vital organs such as the kidneys, liver, and bone marrow possess immense physiological reserve. For instance, in chronic kidney disease, serum creatinine often remains within standard laboratory limits until approximately 50% of functional nephrons have lost their glomerular filtration capacity. Similarly, severe coronary atherosclerosis can exist in individuals with standard fasting cholesterol numbers if other vascular risk factors (smoking, family history, hypertension) are active.',
    inThisReport: 'Even if all parameters in this report show green or normal flags, routine clinical check-ups and reporting symptoms to your physician remain necessary.',
    textbookBasis: {
      textbookName: "Harrison's Principles of Internal Medicine",
      edition: '21st Edition',
      chapterOrSection: 'Chapter 308: Azotemia and Urinary Abnormalities',
      citationDetail: 'Discusses how serum creatinine is an insensitive indicator of early renal impairment because substantial GFR decline can precede noticeable serum creatinine elevation.'
    },
    evidenceDiscipline: {
      textbookFact: 'Diagnostic sensitivity of laboratory tests varies; normal serum concentrations regularly co-exist with compensated, subclinical, or early disease states.',
      interpretation: 'Normal laboratory results provide reassurance about current circulating values at the moment of phlebotomy, but do not replace ongoing clinical assessment.',
      uncertainty: 'The user\'s clinical history, physical examination, and symptom severity cannot be established from the lab report alone.'
    },
    relatedCategory: 'general',
    relatedParameters: ['Creatinine', 'BUN', 'Cholesterol', 'Fasting Blood Glucose']
  },

  // 3. Higher is Always Worse / Lower is Always Better
  {
    id: 'myth-higher-worse-lower-better',
    myth: 'Higher values are always worse, and lower values are always better on health tests.',
    verdict: 'Myth',
    theFact: 'Biological parameters are regulated homeostatic variables, not high-score or low-score contests. Both excessively high AND excessively low values reflect physiological decompensation or clinical risk.',
    why: 'Human physiology maintains stability through tight negative-feedback loops (the internal environment or "milieu intérieur"). For example, while chronically high blood glucose causes vascular damage, acutely low blood glucose (hypoglycemia < 55 mg/dL) deprives neurons of fuel and causes immediate confusion, seizure, or coma. Similarly, both low potassium (hypokalemia) and high potassium (hyperkalemia) can induce fatal cardiac arrhythmias. High white blood cells suggest infection, but very low white blood cells (neutropenia) leave the body vulnerable to sepsis.',
    inThisReport: 'Evaluate your numbers against BOTH the lower and upper limits of the laboratory reference range. Health lies in balanced homeostasis within the interval.',
    textbookBasis: {
      textbookName: 'Guyton & Hall Textbook of Medical Physiology',
      edition: '14th Edition',
      chapterOrSection: 'Chapter 1: Functional Organization of the Human Body and Control of the "Internal Environment"',
      citationDetail: 'Explains the physiological foundation of homeostatic control mechanisms and negative feedback systems maintaining extracellular fluid concentrations.'
    },
    evidenceDiscipline: {
      textbookFact: 'Physiological stability requires chemical concentrations, ions, and cells to stay within narrow homeostatic boundaries; deviations in either direction impair cellular function.',
      interpretation: 'A "low" number is not inherently good—for example, low hemoglobin, low platelets, low HDL, or low albumin indicate potential concerns rather than superior health.',
      uncertainty: 'Whether an extreme value has triggered compensatory physiological reflexes cannot be verified without physical examination.'
    },
    relatedCategory: 'general',
    relatedParameters: ['Blood Glucose', 'Potassium', 'Sodium', 'Hemoglobin', 'Platelet Count', 'White Blood Cell Count']
  },

  // 4. Reference Ranges are Universal Laws
  {
    id: 'myth-universal-reference-ranges',
    myth: 'Reference ranges printed on the report are identical for every laboratory, hospital, and person.',
    verdict: 'Myth',
    theFact: 'Reference ranges vary between different laboratories. Each clinical facility establishes its reference intervals based on its specific automated analyzer platforms, analytical reagents, assay methodologies, and local demographic reference cohorts.',
    why: 'Different laboratory technologies (such as chemiluminescence, spectrophotometry, flow cytometry, or high-performance liquid chromatography) have different analytical sensitivities and calibrations. Furthermore, normal physiological parameters shift across age groups, biological sex, pregnancy, and geographic altitudes. A test value considered borderline in one laboratory may fall squarely within the reference interval of another facility.',
    inThisReport: 'Always compare your results against the reference range printed specifically on your own report, rather than arbitrary numbers found in generic online tables.',
    textbookBasis: {
      textbookName: "Davidson's Principles and Practice of Medicine",
      edition: '24th Edition',
      chapterOrSection: 'Chapter 4: Biochemical and Haematological Values',
      citationDetail: 'Specifies that reference values depend on local laboratory methodology, demographic cohorts, and instrumentation, advising clinicians to refer to local laboratory standards.'
    },
    evidenceDiscipline: {
      textbookFact: 'Laboratory reference ranges depend strictly on the analytical method, instrument calibration, and healthy reference group sampled by the specific laboratory.',
      interpretation: 'Differences in numbers between two different test dates from two different labs frequently represent assay variation rather than sudden disease progression.',
      uncertainty: 'The specific analyzer calibration and reagent batch details of the testing facility cannot be determined from the printed summary sheet.'
    },
    relatedCategory: 'general',
    relatedParameters: ['Hemoglobin', 'TSH', 'ALT', 'AST', 'Alkaline Phosphatase', 'Platelet Count']
  },

  // 5. Hemoglobin / Anemia Myth: Low Hb is Always Diet/Iron
  {
    id: 'myth-low-hb-always-iron',
    myth: 'Low hemoglobin is always caused by not eating enough iron in your diet.',
    verdict: 'Partly True',
    theFact: 'While dietary iron deficiency is a frequent contributor to anemia, low hemoglobin is a non-specific hematological sign with dozens of distinct causes. These include genetic hemoglobin variants (such as Thalassemia minor/trait), occult gastrointestinal blood loss, chronic inflammatory conditions, vitamin B12 or folate deficiency, kidney disease, or hemolysis.',
    why: 'Red blood cell production (erythropoiesis) in bone marrow requires globin chains, heme, iron, erythropoietin, vitamin B12, and folate. In individuals with Thalassemia minor or anemia of chronic inflammation, body iron stores are often completely normal or even elevated. In such individuals, taking unprescribed high-dose iron supplements does not increase hemoglobin and can lead to toxic iron accumulation (hemosiderosis). A doctor evaluates red blood cell indices (MCV, MCH, RDW) and serum ferritin to determine the true mechanism.',
    inThisReport: 'If your hemoglobin or red cell count is low, dietary iron is only one possibility. Your doctor will review MCV (cell size) and MCH (cell color) to pinpoint the specific type of anemia.',
    textbookBasis: {
      textbookName: "Robbins & Cotran Pathologic Basis of Disease",
      edition: '10th Edition',
      chapterOrSection: 'Chapter 14: Red Blood Cell and Bleeding Disorders',
      citationDetail: 'Details the differential diagnosis of microcytic hypochromic anemias including iron deficiency, thalassemia syndromes, anemia of chronic disease, and sideroblastic anemias.'
    },
    evidenceDiscipline: {
      textbookFact: 'Microcytic hypochromic anemia has distinct etiologies: iron deficiency, globin chain synthesis defects (thalassemia), heme synthesis defects, and iron sequestration (chronic disease).',
      interpretation: 'Relying solely on iron foods or iron supplements without medical evaluation can delay discovery of the true cause (such as silent GI bleeding or thalassemia).',
      uncertainty: 'The patient\'s red cell morphology, serum ferritin, transferrin saturation, and hemoglobin electrophoresis are not present in an isolated CBC value.'
    },
    relatedCategory: 'hematology',
    relatedParameters: ['Hemoglobin (Hb)', 'MCV', 'MCH', 'RBC Count', 'Hematocrit (PCV)']
  },

  // 6. Platelets Myth: Papaya Leaf / Goat Milk Cures Low Platelets
  {
    id: 'myth-platelets-papaya-leaf',
    myth: 'Drinking papaya leaf juice or goat milk is a medically proven cure for low platelets (thrombocytopenia).',
    verdict: 'Myth',
    theFact: 'There is NO authorized MBBS textbook evidence demonstrating that papaya leaf extract or goat milk cures thrombocytopenia or replaces clinical medical care. Low platelets require professional physician monitoring.',
    why: 'Platelets are produced in bone marrow by megakaryocytes through thrombopoietin stimulation, a physiological cycle requiring 5 to 7 days. In acute viral fevers (such as dengue), platelet destruction and temporary bone marrow suppression cause counts to drop. Once the patient\'s immune system clears the viral illness, the bone marrow naturally resumes platelet output, leading to a spontaneous rebound. Many patients mistakenly attribute this natural physiological recovery to whatever home remedy was ingested on days 5 to 7. Depending on unverified remedies can dangerously delay medical intervention if platelet counts drop to critical hemorrhagic thresholds (< 20,000 /uL).',
    inThisReport: 'If your platelet count is below reference limits, adhere to close medical supervision, rest, and fluid balance rather than unverified home remedies.',
    textbookBasis: {
      textbookName: "Robbins & Cotran Pathologic Basis of Disease",
      edition: '10th Edition',
      chapterOrSection: 'Chapter 14: Diseases of White Blood Cells, Lymph Nodes, Spleen, and Thymus (Hemostasis and Platelet Kinetics)',
      citationDetail: 'Outlines megakaryocytopoiesis, thrombopoietin regulation, immune-mediated platelet destruction, and mechanisms of viral bone marrow suppression.'
    },
    evidenceDiscipline: {
      textbookFact: 'Platelet recovery after viral infections follows the natural timeline of viral clearance and bone marrow megakaryocyte recovery (Harrison\'s Ch. 98 & Robbins Ch. 14).',
      interpretation: 'Consuming raw botanical extracts carries potential risks of gastric irritation, nausea, or delaying urgent clinical monitoring for bleeding signs.',
      uncertainty: 'The underlying etiology of thrombocytopenia (viral suppression, immune ITP, drug effect, or splenic sequestration) cannot be determined without medical examination.'
    },
    relatedCategory: 'hematology',
    relatedParameters: ['Platelet Count', 'Platelet']
  },

  // 7. Cholesterol / Lipids Myth: Eliminate All Fats
  {
    id: 'myth-cholesterol-eliminate-all-fats',
    myth: 'To lower cholesterol, you must completely eliminate all fats and oils from your diet.',
    verdict: 'Myth',
    theFact: 'Eliminating all dietary fat is neither medically recommended nor biochemically effective for improving lipid panels. The body requires essential fatty acids (linoleic and alpha-linolenic acids) and dietary fats for the absorption of fat-soluble vitamins (A, D, E, K) and hormone production.',
    why: 'Approximately 70% to 80% of circulating cholesterol in the body is synthesized endogenously by the liver via the HMG-CoA reductase pathway, rather than absorbed directly from dietary cholesterol. When individuals adopt extreme fat-free diets, they typically substitute fat with excess refined carbohydrates and sugars. The liver metabolizes this excess glucose into triglycerides through de novo lipogenesis, raising triglycerides and lowering protective HDL cholesterol. Authorized biochemistry and preventive medicine textbooks recommend replacing saturated and trans-fats with monounsaturated/polyunsaturated fats and increasing soluble fiber (oats, legumes, dal).',
    inThisReport: 'If your total cholesterol, LDL, or triglycerides are elevated, focus on replacing refined carbohydrates and deep-fried items with soluble fiber (pulses, oats) and modest healthy oils, rather than extreme starvation.',
    textbookBasis: {
      textbookName: "Harper's Illustrated Biochemistry",
      edition: '32nd Edition',
      chapterOrSection: 'Chapter 25: Lipid Transport & Storage & Chapter 26: Cholesterol Synthesis, Transport, & Excretion',
      citationDetail: 'Describes hepatic HMG-CoA reductase regulation, lipoprotein assembly (VLDL, LDL, HDL), and the impact of refined carbohydrate intake on hepatic de novo lipogenesis.'
    },
    evidenceDiscipline: {
      textbookFact: 'Endogenous hepatic synthesis is the primary determinant of circulating cholesterol; essential polyunsaturated fatty acids cannot be synthesized by humans and must be supplied in food.',
      interpretation: 'A balanced diet rich in soluble fiber (which binds bile acids in the gut and promotes fecal excretion) is more effective than extreme zero-fat regimens.',
      uncertainty: 'Individual genetic predisposition (e.g. LDL-receptor polymorphisms) and physical activity levels cannot be assessed from a lipid numbers sheet alone.'
    },
    relatedCategory: 'lipid',
    relatedParameters: ['Total Cholesterol', 'LDL Cholesterol', 'HDL Cholesterol', 'Triglycerides']
  },

  // 8. Blood Sugar Myth: Fasting and Random Tests are Interchangeable
  {
    id: 'myth-fasting-random-interchangeable',
    myth: 'Fasting and non-fasting (random) blood sugar tests can be compared against the same reference range.',
    verdict: 'Myth',
    theFact: 'Fasting blood sugar and random or post-meal (postprandial) blood sugar represent completely distinct physiological states with separate, non-interchangeable reference intervals.',
    why: 'In the fasting state (requiring 8 to 12 hours of water-only fasting), blood glucose is maintained strictly by hepatic glycogenolysis and basal gluconeogenesis under basal insulin and glucagon balance (normal range 70-99 mg/dL). After eating, carbohydrate absorption into portal blood triggers acute phase insulin secretion from pancreatic beta cells, causing a transient physiological rise in blood sugar (up to 140 mg/dL is standard in non-diabetic individuals 2 hours after a meal). Evaluating a non-fasting blood draw against fasting standards leads to false suspicion of diabetes.',
    inThisReport: 'Verify whether your blood glucose was collected under true overnight fasting conditions (at least 8-10 hours). If blood was drawn after breakfast or tea, fasting cutoffs do not apply.',
    textbookBasis: {
      textbookName: 'Guyton & Hall Textbook of Medical Physiology',
      edition: '14th Edition',
      chapterOrSection: 'Chapter 79: Insulin, Glucagon, and Diabetes Mellitus',
      citationDetail: 'Outlines the physiological transition between fasting basal glucose homeostasis and postprandial glucose uptake mediated by acute insulin secretion.'
    },
    evidenceDiscipline: {
      textbookFact: 'Fasting glucose reflects basal hepatic glucose output; postprandial glucose reflects peripheral insulin-mediated glucose disposal; reference cutoffs are fundamentally different.',
      interpretation: 'Comparing a non-fasting blood draw to a fasting range (< 100 mg/dL) produces false-positive alarm.',
      uncertainty: 'The exact timing of the patient\'s last calorie intake prior to the blood draw cannot be verified from the lab result sheet.'
    },
    relatedCategory: 'diabetes',
    relatedParameters: ['Fasting Blood Glucose', 'Postprandial Blood Glucose', 'Random Blood Sugar', 'HbA1c']
  },

  // 9. Thyroid / TSH Myth: Single Test Confirms Permanent Thyroid Disease
  {
    id: 'myth-tsh-single-test-diagnosis',
    myth: 'A single high TSH result confirms you have permanent thyroid disease and must start lifelong thyroid pills.',
    verdict: 'Myth',
    theFact: 'A single isolated abnormal Thyroid Stimulating Hormone (TSH) level is NEVER sufficient to diagnose permanent primary hypothyroidism or initiate lifelong hormone replacement without follow-up verification.',
    why: 'TSH is released by anterior pituitary thyrotrophs in a pulsatile and diurnal pattern. It is highly sensitive to non-thyroidal systemic illness (euthyroid sick syndrome), recent viral infections (subacute thyroiditis), sleep deprivation, severe emotional or physical stress, and medications. In up to 30% to 50% of individuals with mildly elevated TSH (subclinical range 4.5-10 mIU/L), repeat testing 6 to 12 weeks later reveals spontaneous normalization of TSH without any medication. Standard MBBS medical guidelines require re-testing TSH alongside Free T4 and anti-TPO antibodies before establishing a clinical diagnosis.',
    inThisReport: 'If your TSH is elevated, discuss repeat testing with your doctor in 6 to 8 weeks alongside Free T4 before any conclusions are made about permanent thyroid dysfunction.',
    textbookBasis: {
      textbookName: "Harrison's Principles of Internal Medicine",
      edition: '21st Edition',
      chapterOrSection: 'Chapter 376: Disorders of the Thyroid Gland',
      citationDetail: 'Emphasizes that subclinical thyroid dysfunction requires confirmation with repeat laboratory testing several weeks apart because transient fluctuations are common.'
    },
    evidenceDiscipline: {
      textbookFact: 'TSH values fluctuate with circadian rhythm, viral recovery, and non-thyroidal illnesses; mild elevations frequently normalize spontaneously on repeat testing.',
      interpretation: 'A single high TSH value is a signal to re-evaluate the pituitary-thyroid axis, not an immediate prescription for lifelong levothyroxine.',
      uncertainty: 'The presence of autoimmune thyroid antibodies (anti-TPO) and clinical symptoms (cold intolerance, bradycardia, dry skin) cannot be known from a single lab paper.'
    },
    relatedCategory: 'thyroid',
    relatedParameters: ['TSH', 'Free T4', 'Free T3', 'Total T4']
  },

  // 10. Liver Enzymes (LFT) Myth: High ALT/AST Means Liver Failure
  {
    id: 'myth-lft-alt-ast-liver-failure',
    myth: 'Elevated liver enzymes (SGPT/ALT or SGOT/AST) mean you have permanent liver failure or cirrhosis.',
    verdict: 'Myth',
    theFact: 'Elevated transaminases (ALT/SGPT and AST/SGOT) reflect cellular membrane permeability or inflammation in liver cells, NOT liver failure. In fact, many patients with advanced cirrhosis have normal or only slightly elevated ALT and AST because viable hepatocytes have been replaced by scar tissue.',
    why: 'ALT and AST are intracellular enzymes involved in amino acid metabolism. When liver cells (hepatocytes) undergo temporary stress—from medications (like paracetamol or statins), strenuous muscular exercise, viral gastroenteritis, alcohol intake, or metabolic fatty liver—these enzymes leak into circulation. True liver synthetic function is evaluated by liver-manufactured proteins (Serum Albumin) and clotting factor synthesis (Prothrombin Time / INR). Mild transaminase elevations are commonly benign, temporary, and reversible with lifestyle adjustments.',
    inThisReport: 'If ALT or AST is elevated in your report, your doctor will check whether albumin, bilirubin, and coagulation markers are preserved to evaluate true liver function.',
    textbookBasis: {
      textbookName: "Harrison's Principles of Internal Medicine",
      edition: '21st Edition',
      chapterOrSection: 'Chapter 330: Approach to the Patient with Liver Disease',
      citationDetail: 'Distinguishes between markers of hepatocellular injury (aminotransferases ALT/AST) and true indices of hepatic synthetic function (albumin, prothrombin time).'
    },
    evidenceDiscipline: {
      textbookFact: 'Transaminases are markers of hepatocyte integrity/leakage, whereas albumin and prothrombin time measure the liver\'s synthetic capacity.',
      interpretation: 'Elevations in ALT and AST are common after vigorous exercise, intercurrent infections, or mild steatosis, and do not equate to irreversible organ failure.',
      uncertainty: 'Determining the specific cause of elevated transaminases requires clinical history, medication review, viral hepatitis serology, and abdominal ultrasound.'
    },
    relatedCategory: 'lft',
    relatedParameters: ['ALT (SGPT)', 'AST (SGOT)', 'Alkaline Phosphatase', 'Bilirubin', 'Albumin']
  },

  // 11. Kidney / Urine Myth: Trace Urine Protein Means Kidney Failure
  {
    id: 'myth-trace-urine-protein-kidney-failure',
    myth: 'Finding a trace or +1 of protein in a routine urine test means your kidneys are failing.',
    verdict: 'Context-Dependent',
    theFact: 'Transient benign proteinuria is very common in healthy individuals following vigorous physical exercise, fever, prolonged standing (orthostatic proteinuria), dehydration, or emotional stress, without any intrinsic renal damage.',
    why: 'The glomerular filtration barrier normally filters small quantities of low-molecular-weight proteins that are largely reabsorbed by renal proximal tubule cells. Increased glomerular capillary pressure during exercise, high cardiac output, or fever temporarily increases protein filtration beyond proximal tubule reabsorption capacity. Medical textbooks classify proteinuria as transient (functional), orthostatic, or persistent. True renal disease requires persistent proteinuria documented on multiple repeat morning samples or quantitative testing (urine albumin-to-creatinine ratio).',
    inThisReport: 'A trace or +1 protein finding on a routine dipstick should be repeated on a fresh first-morning urine sample when well-hydrated before concluding that any renal issue exists.',
    textbookBasis: {
      textbookName: "Harrison's Principles of Internal Medicine",
      edition: '21st Edition',
      chapterOrSection: 'Chapter 308: Azotemia and Urinary Abnormalities',
      citationDetail: 'Covers the pathophysiology of transient, orthostatic, and persistent proteinuria, highlighting that functional benign proteinuria occurs in up to 5% of healthy individuals.'
    },
    evidenceDiscipline: {
      textbookFact: 'Transient benign proteinuria occurs in healthy adults with fever, exercise, or upright posture, and carries a benign long-term prognosis without renal structural damage.',
      interpretation: 'An isolated urine protein finding on a random sample should never be interpreted as established chronic kidney disease.',
      uncertainty: 'A single urinalysis cannot differentiate transient functional proteinuria from persistent glomerular disease without a repeat first-morning specimen.'
    },
    relatedCategory: 'urine',
    relatedParameters: ['Urine Protein', 'Urine Albumin', 'Creatinine', 'BUN']
  },

  // 12. Semen Analysis Myth: Low Count Means Complete Infertility
  {
    id: 'myth-semen-low-count-complete-infertility',
    myth: 'A semen parameter below the laboratory cutoff proves that a man is completely infertile and cannot father children.',
    verdict: 'Myth',
    theFact: 'WHO reference values are lower reference limits (the 5th percentile) derived from fertile men whose partners achieved pregnancy within 12 months. Having a parameter below this threshold indicates reduced statistical probability of spontaneous conception over time, NOT absolute sterility.',
    why: 'Human reproduction is a multifactorial partnership depending on both partners\' reproductive physiology. Furthermore, human semen parameters exhibit immense natural biological fluctuation across days, weeks, and seasons (reflecting the 74-day spermatogenesis cycle). A single sample can be temporarily depressed by recent febrile illness, heat exposure, stress, or inadequate abstinence period (fewer than 2 or more than 7 days). The WHO manual strictly dictates that fertility potential cannot be determined from a single ejaculate; at least two to three separate semen evaluations spaced 2 to 4 weeks apart are mandatory before establishing clinical baselines.',
    inThisReport: 'If any semen parameter is below the reference value, it indicates a statistical need for repeat testing and clinical consultation, not a diagnosis of permanent sterility.',
    textbookBasis: {
      textbookName: 'WHO Laboratory Manual for the Examination and Processing of Human Semen',
      edition: '6th Edition',
      chapterOrSection: 'Chapter 1: Standard Procedures & Chapter 2: Reference Values and Their Interpretation',
      citationDetail: 'States that reference intervals represent the 5th percentile distribution from fertile populations and must never be interpreted as clear boundaries between fertile and infertile states.'
    },
    evidenceDiscipline: {
      textbookFact: 'WHO semen reference limits represent the 5th centile of fertile cohorts; men with counts below reference limits regularly achieve spontaneous pregnancies.',
      interpretation: 'A single semen analysis cannot establish male sterility (except in repeatedly confirmed azoospermia with zero spermatozoa).',
      uncertainty: 'Partner fertility factors, ovulation timing, and female reproductive health are unknown from a semen report alone.'
    },
    relatedCategory: 'semen',
    relatedParameters: ['Sperm Count', 'Total Motility', 'Progressive Motility', 'Normal Forms (Morphology)', 'Volume']
  }
];

/**
 * Intelligent analyzer that identifies and customizes misconceptions
 * specifically relevant to the user's uploaded lab report.
 */
export function getRelevantMythsForReport(
  findings: LabFinding[],
  reportTitle?: string
): MedicalMyth[] {
  if (!findings || findings.length === 0) {
    // Return all general lab testing myths with friendly default text
    return MASTER_MYTH_DATABASE.map(myth => ({
      ...myth,
      isApplicableToReport: false,
      inThisReport: 'Upload or select a laboratory report above to see how this misconception specifically applies to your numbers.'
    }));
  }

  const findingNames = findings.map(f => f.testName.toLowerCase());
  const categories = new Set(findings.map(f => f.category));
  const abnormalFindings = findings.filter(f => f.isAbnormal);

  const matchedMyths: MedicalMyth[] = [];

  MASTER_MYTH_DATABASE.forEach(baseMyth => {
    let isApplicable = false;
    let customInThisReport = baseMyth.inThisReport;

    // Check parameter matches
    const relatedParam = baseMyth.relatedParameters?.find(rp => 
      findingNames.some(fn => fn.includes(rp.toLowerCase()) || rp.toLowerCase().includes(fn))
    );

    // Check category match
    const categoryMatches = baseMyth.relatedCategory && (
      baseMyth.relatedCategory === 'general' || categories.has(baseMyth.relatedCategory)
    );

    if (relatedParam || categoryMatches) {
      isApplicable = true;
      
      // Customize "IN THIS LAB REPORT" section based on actual values
      if (baseMyth.id === 'myth-abnormal-equals-disease') {
        if (abnormalFindings.length > 0) {
          const names = abnormalFindings.slice(0, 3).map(f => `${f.testName} (${f.userValue} ${f.unit})`).join(', ');
          customInThisReport = `In your report, ${names} ${abnormalFindings.length > 1 ? 'are' : 'is'} flagged outside reference ranges. This misconception reminds us that statistical variation, sleep, hydration, and acute stress must be evaluated by your physician rather than jumping to a definitive disease conclusion.`;
        } else {
          customInThisReport = `All your tested parameters in this report fall within the reference intervals. Even so, this principle explains how laboratories statistically establish these normal boundary lines.`;
        }
      } else if (baseMyth.id === 'myth-normal-rules-out-disease') {
        const normalCount = findings.filter(f => !f.isAbnormal).length;
        customInThisReport = `In your report, ${normalCount} out of ${findings.length} tests are within standard reference ranges. This is reassuring, but your doctor will still consider your daily symptoms, medical history, and family health.`;
      } else if (baseMyth.id === 'myth-low-hb-always-iron') {
        const hbFinding = findings.find(f => f.testName.toLowerCase().includes('hemo') || f.testName.toLowerCase().includes('hb'));
        if (hbFinding) {
          customInThisReport = `Your hemoglobin is reported as ${hbFinding.userValue} ${hbFinding.unit} (Reference Range: ${hbFinding.referenceRange}). If low, this misconception highlights why your doctor reviews red cell size (MCV) and iron stores before assuming simple dietary iron deficiency.`;
        }
      } else if (baseMyth.id === 'myth-platelets-papaya-leaf') {
        const platFinding = findings.find(f => f.testName.toLowerCase().includes('platelet'));
        if (platFinding) {
          customInThisReport = `Your platelet count is reported as ${platFinding.userValue} ${platFinding.unit} (Reference Range: ${platFinding.referenceRange}). Medical textbooks stress that platelets require clinical oversight, not unproven botanical remedies.`;
        }
      } else if (baseMyth.id === 'myth-cholesterol-eliminate-all-fats') {
        const cholFinding = findings.find(f => f.testName.toLowerCase().includes('cholesterol') || f.testName.toLowerCase().includes('lipid'));
        if (cholFinding) {
          customInThisReport = `In your lipid panel (${cholFinding.testName}: ${cholFinding.userValue} ${cholFinding.unit}), medical biochemistry confirms that replacing refined carbohydrates with soluble fiber and healthy fats is far more effective than an extreme zero-fat diet.`;
        }
      } else if (baseMyth.id === 'myth-fasting-random-interchangeable') {
        const glucFinding = findings.find(f => f.testName.toLowerCase().includes('glucose') || f.testName.toLowerCase().includes('sugar'));
        if (glucFinding) {
          customInThisReport = `Your blood glucose is reported as ${glucFinding.userValue} ${glucFinding.unit}. It is essential that this number is compared strictly against fasting or postprandial criteria based on when your blood was sampled.`;
        }
      } else if (baseMyth.id === 'myth-tsh-single-test-diagnosis') {
        const tshFinding = findings.find(f => f.testName.toLowerCase().includes('tsh') || f.testName.toLowerCase().includes('thyroid'));
        if (tshFinding) {
          customInThisReport = `Your TSH is reported as ${tshFinding.userValue} ${tshFinding.unit}. As emphasized in Harrison's Internal Medicine, a single TSH test should always be re-evaluated 6-8 weeks later alongside Free T4 before concluding permanent thyroid disease.`;
        }
      } else if (baseMyth.id === 'myth-lft-alt-ast-liver-failure') {
        const lftFinding = findings.find(f => f.testName.toLowerCase().includes('alt') || f.testName.toLowerCase().includes('ast') || f.testName.toLowerCase().includes('sgpt'));
        if (lftFinding) {
          customInThisReport = `Your report includes liver enzymes (${lftFinding.testName}: ${lftFinding.userValue} ${lftFinding.unit}). Mild elevations represent cell membrane leakage or temporary inflammation, not irreversible organ failure.`;
        }
      } else if (baseMyth.id === 'myth-trace-urine-protein-kidney-failure') {
        const urineFinding = findings.find(f => f.testName.toLowerCase().includes('protein') || f.testName.toLowerCase().includes('albumin') || f.category === 'urine');
        if (urineFinding) {
          customInThisReport = `Your urinalysis includes ${urineFinding.testName} (${urineFinding.userValue}). Trace protein is frequently benign and temporary after exercise or fever, requiring a repeat first-morning sample to verify.`;
        }
      } else if (baseMyth.id === 'myth-semen-low-count-complete-infertility') {
        const semenFinding = findings.find(f => f.category === 'semen' || f.testName.toLowerCase().includes('sperm'));
        if (semenFinding) {
          customInThisReport = `In your semen analysis (${semenFinding.testName}: ${semenFinding.userValue} ${semenFinding.unit}), WHO guidelines dictate that values below statistical percentiles do not mean absolute sterility and require repeat testing.`;
        }
      }

      matchedMyths.push({
        ...baseMyth,
        isApplicableToReport: isApplicable,
        inThisReport: customInThisReport
      });
    }
  });

  // Sort so applicable myths appear first, then general lab myths
  return matchedMyths.sort((a, b) => {
    if (a.isApplicableToReport && !b.isApplicableToReport) return -1;
    if (!a.isApplicableToReport && b.isApplicableToReport) return 1;
    return 0;
  });
}
