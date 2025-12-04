// ========================
// UTILS: utils/pdfGenerator.js
// ========================
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ===== Theme Configuration =====
const theme = {
  primary: [15, 41, 84], // Dark blue
  secondary: [33, 133, 208], // Blue
  success: [16, 185, 129], // Green
  danger: [239, 68, 68], // Red
  warning: [245, 158, 11], // Orange
  gray: [107, 114, 128], // Gray
  lightGray: [243, 244, 246], // Light gray
  white: [255, 255, 255]
};

// ===== Helper: Smart Text Wrapping =====
const addTextWithPageBreak = (doc, text, x, y, maxWidth, pageHeight, margin = 20, lineHeight = 6) => {
  const lines = doc.splitTextToSize(text, maxWidth);
  lines.forEach(line => {
    if (y + lineHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
};

// ===== Helper: Add Smart Text =====
const addSmartText = (doc, text, x, y, maxWidth, maxHeight, lineHeight = 7, margin = 5) => {
  const pageHeight = doc.internal.pageSize.getHeight();
  const lines = doc.splitTextToSize(text, maxWidth);
  const neededHeight = lines.length * lineHeight + margin;
  
  if (y + neededHeight > maxHeight - margin) {
    return { y: y, fits: false, lines: lines };
  }
  
  lines.forEach(line => {
    doc.text(line, x, y);
    y += lineHeight;
  });
  
  return { y: y + margin, fits: true, lines: lines };
};

// ========================
// 1. Original Function (Basic Dementia PDF)
// ========================
export const generateDementiaPDF = (dementiaResult, inputData, patientName = "Patient") => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const leftMargin = 15;
    const rightMargin = 15;
    const contentWidth = pageWidth - leftMargin - rightMargin;
    let y = 20;

    // ===== HEADER =====
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, pageWidth, 35, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont(undefined, "bold");
    doc.text("Dementia Analysis Report", pageWidth / 2, 22, { align: "center" });
    y = 45;

    // ===== PATIENT INFO =====
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Patient Information", leftMargin, y);
    y += 8;

    const patientInfo = [
      ["Patient Name:", patientName],
      ["Date of Analysis:", new Date().toLocaleDateString()],
      ["Time:", new Date().toLocaleTimeString()],
    ];

    autoTable(doc, {
      startY: y,
      head: [],
      body: patientInfo,
      theme: "plain",
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 45 }, 1: { cellWidth: "auto" } },
      margin: { left: leftMargin, right: rightMargin },
    });

    y = doc.lastAutoTable.finalY + 12;

    // ===== INPUT DATA TABLE =====
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Clinical Input Data", leftMargin, y);
    y += 3;

    const inputTableData = [
      ["Gender", inputData.Gender],
      ["Age", inputData.Age.toString()],
      ["Education (years)", inputData.EDUC.toString()],
      ["MMSE Score", inputData.MMSE.toString()],
      ["CDR", inputData.CDR.toString()],
      ["eTIV", inputData.eTIV.toString()],
      ["nWBV", inputData.nWBV.toString()],
      ["ASF", inputData.ASF.toString()],
    ];

    autoTable(doc, {
      startY: y,
      head: [],
      body: inputTableData,
      theme: "plain",
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 45 }, 1: { cellWidth: "auto" } },
      margin: { left: leftMargin, right: rightMargin },
    });

    y = doc.lastAutoTable.finalY + 12;

    // ===== DIAGNOSIS SECTION =====
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Diagnosis", leftMargin, y);
    y += 8;
    doc.setFontSize(11);

    const diagnosisColor = dementiaResult.has_dementia ? [220, 38, 38] : [34, 197, 94];
    doc.setTextColor(...diagnosisColor);
    doc.setFont(undefined, "bold");
    doc.text(`Status: ${dementiaResult.has_dementia ? "Dementia Detected" : "No Dementia Detected"}`, leftMargin, y);

    y += 8;
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, "bold");
    doc.text(`Severity: ${dementiaResult.dementia_severity}`, leftMargin, y);
    y += 12;

    // ===== SUMMARY =====
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Summary", leftMargin, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    y = addTextWithPageBreak(doc, dementiaResult.short_summary, leftMargin, y, contentWidth, pageHeight);

    // ===== DETAILED ANALYSIS =====
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Detailed Analysis", leftMargin, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    y = addTextWithPageBreak(doc, dementiaResult.diagnosis_reason, leftMargin, y, contentWidth, pageHeight);

    // ===== PREVENTION/TREATMENT =====
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Prevention & Treatment Recommendations", leftMargin, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    y = addTextWithPageBreak(doc, dementiaResult.prevention_or_treatment, leftMargin, y, contentWidth, pageHeight);

    // ===== FOOTER =====
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: "center" });
      const footerText = doc.splitTextToSize(
        "This report is generated for medical reference only. Please consult with a healthcare professional.",
        contentWidth
      );
      doc.text(footerText, pageWidth / 2, pageHeight - 5, { align: "center" });
    }

    // ===== SAVE PDF =====
    const fileName = `Dementia_Analysis_${patientName.replace(/\s+/g, "_")}_${new Date().getTime()}.pdf`;
    doc.save(fileName);

    return { success: true, fileName };
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return { success: false, error: error.message };
  }
};

// ========================
// 2. Detailed Dementia PDF (Full Markdown Style)
// ========================
export const generateDetailedDementiaPDF = (dementiaResult, patientName = "Patient") => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let y = 50;

    // ===== HEADER =====
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Comprehensive Dementia Report", pageWidth / 2, 25, { align: "center" });

    // ===== REPORT INFO TABLE =====
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Report Information", margin, y);
    y += 10;

    autoTable(doc, {
      startY: y,
      head: [],
      body: [
        ["Date", new Date().toLocaleDateString()],
        ["Time", new Date().toLocaleTimeString()],
        ["Patient", patientName],
      ],
      theme: "plain",
      styles: { fontSize: 10 },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
      margin: { left: margin },
    });

    y = doc.lastAutoTable.finalY + 20;

    // ===== FULL MARKDOWN REPORT =====
    const report = dementiaResult.fullReport || dementiaResult.results?.full_markdown_report;
    if (report) {
      const lines = report.split("\n");

      lines.forEach(line => {
        if (y > pageHeight - 40) {
          doc.addPage();
          y = margin;
        }

        if (line.startsWith("# ")) {
          doc.setFontSize(20);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(79, 70, 229);
          y = addTextWithPageBreak(doc, line.replace("# ", ""), margin, y, pageWidth - margin * 2, pageHeight);
        } else if (line.startsWith("## ")) {
          doc.setFontSize(16);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(0);
          y = addTextWithPageBreak(doc, line.replace("## ", ""), margin, y, pageWidth - margin * 2, pageHeight);
        } else if (line.startsWith("### ")) {
          doc.setFontSize(13);
          doc.setFont("helvetica", "bold");
          y = addTextWithPageBreak(doc, line.replace("### ", ""), margin, y, pageWidth - margin * 2, pageHeight);
        } else if ((line.startsWith("- ") || line.startsWith("* ")) && line.trim()) {
          const text = "• " + line.replace(/^[-*] /, "").trim();
          y = addTextWithPageBreak(doc, text, margin + 5, y, pageWidth - margin * 2 - 10, pageHeight);
        } else if (line.trim() === "") {
          y += 7;
        } else if (!line.includes("|")) {
          y = addTextWithPageBreak(doc, line.trim(), margin, y, pageWidth - margin * 2, pageHeight);
        }
      });
    }

    // ===== FOOTER =====
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: "center" });
      doc.text(
        "For medical reference only • Consult a healthcare professional",
        pageWidth / 2,
        pageHeight - 5,
        { align: "center" }
      );
    }

    const fileName = `Detailed_Dementia_Report_${patientName.replace(/\s+/g, "_")}_${Date.now()}.pdf`;
    doc.save(fileName);

    return { success: true };
  } catch (error) {
    console.error("Detailed PDF Error:", error);
    return { success: false, error: error.message };
  }
};

// ========================
// 3. Professional Dementia PDF (Single Page Optimized)
// ========================
export const generateProfessionalDementiaPDF = (dementiaResult, inputData, patientName = "Patient") => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const leftMargin = 15;
    const rightMargin = 15;
    const contentWidth = pageWidth - leftMargin - rightMargin;
    let y = 20;

    // ===== PROFESSIONAL HEADER =====
    doc.setFillColor(...theme.primary);
    doc.rect(0, 0, pageWidth, 40, "F");
    
    // Logo/Institution Text
    doc.setTextColor(...theme.white);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("NEUROLOGICAL ASSESSMENT CENTER", leftMargin, 15);
    
    // Main Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Dementia Diagnostic Report", pageWidth / 2, 25, { align: "center" });
    
    // Subtitle
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Confidential Medical Document", pageWidth / 2, 32, { align: "center" });
    
    y = 45;

    // ===== PATIENT INFO (Compact Grid) =====
    doc.setFillColor(...theme.lightGray);
    doc.rect(leftMargin, y - 5, contentWidth, 30, "F");
    
    doc.setTextColor(...theme.primary);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("PATIENT INFORMATION", leftMargin + 5, y);
    y += 8;
    
    const patientGridData = [
      ["Patient Name:", patientName || "Not Provided"],
      ["Date:", new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })],
      ["Time:", new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })],
      ["Report ID:", `DMR-${Date.now().toString().slice(-8)}`]
    ];
    
    autoTable(doc, {
      startY: y,
      head: [],
      body: patientGridData,
      theme: "grid",
      styles: { 
        fontSize: 9, 
        cellPadding: 3,
        overflow: 'linebreak',
        cellWidth: 'wrap'
      },
      columnStyles: { 
        0: { 
          fontStyle: "bold", 
          cellWidth: contentWidth * 0.25,
          fillColor: theme.lightGray 
        }, 
        1: { 
          cellWidth: contentWidth * 0.25 
        },
        2: { 
          fontStyle: "bold", 
          cellWidth: contentWidth * 0.25,
          fillColor: theme.lightGray 
        },
        3: { 
          cellWidth: contentWidth * 0.25 
        }
      },
      margin: { left: leftMargin + 5, right: rightMargin },
      tableWidth: contentWidth - 10
    });

    y = doc.lastAutoTable.finalY + 15;

    // ===== CLINICAL DATA (Two-column Grid for Efficiency) =====
    doc.setTextColor(...theme.primary);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("CLINICAL PARAMETERS", leftMargin, y);
    y += 8;
    
    const clinicalData = [
      ["Gender", inputData.Gender || "N/A"],
      ["Age", `${inputData.Age || "N/A"} years`],
      ["Education", `${inputData.EDUC || "N/A"} years`],
      ["MMSE Score", inputData.MMSE || "N/A"],
      ["CDR", inputData.CDR || "N/A"],
      ["eTIV", inputData.eTIV ? `${inputData.eTIV} cm³` : "N/A"],
      ["nWBV", inputData.nWBV ? `${inputData.nWBV}%` : "N/A"],
      ["ASF", inputData.ASF || "N/A"]
    ];
    
    const clinicalGrid = [];
    for (let i = 0; i < clinicalData.length; i += 2) {
      const row = [];
      row.push(clinicalData[i]);
      if (i + 1 < clinicalData.length) {
        row.push(clinicalData[i + 1]);
      } else {
        row.push(["", ""]);
      }
      clinicalGrid.push(row);
    }
    
    const tableBody = clinicalGrid.map(row => [
      { content: row[0][0], styles: { fontStyle: 'bold' } },
      row[0][1],
      { content: row[1][0], styles: { fontStyle: 'bold' } },
      row[1][1]
    ]);
    
    autoTable(doc, {
      startY: y,
      head: [],
      body: tableBody,
      theme: "grid",
      styles: { 
        fontSize: 9, 
        cellPadding: 4,
        overflow: 'ellipsize',
        lineWidth: 0.1
      },
      columnStyles: {
        0: { 
          cellWidth: contentWidth * 0.15,
          fillColor: theme.lightGray
        },
        1: { cellWidth: contentWidth * 0.18 },
        2: { 
          cellWidth: contentWidth * 0.15,
          fillColor: theme.lightGray
        },
        3: { cellWidth: contentWidth * 0.18 }
      },
      margin: { left: leftMargin, right: rightMargin },
      tableWidth: contentWidth
    });

    y = doc.lastAutoTable.finalY + 15;

    // ===== DIAGNOSIS BADGE =====
    const hasDementia = dementiaResult.has_dementia || false;
    const severity = dementiaResult.dementia_severity || "Not Specified";
    
    doc.setTextColor(...theme.primary);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("DIAGNOSTIC FINDINGS", leftMargin, y);
    y += 8;
    
    doc.setDrawColor(...(hasDementia ? theme.danger : theme.success));
    doc.setFillColor(...(hasDementia ? [254, 226, 226] : [220, 252, 231]));
    doc.setLineWidth(0.5);
    doc.rect(leftMargin, y, contentWidth, 25, "FD");
    
    doc.setTextColor(hasDementia ? theme.danger : theme.success);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(
      `● ${hasDementia ? "DEMENTIA DETECTED" : "NO DEMENTIA DETECTED"}`,
      leftMargin + 5,
      y + 8
    );
    
    doc.setTextColor(...theme.primary);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Severity Level: ${severity}`, leftMargin + 5, y + 16);
    
    doc.setFontSize(9);
    doc.setTextColor(...theme.gray);
    doc.text(
      `Confidence: ${dementiaResult.confidence || "High"}`,
      leftMargin + contentWidth - 60,
      y + 16
    );
    
    y += 30;

    // ===== KEY SUMMARY =====
    doc.setTextColor(...theme.primary);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("KEY SUMMARY", leftMargin, y);
    y += 8;
    
    const maxSummaryLength = 300;
    const summary = dementiaResult.short_summary || dementiaResult.summary || "";
    const truncatedSummary = summary.length > maxSummaryLength 
      ? summary.substring(0, maxSummaryLength) + "..." 
      : summary;
    
    doc.setFontSize(9);
    doc.setTextColor(...theme.gray);
    doc.setFont("helvetica", "normal");
    
    const summaryResult = addSmartText(
      doc,
      truncatedSummary,
      leftMargin,
      y,
      contentWidth,
      pageHeight - 30,
      6
    );
    
    y = summaryResult.y + 5;

    // ===== RECOMMENDATIONS =====
    if (dementiaResult.prevention_or_treatment && y < pageHeight - 40) {
      doc.setTextColor(...theme.primary);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("RECOMMENDATIONS", leftMargin, y);
      y += 8;
      
      const recommendations = (dementiaResult.prevention_or_treatment || "")
        .split('.')
        .filter(rec => rec.trim().length > 10)
        .slice(0, 3);
      
      doc.setFontSize(9);
      doc.setTextColor(...theme.gray);
      
      recommendations.forEach((rec, index) => {
        if (y < pageHeight - 30) {
          doc.setFont("helvetica", "bold");
          doc.text("•", leftMargin, y);
          doc.setFont("helvetica", "normal");
          
          const lineResult = addSmartText(
            doc,
            rec.trim(),
            leftMargin + 3,
            y,
            contentWidth - 3,
            pageHeight - 30,
            6
          );
          y = lineResult.y + 4;
        }
      });
    }

    // ===== PROFESSIONAL FOOTER =====
    doc.setDrawColor(...theme.lightGray);
    doc.setLineWidth(0.5);
    doc.line(leftMargin, pageHeight - 20, pageWidth - leftMargin, pageHeight - 20);
    
    doc.setFontSize(8);
    doc.setTextColor(...theme.gray);
    doc.setFont("helvetica", "normal");
    
    doc.text(`Generated: ${new Date().toLocaleString()}`, leftMargin, pageHeight - 15);
    
    doc.text(
      "Confidential • For Medical Use Only • Consult Healthcare Professional",
      pageWidth / 2,
      pageHeight - 15,
      { align: "center" }
    );
    
    doc.text(
      `Page 1 of 1`,
      pageWidth - leftMargin,
      pageHeight - 15,
      { align: "right" }
    );

    // ===== WATERMARK =====
    doc.setFontSize(40);
    doc.setTextColor(240, 240, 240);
    doc.setFont("helvetica", "bold");
    doc.setGState(new doc.GState({ opacity: 0.1 }));
    doc.text(
      "CONFIDENTIAL",
      pageWidth / 2,
      pageHeight / 2,
      { align: "center", angle: 45 }
    );
    doc.setGState(new doc.GState({ opacity: 1 }));

    // ===== SAVE PDF =====
    const fileName = `Dementia_Report_${patientName.replace(/\s+/g, "_")}_${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}.pdf`;
    doc.save(fileName);

    return { 
      success: true, 
      fileName,
      pageCount: 1,
      message: "Professional single-page report generated successfully"
    };
  } catch (error) {
    console.error("Professional PDF Generation Error:", error);
    return { 
      success: false, 
      error: error.message,
      fallback: "Consider using basic PDF generator"
    };
  }
};

// ========================
// 4. Comprehensive Professional PDF (Multi-page)
// ========================
export const generateDetailedProfessionalPDF = (dementiaResult, inputData, patientName = "Patient") => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let currentY = margin;

    // ===== COVER PAGE =====
    doc.setFillColor(...theme.primary);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    
    doc.setFillColor(...theme.white);
    doc.rect(margin, 60, pageWidth - (margin * 2), 120, "F");
    
    doc.setTextColor(...theme.primary);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text(
      "Comprehensive",
      pageWidth / 2,
      90,
      { align: "center" }
    );
    doc.text(
      "Dementia Analysis",
      pageWidth / 2,
      105,
      { align: "center" }
    );
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Detailed Diagnostic Report",
      pageWidth / 2,
      120,
      { align: "center" }
    );
    
    doc.setFontSize(12);
    doc.text(`Patient: ${patientName}`, pageWidth / 2, 140, { align: "center" });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, 150, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(...theme.danger);
    doc.setFont("helvetica", "bold");
    doc.text("CONFIDENTIAL MEDICAL DOCUMENT", pageWidth / 2, 170, { align: "center" });
    
    doc.addPage();

    // ===== TABLE OF CONTENTS =====
    currentY = margin;
    doc.setTextColor(...theme.primary);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Table of Contents", margin, currentY);
    
    currentY += 20;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    const sections = [
      "1. Executive Summary",
      "2. Patient Demographics",
      "3. Clinical Assessment",
      "4. Diagnostic Findings",
      "5. Risk Analysis",
      "6. Treatment Recommendations",
      "7. Monitoring Plan",
      "8. Appendices"
    ];
    
    sections.forEach(section => {
      if (currentY > pageHeight - 30) {
        doc.addPage();
        currentY = margin;
      }
      
      const isBold = section.includes("Executive") || section.includes("Appendices");
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.setTextColor(isBold ? theme.primary : theme.gray);
      doc.text(section, margin + 5, currentY);
      
      const pageNum = sections.indexOf(section) + 2;
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.1);
      doc.line(margin + 70, currentY - 2, pageWidth - margin - 20, currentY - 2);
      
      doc.setTextColor(theme.gray);
      doc.text(pageNum.toString(), pageWidth - margin - 5, currentY, { align: "right" });
      
      currentY += 8;
    });

    // ===== EXECUTIVE SUMMARY PAGE =====
    doc.addPage();
    currentY = margin;
    
    doc.setTextColor(...theme.primary);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("1. Executive Summary", margin, currentY);
    
    currentY += 15;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    
    const fullSummary = dementiaResult.diagnosis_reason || dementiaResult.summary || "";
    const summaryLines = doc.splitTextToSize(fullSummary, pageWidth - (margin * 2));
    
    summaryLines.forEach(line => {
      if (currentY > pageHeight - 30) {
        doc.addPage();
        currentY = margin;
      }
      doc.text(line, margin, currentY);
      currentY += 6;
    });

    // ===== PATIENT DEMOGRAPHICS PAGE =====
    doc.addPage();
    currentY = margin;
    
    doc.setTextColor(...theme.primary);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("2. Patient Demographics", margin, currentY);
    
    currentY += 15;
    
    const demographicData = [
      ["Category", "Details", "Clinical Notes"],
      ["Personal Info", `Name: ${patientName}\nGender: ${inputData.Gender}\nAge: ${inputData.Age}`, "Baseline demographics"],
      ["Education", `${inputData.EDUC} years of formal education`, "Education level impacts cognitive reserve"],
      ["Assessment Date", new Date().toLocaleDateString(), "Date of evaluation"]
    ];
    
    autoTable(doc, {
      startY: currentY,
      head: [demographicData[0]],
      body: demographicData.slice(1),
      theme: "grid",
      styles: { 
        fontSize: 9, 
        cellPadding: 4,
        overflow: 'linebreak'
      },
      headStyles: {
        fillColor: theme.primary,
        textColor: theme.white,
        fontSize: 10
      },
      alternateRowStyles: {
        fillColor: theme.lightGray
      },
      margin: { left: margin, right: margin }
    });

    // ===== CLINICAL ASSESSMENT PAGE =====
    doc.addPage();
    currentY = margin;
    
    doc.setTextColor(...theme.primary);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("3. Clinical Assessment", margin, currentY);
    
    currentY += 15;
    
    const clinicalAssessmentData = [
      ["Parameter", "Value", "Normal Range", "Interpretation"],
      ["MMSE Score", inputData.MMSE || "N/A", "24-30", inputData.MMSE >= 24 ? "Normal" : "Impaired"],
      ["CDR", inputData.CDR || "N/A", "0", inputData.CDR == 0 ? "No dementia" : "Dementia indicated"],
      ["nWBV", inputData.nWBV ? `${inputData.nWBV}%` : "N/A", ">75%", inputData.nWBV > 75 ? "Normal" : "Reduced"],
      ["eTIV", inputData.eTIV ? `${inputData.eTIV} cm³` : "N/A", "Individual", "Reference measurement"],
      ["ASF", inputData.ASF || "N/A", "~1.0", "Atlas scaling factor"]
    ];
    
    autoTable(doc, {
      startY: currentY,
      head: [clinicalAssessmentData[0]],
      body: clinicalAssessmentData.slice(1),
      theme: "grid",
      styles: { 
        fontSize: 9, 
        cellPadding: 4,
        overflow: 'linebreak'
      },
      headStyles: {
        fillColor: theme.secondary,
        textColor: theme.white,
        fontSize: 10
      },
      alternateRowStyles: {
        fillColor: theme.lightGray
      },
      margin: { left: margin, right: margin }
    });

    // ===== DIAGNOSTIC FINDINGS PAGE =====
    doc.addPage();
    currentY = margin;
    
    doc.setTextColor(...theme.primary);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("4. Diagnostic Findings", margin, currentY);
    
    currentY += 15;
    
    const hasDementia = dementiaResult.has_dementia || false;
    const severity = dementiaResult.dementia_severity || "Not Specified";
    
    // Diagnosis Box
    doc.setDrawColor(...(hasDementia ? theme.danger : theme.success));
    doc.setFillColor(...(hasDementia ? [254, 226, 226] : [220, 252, 231]));
    doc.setLineWidth(1);
    doc.roundedRect(margin, currentY, pageWidth - (margin * 2), 40, 3, 3, "FD");
    
    doc.setTextColor(hasDementia ? theme.danger : theme.success);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(
      hasDementia ? "POSITIVE FOR DEMENTIA" : "NEGATIVE FOR DEMENTIA",
      pageWidth / 2,
      currentY + 15,
      { align: "center" }
    );
    
    doc.setTextColor(...theme.primary);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Severity: ${severity}`,
      pageWidth / 2,
      currentY + 25,
      { align: "center" }
    );
    
    currentY += 50;
    
    // Detailed Findings
    if (dementiaResult.diagnosis_reason) {
      doc.setTextColor(...theme.primary);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Detailed Analysis", margin, currentY);
      
      currentY += 10;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      
      const analysisLines = doc.splitTextToSize(dementiaResult.diagnosis_reason, pageWidth - (margin * 2));
      
      analysisLines.forEach(line => {
        if (currentY > pageHeight - 30) {
          doc.addPage();
          currentY = margin;
        }
        doc.text(line, margin, currentY);
        currentY += 6;
      });
    }

    // ===== RECOMMENDATIONS PAGE =====
    doc.addPage();
    currentY = margin;
    
    doc.setTextColor(...theme.primary);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("6. Treatment Recommendations", margin, currentY);
    
    currentY += 15;
    
    if (dementiaResult.prevention_or_treatment) {
      const recommendations = dementiaResult.prevention_or_treatment
        .split('.')
        .filter(rec => rec.trim().length > 10);
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...theme.secondary);
      
      recommendations.forEach((rec, index) => {
        if (currentY > pageHeight - 30) {
          doc.addPage();
          currentY = margin;
        }
        
        doc.text(`Recommendation ${index + 1}:`, margin, currentY);
        currentY += 7;
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);
        
        const recLines = doc.splitTextToSize(rec.trim(), pageWidth - (margin * 2));
        recLines.forEach(line => {
          doc.text(line, margin + 5, currentY);
          currentY += 6;
        });
        
        currentY += 5;
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...theme.secondary);
      });
    }

    // ===== FINAL PAGE FOOTER FOR ALL PAGES =====
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      
      doc.setFontSize(9);
      doc.setTextColor(...theme.gray);
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth - margin,
        pageHeight - 10,
        { align: "right" }
      );
      
      doc.text(
        "Confidential - Do Not Distribute",
        margin,
        pageHeight - 10
      );
    }

    const fileName = `Comprehensive_Dementia_Report_${patientName.replace(/\s+/g, "_")}_${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}.pdf`;
    doc.save(fileName);

    return { 
      success: true, 
      fileName,
      pageCount: totalPages,
      message: "Comprehensive professional report generated"
    };
  } catch (error) {
    console.error("Detailed Professional PDF Error:", error);
    return { success: false, error: error.message };
  }
};

// ========================
// 5. Adaptive PDF Generator
// ========================
export const generateAdaptiveDementiaPDF = (dementiaResult, inputData, patientName = "Patient") => {
  const contentLength = JSON.stringify(dementiaResult).length + JSON.stringify(inputData).length;
  
  if (contentLength < 2000) {
    return generateProfessionalDementiaPDF(dementiaResult, inputData, patientName);
  } else {
    return generateDetailedProfessionalPDF(dementiaResult, inputData, patientName);
  }
};

// ========================
// 6. Export All Functions
// ========================
export default {
  generateDementiaPDF,
  generateDetailedDementiaPDF,
  generateProfessionalDementiaPDF,
  generateDetailedProfessionalPDF,
  generateAdaptiveDementiaPDF
};

// ========================
// How to Use:
// ========================
/*
// Import all functions:
import { 
  generateDementiaPDF,
  generateDetailedDementiaPDF,
  generateProfessionalDementiaPDF,
  generateDetailedProfessionalPDF,
  generateAdaptiveDementiaPDF 
} from '@/utils/pdfGenerator';

// Or import default:
import pdfGenerator from '@/utils/pdfGenerator';
pdfGenerator.generateDementiaPDF(...);

// Example usage:
const result = await generateDetailedDementiaPDF(
  dementiaResult, 
  "John Doe"
);
*/