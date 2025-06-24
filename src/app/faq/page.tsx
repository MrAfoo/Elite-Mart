
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaPaperPlane } from 'react-icons/fa';

export default function FAQ() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const questions = [
    {
      title: "Eu dictumst cum at sed euismod condimentum?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique sed tristique nulla vitae, consequat gravida sagittis."
    },
    {
      title: "Magna bibendum est fermentum eros?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique sed tristique nulla vitae, consequat gravida sagittis."
    },{
      title: "Odio muskana hak eris consequat scelerisque?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique sed tristique nulla vitae, consequat gravida sagittis."
    },
    {
      title: "Elit id blandit sabora bol velit qua maro?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique sed tristique nulla vitae, consequat gravida sagittis."
    },
  ];
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gradient-to-r from-[#F6F5FF] via-[#F8F7FF] to-[#F6F5FF]">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="container mx-auto h-full flex flex-col items-center justify-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <nav className="flex items-center space-x-2 text-sm font-medium">
            <span className="text-gray-600 hover:text-pink-500 cursor-pointer">Home</span>
            <span className="text-gray-400">/</span>
            <span className="text-pink-500">FAQs</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              General Information
            </h2>

            {questions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center"
                >
                  <h3 className="font-semibold text-lg text-gray-800">{question.title}</h3>
                  <FaChevronDown
                    className={`transform transition-transform duration-300 ${
                      activeQuestion === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeQuestion === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{question.content}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Ask a Question Form */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Ask a Question
              </h2>

              <form className="space-y-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name*"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  />
                  <input
                    type="email"
                    placeholder="Your Email*"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  />
                  <textarea
                    rows={5}
                    placeholder="Your Question*"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Send Question</span>
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {["/logz5.jpeg", "/logz1.jpeg", "/logz2.jpeg", "/logz4.jpeg", "/logz3.jpeg"].map((logo, index) => (
              <motion.img
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                src={logo}
                alt={`Partner ${index + 1}`}
                className="w-32 h-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}