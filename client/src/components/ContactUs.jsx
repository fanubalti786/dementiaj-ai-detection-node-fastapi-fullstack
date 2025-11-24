import React, { useState } from "react";
import { Mail, User, MessageSquare, Send, Phone, MapPin, CheckCircle2 } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields");
      return;
    }
    
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    window.location.href = `mailto:support@dementiacare.com?subject=${subject}&body=${body}`;
    
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="w-full min-h-screen py-8 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Compact Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold mb-3">
            Contact
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Get in Touch
          </h1>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Have questions? We're here to help you with any inquiries.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Contact Form - Takes more space */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 text-center">We'll get back to you soon.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        placeholder="How can we help you?"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-sm"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info - Compact sidebar */}
          <div className="lg:col-span-2 space-y-4">
            {/* Email Card */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-primary/30 transition-all group">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Email</h3>
                  <a 
                    href="mailto:support@dementiacare.com" 
                    className="text-sm text-primary hover:text-primary/80 transition-colors break-all"
                  >
                    support@dementiacare.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-primary/30 transition-all group">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-100 group-hover:bg-indigo-200 transition-colors">
                  <Phone className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Phone</h3>
                  <a 
                    href="tel:+1234567890" 
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-primary/30 transition-all group">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-violet-100 group-hover:bg-violet-200 transition-colors">
                  <MapPin className="w-5 h-5 text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">Location</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    123 Health Street<br />
                    Medical District<br />
                    City, State 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}