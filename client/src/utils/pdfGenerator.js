import jsPDF from "jspdf";
import { marked } from "marked";
export const generateDementiaPDF = (
  dementiaResult,
  inputData,
  patientName = "Patient",
) => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    let y = 50;

    const checkPageBreak = (space = 20) => {
      if (y + space > pageHeight - 22) {
        doc.addPage();
        addFooter();
        y = margin;
        return true;
      }
      return false;
    };

    const addWrappedText = (text, fontSize = 10) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(30, 41, 59);
      const lines = doc.splitTextToSize(text, contentWidth - 2);
      lines.forEach((line) => {
        checkPageBreak(6);
        doc.text(line, margin, y);
        y += 5.5;
      });
      y += 3;
    };

    const addFooter = () => {
      const currentPage = doc.internal.getCurrentPageInfo().pageNumber;
      const totalPages = doc.internal.getNumberOfPages();

      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.5);
      doc.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);

      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.setFont("helvetica", "italic");
      doc.text(
        "This report is for medical reference only. Please consult with a qualified healthcare professional.",
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" },
      );

      doc.setFont("helvetica", "bold");
      doc.text(
        `Page ${currentPage} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 5,
        { align: "center" },
      );
    };

    // ===== HEADER =====
    doc.setFillColor(67, 56, 202);
    doc.rect(0, 0, pageWidth, 42, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Dementia Analysis Report", pageWidth / 2, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Clinical Diagnostic Summary", pageWidth / 2, 30, {
      align: "center",
    });

    // ===== INFO BOX =====
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, y, contentWidth, 22, 2, 2, "F");

    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentWidth, 22, 2, 2, "S");

    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    const col1X = margin + 5;
    const col2X = margin + contentWidth / 2 + 5;

    doc.setFont("helvetica", "bold");
    doc.text("Patient Name:", col1X, y + 7);
    doc.setFont("helvetica", "normal");
    doc.text(patientName, col1X + 35, y + 7);

    doc.setFont("helvetica", "bold");
    doc.text("Report Date:", col1X, y + 15);
    doc.setFont("helvetica", "normal");
    doc.text(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      col1X + 35,
      y + 15,
    );

    doc.setFont("helvetica", "bold");
    doc.text("Report Time:", col2X, y + 7);
    doc.setFont("helvetica", "normal");
    doc.text(
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      col2X + 35,
      y + 7,
    );

    doc.setFont("helvetica", "bold");
    doc.text("Report ID:", col2X, y + 15);
    doc.setFont("helvetica", "normal");
    doc.text(`DEM-${Date.now().toString().slice(-8)}`, col2X + 35, y + 15);

    y += 32;

    // ===== CLINICAL INPUT DATA =====
    checkPageBreak(45);

    doc.setFillColor(237, 233, 254);
    doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(67, 56, 202);
    doc.text("Clinical Input Data", margin + 3, y + 5);
    y += 13;
    doc.setTextColor(30, 41, 59);

    const inputFields = [
      { label: "Gender", value: inputData.Gender },
      { label: "Age", value: inputData.Age.toString() },
      { label: "Education (years)", value: inputData.EDUC.toString() },
      { label: "MMSE Score", value: inputData.MMSE.toString() },
      { label: "CDR", value: inputData.CDR.toString() },
      { label: "eTIV", value: inputData.eTIV.toString() },
      { label: "nWBV", value: inputData.nWBV.toString() },
      { label: "ASF", value: inputData.ASF.toString() },
    ];

    const colWidth = contentWidth / 3;
    const rowHeight = 12;
    let col = 0;
    let row = 0;
    const startY = y;

    inputFields.forEach((field, idx) => {
      const x = margin + col * colWidth;
      const currentY = startY + row * rowHeight;

      if (idx % 2 === 0) {
        doc.setFillColor(248, 250, 252);
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.rect(x, currentY, colWidth, rowHeight, "F");

      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      doc.rect(x, currentY, colWidth, rowHeight);

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(71, 85, 105);
      doc.text(field.label + ":", x + 2, currentY + 5);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(30, 41, 59);
      doc.text(field.value, x + 2, currentY + 9);

      col++;
      if (col >= 3) {
        col = 0;
        row++;
      }
    });

    y = startY + Math.ceil(inputFields.length / 3) * rowHeight + 15;

    // ===== DIAGNOSIS =====
    checkPageBreak(30);

    doc.setFillColor(237, 233, 254);
    doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(67, 56, 202);
    doc.text("Diagnosis", margin + 3, y + 5);
    y += 15;

    const statusColor = dementiaResult.has_dementia
      ? [220, 38, 38]
      : [34, 197, 94];
    const statusBg = dementiaResult.has_dementia
      ? [254, 226, 226]
      : [220, 252, 231];

    doc.setFillColor(...statusBg);
    doc.roundedRect(margin, y, contentWidth / 2 - 5, 12, 2, 2, "F");

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...statusColor);
    doc.text(
      `Status: ${dementiaResult.has_dementia ? "Dementia Detected" : "No Dementia Detected"}`,
      margin + 3,
      y + 7,
    );

    doc.setFillColor(254, 243, 199);
    doc.roundedRect(
      margin + contentWidth / 2 + 5,
      y,
      contentWidth / 2 - 5,
      12,
      2,
      2,
      "F",
    );

    doc.setFont("helvetica", "bold");
    doc.setTextColor(161, 98, 7);
    doc.text(
      `Severity: ${dementiaResult.dementia_severity}`,
      margin + contentWidth / 2 + 8,
      y + 7,
    );

    y += 20;

    // ===== SUMMARY =====
    checkPageBreak(25);

    doc.setFillColor(237, 233, 254);
    doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(67, 56, 202);
    doc.text("Summary", margin + 3, y + 5);
    y += 15;

    addWrappedText(dementiaResult.short_summary, 10);

    // ===== DETAILED ANALYSIS =====
    checkPageBreak(25);
    doc.setFillColor(237, 233, 254);
    doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(67, 56, 202);
    doc.text("Detailed Analysis", margin + 3, y + 5);
    y += 15;

    addWrappedText(dementiaResult.diagnosis_reason, 10);

    // ===== PREVENTION & TREATMENT WITH MARKED =====
    checkPageBreak(25);

    doc.setFillColor(237, 233, 254);
    doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(67, 56, 202);
    doc.text("Prevention & Treatment Recommendations", margin + 3, y + 5);
    y += 15;

    // Use marked to parse markdown in recommendations
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    const recommendationsHtml = marked.parse(
      dementiaResult.prevention_or_treatment,
    );
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(recommendationsHtml, "text/html");

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 41, 59);

    // Process parsed HTML elements
    htmlDoc.body.childNodes.forEach((node) => {
      if (node.nodeName === "OL" || node.nodeName === "UL") {
        // Handle ordered or unordered lists
        const items = Array.from(node.querySelectorAll("li"));

        items.forEach((li, index) => {
          checkPageBreak(10);

          if (node.nodeName === "OL") {
            // Numbered list
            doc.setFillColor(67, 56, 202);
            const number = (index + 1).toString();

            doc.circle(margin + 3, y - 1, 2.5, "F");
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.setFont("helvetica", "bold");
            doc.text(number, margin + 3, y + 1, { align: "center" });

            doc.setTextColor(30, 41, 59);
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
          } else {
            // Bullet list
            doc.setFillColor(67, 56, 202);
            doc.circle(margin + 2, y - 1, 1, "F");
          }

          const text = li.textContent.trim();
          const wrapped = doc.splitTextToSize(text, contentWidth - 12);

          wrapped.forEach((w) => {
            checkPageBreak(6);
            doc.text(w, margin + (node.nodeName === "OL" ? 8 : 6), y);
            y += 5.5;
          });
          y += 2;
        });
      } else if (node.nodeName === "P") {
        // Regular paragraph
        checkPageBreak(10);
        const text = node.textContent.trim();
        if (text) {
          const wrapped = doc.splitTextToSize(text, contentWidth - 2);
          wrapped.forEach((w) => {
            checkPageBreak(6);
            doc.text(w, margin, y);
            y += 5.5;
          });
          y += 3;
        }
      } else if (node.nodeName === "STRONG" || node.nodeName === "B") {
        // Bold text
        checkPageBreak(8);
        doc.setFont("helvetica", "bold");
        const text = node.textContent.trim();
        const wrapped = doc.splitTextToSize(text, contentWidth - 2);
        wrapped.forEach((w) => {
          checkPageBreak(6);
          doc.text(w, margin, y);
          y += 5.5;
        });
        doc.setFont("helvetica", "normal");
        y += 2;
      } else if (node.nodeName === "#text" && node.textContent.trim()) {
        // Plain text
        checkPageBreak(8);
        const text = node.textContent.trim();
        const wrapped = doc.splitTextToSize(text, contentWidth - 2);
        wrapped.forEach((w) => {
          checkPageBreak(6);
          doc.text(w, margin, y);
          y += 5.5;
        });
        y += 2;
      }
    });

    // ===== ADD FOOTERS =====
    const pages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      addFooter();
    }

    // ===== SAVE PDF =====
    const fileName = `Dementia_Analysis_${patientName.replace(/\s+/g, "_")}_${Date.now()}.pdf`;
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
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    let y = 50;

    // Helper to check page break
    const checkPageBreak = (space = 20) => {
      if (y + space > pageHeight - 22) {
        doc.addPage();
        addFooter();
        y = margin;
        return true;
      }
      return false;
    };

    // Add footer
    const addFooter = () => {
      const currentPage = doc.internal.getCurrentPageInfo().pageNumber;
      const totalPages = doc.internal.getNumberOfPages();

      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.5);
      doc.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);

      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.setFont("helvetica", "italic");
      doc.text(
        "For medical reference only • Consult a qualified healthcare professional",
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" },
      );

      doc.setFont("helvetica", "bold");
      doc.text(
        `Page ${currentPage} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 5,
        { align: "center" },
      );
    };

    // Parse markdown table
    const parseMarkdownTable = (tableHtml) => {
      const parser = new DOMParser();
      const tableDoc = parser.parseFromString(tableHtml, "text/html");
      const table = tableDoc.querySelector("table");

      if (!table) return null;

      const headers = Array.from(table.querySelectorAll("thead th")).map((th) =>
        th.textContent.trim(),
      );
      const rows = Array.from(table.querySelectorAll("tbody tr")).map((tr) =>
        Array.from(tr.querySelectorAll("td")).map((td) =>
          td.textContent.trim(),
        ),
      );

      return { headers, data: rows };
    };

    // Draw table
    const drawTable = (headers, data, width, startX) => {
      const colWidth = width / headers.length;
      const rowH = 8;
      const headerH = 10;

      // Header
      doc.setFillColor(67, 56, 202);
      doc.rect(startX, y, width, headerH, "F");
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);

      headers.forEach((h, i) => {
        const cellX = startX + i * colWidth;
        const text = h.length > 15 ? h.substring(0, 13) + "..." : h;
        doc.text(text, cellX + 2, y + 6.5);
      });
      y += headerH;

      // Data rows
      doc.setTextColor(30, 41, 59);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);

      data.forEach((row, ri) => {
        if (ri % 2 === 0) {
          doc.setFillColor(248, 250, 252);
        } else {
          doc.setFillColor(255, 255, 255);
        }
        doc.rect(startX, y, width, rowH, "F");

        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.2);

        row.forEach((cell, ci) => {
          const cellX = startX + ci * colWidth;
          doc.rect(cellX, y, colWidth, rowH);

          const cellText = String(cell);
          const maxWidth = colWidth - 3;
          const lines = doc.splitTextToSize(cellText, maxWidth);
          doc.text(lines[0], cellX + 1.5, y + 5.5);
        });

        y += rowH;
      });

      return y;
    };

    // Add wrapped text
    const addText = (text, fontSize = 10, isBold = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.setTextColor(30, 41, 59);

      const lines = doc.splitTextToSize(text, contentWidth);
      lines.forEach((line) => {
        checkPageBreak(6);
        doc.text(line, margin, y);
        y += 5.5;
      });
    };

    // ===== HEADER =====
    doc.setFillColor(67, 56, 202);
    doc.rect(0, 0, pageWidth, 42, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Comprehensive Dementia Assessment", pageWidth / 2, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Clinical Diagnostic Report", pageWidth / 2, 30, {
      align: "center",
    });

    // ===== INFO BOX =====
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, y, contentWidth, 22, 2, 2, "F");
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentWidth, 22, 2, 2, "S");

    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    const col1X = margin + 5;
    const col2X = margin + contentWidth / 2 + 5;

    doc.setFont("helvetica", "bold");
    doc.text("Report Date:", col1X, y + 7);
    doc.setFont("helvetica", "normal");
    doc.text(new Date().toLocaleDateString(), col1X + 32, y + 7);

    doc.setFont("helvetica", "bold");
    doc.text("Report Time:", col1X, y + 15);
    doc.setFont("helvetica", "normal");
    doc.text(new Date().toLocaleTimeString(), col1X + 32, y + 15);

    doc.setFont("helvetica", "bold");
    doc.text("Patient Name:", col2X, y + 7);
    doc.setFont("helvetica", "normal");
    doc.text(patientName, col2X + 35, y + 7);

    doc.setFont("helvetica", "bold");
    doc.text("Report ID:", col2X, y + 15);
    doc.setFont("helvetica", "normal");
    doc.text(`DEM-${Date.now().toString().slice(-8)}`, col2X + 35, y + 15);

    y += 30;

    // ===== PARSE MARKDOWN =====
    const report =
      dementiaResult.fullReport || dementiaResult.results?.full_markdown_report;

    if (report) {
      // Configure marked for better parsing
      marked.setOptions({
        breaks: true,
        gfm: true,
      });

      // Parse markdown to HTML
      const html = marked.parse(report);

      // Parse HTML to extract content
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(html, "text/html");
      const body = htmlDoc.body;

      // Storage for sections
      const sections = [];
      let currentSection = null;

      // Process all elements
      body.childNodes.forEach((node) => {
        if (node.nodeName === "H1") {
          // Skip H1, we handle it in header
        } else if (node.nodeName === "H2") {
          currentSection = {
            title: node.textContent.trim(),
            content: [],
          };
          sections.push(currentSection);
        } else if (currentSection) {
          if (node.nodeName === "TABLE") {
            const tableData = parseMarkdownTable(node.outerHTML);
            if (tableData) {
              currentSection.content.push({ type: "table", data: tableData });
            }
          } else if (node.nodeName === "UL") {
            const items = Array.from(node.querySelectorAll("li")).map((li) =>
              li.textContent.trim(),
            );
            currentSection.content.push({ type: "list", items });
          } else if (node.nodeName === "P") {
            const text = node.textContent.trim();
            if (text) {
              currentSection.content.push({ type: "paragraph", text });
            }
          } else if (node.nodeName === "HR") {
            currentSection.content.push({ type: "divider" });
          }
        }
      });

      // Find sections with tables for grid layout
      const tableSections = sections
        .filter((s) => s.content.some((c) => c.type === "table"))
        .slice(0, 3);

      // ===== RENDER 3-COLUMN GRID =====
      if (tableSections.length >= 3) {
        checkPageBreak(60);

        const colWidth = (contentWidth - 8) / 3;

        // Section titles
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(67, 56, 202);

        tableSections.forEach((section, idx) => {
          const x = margin + idx * (colWidth + 4);
          doc.setFillColor(237, 233, 254);
          doc.roundedRect(x, y - 2, colWidth, 10, 1, 1, "F");
          doc.text(section.title, x + colWidth / 2, y + 5, { align: "center" });
        });

        y += 12;

        // Draw tables side by side
        const startY = y;
        let maxHeight = 0;

        tableSections.forEach((section, idx) => {
          const x = margin + idx * (colWidth + 4);
          y = startY;

          const tableContent = section.content.find((c) => c.type === "table");
          if (tableContent) {
            drawTable(
              tableContent.data.headers,
              tableContent.data.data,
              colWidth,
              x,
            );
            const height = y - startY;
            maxHeight = Math.max(maxHeight, height);
          }
        });

        y = startY + maxHeight + 15;

        // Mark as rendered
        tableSections.forEach((s) => (s.rendered = true));
      }

      // ===== RENDER REMAINING SECTIONS =====
      sections.forEach((section) => {
        if (section.rendered) return;

        checkPageBreak(15);

        // Section header
        doc.setFillColor(237, 233, 254);
        doc.roundedRect(margin, y - 2, contentWidth, 10, 1, 1, "F");
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(67, 56, 202);
        doc.text(section.title, margin + 3, y + 5);
        y += 13;
        doc.setTextColor(30, 41, 59);

        // Render content
        section.content.forEach((item) => {
          if (item.type === "table") {
            checkPageBreak(30);
            drawTable(item.data.headers, item.data.data, contentWidth, margin);
            y += 8;
          } else if (item.type === "paragraph") {
            checkPageBreak(10);
            addText(item.text, 10);
            y += 3;
          } else if (item.type === "list") {
            item.items.forEach((text) => {
              checkPageBreak(10);
              doc.setFillColor(67, 56, 202);
              doc.circle(margin + 2, y - 1, 1, "F");

              doc.setFontSize(10);
              doc.setFont("helvetica", "normal");
              doc.setTextColor(30, 41, 59);

              const lines = doc.splitTextToSize(text, contentWidth - 8);
              lines.forEach((line) => {
                checkPageBreak(6);
                doc.text(line, margin + 6, y);
                y += 5.5;
              });
              y += 2;
            });
          } else if (item.type === "divider") {
            checkPageBreak(6);
            doc.setDrawColor(203, 213, 225);
            doc.setLineWidth(0.5);
            doc.line(margin, y, pageWidth - margin, y);
            y += 6;
          }
        });

        y += 5;
      });
    }

    // ===== ADD FOOTERS =====
    const pages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      addFooter();
    }

    // ===== SAVE =====
    const fileName = `Dementia_Assessment_${patientName.replace(/\s+/g, "_")}_${Date.now()}.pdf`;
    doc.save(fileName);

    return { success: true, fileName };
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return { success: false, error: error.message };
  }
};
export default {
  generateDementiaPDF,
  generateDetailedDementiaPDF,
};

