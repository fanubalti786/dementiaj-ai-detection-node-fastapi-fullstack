// ========================
// UTILS: utils/pdfGenerator.js
// ========================
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ← THIS IS THE CORRECT WAY

export const generateDementiaPDF = (
  dementiaResult,
  inputData,
  patientName = "Patient",
) => {
  try {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const leftMargin = 15;
    const rightMargin = 15;
    const contentWidth = pageWidth - leftMargin - rightMargin;
    let yPosition = 20;

    // ===== HEADER =====
    doc.setFillColor(79, 70, 229); // Indigo color
    doc.rect(0, 0, pageWidth, 35, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont(undefined, "bold");
    doc.text("Dementia Analysis Report", pageWidth / 2, 22, {
      align: "center",
    });

    yPosition = 45;

    // ===== PATIENT INFO =====
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Patient Information", leftMargin, yPosition);

    yPosition += 8;

    const patientInfo = [
      ["Patient Name:", patientName],
      ["Date of Analysis:", new Date().toLocaleDateString()],
      ["Time:", new Date().toLocaleTimeString()],
    ];

    autoTable(doc, {
      startY: yPosition,
      head: [],
      body: patientInfo,
      theme: "plain",
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 45 },
        1: { cellWidth: "auto" },
      },
      margin: { left: leftMargin, right: rightMargin },
    });

    yPosition = doc.lastAutoTable.finalY + 12;

    // ===== INPUT DATA TABLE =====
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Clinical Input Data", leftMargin, yPosition);

    yPosition += 3;

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
      startY: yPosition,
      head: [],
      body: patientInfo,
      theme: "plain",
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 45 },
        1: { cellWidth: "auto" },
      },
      margin: { left: leftMargin, right: rightMargin },
    });

    yPosition = doc.lastAutoTable.finalY + 12;

    // ===== DIAGNOSIS SECTION =====
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Diagnosis", leftMargin, yPosition);

    yPosition += 8;
    doc.setFontSize(11);

    // Diagnosis Status
    const diagnosisColor = dementiaResult.has_dementia
      ? [220, 38, 38]
      : [34, 197, 94];
    doc.setTextColor(...diagnosisColor);
    doc.setFont(undefined, "bold");
    doc.text(
      `Status: ${dementiaResult.has_dementia ? "Dementia Detected" : "No Dementia Detected"}`,
      leftMargin,
      yPosition,
    );

    yPosition += 8;
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, "bold");
    doc.text(
      `Severity: ${dementiaResult.dementia_severity}`,
      leftMargin,
      yPosition,
    );

    yPosition += 12;

    // ===== SHORT SUMMARY =====
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Summary", leftMargin, yPosition);

    yPosition += 6;
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");

    const summaryText = doc.splitTextToSize(
      dementiaResult.short_summary,
      contentWidth,
    );
    doc.text(summaryText, leftMargin, yPosition);
    yPosition += summaryText.length * 5 + 10;

    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = 20;
    }

    // ===== DIAGNOSIS REASON =====
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Detailed Analysis", leftMargin, yPosition);

    yPosition += 6;
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");

    const reasonText = doc.splitTextToSize(
      dementiaResult.diagnosis_reason,
      contentWidth,
    );
    doc.text(reasonText, leftMargin, yPosition);
    yPosition += reasonText.length * 5 + 12;

    // Check if we need a new page
    if (yPosition > pageHeight - 70) {
      doc.addPage();
      yPosition = 20;
    }

    // ===== PREVENTION/TREATMENT =====
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Prevention & Treatment Recommendations", leftMargin, yPosition);

    yPosition += 6;
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");

    const treatmentText = doc.splitTextToSize(
      dementiaResult.prevention_or_treatment,
      contentWidth,
    );
    doc.text(treatmentText, leftMargin, yPosition);
    yPosition += treatmentText.length * 5 + 12;

    // ===== FOOTER =====
    const totalPages = doc.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, {
        align: "center",
      });

      // Split footer text to prevent cutting
      const footerText = doc.splitTextToSize(
        "This report is generated for medical reference only. Please consult with a healthcare professional.",
        contentWidth,
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
export const generateDetailedDementiaPDF = (
  dementiaResult,
  patientName = "Patient",
) => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = 50;

    // Header
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Comprehensive Dementia Report", pageWidth / 2, 25, {
      align: "center",
    });

    // Patient Info Table ← THIS WAS THE BUG
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Report Information", margin, yPosition);
    yPosition += 10;

    autoTable(doc, {
      // ← ADD doc HERE !
      startY: yPosition,
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

    yPosition = doc.lastAutoTable.finalY + 20;

    // Render full markdown report
    if (
      dementiaResult.fullReport ||
      dementiaResult.results?.full_markdown_report
    ) {
      const report =
        dementiaResult.fullReport ||
        dementiaResult.results?.full_markdown_report;
      const lines = report.split("\n");

      lines.forEach((line) => {
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = 20;
        }

        if (line.startsWith("# ")) {
          doc.setFontSize(20);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(79, 70, 229);
          doc.text(line.replace("# ", ""), margin, yPosition);
          yPosition += 12;
        } else if (line.startsWith("## ")) {
          doc.setFontSize(16);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(0);
          doc.text(line.replace("## ", ""), margin, yPosition);
          yPosition += 10;
        } else if (line.startsWith("### ")) {
          doc.setFontSize(13);
          doc.setFont("helvetica", "bold");
          doc.text(line.replace("### ", ""), margin, yPosition);
          yPosition += 8;
        } else if (
          (line.startsWith("- ") || line.startsWith("* ")) &&
          line.trim()
        ) {
          doc.setFontSize(11);
          doc.setFont("helvetica", "normal");
          const text = "• " + line.replace(/^[-*] /, "").trim();
          const split = doc.splitTextToSize(text, pageWidth - margin * 2 - 10);
          doc.text(split, margin + 5, yPosition);
          yPosition += split.length * 6 + 2;
        } else if (line.trim() === "") {
          yPosition += 7;
        } else if (!line.includes("|")) {
          // skip markdown tables
          doc.setFontSize(11);
          doc.setFont("helvetica", "normal");
          const split = doc.splitTextToSize(
            line.trim(),
            pageWidth - margin * 2,
          );
          doc.text(split, margin, yPosition);
          yPosition += split.length * 6 + 2;
        }
      });
    }

    // Footer on every page
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, {
        align: "center",
      });
      doc.text(
        "For medical reference only • Consult a healthcare professional",
        pageWidth / 2,
        pageHeight - 5,
        { align: "center" },
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
