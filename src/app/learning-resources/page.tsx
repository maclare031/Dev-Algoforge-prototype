"use client";

import { MindMapViewer } from "@/components/MindMapViewer";
import { Navigation } from "@/components/navigation";
import { 
  BookOpenCheck,
  BarChart3,
  Brain as BrainIcon,
  GitBranch,
  Cpu,
  Code,
  Database,
  Monitor,
  LucideIcon
} from "lucide-react";

// Import the same data structure from MindMapViewer to ensure consistency
interface MindMapResource {
  title: string;
  description: string;
  icon: LucideIcon;
  mindMapUrl: string;
  category: string;
  tags?: string[];
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime?: string;
}

// This should match exactly with the data in MindMapViewer component
const mindMapResources: MindMapResource[] = [
  {
    title: "All Learning Paths",
    description: "Complete overview of all learning paths and career trajectories with interactive navigation",
    icon: BookOpenCheck,
    mindMapUrl: "https://atlas.mindmup.com/2025/08/7591fc60736811f09a99ed5e62fa3989/practical_data_science_note_for_ai_de/index.html",
    category: "Overview",
    tags: ["roadmap", "career", "planning"],
    difficulty: "Beginner",
    estimatedTime: "30 min"
  },
  {
    title: "Data Science Workflow: CRISP-ML(Q)",
    description: "End-to-end data science methodology following industry-standard CRISP-ML(Q) framework",
    icon: BarChart3,
    mindMapUrl: "https://atlas.mindmup.com/2025/08/7591fc60736811f09a99ed5e62fa3989/practical_data_science_note_for_ai_de/index.html",
    category: "Data Science",
    tags: ["methodology", "workflow", "best-practices"],
    difficulty: "Intermediate",
    estimatedTime: "45 min"
  },
  {
    title: "Data Analytics Workflow",
    description: "Comprehensive analytics process covering data collection, analysis, and visualization strategies",
    icon: BarChart3,
    mindMapUrl: "https://atlas.mindmup.com/2025/08/7591fc60736811f09a99ed5e62fa3989/practical_data_science_note_for_ai_de/index.html",
    category: "Data Analytics",
    tags: ["analytics", "visualization", "reporting"],
    difficulty: "Intermediate",
    estimatedTime: "40 min"
  },
  {
    title: "Practical AI and Deep Learning",
    description: "Hands-on AI/ML implementation with neural networks, deep learning architectures, and practical applications",
    icon: BrainIcon,
    mindMapUrl: "https://www.mindmup.com/map/ai-deep-learning",
    category: "AI/ML",
    tags: ["neural-networks", "deep-learning", "tensorflow", "pytorch"],
    difficulty: "Advanced",
    estimatedTime: "60 min"
  },
  {
    title: "Data Engineering",
    description: "Modern data pipeline architecture, ETL processes, and scalable infrastructure design patterns",
    icon: GitBranch,
    mindMapUrl: "https://www.mindmup.com/map/data-engineering",
    category: "Engineering",
    tags: ["pipelines", "ETL", "architecture", "scalability"],
    difficulty: "Advanced",
    estimatedTime: "50 min"
  },
  {
    title: "MLOps",
    description: "Machine learning operations covering CI/CD, model versioning, monitoring, and production deployment",
    icon: Cpu,
    mindMapUrl: "https://www.mindmup.com/map/mlops",
    category: "Operations",
    tags: ["deployment", "monitoring", "devops", "automation"],
    difficulty: "Advanced",
    estimatedTime: "55 min"
  },
  {
    title: "Python Programming Fundamentals",
    description: "Core Python concepts, syntax, OOP principles, and development best practices",
    icon: Code,
    mindMapUrl: "https://www.mindmup.com/map/python-fundamentals",
    category: "Programming",
    tags: ["python", "fundamentals", "OOP", "syntax"],
    difficulty: "Beginner",
    estimatedTime: "35 min"
  },
  {
    title: "R Programming Fundamentals",
    description: "Statistical computing, data manipulation, and advanced analytics using R programming language",
    icon: Code,
    mindMapUrl: "https://www.mindmup.com/map/r-fundamentals",
    category: "Programming",
    tags: ["R", "statistics", "data-analysis"],
    difficulty: "Beginner",
    estimatedTime: "35 min"
  },
  {
    title: "Python and R Packages",
    description: "Essential libraries ecosystem including pandas, numpy, scikit-learn, tidyverse, and more",
    icon: Database,
    mindMapUrl: "https://www.mindmup.com/map/python-r-packages",
    category: "Programming",
    tags: ["libraries", "packages", "ecosystem"],
    difficulty: "Intermediate",
    estimatedTime: "40 min"
  },
  {
    title: "Power BI Excellence",
    description: "Advanced Power BI techniques for business intelligence, DAX formulas, and dashboard design",
    icon: BarChart3,
    mindMapUrl: "https://www.mindmup.com/map/power-bi",
    category: "Visualization",
    tags: ["power-bi", "dashboards", "DAX", "reporting"],
    difficulty: "Intermediate",
    estimatedTime: "45 min"
  },
  {
    title: "Full Stack Web Development",
    description: "Modern web development stack covering React, Node.js, databases, and deployment strategies",
    icon: Monitor,
    mindMapUrl: "https://www.mindmup.com/map/full-stack-dev",
    category: "Web Development",
    tags: ["react", "nodejs", "full-stack", "deployment"],
    difficulty: "Advanced",
    estimatedTime: "65 min"
  },
  {
    title: "Machine Learning with Python & R",
    description: "Comprehensive ML algorithms implementation, model selection, evaluation, and deployment strategies",
    icon: BrainIcon,
    mindMapUrl: "https://www.mindmup.com/map/ml-python-r",
    category: "AI/ML",
    tags: ["machine-learning", "algorithms", "model-evaluation"],
    difficulty: "Intermediate",
    estimatedTime: "50 min"
  },
];

export default function LearningResourcesPage() {
  // Generate dynamic category data from the actual resources
  const getCategoryData = () => {
    const categoryCount = mindMapResources.reduce((acc, resource) => {
      acc[resource.category] = (acc[resource.category] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const categoryColors = {
      "Overview": "from-blue-500 to-cyan-500",
      "Data Science": "from-green-500 to-emerald-500", 
      "Data Analytics": "from-teal-500 to-cyan-500",
      "AI/ML": "from-purple-500 to-pink-500",
      "Engineering": "from-orange-500 to-red-500",
      "Operations": "from-indigo-500 to-purple-500",
      "Programming": "from-yellow-500 to-orange-500",
      "Visualization": "from-rose-500 to-pink-500",
      "Web Development": "from-emerald-500 to-teal-500"
    };

    return Object.entries(categoryCount).map(([category, count]) => ({
      name: category,
      count: `${count} map${count > 1 ? 's' : ''}`,
      color: categoryColors[category as keyof typeof categoryColors] || "from-gray-500 to-slate-500"
    }));
  };

  const categoryData = getCategoryData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-4 leading-tight">
              Learning Resources
            </h1>
            <p className="text-gray-200 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-4">
              Explore interactive mind maps for technology and data science learning paths
            </p>
          </div>
        </div>
      </div>

      {/* Mind Map Viewer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <MindMapViewer 
          showResourcesList={true}
          className="shadow-2xl"
        />
      </div>

      {/* Additional Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-gray-900/50 to-purple-900/50 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">How to Use Mind Maps</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Click on any topic card to open the interactive mind map</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use zoom and pan controls to navigate through the content</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Click the external link button for full-screen experience</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Explore related topics by following the connected nodes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use search and category filters to find specific topics</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Learning Categories</h2>
              <div className="grid grid-cols-2 gap-3">
                {categoryData.map((category, index) => (
                  <div key={index} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200">
                    <div className={`text-sm font-semibold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-1`}>
                      {category.name}
                    </div>
                    <div className="text-xs text-gray-400">{category.count}</div>
                  </div>
                ))}
              </div>
              
              {/* Category Summary */}
              <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <p className="text-sm text-purple-300 text-center">
                  <span className="font-semibold">{mindMapResources.length} total mind maps</span> across {categoryData.length} categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
