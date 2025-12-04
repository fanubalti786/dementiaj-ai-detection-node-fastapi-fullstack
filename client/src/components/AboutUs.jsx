import React, { useState } from "react";
import { Clock, Target, Zap, Shield, Sparkles, Brain, Heart, ArrowRight, CheckCircle, Lock, Users, Globe, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router

export default function AboutUs() {
  const navigate = useNavigate();
  const [showLearnMore, setShowLearnMore] = useState(false);

  const sections = [
    {
      icon: Target,
      title: "Our Mission",
      description: "Our goal is to provide helpful insights through AI-based screening tools that guide users toward early detection. While our platform does not replace medical diagnosis, it empowers people to take the first step toward better mental health awareness.",
      bgColor: "from-primary to-primary/80",
      accentColor: "text-primary"
    },
    {
      icon: Zap,
      title: "How We Work",
      description: "We combine AI models, clinical patterns, and user-friendly design to create a smooth, accurate, and secure tool for dementia screening. Users answer a series of guided questions, and the system analyzes potential cognitive indicators.",
      bgColor: "from-indigo-600 to-purple-600",
      accentColor: "text-indigo-600"
    },
    {
      icon: Shield,
      title: "Data Privacy",
      description: "Your data is encrypted and fully protected. We strongly value user privacy and do not share information with any third parties. All results are confidential and stored securely.",
      bgColor: "from-violet-600 to-primary",
      accentColor: "text-violet-600"
    },
    {
      icon: Sparkles,
      title: "Our Vision",
      description: "To build accessible AI tools that support early mental health awareness worldwide and assist caregivers, families, and individuals in taking informed steps toward better well-being.",
      bgColor: "from-blue-600 to-primary",
      accentColor: "text-blue-600"
    }
  ];

  const stats = [
    { value: "99%", label: "Accuracy Rate", icon: Brain },
    { value: "50K+", label: "Screenings Completed", icon: Heart },
    { value: "24/7", label: "Availability", icon: Globe },
    { value: "100%", label: "Privacy Protected", icon: Lock }
  ];

  const screeningSteps = [
    {
      step: 1,
      title: "Quick Registration",
      description: "Create your secure account in under 2 minutes",
      icon: Users
    },
    {
      step: 2,
      title: "Answer Questions",
      description: "Complete our scientifically-validated questionnaire",
      icon: FileText
    },
    {
      step: 3,
      title: "AI Analysis",
      description: "Our AI analyzes responses using clinical patterns",
      icon: Brain
    },
    {
      step: 4,
      title: "Get Results",
      description: "Receive detailed report with next-step recommendations",
      icon: CheckCircle
    }
  ];

  const learnMoreContent = {
    features: [
      "AI-powered cognitive assessment",
      "Based on clinically validated MMSE & MoCA frameworks",
      "Personalized recommendations",
      "Progress tracking over time",
      "Caregiver support resources",
      "Professional consultation referrals"
    ],
    faqs: [
      {
        q: "Is this a medical diagnosis?",
        a: "No, this is a screening tool for early detection. Always consult a healthcare professional for diagnosis."
      },
      {
        q: "How long does screening take?",
        a: "Approximately 10-15 minutes for the complete assessment."
      },
      {
        q: "Is my data secure?",
        a: "Yes, all data is encrypted and we comply with HIPAA privacy standards."
      }
    ]
  };

  // Navigation handlers
  const handleStartScreening = () => {
    navigate("/login");
    
  };

  

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-primary/5 to-violet-5 rounded-b-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-indigo-5 to-transparent rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              About Our Platform
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Empowering Mental Health
            <span className="block text-3xl md:text-4xl lg:text-5xl font-normal text-primary mt-2">
              Through AI Innovation
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            We built this platform to help individuals and families easily detect
            early signs of dementia using modern AI technology. Our mission is to
            make mental health screening simple, accessible, and trustworthy for
            everyone.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center p-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg mb-4 border border-gray-100">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-primary/20 overflow-hidden"
              >
                {/* Subtle Gradient Background */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${section.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-2xl`} 
                />
                
                {/* Professional icon container */}
                <div className="relative flex items-start mb-6">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${section.bgColor} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-6">
                    <h3 className={`text-2xl font-bold text-gray-900 mb-3 group-hover:${section.accentColor} transition-colors duration-300`}>
                      {section.title}
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-gray-200 to-gray-300 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-violet-600 transition-all duration-500" />
                  </div>
                </div>

                {/* Content */}
                <p className="relative text-gray-600 leading-relaxed text-lg">
                  {section.description}
                </p>

                {/* Professional bottom border effect */}
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-primary to-violet-600 transition-all duration-700" />
              </div>
            );
          })}
        </div>

        {/* How It Works Section - For "Learn More" */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How Our Screening Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {screeningSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-primary to-violet-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Section - Updated */}
<div className="bg-gradient-to-r from-primary/5 to-blue-5 rounded-2xl p-8 md:p-10 text-center border border-gray-100 shadow-sm">
  <div className="max-w-2xl mx-auto">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
      <Brain className="w-8 h-8 text-primary" />
    </div>
    
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
      Start Your Cognitive Health Assessment
    </h2>
    
    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
      Take our 10-minute AI-powered screening to identify early signs of cognitive changes.
      Get instant insights and personalized recommendations.
    </p>
    
    {/* Single Primary Button */}
    <div className="flex justify-center">
      <button 
        className="group px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold 
          rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 
          hover:-translate-y-0.5 inline-flex items-center gap-3 text-lg"
          onClick={handleStartScreening}
      >
        <Brain className="w-5 h-5" />
        Begin Free Screening Now
        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
    
    {/* Additional Info - Compact */}
    <div className="mt-8 pt-6 border-t border-gray-100">
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <span className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          10-15 minutes
        </span>
        <span className="flex items-center gap-2 text-gray-600">
          <Shield className="w-4 h-4" />
          100% Private
        </span>
        <span className="flex items-center gap-2 text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Free assessment
        </span>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}