interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  problem: string;
  solution: string;
  result: string;
}

export default function SolutionCard({ icon, title, problem, solution, result }: SolutionCardProps) {
  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer group">
      <div className="w-16 h-16 bg-cyan-900/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-800 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-red-400 mb-2 group-hover:text-red-300 transition-colors duration-300">Problema</h4>
          <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">{problem}</p>
        </div>

        <div>
          <h4 className="font-semibold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors duration-300">SoluciÃ³n</h4>
          <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">{solution}</p>
        </div>

        <div>
          <h4 className="font-semibold text-green-400 mb-2 group-hover:text-green-300 transition-colors duration-300">Resultado</h4>
          <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">{result}</p>
        </div>
      </div>
    </div>
  );
}
