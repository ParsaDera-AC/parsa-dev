"use client";

import { motion } from "framer-motion";
import { FaUserFriends, FaLightbulb, FaComments, FaClock, FaChartLine, FaTools } from "react-icons/fa";

const SoftSkills = () => {
  const skills = [
    {
      icon: <FaUserFriends className="text-blue-400" />,
      title: "Leadership & Collaboration",
      description: "Proven track record of leading technical initiatives and collaborating across government agencies",
      keywords: ["Technical Coaching", "Cross-Agency Collaboration", "Team Leadership"],
    },
    {
      icon: <FaLightbulb className="text-yellow-400" />,
      title: "Problem Solving",
      description: "Strong analytical mindset demonstrated through complex application development and automation",
      keywords: ["Technical Analysis", "Process Automation", "Innovation"],
    },
    {
      icon: <FaComments className="text-green-400" />,
      title: "Technical Communication",
      description: "Expert at translating complex technical concepts and writing comprehensive documentation",
      keywords: ["Technical Documentation", "Client Relations", "Knowledge Transfer"],
    },
    {
      icon: <FaClock className="text-purple-400" />,
      title: "Project Management",
      description: "Experienced in Agile methodologies and managing multiple critical applications",
      keywords: ["Agile/Scrum", "Resource Planning", "Deadline Management"],
    },
    {
      icon: <FaChartLine className="text-pink-400" />,
      title: "Data Analysis",
      description: "Strong analytical skills in data visualization and statistical analysis",
      keywords: ["Risk Analysis", "Data Visualization", "Statistical Modeling"],
    },
    {
      icon: <FaTools className="text-indigo-400" />,
      title: "Technical Adaptability",
      description: "Proven ability to quickly master new technologies and frameworks",
      keywords: ["Multi-platform", "Quick Learning", "Technology Integration"],
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
        >
          Professional Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 rounded-xl bg-black/40 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-xl">{skill.icon}</div>
                <h3 className="text-lg font-semibold text-white">{skill.title}</h3>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">{skill.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {skill.keywords.map((keyword, keyIndex) => (
                  <motion.span
                    key={keyIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + keyIndex * 0.1 }}
                    className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-gray-700 hover:border-gray-500 transition-colors duration-300"
                  >
                    {keyword}
                  </motion.span>
                ))}
              </div>
              
              {/* Subtle hover effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftSkills; 