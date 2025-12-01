const getRiskColor = (risk) => {
  switch (risk) {
    case "Low":
      return "bg-green-100 text-green-800 border-green-300";
    case "Medium":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "High":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};
const getScoreColor = (score) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
};
const downloadPDF = (result) => {
  const pdfContent = `
DEMENTIA TEST RESULT REPORT
==========================================

PATIENT INFORMATION
------------------------------------------
Name:          ${result.patientName}
Age:           ${result.age} years
Gender:        ${result.gender}
Test Date:     ${result.testDate}

ASSESSMENT RESULTS
------------------------------------------
Cognitive Score:       ${result.score}/100
Risk Level:            ${result.riskLevel}

Memory Issues:         ${result.memoryIssues}
Confusion Level:       ${result.confusionLevel}
Orientation Issues:    ${result.orientationIssues}

AI ANALYSIS & RECOMMENDATIONS
------------------------------------------
${result.aiAnalysis}

NEXT STEPS
------------------------------------------
• Schedule follow-up appointment with healthcare provider
• Share this report with your neurologist
• Continue monitoring cognitive symptoms
• Maintain regular mental and physical exercise

==========================================
Report Generated: ${new Date().toLocaleString()}
This is a computer-generated report for 
screening purposes only. Please consult 
with a qualified healthcare professional 
for proper diagnosis and treatment.
==========================================
    `.trim();

  const blob = new Blob([pdfContent], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Dementia-Test-Report-${result?.patientName?.replace(/\s+/g, "-")}-${result.testDate}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);

  console.log("PDF Download initiated for:", {
    patient: result.patientName,
    testId: result.id,
    date: result.testDate,
  });
};

export { getRiskColor, getScoreColor, downloadPDF };
