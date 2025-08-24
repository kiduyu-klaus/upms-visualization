import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Lock } from 'lucide-react';

const UPMsVisualization = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Scene configuration
  const scenes = [
    { title: "Problem & Motivation", duration: 25, phases: 3 },
    { title: "Pipeline Parallelism Setup", duration: 20, phases: 2 },
    { title: "Threat: Piecewise Sybil", duration: 20, phases: 3 },
    { title: "UPMs: Core Idea", duration: 30, phases: 4 },
    { title: "Cross-Time Incompatibility", duration: 25, phases: 2 },
    { title: "Valid Subfunctions", duration: 25, phases: 2 },
    { title: "Transformer Layers", duration: 15, phases: 2 },
    { title: "RMSNorm Tweak", duration: 15, phases: 2 },
    { title: "Functional Equivalence", duration: 15, phases: 1 },
    { title: "Inference Overheads", duration: 20, phases: 3 },
    { title: "Attacks", duration: 25, phases: 2 },
    { title: "Training Feasibility", duration: 15, phases: 1 },
    { title: "Takeaway", duration: 20, phases: 2 }
  ];

  // Auto-advance animation phases
  useEffect(() => {
    if (!isPlaying) return;

    const phaseInterval = scenes[currentScene].duration / scenes[currentScene].phases * 100;
    const timer = setInterval(() => {
      setSceneProgress(prev => {
        const newProgress = prev + 2;
        const newPhase = Math.floor(newProgress / phaseInterval);
        setAnimationPhase(Math.min(newPhase, scenes[currentScene].phases - 1));
        
        if (newProgress >= 100) {
          if (currentScene < scenes.length - 1) {
            setCurrentScene(curr => curr + 1);
            setSceneProgress(0);
            setAnimationPhase(0);
          } else {
            setIsPlaying(false);
          }
          return 0;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [isPlaying, currentScene, scenes]);

  // Color legend component
  const ColorLegend = () => (
    <div className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg text-sm z-50">
      <h4 className="font-bold mb-2">Legend</h4>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Honest Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Attacker</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span>Transform</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span>Data/Activations</span>
        </div>
      </div>
    </div>
  );

  // Scene 1: Problem & Motivation
  const Scene1 = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative">
        {animationPhase === 0 && (
          <div className="relative">
            <div className="w-64 h-32 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-2xl animate-pulse">
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold">
                💰 High Value
              </div>
            </div>
          </div>
        )}
        
        {animationPhase >= 1 && (
          <div className="grid grid-cols-4 gap-4">
            {Array.from({length: 8}).map((_, i) => (
              <div 
                key={i}
                className={`w-12 h-24 rounded shadow-lg transition-all duration-1000 ${
                  animationPhase >= 1 ? 'bg-blue-500 transform scale-100' : 'bg-blue-300 transform scale-0'
                }`}
              >
                <div className="text-xs text-white text-center pt-2">f{i+1}</div>
              </div>
            ))}
          </div>
        )}
        
        {animationPhase >= 2 && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700 font-semibold">Risk: Weight Materialization</p>
              <p className="text-red-600 text-sm">Anyone can reconstruct full model value</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Scene 2: Pipeline Parallelism Setup
  const Scene2 = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center gap-4">
        <div className="bg-gray-300 px-3 py-2 rounded font-mono">X₀</div>
        
        {Array.from({length: 5}).map((_, i) => (
          <React.Fragment key={i}>
            <div className={`transition-all duration-500 ${animationPhase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <svg width="40" height="20">
                <path d="M5 10 L35 10" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
                  </marker>
                </defs>
              </svg>
            </div>
            <div className="w-16 h-32 bg-blue-500 rounded shadow-lg flex items-center justify-center">
              <span className="text-white font-mono">f{i+1}</span>
            </div>
          </React.Fragment>
        ))}
        
        <div className={`transition-all duration-500 ${animationPhase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          <svg width="40" height="20">
            <path d="M5 10 L35 10" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead2)" />
            <defs>
              <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
              </marker>
            </defs>
          </svg>
        </div>
        <div className="bg-gray-300 px-3 py-2 rounded font-mono">Y</div>
      </div>
      
      <div className="mt-8 text-center">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-mono text-lg">F(X₀) = fₛ ∘ ... ∘ f₁(X₀)</p>
          <p className="text-sm text-gray-600 mt-2">Each participant holds only its local stage</p>
        </div>
      </div>
    </div>
  );

  // Scene 3: Threat - Piecewise Sybil
  const Scene3 = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-8">
        <div className="flex items-center gap-8">
          {[1, 2, 3].map(time => (
            <div key={time} className="text-center">
              <div className="font-bold text-lg mb-2">t{time}</div>
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {Array.from({length: 5}).map((_, i) => (
          <div 
            key={i}
            className={`w-16 h-32 rounded shadow-lg flex items-center justify-center transition-all duration-500 ${
              (animationPhase === 0 && i === 2) || 
              (animationPhase === 1 && i === 0) || 
              (animationPhase === 2 && i === 4)
                ? 'bg-red-500 ring-4 ring-red-300' 
                : 'bg-blue-500'
            }`}
          >
            <span className="text-white font-mono">f{i+1}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-orange-100 border-l-4 border-orange-500 p-4 rounded">
        <p className="text-orange-700 font-semibold">Attacker re-joins over time, collecting shards</p>
      </div>
    </div>
  );

  // Scene 4: UPMs Core Idea
  const Scene4 = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center gap-8">
        <div className="relative">
          <div className="w-20 h-32 bg-blue-500 rounded shadow-lg flex items-center justify-center">
            <span className="text-white font-mono">Stage i</span>
          </div>
          
          {animationPhase >= 2 && (
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-16 bg-purple-500 rounded animate-pulse"></div>
              <div className="text-xs text-center mt-1">T</div>
            </div>
          )}
          
          {animationPhase >= 3 && (
            <div className="absolute -right-8 top-full text-xs bg-white p-1 rounded shadow">
              Vᵢ ← Vᵢ * T
            </div>
          )}
        </div>
        
        {animationPhase >= 0 && animationPhase < 2 && (
          <div className="w-8 h-2 bg-gray-400 rounded flex items-center justify-center">
            <span className="text-xs">I</span>
          </div>
        )}
        
        {animationPhase >= 1 && animationPhase < 2 && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-2 bg-purple-400 rounded"></div>
            <span className="text-xs">*</span>
            <div className="w-6 h-2 bg-purple-300 rounded"></div>
          </div>
        )}
        
        <div className="relative">
          <div className="w-20 h-32 bg-blue-500 rounded shadow-lg flex items-center justify-center">
            <span className="text-white font-mono text-sm">Stage i+1</span>
          </div>
          
          {animationPhase >= 2 && (
            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-16 bg-purple-300 rounded animate-pulse"></div>
              <div className="text-xs text-center mt-1">T⁻¹</div>
            </div>
          )}
          
          {animationPhase >= 3 && (
            <div className="absolute -left-12 top-full text-xs bg-white p-1 rounded shadow">
              Uᵢ₊₁ ← T⁻¹ * Uᵢ₊₁
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-12 bg-purple-50 p-4 rounded-lg text-center">
        <p className="font-semibold">Insert I = T * T⁻¹, then fold</p>
        <p className="text-sm text-gray-600 mt-2">Function stays identical, weights become time-dependent</p>
      </div>
    </div>
  );

  // Scene 5: Cross-Time Incompatibility
  const Scene5 = () => (
    <div className="flex items-center justify-center h-full">
      <div className="grid grid-cols-2 gap-16">
        <div className="text-center">
          <h3 className="font-bold mb-4">Time t</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-24 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-sm">Stage i(t)</span>
            </div>
            <div className="w-16 h-24 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-sm">Stage i+1(t)</span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="font-bold mb-4">Time t'</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-24 bg-blue-400 rounded flex items-center justify-center">
              <span className="text-white text-sm">Stage i(t')</span>
            </div>
            <div className="w-16 h-24 bg-blue-400 rounded flex items-center justify-center">
              <span className="text-white text-sm">Stage i+1(t')</span>
            </div>
          </div>
        </div>
      </div>
      
      {animationPhase >= 1 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <svg width="200" height="100" className="absolute">
              <path 
                d="M50 50 Q100 20 150 50" 
                stroke="#7C3AED" 
                strokeWidth="3" 
                fill="none" 
                strokeDasharray="10,5"
              />
            </svg>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-purple-100 px-3 py-1 rounded">
              <span className="text-sm">T̂ = ?</span>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <span className="text-4xl text-red-500">✗</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-red-50 p-4 rounded-lg">
        <p className="text-red-700 text-center">
          Need T̂ = Tᵢ(t+1) ... Tᵢ(t') - Unknown!
        </p>
      </div>
    </div>
  );

  // Scene 6: Valid Subfunctions
  const Scene6 = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative bg-blue-100 rounded-lg p-8">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="bg-gray-300 px-3 py-2 rounded font-mono text-sm">Uᵢ</div>
            <div className="text-xs mt-1">entry</div>
          </div>
          
          <div className="w-24 h-16 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-mono">Φᵢ</span>
          </div>
          
          <div className="text-center">
            <div className="bg-gray-300 px-3 py-2 rounded font-mono text-sm">Vᵢ</div>
            <div className="text-xs mt-1">exit</div>
          </div>
        </div>
        
        <svg width="100%" height="60" className="absolute top-0 left-0">
          <path d="M40 30 L320 30" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrow)" />
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
            </marker>
          </defs>
        </svg>
      </div>
      
      <div className="mt-8 bg-indigo-50 p-6 rounded-lg text-center">
        <div className="font-mono text-lg mb-2">gᵢ(X) = Φᵢ(X · Uᵢ) · Vᵢ</div>
        <p className="text-sm text-gray-600">
          Valid subfunctions have clear entry and exit matrices for transform folding
        </p>
      </div>
    </div>
  );

  // Scene 7: Transformer Layers
  const Scene7 = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative">
        <div className="w-48 h-32 bg-green-500 rounded-lg shadow-lg flex items-center justify-center">
          <span className="text-white font-bold">Transformer Block</span>
        </div>
        
        {/* Skip connection */}
        <svg width="240" height="140" className="absolute -top-4 -left-4">
          <path 
            d="M20 70 Q20 20 120 20 Q220 20 220 70" 
            stroke="#10B981" 
            strokeWidth="3" 
            fill="none"
            className={animationPhase >= 1 ? 'opacity-100' : 'opacity-0'}
          />
        </svg>
        
        {/* Transform markers */}
        {animationPhase >= 1 && (
          <>
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-8 bg-purple-500 rounded"></div>
              <div className="text-xs text-center">Tᵢₙ</div>
            </div>
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-8 bg-purple-500 rounded"></div>
              <div className="text-xs text-center">Tₒᵤₜ</div>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-8 bg-green-50 p-4 rounded-lg text-center">
        <p className="font-semibold">Skip connections tie boundary transforms</p>
        <p className="text-sm text-gray-600 mt-2">
          Compatibility at one side depends on the other
        </p>
      </div>
    </div>
  );

  // Scene 8: RMSNorm Tweak
  const Scene8 = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center gap-8">
        <div className="relative">
          <div className="w-32 h-20 bg-orange-400 rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-white font-bold">RMSNorm</span>
          </div>
          <div className="absolute -top-2 -right-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs">
            Q(t)
          </div>
        </div>
        
        {animationPhase >= 1 && (
          <>
            <svg width="60" height="30">
              <path d="M5 15 L55 15" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#orangeArrow)" />
              <defs>
                <marker id="orangeArrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B" />
                </marker>
              </defs>
            </svg>
            
            <div className="w-24 h-16 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-white text-sm">Next Layer</span>
            </div>
            
            <div className="absolute -bottom-8 bg-orange-100 px-3 py-1 rounded">
              <span className="text-sm">Move scales →</span>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-8 bg-orange-50 p-4 rounded-lg text-center">
        <p className="text-sm font-mono">Accumulate into Q(t); move scales forward</p>
      </div>
    </div>
  );

  // Scene 9: Functional Equivalence
  const Scene9 = () => (
    <div className="flex items-center justify-center h-full">
      <div className="grid grid-cols-2 gap-12">
        <div className="text-center">
          <h3 className="font-bold mb-4">Jensen-Shannon Distance</h3>
          <div className="w-48 h-32 bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="w-full h-full relative">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500 rounded"></div>
              <div className="text-center text-green-700 font-mono text-sm">
                &lt; 4 × 10⁻⁵
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="font-bold mb-4">Perplexity Change</h3>
          <div className="w-48 h-32 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="w-full h-full relative">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded"></div>
              <div className="text-center text-blue-700 font-mono text-sm">
                ΔPPL &lt; 0.01
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 text-center">
        <p className="text-sm text-gray-600">10,000 morphs in FP32</p>
      </div>
    </div>
  );

  // Scene 10: Inference Overheads
  const Scene10 = () => (
    <div className="flex items-center justify-center h-full">
      <div className="grid grid-cols-3 gap-12">
        <div className={`text-center transition-all duration-500 ${animationPhase >= 0 ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-50'}`}>
          <div className="w-32 h-24 bg-yellow-100 border-2 border-yellow-400 rounded-lg flex items-center justify-center">
            <div>
              <div className="text-2xl font-bold text-yellow-700">~3%</div>
              <div className="text-sm text-yellow-600">Latency</div>
            </div>
          </div>
        </div>
        
        <div className={`text-center transition-all duration-500 ${animationPhase >= 1 ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-50'}`}>
          <div className="w-32 h-24 bg-blue-100 border-2 border-blue-400 rounded-lg flex items-center justify-center">
            <div>
              <div className="text-2xl font-bold text-blue-700">~0.1%</div>
              <div className="text-sm text-blue-600">Bandwidth</div>
            </div>
          </div>
        </div>
        
        <div className={`text-center transition-all duration-500 ${animationPhase >= 2 ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-50'}`}>
          <div className="w-32 h-24 bg-red-100 border-2 border-red-400 rounded-lg flex items-center justify-center">
            <div>
              <div className="text-2xl font-bold text-red-700">~10%</div>
              <div className="text-sm text-red-600">GPU Memory</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 text-center">
        <p className="text-sm text-gray-600">Morph every 30 seconds</p>
      </div>
    </div>
  );

  // Scene 11: Attacks
  const Scene11 = () => (
    <div className="flex items-center justify-center h-full">
      <div className="grid grid-cols-2 gap-16">
        <div className="text-center">
          <h3 className="font-bold mb-4 text-orange-700">Activation-based Recovery</h3>
          <div className="w-48 h-32 bg-orange-50 border-2 border-orange-200 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">⚠️</div>
              <div className="text-sm text-orange-700">Impractical conditions required</div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="font-bold mb-4 text-red-700">Learning-based Recovery</h3>
          <div className="w-48 h-32 bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-32 h-4 bg-gray-200 rounded-full">
                <div className={`absolute left-0 top-0 h-full bg-red-500 rounded-full transition-all duration-1000 ${
                  animationPhase >= 1 ? 'w-3/5' : 'w-0'
                }`}></div>
              </div>
              <div className="text-sm text-red-700 mt-2">≥60% tokens vs scratch</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 text-center">
        <p className="text-sm text-gray-600">Token cost versus training from scratch</p>
      </div>
    </div>
  );

  // Scene 12: Training Feasibility
  const Scene12 = () => (
    <div className="flex items-center justify-center h-full">
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8">
        <h3 className="font-bold text-center mb-6 text-green-800">Training with Muon Optimizer</h3>
        
        <div className="grid grid-cols-3 gap-8 mb-6">
          <div className="text-center">
            <div className="w-24 h-16 bg-green-100 border border-green-300 rounded flex items-center justify-center">
              <div>
                <div className="text-sm font-bold text-green-700">Validation Loss</div>
                <div className="text-xs text-green-600">Matches baseline</div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-16 bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
              <div>
                <div className="text-sm font-bold text-blue-700">Time</div>
                <div className="text-xs text-blue-600">+1.6%</div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-16 bg-purple-100 border border-purple-300 rounded flex items-center justify-center">
              <div>
                <div className="text-sm font-bold text-purple-700">Memory</div>
                <div className="text-xs text-purple-600">&lt;1%</div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-600">
          Orthogonal transforms every 100 steps
        </p>
      </div>
    </div>
  );

  // Scene 13: Takeaway
  const Scene13 = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center gap-4 mb-8">
        {Array.from({length: 5}).map((_, i) => (
          <div key={i} className="relative">
            <div className="w-16 h-32 bg-blue-500 rounded shadow-lg flex items-center justify-center">
              <span className="text-white font-mono">f{i+1}</span>
            </div>
            
            {animationPhase >= 1 && (
              <>
                <div className="absolute -right-1 top-1/4 w-2 h-2 bg-yellow-400 rounded-full">
                  <Lock size={8} className="text-gray-700" />
                </div>
                <div className="absolute -left-1 top-3/4 w-2 h-2 bg-yellow-400 rounded-full">
                  <Lock size={8} className="text-gray-700" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      
      {animationPhase >= 0 && (
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gray-400 rounded animate-pulse"></div>
          <svg width="40" height="20">
            <path d="M5 10 L35 10" stroke="#4B5563" strokeWidth="2" markerEnd="url(#finalArrow)" />
            <defs>
              <marker id="finalArrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
              </marker>
            </defs>
          </svg>
          <div className="text-sm font-mono">Inference requests</div>
        </div>
      )}
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg text-center">
        <h3 className="font-bold text-xl mb-2 text-blue-800">Value bound to protocol, not a checkpoint</h3>
        <p className="text-blue-700">
          Collaborative training and serving without exposing materializable weights
        </p>
      </div>
    </div>
  );

  // Additional Scene Components for completeness
  const SceneNavigation = () => (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 space-y-2">
      {scenes.map((scene, index) => (
        <button
          key={index}
          onClick={() => {
            setCurrentScene(index);
            setSceneProgress(0);
            setAnimationPhase(0);
            setIsPlaying(false);
          }}
          className={`w-3 h-3 rounded-full transition-all duration-200 ${
            index === currentScene 
              ? 'bg-blue-500 scale-125' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          title={scene.title}
        />
      ))}
    </div>
  );

  // Control components
  const Controls = () => (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg flex items-center gap-4">
      <button 
        onClick={() => setCurrentScene(Math.max(0, currentScene - 1))}
        className="p-2 rounded bg-gray-100 hover:bg-gray-200"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="p-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      
      <button 
        onClick={() => {
          setSceneProgress(0);
          setAnimationPhase(0);
          setIsPlaying(false);
        }}
        className="p-2 rounded bg-gray-100 hover:bg-gray-200"
      >
        <RotateCcw size={20} />
      </button>
      
      <button 
        onClick={() => setCurrentScene(Math.min(scenes.length - 1, currentScene + 1))}
        className="p-2 rounded bg-gray-100 hover:bg-gray-200"
      >
        <ChevronRight size={20} />
      </button>
      
      <div className="flex flex-col">
        <span className="text-sm font-medium">{scenes[currentScene].title}</span>
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-200"
            style={{ width: `${sceneProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  // Render current scene
  const renderScene = () => {
    switch(currentScene) {
      case 0: return <Scene1 />;
      case 1: return <Scene2 />;
      case 2: return <Scene3 />;
      case 3: return <Scene4 />;
      case 4: return <Scene5 />;
      case 5: return <Scene6 />;
      case 6: return <Scene7 />;
      case 7: return <Scene8 />;
      case 8: return <Scene9 />;
      case 9: return <Scene10 />;
      case 10: return <Scene11 />;
      case 11: return <Scene12 />;
      case 12: return <Scene13 />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{scenes[currentScene].title}</h2>
              <p className="text-gray-600">Scene implementation complete</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <ColorLegend />
      <SceneNavigation />
      
      <div className="h-full">
        {renderScene()}
      </div>
      
      <Controls />
      
      {/* Title */}
      <div className="fixed top-4 left-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Unextractable Protocol Models (UPMs)
        </h1>
        <p className="text-sm text-gray-600">NeurIPS 2025 - Interactive Visualization</p>
      </div>
      
      {/* Scene info panel */}
      <div className="fixed bottom-20 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-md">
        <h3 className="font-bold text-lg mb-2">{scenes[currentScene].title}</h3>
        <div className="text-sm text-gray-600 space-y-1">
          {currentScene === 0 && "Large models are valuable and trained across many machines. In decentralized settings, weight materialization poses a risk to model value."}
          {currentScene === 1 && "We shard the network into S pipeline stages. Each participant only processes its local stage; no one holds the full model."}
          {currentScene === 2 && "An attacker can rejoin over many time steps, quietly collecting different stages until they stitch together a full set of weights."}
          {currentScene === 3 && "UPMs periodically insert canceling transforms at every boundary - folding a random matrix into one side and its inverse into the other."}
          {currentScene === 4 && "Across different times, adjacent shards require an unknown bridge matrix to align. Without it, stitched weights don't compose correctly."}
          {currentScene === 5 && "We reason on valid subfunctions with clear entry and exit matrices. Transforms preserve composed output while morphing weights."}
          {currentScene === 6 && "In Transformer layers, skip connections tie the boundary transforms - compatibility at one side depends on the other."}
          {currentScene === 7 && "For RMSNorm, we accumulate transforms inside a hidden orthogonal matrix and move per-feature scales into the next layer."}
          {currentScene === 8 && "Empirically, output drift remains negligible even after ten thousand morphs at FP32 precision."}
          {currentScene === 9 && "The amortized overheads are modest: about 3% latency, 0.1% bandwidth, and 10% extra GPU memory when morphing every 30 seconds."}
          {currentScene === 10 && "Activation-based recovery requires impractical conditions, and learning-based recovery still consumes ~60% of training tokens."}
          {currentScene === 11 && "With a compatible optimizer, training tracks the baseline with minimal overhead when applying transforms every 100 steps."}
          {currentScene === 12 && "UPMs bind value to the protocol rather than a static checkpoint - enabling collaborative training without exposing materializable weights."}
        </div>
      </div>
    </div>
  );
};

export default UPMsVisualization;