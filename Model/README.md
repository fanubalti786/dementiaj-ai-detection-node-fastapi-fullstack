# 🧠 Dementia Analysis API

FastAPI backend for evaluating dementia risk using LLM-powered clinical reasoning with structured JSON output.

This API accepts basic patient cognitive + MRI metadata and returns:

* ✔ Dementia prediction (yes/no)
* ✔ Severity (if any)
* ✔ Medical reasoning
* ✔ Markdown input table
* ✔ Score table
* ✔ Short summary
* ✔ Full clinical markdown report

No PDF generation is included (as requested).

---

## 🚀 Features

* **FastAPI backend**
* **Pydantic validation**
* **LLM-based dementia classifier**
* **Structured JSON output model**
* **Rule-based sentiment analysis**
* **Two API routes:**

  * `/analyze-dementia` — main analysis
  * `/test` — quick API health check

---

## 📦 Installation

```bash
git clone <your-repo-url>
cd <project-folder>
pip install -r requirements.txt
```

Create a **.env** file:

```
GROQ_API_KEY=your_api_key_here
```

---

## ▶️ Run the API

```bash
uvicorn main:app --reload
```

API docs:

```
http://127.0.0.1:8000/docs
```

---

## 📥 Required Input (Minimal Patient Data)

```json
{
  "Gender": "M",
  "Age": 72,
  "EDUC": 16,
  "MMSE": 28,
  "CDR": 0,
  "eTIV": 1500,
  "nWBV": 0.72,
  "ASF": 1.12
}
```

Only **necessary** fields are included.

---

## 📤 Sample Response

```json
{
  "dementia_result": {
    "has_dementia": false,
    "diagnosis_reason": "...",
    "dementia_severity": null,
    "prevention_or_treatment": "...",
    "markdown_input_table": "...",
    "markdown_score_table": "...",
    "short_summary": "...",
    "full_markdown_report": "..."
  },
  "sentiment": {
    "sentiment": "Positive",
    "score": 2
  }
}
```

---

## 🔥 API Routes

### **POST /analyze-dementia**

Analyze dementia status using LLM and structured response.

### **GET /test**

Simple health check.

---

## 🧪 Example Test Case (Mild Dementia)

```json
{
  "Gender": "F",
  "Age": 76,
  "EDUC": 10,
  "MMSE": 23,
  "CDR": 1.0,
  "eTIV": 1450.0,
  "nWBV": 0.67,
  "ASF": 1.18
}
```

---

## 🛠 Project Structure

```
.
├── agent.py               # LLM dementia analysis logic
├── main.py                # FastAPI backend
├── models.py              # Pydantic models
├── requirements.txt
└── README.md
```

---

## 🧩 Technologies Used

* FastAPI
* Pydantic
* Groq LLM (gpt-oss-20b)
* LangChain
* Python 3.10+

---

## © License

MIT License — Free to use and modify.

Response in the from of json:
```
{
  "dementia_result": {
    "has_dementia": true,
    "diagnosis_reason": "The patient presents with a MMSE score of 17 and a CDR of 1.0, both indicative of mild cognitive impairment progressing to mild dementia. MRI volumetric data show a reduced normalized whole brain volume (nWBV = 0.66) and an elevated atrophy score factor (ASF = 1.1), suggesting significant brain atrophy consistent with neurodegenerative disease. The eTIV of 1370.0 is within normal range, confirming that the reduced nWBV is due to atrophy rather than overall brain size. Combined, these findings strongly support a diagnosis of mild dementia.",
    "dementia_severity": "Mild Dementia",
    "prevention_or_treatment": "1. **Pharmacologic**: Initiate cholinesterase inhibitor (e.g., donepezil 5 mg daily, titrate to 10 mg). 2. **Cognitive Stimulation**: Enroll in structured memory training or occupational therapy. 3. **Physical Activity**: Encourage moderate aerobic exercise (e.g., walking 30 min/day). 4. **Diet**: Adopt Mediterranean diet rich in fruits, vegetables, whole grains, and omega‑3 fatty acids. 5. **Sleep Hygiene**: Maintain regular sleep schedule, limit caffeine. 6. **Social Engagement**: Join community groups or volunteer activities. 7. **Regular Monitoring**: Repeat MMSE and MRI annually to assess progression.",
    "markdown_input_table": "| Parameter | Value |\n|-----------|-------|\n| Gender | F |\n| Age | 82 |\n| Education | 12 |\n| MMSE | 17 |\n| CDR | 1.0 |\n| eTIV | 1370.0 |\n| nWBV | 0.66 |\n| ASF | 1.1 |",
    "markdown_score_table": "| Metric | Value |\n|--------|-------|\n| MMSE | 17 |\n| CDR | 1.0 |\n| nWBV | 0.66 |\n| ASF | 1.1 |\n| eTIV | 1370.0 |",
    "short_summary": "The patient shows mild dementia based on MMSE 17, CDR 1.0, and MRI evidence of brain atrophy (nWBV 0.66, ASF 1.1). Early pharmacologic and non‑pharmacologic interventions are recommended to slow decline.",
    "full_markdown_report": "# Dementia Diagnostic Analysis\n\n## Patient Overview\n| Parameter | Value |\n|-----------|-------|\n| Gender | Female |\n| Age | 82 |\n| Education | 12 years |\n\n## Cognitive Assessment\n| Test | Score |\n|------|-------|\n| MMSE | 17 |\n| CDR | 1.0 |\n\n## MRI Volumetric Metrics\n| Metric | Value |\n|--------|-------|\n| eTIV | 1370.0 mm³ |\n| nWBV | 0.66 |\n| ASF | 1.1 |\n\n## Interpretation\n- **MMSE 17**: Indicates moderate cognitive impairment.\n- **CDR 1.0**: Consistent with mild dementia.\n- **nWBV 0.66**: Significantly below the normal range (~0.80), reflecting brain atrophy.\n- **ASF 1.1**: Elevated, supporting the presence of atrophy.\n- **eTIV 1370.0**: Within normal limits, confirming that reduced nWBV is due to atrophy.\n\n## Diagnosis\n**Mild Dementia** – The combination of cognitive deficits and MRI evidence of atrophy strongly supports this diagnosis.\n\n## Recommendations\n1. **Pharmacologic**: Consider cholinesterase inhibitors (e.g., donepezil) to slow cognitive decline.\n2. **Non‑pharmacologic**: Cognitive stimulation therapy, structured memory exercises, and social engagement.\n3. **Lifestyle**: Mediterranean diet, regular aerobic exercise, and sleep hygiene.\n4. **Monitoring**: Repeat MMSE and MRI in 12 months to track progression.\n5. **Support**: Referral to a geriatric psychiatrist or neurologist for comprehensive care.\n\n## Prognosis\nWith early intervention and a multidisciplinary approach, progression can be slowed, and quality of life maintained for several years."
  }
}
```
