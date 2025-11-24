import React from "react";
import { Target, Zap, Shield, Sparkles } from "lucide-react";

export default function AboutUs() {
  const sections = [
    {
      icon: Target,
      title: "Our Mission",
      description: "Our goal is to provide helpful insights through AI-based screening tools that guide users toward early detection. While our platform does not replace medical diagnosis, it empowers people to take the first step toward better mental health awareness.",
      bgColor: "from-primary/90 to-primary",
      accentColor: "bg-primary/20"
    },
    {
      icon: Zap,
      title: "How We Work",
      description: "We combine AI models, clinical patterns, and user-friendly design to create a smooth, accurate, and secure tool for dementia screening. Users answer a series of guided questions, and the system analyzes potential cognitive indicators.",
      bgColor: "from-indigo-500 to-purple-600",
      accentColor: "bg-indigo-100"
    },
    {
      icon: Shield,
      title: "Data Privacy",
      description: "Your data is encrypted and fully protected. We strongly value user privacy and do not share information with any third parties. All results are confidential and stored securely.",
      bgColor: "from-violet-500 to-primary",
      accentColor: "bg-violet-100"
    },
    {
      icon: Sparkles,
      title: "Our Vision",
      description: "To build accessible AI tools that support early mental health awareness worldwide and assist caregivers, families, and individuals in taking informed steps toward better well-being.",
      bgColor: "from-blue-500 to-primary",
      accentColor: "bg-blue-100"
    }
  ];

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 animate-pulse">
            <span className="bg-gradient-to-r from-primary to-violet-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg">
              About Us
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold mb-2 text-black/70">
            Empowering Mental Health
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            We built this platform to help individuals and families easily detect
            early signs of dementia using modern AI technology. Our mission is to
            make mental health screening simple, accessible, and trustworthy for
            everyone.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/30 overflow-hidden"
              >
                {/* Colorful Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${section.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                
                {/* Animated Glow Effect */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${section.bgColor} opacity-20 rounded-full blur-3xl group-hover:opacity-30 transition-all duration-500`} />
                
                {/* Icon with Gradient */}
                <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${section.bgColor} mb-5 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="relative text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                  {section.title}
                </h3>
                <p className="relative text-gray-600 leading-relaxed">
                  {section.description}
                </p>

                {/* Decorative Corner Element */}
                <div className={`absolute bottom-0 right-0 w-24 h-24 ${section.accentColor} rounded-tl-full opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
       
      </div>
    </div>
  );
}