import React from 'react';

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ProblemCard({ icon, title, description }: ProblemCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group">
      <div className="w-12 h-12 bg-red-900/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-800 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-300 transition-colors duration-300">{title}</h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{description}</p>
    </div>
  );
}
