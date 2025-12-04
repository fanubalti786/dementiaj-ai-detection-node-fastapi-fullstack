import {
  Download,
  Calendar,
  User,
  Activity,
  Brain,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { getRiskColor, getScoreColor } from "../../utils/dementiaUtils";
import { generateDetailedDementiaPDF } from "../../utils/pdfGenerator";

const DementiaResultCard = ({ result }) => {
  // Destructure real data
  const {
    patientName,
    age,
    gender,
    testDate,
    riskLevel,
    score,
    aiAnalysis,
    inputData,
    results,
  } = result;

  const realScore = inputData?.MMSE
    ? Math.round((inputData.MMSE / 30) * 100)
    : score;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <User className="text-indigo-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {patientName}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  <span>{testDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity size={16} />
                  <span>
                    {age} yrs • {gender}
                  </span>
                </div>
                {inputData?.EDUC && (
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium">Educ:</span>
                    <span>{inputData.EDUC} years</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <AlertCircle size={16} className="text-amber-600" />
                  <span className="font-medium">MMSE:</span>
                  <span className="font-bold text-amber-700">
                    {inputData?.MMSE ?? "N/A"}/30
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div
              className={`px-4 py-2 rounded-lg text-sm font-bold border-2 ${getRiskColor(
                riskLevel,
              )}`}
            >
              {riskLevel} Risk
            </div>
            <button
              onClick={() => generateDetailedDementiaPDF(result)}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold shadow hover:shadow-lg"
            >
              <Download size={18} />
              Download Full Report
            </button>
          </div>
        </div>

        {/* Cognitive Score - Based on Real MMSE */}
        <div className="mb-6 bg-gray-50 rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="text-indigo-600" size={20} />
            <h4 className="font-bold text-gray-700">
              Cognitive Score (MMSE-based)
            </h4>
          </div>
          <div className="flex items-end gap-2 mb-3">
            <span className={`text-5xl font-bold ${getScoreColor(realScore)}`}>
              {realScore}
            </span>
            <span className="text-2xl text-gray-400 mb-1.5">/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                realScore >= 80
                  ? "bg-green-500"
                  : realScore >= 60
                    ? "bg-amber-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${realScore}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Based on MMSE: {inputData?.MMSE ?? "N/A"} / 30 points
          </p>
        </div>

        {/* Key Clinical Findings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">
              Dementia Severity
            </p>
            <p className="font-bold text-xl text-red-800">
              {results?.dementia_severity || "Unknown"}
            </p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              CDR Rating
            </p>
            <p className="font-bold text-xl text-amber-800">
              {inputData?.CDR ?? "N/A"}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Diagnosis
            </p>
            <p className="font-bold text-lg text-blue-800">
              {results?.has_dementia ? "Dementia Detected" : "No Dementia"}
            </p>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="text-indigo-600" size={20} />
            <p className="text-sm text-indigo-900 font-bold uppercase tracking-wide">
              AI Analysis Summary
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">
            {results.short_summary || aiAnalysis}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DementiaResultCard;
