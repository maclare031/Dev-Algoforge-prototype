"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  ExternalLink,
  Map,
  BookOpenCheck,
  BarChart3,
  Brain as BrainIcon,
  GitBranch,
  Cpu,
  Code,
  Monitor,
  LucideIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface MindMapResource {
  title: string;
  description: string;
  icon: LucideIcon;
  mindMapUrl: string;
  category: string;
}

interface MindMapViewerProps {
  selectedMindMap?: string | null;
  onClose?: () => void;
  className?: string;
  showResourcesList?: boolean;
}

export function MindMapViewer({
  selectedMindMap,
  onClose,
  className = "",
  showResourcesList = true,
}: MindMapViewerProps) {
  const [currentMindMap, setCurrentMindMap] = useState<string | null>(selectedMindMap || null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResource, setSelectedResource] = useState<MindMapResource | null>(null);
  const [showResourcesPanel, setShowResourcesPanel] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Mind Map Learning Resources Data
  const mindMapResources: MindMapResource[] = [
    {
      title: "All Learning Paths",
      description: "Complete overview of all learning paths and career trajectories",
      icon: BookOpenCheck,
      mindMapUrl: "https://atlas.mindmup.com/2025/08/7591fc60736811f09a99ed5e62fa3989/practical_data_science_note_for_ai_de/index.html",
      category: "Overview"
    },
    {
      title: "Data Science Workflow: CRISP-ML(Q)",
      description: "End-to-end data science methodology and best practices",
      icon: BarChart3,
      mindMapUrl: "https://atlas.mindmup.com/2025/08/7591fc60736811f09a99ed5e62fa3989/practical_data_science_note_for_ai_de/index.html",
      category: "Data Science"
    },
    {
      title: "Data Analytics Workflow",
      description: "Analytics process, tools, and implementation strategies",
      icon: BarChart3,
      mindMapUrl: "https://atlas.mindmup.com/2025/08/7591fc60736811f09a99ed5e62fa3989/practical_data_science_note_for_ai_de/index.html",
      category: "Data Analytics"
    },
    {
      title: "Practical AI and Deep Learning",
      description: "AI/ML implementation strategies and neural networks",
      icon: BrainIcon,
      mindMapUrl: "https://atlas.mindmup.com/2025/08/7591fc60736811f09a99ed5e62fa3989/practical_data_science_note_for_ai_de/index.html",
      category: "AI/ML"
    },
    {
      title: "Data Engineering",
      description: "Data pipeline architecture and infrastructure design",
      icon: GitBranch,
      mindMapUrl: "https://atlas.mindmup.com/2025/08/7591fc60736811f09a99ed5e62fa3989/practical_data_science_note_for_ai_de/index.html",
      category: "Engineering"
    },
    {
      title: "MLOps",
      description: "ML operations, deployment, and production workflows",
      icon: Cpu,
      mindMapUrl: "https://atlas.mindmup.com/2025/08/7591fc60736811f09a99ed5e62fa3989/practical_data_science_note_for_ai_de/index.html",
      category: "Operations"
    },
    {
      title: "Python Programming Fundamentals",
      description: "Core Python concepts, syntax, and best practices",
      icon: Code,
      mindMapUrl: "https://atlas.mindmup.com/2025/08/7591fc60736811f09a99ed5e62fa3989/practical_data_science_note_for_ai_de/index.html",
      category: "Programming"
    },
    {
      title: "R Programming Fundamentals",
      description: "Statistical computing and data analysis with R",
      icon: Code,
      mindMapUrl: "https://atlas.mindmup.com/2025/08/7591fc60736811f09a99ed5e62fa3989/practical_data_science_note_for_ai_de/index.html",
      category: "Programming"
    },
    {
      title: "Python and R Packages",
      description: "Essential libraries, frameworks, and package ecosystem",
      icon: Code,
      mindMapUrl: "https://atlas.mindmup.com/2025/08/7591fc60736811f09a99ed5e62fa3989/practical_data_science_note_for_ai_de/index.html",
      category: "Programming"
    },
    {
      title: "Power BI Excellence",
      description: "Microsoft Power BI reporting and business intelligence",
      icon: BarChart3,
      mindMapUrl: "https://atlas.mindmup.com/2025/08/7591fc60736811f09a99ed5e62fa3989/practical_data_science_note_for_ai_de/index.html",
      category: "Visualization"
    },
    {
      title: "Full Stack Web Development",
      description: "Frontend and backend development technologies",
      icon: Monitor,
      mindMapUrl: "https://atlas.mindmup.com/2025/08/7591fc60736811f09a99ed5e62fa3989/practical_data_science_note_for_ai_de/index.html",
      category: "Web Development"
    },
    {
      title: "Machine Learning with Python & R",
      description: "ML algorithms, implementations, and model deployment",
      icon: BrainIcon,
      mindMapUrl: "https://atlas.mindmup.com/2025/08/7591fc60736811f09a99ed5e62fa3989/practical_data_science_note_for_ai_de/index.html",
      category: "AI/ML"
    },
  ];

  // Group resources by category
  const groupedResources = mindMapResources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as { [key: string]: MindMapResource[] });

  useEffect(() => {
    if (selectedMindMap) {
      setCurrentMindMap(selectedMindMap);
      const resource = mindMapResources.find(r => r.mindMapUrl === selectedMindMap);
      setSelectedResource(resource || null);
      setIsLoading(true);
    }
  }, [selectedMindMap]);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleResourceSelect = (resource: MindMapResource) => {
    setIsLoading(true);
    setCurrentMindMap(resource.mindMapUrl);
    setSelectedResource(resource);
  };

  const handleClose = () => {
    setCurrentMindMap(null);
    setSelectedResource(null);
    setIsFullscreen(false);
    if (onClose) onClose();
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Force iframe reload by changing src
    const iframe = document.getElementById('mindmap-iframe') as HTMLIFrameElement;
    if (iframe && currentMindMap) {
      iframe.src = currentMindMap + '?t=' + Date.now();
    }
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleOpenExternal = () => {
    if (currentMindMap) {
      window.open(currentMindMap, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`${className} ${isFullscreen ? 'fixed inset-0 z-50 bg-black/95' : 'relative'}`}>
      {/* Responsive Header */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-purple-400/20 rounded-t-2xl p-3 md:p-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
            <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-br from-purple-500/25 to-pink-500/25 flex-shrink-0">
              <Map className="w-4 h-4 md:w-5 md:h-5 text-purple-300" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm md:text-xl font-bold text-white truncate">
                {isMobile ? 'Mind Maps' : 'Interactive Mind Maps'}
              </h2>
              {selectedResource && !isMobile && (
                <p className="text-xs md:text-sm text-purple-300 mt-1 truncate">
                  {selectedResource.title}
                </p>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
            {!currentMindMap && showResourcesList && (
              <Button
                onClick={() => setShowResourcesPanel(!showResourcesPanel)}
                variant="outline"
                size="sm"
                className="border-purple-400/30 text-purple-300 hover:bg-purple-500/10 md:hidden"
              >
                {showResourcesPanel ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            )}
            
            {currentMindMap && (
              <>
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  size="sm"
                  className="border-purple-400/30 text-purple-300 hover:bg-purple-500/10 p-2"
                  title="Refresh"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                
                {/* <Button
                  onClick={handleOpenExternal}
                  variant="outline"
                  size="sm"
                  className="border-purple-400/30 text-purple-300 hover:bg-purple-500/10 p-2"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button> */}

                <Button
                  onClick={handleFullscreen}
                  variant="outline"
                  size="sm"
                  className="border-purple-400/30 text-purple-300 hover:bg-purple-500/10 p-2"
                  title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
              </>
            )}

            <Button
              onClick={handleClose}
              variant="outline"
              size="sm"
              className="border-red-400/30 text-red-300 hover:bg-red-500/10 p-2"
              title="Close"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-black/95 backdrop-blur-xl border-x border-b border-purple-400/20 rounded-b-2xl overflow-hidden">
        {!currentMindMap && showResourcesList ? (
          /* Resource Selection - Responsive Design */
          <div className={`transition-all duration-300 ${isMobile && !showResourcesPanel ? 'hidden' : 'block'}`}>
            <div className="p-3 md:p-6">
              <div className="mb-4 md:mb-6 text-center">
                <p className="text-gray-400 text-xs md:text-sm max-w-2xl mx-auto">
                  {isMobile ? 'Select a learning topic to explore' : 'Explore comprehensive learning paths through interactive mind maps'}
                </p>
              </div>
              
              <div className="space-y-4 md:space-y-6">
                {Object.entries(groupedResources).map(([category, resources]) => (
                  <div key={category}>
                    <h3 className="text-sm md:text-lg font-semibold text-purple-300 mb-3 md:mb-4 flex items-center gap-2">
                      <div className="w-1 h-4 md:h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                      {category}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                      {resources.map((resource, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            handleResourceSelect(resource);
                            setShowResourcesPanel(false);
                          }}
                          className="group relative p-3 md:p-4 rounded-xl bg-gradient-to-r from-purple-500/8 to-pink-500/8 border border-purple-500/25 hover:border-purple-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <div className="flex items-start space-x-2 md:space-x-3">
                            <div className="p-2 md:p-2.5 rounded-lg bg-gradient-to-br from-purple-500/25 to-pink-500/25 group-hover:from-purple-400/35 group-hover:to-pink-400/35 transition-all duration-300 flex-shrink-0">
                              <resource.icon className="w-4 h-4 md:w-5 md:h-5 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-semibold group-hover:text-purple-200 transition-colors duration-300 text-xs md:text-sm leading-tight mb-1 md:mb-2">
                                {resource.title}
                              </h4>
                              <p className="text-xs text-gray-400 leading-relaxed mb-2 md:mb-3 line-clamp-2">
                                {resource.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-1 bg-gray-800/60 text-gray-300 rounded text-xs">
                                  {resource.category}
                                </span>
                                <div className="flex items-center text-xs text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                                  <Map className="w-3 h-3 mr-1" />
                                  <span className="hidden sm:inline">Open</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : currentMindMap ? (
          /* Mind Map Viewer - Responsive */
          <div 
            className="relative" 
            style={{ 
              height: isFullscreen 
                ? 'calc(100vh - 60px)' 
                : isMobile 
                  ? '400px' 
                  : '600px'
            }}
          >
            {isLoading && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-purple-400 mx-auto mb-2 md:mb-4"></div>
                  <p className="text-purple-300 text-xs md:text-sm">Loading mind map...</p>
                </div>
              </div>
            )}
            
            <iframe
              id="mindmap-iframe"
              src={currentMindMap}
              className="w-full h-full border-0 rounded-b-2xl"
              title="Interactive Mind Map"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              allow="fullscreen"
            />
          </div>
        ) : (
          /* Empty State - Responsive */
          <div className="p-6 md:p-12 text-center">
            <div className="p-4 md:p-6 rounded-full bg-gradient-to-br from-purple-500/25 to-pink-500/25 inline-block mb-4 md:mb-6">
              <Map className="w-8 h-8 md:w-12 md:h-12 text-purple-300" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
              No Mind Map Selected
            </h3>
            <p className="text-gray-400 mb-4 md:mb-6 max-w-md mx-auto text-sm md:text-base">
              {isMobile ? 'Select a topic above to start exploring' : 'Choose a learning resource to get started'}
            </p>
            <Button
              onClick={() => {
                handleResourceSelect(mindMapResources[0]);
                setShowResourcesPanel(false);
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-medium px-4 md:px-6 py-2 md:py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 text-sm md:text-base"
            >
              <Map className="w-4 h-4 mr-2" />
              Start Exploring
            </Button>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (max-width: 768px) {
          .line-clamp-2 {
            -webkit-line-clamp: 1;
          }
        }
        
        .grid::-webkit-scrollbar {
          width: 4px;
        }
        .grid::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.3);
          border-radius: 2px;
        }
        .grid::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 2px;
        }
        .grid::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
      `}</style>
    </div>
  );
}
