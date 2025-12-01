import { User, Brain, FileText } from "lucide-react";

export function DementiaFormCom({ formData, handleChange, loading }) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-5 pb-3 ">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <User className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">
            Personal Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Patient Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              placeholder="Enter full name"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              placeholder="Enter age"
              min="1"
              max="120"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              disabled={loading}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              placeholder="Enter contact number"
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-5 pb-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Brain className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">
            Cognitive Assessment
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Memory Issues <span className="text-red-500">*</span>
            </label>
            <select
              name="memoryIssues"
              value={formData.memoryIssues}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              disabled={loading}
            >
              <option value="">Select level</option>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confusion Level <span className="text-red-500">*</span>
            </label>
            <select
              name="confusionLevel"
              value={formData.confusionLevel}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              disabled={loading}
            >
              <option value="">Select level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Orientation Issues <span className="text-red-500">*</span>
            </label>
            <select
              name="orientationIssues"
              value={formData.orientationIssues}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              disabled={loading}
            >
              <option value="">Select level</option>
              <option value="none">None</option>
              <option value="occasional">Occasional</option>
              <option value="frequent">Frequent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Language Difficulties
            </label>
            <select
              name="languageDifficulties"
              value={formData.languageDifficulties}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              disabled={loading}
            >
              <option value="">Select level</option>
              <option value="none">None</option>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-5 pb-3 ">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <FileText className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">
            Additional Information
          </h2>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Daily Activities Impact <span className="text-red-500">*</span>
            </label>
            <textarea
              name="dailyActivities"
              value={formData.dailyActivities}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition resize-none"
              rows="4"
              placeholder="Describe how symptoms affect daily activities (cooking, dressing, managing finances, etc.)"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Behavioral Changes
            </label>
            <textarea
              name="behavioralChanges"
              value={formData.behavioralChanges}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition resize-none"
              rows="3"
              placeholder="Any mood swings, aggression, anxiety, or personality changes"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Medical History
            </label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition resize-none"
              rows="3"
              placeholder="Previous diagnoses, medications, family history of dementia"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition resize-none"
              rows="3"
              placeholder="Any other observations or concerns"
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
