const getRiskColor = (risk) => {
  switch (risk) {
    case "Low":
      return "bg-green-100 text-green-800 border-green-300";
    case "Medium":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "High":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};
const getScoreColor = (score) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
};

export { getRiskColor, getScoreColor };
