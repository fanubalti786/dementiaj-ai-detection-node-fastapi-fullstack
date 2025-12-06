from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from agent import analyze_dementia
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PatientInput(BaseModel):
    Gender: str = Field(pattern="^[MF]$")
    Age: int = Field(..., ge=40, le=120)
    EDUC: int
    MMSE: int = Field(..., ge=0, le=30)
    CDR: float = Field(..., ge=0, le=3)
    eTIV: float
    nWBV: float
    ASF: float


@app.get("/")
async def test_route():
    return {"status": "running"}


@app.post("/analyze")
async def analyze_route(payload: PatientInput):
    try:
        result = analyze_dementia(payload.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"dementia_result": result.dict()}
