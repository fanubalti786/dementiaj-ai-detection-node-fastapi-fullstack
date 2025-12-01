import { useState } from "react";
import { ClipboardList, Search } from "lucide-react";
import DementiaResultCard from "../../components/user/DementiaResultCard";

const mockResults = [
  {
    id: 1,
    patientName: "John Doe",
    age: 72,
    gender: "Male",
    testDate: "2024-11-28",
    memoryIssues: "Moderate",
    confusionLevel: "Medium",
    orientationIssues: "Occasional",
    aiAnalysis:
      "Patient shows moderate cognitive decline with memory lapses in recent events. Recommendation: Follow-up assessment in 3 months and consider cognitive therapy sessions.",
    riskLevel: "Medium",
    score: 65,
  },
  {
    id: 2,
    patientName: "Jane Smith",
    age: 68,
    gender: "Female",
    testDate: "2024-11-27",
    memoryIssues: "Mild",
    confusionLevel: "Low",
    orientationIssues: "None",
    aiAnalysis:
      "Patient demonstrates mild cognitive changes consistent with normal aging. Continue monitoring and encourage mental exercises and social engagement.",
    riskLevel: "Low",
    score: 82,
  },
  {
    id: 3,
    patientName: "Robert Johnson",
    age: 75,
    gender: "Male",
    testDate: "2024-11-26",
    memoryIssues: "Severe",
    confusionLevel: "High",
    orientationIssues: "Frequent",
    aiAnalysis:
      "Significant cognitive impairment detected. Immediate consultation with a neurologist recommended. Consider caregiver support and safety measures at home.",
    riskLevel: "High",
    score: 42,
  },
  {
    id: 4,
    patientName: "Mary Williams",
    age: 70,
    gender: "Female",
    testDate: "2024-11-25",
    memoryIssues: "Mild",
    confusionLevel: "Low",
    orientationIssues: "None",
    aiAnalysis:
      "Minimal cognitive concerns. Patient shows good retention and problem-solving abilities. Maintain healthy lifestyle and regular check-ups.",
    riskLevel: "Low",
    score: 88,
  },
  {
    id: 5,
    patientName: "David Brown",
    age: 78,
    gender: "Male",
    testDate: "2024-11-24",
    memoryIssues: "Moderate",
    confusionLevel: "Medium",
    orientationIssues: "Occasional",
    aiAnalysis:
      "Moderate cognitive impairment with notable decline in executive function. Recommend structured daily routine and regular cognitive exercises.",
    riskLevel: "Medium",
    score: 58,
  },
];

export default function MyResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results] = useState(mockResults);
  const filteredResults = results.filter(
    (result) =>
      result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.testDate.includes(searchTerm),
  );
  return (
    <div className="min-h-[90vh] w-full overflow-y-auto py-8 px-12">
      <div className="w-full mx-auto">
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
                  View and download your dementia test results
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Results</p>
              <p className="text-3xl font-bold text-indigo-600">
                {filteredResults.length}
              </p>
            </div>
          </div>
        </div>

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

        <div className="space-y-5 grid grid-cols-2 max-lg:grid-cols-1 gap-6">
          {filteredResults.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
              <ClipboardList className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No results found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            filteredResults.map((result) => (
              <DementiaResultCard result={result} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
