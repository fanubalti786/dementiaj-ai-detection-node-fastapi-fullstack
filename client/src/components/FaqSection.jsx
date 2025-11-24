import React, { useState } from "react";

const faqs = [
  {
    question: "What is an AI Dementia Checker?",
    answer:
      "It is an AI-powered tool that analyzes user inputs (symptoms, behavior, or responses) to detect early signs of dementia and provide useful insights."
  },
  {
    question: "Can this AI diagnose dementia?",
    answer:
      "No. This tool cannot give a medical diagnosis. It only helps identify early indicators. For confirmation, always consult a medical professional."
  },
  {
    question: "How accurate is the analysis?",
    answer:
      "The system uses trained models and pattern recognition to provide highly accurate insights, but results may vary based on the quality of user inputs."
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes, all user data is encrypted and stored securely. No information is shared with third parties without your permission."
  },
  {
    question: "Who can use this tool?",
    answer:
      "Anyone worried about memory issues, caregivers, or those who want early screening for dementia can use this tool easily."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl bg-white shadow-sm"
          >
            {/* Question */}
            <button
              className="w-full text-left p-5 flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold text-primary">
                {faq.question}
              </h3>

              <span className="text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {/* Answer */}
            {openIndex === index && (
              <p className="px-5 pb-5 text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
