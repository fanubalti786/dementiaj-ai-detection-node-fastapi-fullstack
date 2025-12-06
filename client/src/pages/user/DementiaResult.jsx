import { useState, useEffect } from "react";
import { ClipboardList, Search } from "lucide-react";
import DementiaResultCard from "../../components/user/DementiaResultCard";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const mapAnalysisToResult = (analysis) => {
  const { inputData, results, analyzedAt, _id } = analysis;
  console.log(results)

  return {
    id: _id,
    patientName: `Patient #${_id.slice(-6).toUpperCase()}`, // or add real name later
    age: inputData.Age,
    gender: inputData.Gender === "M" ? "Male" : "Female",
    testDate: formatDate(analyzedAt),
    riskLevel:results.dementia_severity,
    score: inputData.MMSE ? Math.round((inputData.MMSE / 30) * 100) : 50,
    memoryIssues: results.dementia_severity.includes("Severe")
      ? "Severe"
      : results.dementia_severity.includes("Moderate")
        ? "Moderate"
        : results.dementia_severity.includes("Mild")
          ? "Mild"
          : "None",
    confusionLevel: results.dementia_severity.includes("Severe")
      ? "High"
      : results.dementia_severity === "Moderate"
        ? "Medium"
        : "Low",
    orientationIssues: results.dementia_severity.includes("Severe")
      ? "Frequent"
      : results.dementia_severity === "Moderate"
        ? "Occasional"
        : "None",
    aiAnalysis: results.short_summary || results.diagnosis_reason,
    inputData, // Pass full input
    results, // Pass full results
    fullReport: results.full_markdown_report,
  };
};

export default function MyResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // adjust based on your auth method

        const response = await fetch(
          "http://localhost:3000/api/v1/user/analyses/get",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch analyses: ${response.status} ${response.statusText}`,
          );
        }

        const { data } = await response.json();
        console.log(data);
        const mappedResults = data?.map(mapAnalysisToResult);
        setResults(mappedResults);
      } catch (err) {
        console.error("Failed to fetch analyses:", err);
        setError(err.message || "Failed to load results");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []);

  const filteredResults = results.filter(
    (result) =>
      result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.testDate.includes(searchTerm),
  );

  return (
    <div className="min-h-[90vh] w-full overflow-y-auto py-8 px-12">
      <div className="w-full mx-auto ">
        <div className="mb-12">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center">
                <ClipboardList className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  My Test Results
                </h1>
                <p className="text-gray-600 mt-1">
                  View and download your dementia assessment results
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Results</p>
              <p className="text-3xl font-bold text-indigo-600">
                {loading ? "-" : filteredResults.length}
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              placeholder="Search by patient name or date..."
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading your results...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredResults.length === 0 ? (
              <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
                <ClipboardList
                  className="mx-auto text-gray-300 mb-4"
                  size={64}
                />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria
                </p>
              </div>
            ) : (
              filteredResults.map((result) => (
                <DementiaResultCard key={result.id} result={result} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
