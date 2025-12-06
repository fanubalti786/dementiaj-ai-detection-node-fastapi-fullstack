from dotenv import load_dotenv
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
import os
import warnings

warnings.filterwarnings('ignore')
load_dotenv()


class StructuredResponse(BaseModel):
    has_dementia: bool
    diagnosis_reason: str
    dementia_severity: str | None
    prevention_or_treatment: str
    markdown_input_table: str
    markdown_score_table: str
    short_summary: str
    full_markdown_report: str


GROQ_API_KEY = os.getenv("GROQ_API_KEY")

Model = ChatGroq(
    api_key=GROQ_API_KEY,
    temperature=0,
    model="openai/gpt-oss-20b"
)

Dementia_Model = Model.with_structured_output(schema=StructuredResponse)


prompt_for_llm = PromptTemplate(
    input_variables=[
        "Gender", "Age", "EDUC", "MMSE", "CDR", "eTIV", "nWBV", "ASF"
    ],
    template="""
You are an expert clinical AI model that evaluates dementia likelihood using MRI volumetric data and cognitive scores.
Generate a structured dementia diagnostic analysis based strictly on the patient data.
Return ONLY the structure required by the Pydantic model (no JSON, no extra text — the LLM will output the tool call automatically).

Patient Data:
- Gender: {Gender}
- Age: {Age}
- Education: {EDUC}
- MMSE: {MMSE}
- CDR: {CDR}
- eTIV: {eTIV}
- nWBV: {nWBV}
- ASF: {ASF}
"""
)


def analyze_dementia(patient_data: dict) -> StructuredResponse:
    chain = prompt_for_llm | Dementia_Model
    return chain.invoke(patient_data)


if __name__ == "__main__":
    result = analyze_dementia({
    "Gender": "F",
    "Age": "82",
    "EDUC": "12",
    "MMSE": "17",
    "CDR": "1",
    "eTIV": "1370",
    "nWBV": "0.66",
    "ASF": "1.10"
})
    print(result)
