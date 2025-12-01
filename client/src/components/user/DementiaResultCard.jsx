import {
  Download,
  Calendar,
  User,
  Activity,
  Brain,
  TrendingUp,
} from "lucide-react";
import {
  getRiskColor,
  getScoreColor,
  downloadPDF,
} from "../../utils/dementiaUtils";

const DementiaResultCard = (result) => {
  return (
    <div
      key={result.id}
      className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <User className="text-indigo-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {result.patientName}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  <span>{result.testDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity size={16} />
                  <span>
                    {result.age} yrs • {result.gender}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">Test ID:</span>
                  <span className="font-mono">
                    #DT{result?.id?.toString()?.padStart(4, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div
              className={`px-4 py-2 rounded-lg text-sm font-bold border-2 ${getRiskColor(result.riskLevel)}`}
            >
              {result.riskLevel} Risk
            </div>
            <button
              onClick={() => downloadPDF(result)}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition font-semibold shadow hover:shadow-lg"
            >
              <Download size={18} />
              Download Report
            </button>
          </div>
        </div>
        <div className="mb-6 bg-gray-50 rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="text-indigo-600" size={20} />
            <h4 className="font-bold text-gray-700">Cognitive Score</h4>
          </div>
          <div className="flex items-end gap-2 mb-3">
            <span
              className={`text-5xl font-bold ${getScoreColor(result.score)}`}
            >
              {result.score}
            </span>
            <span className="text-2xl text-gray-400 mb-1.5">/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${result.score >= 80 ? "bg-green-500" : result.score >= 60 ? "bg-amber-500" : "bg-red-500"}`}
              style={{ width: `${result.score}%` }}
            ></div>
          </div>
        </div>

        {/* Assessment Details */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-1.5 font-semibold uppercase tracking-wide">
              Memory Issues
            </p>
            <p className="font-bold text-gray-800 text-lg">
              {result.memoryIssues}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-1.5 font-semibold uppercase tracking-wide">
              Confusion Level
            </p>
            <p className="font-bold text-gray-800 text-lg">
              {result.confusionLevel}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-1.5 font-semibold uppercase tracking-wide">
              Orientation
            </p>
            <p className="font-bold text-gray-800 text-lg">
              {result.orientationIssues}
            </p>
          </div>
        </div>

        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="text-indigo-600" size={20} />
            <p className="text-sm text-indigo-900 font-bold uppercase tracking-wide">
              AI Analysis & Recommendations
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">{result.aiAnalysis}</p>
        </div>
      </div>
    </div>
  );
};

export default DementiaResultCard;
