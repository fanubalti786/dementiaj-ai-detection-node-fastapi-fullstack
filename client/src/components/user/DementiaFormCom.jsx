import { Brain } from "lucide-react";
import { User, Activity } from "lucide-react";

export default function DementiaFormCom({ formData, handleChange, loading }) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-5 pb-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <User className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">
            Patient Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="Gender"
              value={formData.Gender}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              disabled={loading}
            >
              <option value="">Select gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="Age"
              value={formData.Age}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              placeholder="Enter age (40-120)"
              min="40"
              max="120"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Years of Education <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="EDUC"
              value={formData.EDUC}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              placeholder="Years of education"
              min="0"
              max="30"
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
            Clinical Assessment
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              MMSE Score <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="MMSE"
              value={formData.MMSE}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              placeholder="Mini Mental Score (0-30)"
              min="0"
              max="30"
              step="1"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Mini Mental State Examination score
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              CDR <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="CDR"
              value={formData.CDR}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              placeholder="Clinical Dementia Rating (0-3)"
              min="0"
              max="3"
              step="0.5"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Clinical Dementia Rating (0, 0.5, 1, 2, or 3)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-5 pb-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Activity className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">
            Brain Imaging Measurements
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              eTIV <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="eTIV"
              value={formData.eTIV}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              placeholder="Estimated Total Intracranial Volume"
              step="0.01"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Estimated Total Intracranial Volume (cm³)
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              nWBV <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="nWBV"
              value={formData.nWBV}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              placeholder="Normalized Whole Brain Volume"
              step="0.0001"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Normalized Whole Brain Volume (ratio)
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ASF <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="ASF"
              value={formData.ASF}
              onChange={(e) => handleChange(e.target)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
              placeholder="Atlas Scaling Factor"
              step="0.0001"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">Atlas Scaling Factor</p>
          </div>
        </div>
      </div>
    </div>
  );
}
