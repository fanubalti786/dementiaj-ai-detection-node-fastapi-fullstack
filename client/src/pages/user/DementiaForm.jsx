import { useState } from "react";
import DementiaFormCom from "../../components/user/DementiaFormCom";
import { Brain, CheckCircle, ClipboardEdit, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { generateDementiaPDF } from "../../utils/pdfGenerator";

export default function DementiaForm() {
  const [formData, setFormData] = useState({
    Gender: "",
    Age: "",
    EDUC: "",
    MMSE: "",
    CDR: "",
    eTIV: "",
    nWBV: "",
    ASF: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateFormData = (data) => {
    if (
      !data.Gender ||
      !data.Age ||
      !data.EDUC ||
      !data.MMSE ||
      !data.CDR ||
      !data.eTIV ||
      !data.nWBV ||
      !data.ASF
    ) {
      return "Please fill in all required fields";
    }
    if (data.Gender !== "M" && data.Gender !== "F") {
      return "Gender must be M or F";
    }
    const age = parseFloat(data.Age);
    if (isNaN(age) || age < 40 || age > 120) {
      return "Age must be between 40 and 120";
    }
    const educ = parseFloat(data.EDUC);
    if (isNaN(educ) || educ < 0 || educ > 30) {
      return "Years of Education must be between 0 and 30";
    }
    const mmse = parseFloat(data.MMSE);
    if (isNaN(mmse) || mmse < 0 || mmse > 30) {
      return "MMSE Score must be between 0 and 30";
    }
    const cdr = parseFloat(data.CDR);
    if (isNaN(cdr) || cdr < 0 || cdr > 3) {
      return "CDR must be between 0 and 3";
    }
    const etiv = parseFloat(data.eTIV);
    if (isNaN(etiv) || etiv <= 0) {
      return "eTIV must be a positive number";
    }
    const nwbv = parseFloat(data.nWBV);
    if (isNaN(nwbv) || nwbv <= 0 || nwbv > 1) {
      return "nWBV must be between 0 and 1 (it's a normalized ratio)";
    }
    const asf = parseFloat(data.ASF);
    if (isNaN(asf) || asf <= 0) {
      return "ASF must be a positive number";
    }
    return null;
  };
  const handleSubmit = async () => {
    const validationError = validateFormData(formData);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    setLoading(true);

    try {
      const analysisData = {
        Gender: formData.Gender,
        Age: parseFloat(formData.Age),
        EDUC: parseFloat(formData.EDUC),
        MMSE: parseFloat(formData.MMSE),
        CDR: parseFloat(formData.CDR),
        eTIV: parseFloat(formData.eTIV),
        nWBV: parseFloat(formData.nWBV),
        ASF: parseFloat(formData.ASF),
      };
      const dementiaResponse = await fetch(
        "https://dimentia-detection.onrender.com/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(analysisData),
        },
      );
      if (!dementiaResponse.ok) {
        throw new Error(`Dementia API Error: ${dementiaResponse.status}`);
      }
      const dementiaData = await dementiaResponse.json();
      if (!dementiaData.dementia_result) {
        throw new Error("Invalid response from dementia detection API");
      }
      const token = localStorage.getItem("token"); // Adjust based on your auth implementation
      const backendResponse = await fetch(
        "http://localhost:3000/api/v1/user/analyses/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add your auth token
          },
          body: JSON.stringify({
            inputData: analysisData,
            results: dementiaData.dementia_result,
          }),
        },
      );
      if (!backendResponse.ok) {
        const errorData = await backendResponse.json();
        throw new Error(
          errorData.message || `Backend Error: ${backendResponse.status}`,
        );
      }
      toast.success("Analysis Complete!");
      handleReset();
      setResult(dementiaData.dementia_result);
      const patientName = `Patient_${analysisData.Age}_${analysisData.Gender}`;
      const pdfResult = generateDementiaPDF(
        dementiaData.dementia_result,
        analysisData,
        patientName,
      );
      if (!pdfResult.success) {
        console.error("Auto PDF generation failed:", pdfResult.error);
      } else {
        console.log("PDF automatically downloaded:", pdfResult.fileName);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(`Failed to analyze data: ${err.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      Gender: "",
      Age: "",
      EDUC: "",
      MMSE: "",
      CDR: "",
      eTIV: "",
      nWBV: "",
      ASF: "",
    });
    setResult(null);
  };

  return (
    <div className="min-h-[90vh] w-full overflow-y-auto py-8 px-8">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <ClipboardEdit className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dementia Detection Analysis
          </h1>
          <p className="text-gray-600">
            Complete the clinical assessment form for AI-powered analysis
          </p>
        </div>

        {result && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <CheckCircle
                className="text-green-600 flex-shrink-0 mt-1"
                size={24}
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  Analysis Complete!
                </h3>
                <div className="space-y-2">
                  <p className="text-green-800">
                    <strong>Prediction:</strong> {result.prediction}
                  </p>
                  {result.confidence && (
                    <p className="text-green-800">
                      <strong>Confidence:</strong>{" "}
                      {(result.confidence * 100).toFixed(2)}%
                    </p>
                  )}
                  {result.probability && (
                    <p className="text-green-800">
                      <strong>Probability:</strong>{" "}
                      {(result.probability * 100).toFixed(2)}%
                    </p>
                  )}
                </div>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Analyze Another Patient
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Note */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> All fields marked with * are required. Ensure
            all measurements are accurate for precise analysis.
          </p>
        </div>

        {/* Form */}
        <DementiaFormCom
          formData={formData}
          handleChange={handleChange}
          loading={loading}
        />

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center gap-3 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Analyzing...
              </>
            ) : (
              <>
                <Brain size={20} />
                Analyze Patient Data
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
