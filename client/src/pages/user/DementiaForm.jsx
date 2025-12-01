import { useState } from "react";
import { ClipboardEdit, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { DementiaFormCom } from "../../components/user/DementiaFormCom";

export default function DementiaForm() {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    contactNumber: "",
    memoryIssues: "",
    confusionLevel: "",
    orientationIssues: "",
    languageDifficulties: "",
    dailyActivities: "",
    behavioralChanges: "",
    medicalHistory: "",
    additionalNotes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = () => {
    if (
      !formData.patientName ||
      !formData.age ||
      !formData.gender ||
      !formData.memoryIssues ||
      !formData.confusionLevel ||
      !formData.orientationIssues ||
      !formData.dailyActivities
    ) {
      setError("Please fill in all required fields");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      console.log("=== DEMENTIA TEST SUBMISSION ===");
      console.log("Form Data:", formData);
      console.log("Submission Time:", new Date().toISOString());
      console.log("================================");
      setLoading(false);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        setFormData({
          patientName: "",
          age: "",
          gender: "",
          contactNumber: "",
          memoryIssues: "",
          confusionLevel: "",
          orientationIssues: "",
          languageDifficulties: "",
          dailyActivities: "",
          behavioralChanges: "",
          medicalHistory: "",
          additionalNotes: "",
        });
        setSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-[90vh] w-full overflow-y-auto py-8 px-12">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center">
              <ClipboardEdit className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Submit Dementia Test
              </h1>
              <p className="text-gray-600 mt-1">
                Complete the cognitive assessment form below
              </p>
            </div>
          </div>
        </div>
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 rounded-lg p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <CheckCircle
                className="text-green-600 flex-shrink-0 mt-0.5"
                size={24}
              />
              <div>
                <h3 className="font-bold text-green-800 text-lg">
                  Test Submitted Successfully!
                </h3>
                <p className="text-green-700 mt-1">
                  Your dementia test has been submitted. Results will be
                  available in the "My Results" section shortly.
                </p>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle
                className="text-red-600 flex-shrink-0 mt-0.5"
                size={24}
              />
              <div>
                <h3 className="font-bold text-red-800 text-lg">
                  Submission Error
                </h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}
        <DementiaFormCom
          formData={formData}
          handleChange={handleChange}
          loading={loading}
        />

        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Note:</span> All fields marked
              with <span className="text-red-500">*</span> are required
            </p>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 active:bg-indigo-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Submitting...
                </>
              ) : (
                <>
                  <ClipboardEdit size={20} />
                  Submit Test
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
