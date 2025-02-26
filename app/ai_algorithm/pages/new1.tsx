// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
Dialog,
DialogContent,
DialogDescription,
DialogHeader,
DialogTitle,
DialogTrigger,
} from "../components/ui/dialog";
const App: React.FC = () => {
const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
const [isLoaded, setIsLoaded] = useState(false);
useEffect(() => {
setIsLoaded(true);
}, []);
const algorithms = [
{
id: 1,
title: "Neural Network Optimizer",
icon: "fa-solid fa-brain",
description: "Advanced neural network optimization algorithm with adaptive learning rates and momentum-based updates.",
imageUrl: "https://public.readdy.ai/ai/img_res/881a4b4bf78178ecba210cb8c0fe48a6.jpg",
color: "#00FF9D"
},
{
id: 2,
title: "Computer Vision Engine",
icon: "fa-solid fa-eye",
description: "State-of-the-art computer vision system for real-time object detection and scene understanding.",
imageUrl: "https://public.readdy.ai/ai/img_res/709d288a0a1cf573b7c54642d7882a5b.jpg",
color: "#00A3FF"
},
{
id: 3,
title: "Natural Language Processor",
icon: "fa-solid fa-language",
description: "Advanced NLP system capable of understanding and generating human-like text across multiple languages.",
imageUrl: "https://public.readdy.ai/ai/img_res/c70e277d03a3d0f1916e4294d74cc881.jpg",
color: "#00FFD1"
},
{
id: 4,
title: "Reinforcement Learning",
icon: "fa-solid fa-robot",
description: "Cutting-edge reinforcement learning framework for autonomous decision-making systems.",
imageUrl: "https://public.readdy.ai/ai/img_res/727203b4bd8c9772bc38bba956cf73f4.jpg",
color: "#FF00E5"
},
{
id: 5,
title: "Quantum Algorithm Suite",
icon: "fa-solid fa-atom",
description: "Quantum computing algorithms optimized for next-generation quantum processors.",
imageUrl: "https://public.readdy.ai/ai/img_res/96d82cdd09f456d1b32cee54c43117ed.jpg",
color: "#9D00FF"
},
{
id: 6,
title: "Genetic Evolution Engine",
icon: "fa-solid fa-dna",
description: "Advanced genetic algorithm framework for complex optimization problems.",
imageUrl: "https://public.readdy.ai/ai/img_res/f13c6553625605cd681a98b04dfca255.jpg",
color: "#FF5500"
},
{
id: 7,
title: "Time Series Analyzer",
icon: "fa-solid fa-chart-line",
description: "Sophisticated time series analysis tool with predictive modeling capabilities.",
imageUrl: "https://public.readdy.ai/ai/img_res/a054ce178b7c72e8d8c3667f95db02dc.jpg",
color: "#00FF9D"
},
{
id: 8,
title: "Clustering Framework",
icon: "fa-solid fa-network-wired",
description: "Advanced clustering algorithms for pattern recognition and data segmentation.",
imageUrl: "https://public.readdy.ai/ai/img_res/718ee528b50d6d94ca06930e0b86441b.jpg",
color: "#00A3FF"
},
{
id: 9,
title: "Anomaly Detection",
icon: "fa-solid fa-shield-alt",
description: "Real-time anomaly detection system using advanced statistical methods.",
imageUrl: "https://public.readdy.ai/ai/img_res/5cf348e901c1db4335797b342fcf3e82.jpg",
color: "#00FFD1"
},
{
id: 10,
title: "Recommendation Engine",
icon: "fa-solid fa-lightbulb",
description: "Intelligent recommendation system using collaborative filtering and deep learning.",
imageUrl: "https://public.readdy.ai/ai/img_res/8a06946a937534cbbb2d637b4a27ff58.jpg",
color: "#FF00E5"
}
];
return (
<div className="min-h-screen bg-gradient-to-b from-black via-[#0A0A1A] to-black">
<div className="h-[600px] relative overflow-hidden mb-16">
<img
src="https://public.readdy.ai/ai/img_res/9dba8ac902f6456bb0965a09a6efa1c9.jpg"
className={`w-full h-full object-cover transition-transform duration-1000 ${isLoaded ? 'scale-105' : 'scale-100'}`}
alt="AI Hero"
/>
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/95">
<div className="max-w-[1440px] mx-auto px-6 h-full flex flex-col justify-center items-center">
<h1
className={`text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FF9D] via-[#00A3FF] to-[#FF00E5] mb-6 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
style={{
textShadow: '0 0 20px rgba(0, 255, 157, 0.5)',
transform: 'perspective(1000px) rotateX(10deg)',
animation: 'float 6s ease-in-out infinite, shimmer 3s linear infinite',
backgroundSize: '200% auto'
}}
>
<style>
{`
@keyframes gradientMove {
0% {
background-position: 0% 50%;
}
50% {
background-position: 100% 50%;
}
100% {
background-position: 0% 50%;
}
}
`}
{`
@keyframes float {
0% {
transform: perspective(1000px) rotateX(10deg) translateY(0px) scale(1);
text-shadow: 0 0 20px rgba(0, 255, 157, 0.3);
}
25% {
transform: perspective(1000px) rotateX(8deg) translateY(-10px) scale(1.02);
text-shadow: 0 0 30px rgba(0, 255, 157, 0.5);
}
50% {
transform: perspective(1000px) rotateX(10deg) translateY(-20px) scale(1.05);
text-shadow: 0 0 40px rgba(0, 255, 157, 0.7);
}
75% {
transform: perspective(1000px) rotateX(12deg) translateY(-10px) scale(1.02);
text-shadow: 0 0 30px rgba(0, 255, 157, 0.5);
}
100% {
transform: perspective(1000px) rotateX(10deg) translateY(0px) scale(1);
text-shadow: 0 0 20px rgba(0, 255, 157, 0.3);
}
}
@keyframes pulse {
0% {
opacity: 0.8;
transform: scale(0.98);
}
50% {
opacity: 1;
transform: scale(1.02);
}
100% {
opacity: 0.8;
transform: scale(0.98);
}
}
@keyframes shimmer {
0% {
background-position: -200% center;
}
100% {
background-position: 200% center;
}
}
`}
</style>
AI Algorithms
</h1>
<p className={`text-gray-300 text-xl max-w-2xl text-center transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
style={{
animation: 'pulse 4s ease-in-out infinite'
}}>
Choose from our collection of state-of-the-art AI algorithms
</p>
</div>
</div>
</div>
<div
className="max-w-[1440px] mx-auto px-6 pb-24 relative"
style={{
perspective: '1000px',
transformStyle: 'preserve-3d',
animation: 'float-section 8s ease-in-out infinite'
}}
>
<style>
{`
@keyframes gradientMove {
0% {
background-position: 0% 50%;
}
50% {
background-position: 100% 50%;
}
100% {
background-position: 0% 50%;
}
}
`}
{`
@keyframes float-section {
0% {
transform: translateZ(0) rotateX(4deg) rotateY(2deg) scale(0.97);
filter: brightness(0.9);
}
25% {
transform: translateZ(40px) rotateX(2deg) rotateY(1deg) scale(0.98);
filter: brightness(0.95);
}
50% {
transform: translateZ(80px) rotateX(-4deg) rotateY(-2deg) scale(1);
filter: brightness(1.1);
}
75% {
transform: translateZ(40px) rotateX(-2deg) rotateY(-1deg) scale(0.98);
filter: brightness(0.95);
}
100% {
transform: translateZ(0) rotateX(4deg) rotateY(2deg) scale(0.97);
filter: brightness(0.9);
}
}
@keyframes glow {
0% {
box-shadow: 0 0 20px rgba(0, 255, 157, 0.2),
0 0 30px rgba(0, 163, 255, 0.1),
0 0 40px rgba(255, 0, 229, 0.1);
}
50% {
box-shadow: 0 0 40px rgba(0, 255, 157, 0.4),
0 0 50px rgba(0, 163, 255, 0.2),
0 0 60px rgba(255, 0, 229, 0.2);
}
100% {
box-shadow: 0 0 20px rgba(0, 255, 157, 0.2),
0 0 30px rgba(0, 163, 255, 0.1),
0 0 40px rgba(255, 0, 229, 0.1);
}
}
.card-3d {
transform-style: preserve-3d;
transition: all 0.5s ease;
position: relative;
}
.card-3d:hover {
transform: translateZ(50px) rotateX(10deg) rotateY(10deg);
animation: glow 3s ease-in-out infinite;
filter: brightness(1.3);
}
.card-3d::before {
content: '';
position: absolute;
inset: -2px;
background: linear-gradient(45deg, #00FF9D, #00A3FF, #FF00E5);
z-index: -1;
transform: translateZ(-10px);
filter: blur(20px);
opacity: 0;
transition: opacity 0.5s ease;
}
.card-3d:hover::before {
opacity: 0.3;
}
.card-3d:hover::after {
content: '';
position: absolute;
top: -2px;
left: -2px;
right: -2px;
bottom: -2px;
background: linear-gradient(45deg, #00FF9D, #00A3FF, #FF00E5, #00FFD1);
background-size: 300% 300%;
animation: gradientMove 8s linear infinite;
z-index: -1;
border-radius: inherit;
opacity: 0.3;
animation: borderGlow 2s linear infinite;
}
@keyframes borderGlow {
0% {
opacity: 0.2;
}
50% {
opacity: 0.4;
}
100% {
opacity: 0.2;
}
}
.icon-3d {
transform-style: preserve-3d;
transition: all 0.8s ease;
position: relative;
}
.card-3d:hover .icon-3d {
transform: translateZ(40px) rotateY(360deg) scale(1.2);
}
.icon-3d::before {
content: '';
position: absolute;
width: 100%;
height: 100%;
background: inherit;
border-radius: inherit;
filter: blur(10px);
opacity: 0;
transition: all 0.5s ease;
transform: translateZ(-10px);
}
.card-3d:hover .icon-3d::before {
opacity: 0.5;
}
`}
</style>
<h2
className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FF9D] via-[#00A3FF] to-[#FF00E5] mb-4 text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
style={{
transform: 'perspective(1000px) rotateX(15deg)',
animation: 'simple3d 4s ease-in-out infinite',
textShadow: '0 0 20px rgba(0, 255, 157, 0.3)'
}}
>
<style>
{`
@keyframes simple3d {
0% {
transform: perspective(1000px) rotateX(15deg) translateZ(0px);
}
50% {
transform: perspective(1000px) rotateX(15deg) translateZ(20px);
}
100% {
transform: perspective(1000px) rotateX(15deg) translateZ(0px);
}
}
`}
</style>
AI Algorithm Collection
</h2>
<p className={`text-gray-400 text-lg mb-12 text-center transform transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
Explore our comprehensive suite of advanced artificial intelligence algorithms
</p>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{algorithms.map((algorithm, index) => (
<div
key={algorithm.id}
className={`relative group bg-[#0A0A0A]/80 border-[#1A1A1A] hover:border-[${algorithm.color}] transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,157,0.2)] backdrop-blur-xl card-3d ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
style={{
transitionDelay: `${index * 100}ms`,
transform: `perspective(1000px) rotateX(0deg)`,
animation: `float-card-${index} 6s ease-in-out infinite`,
animationDelay: `${index * 0.2}s`
}}
>
<Card className="">
<style>
{`
@keyframes gradientMove {
0% {
background-position: 0% 50%;
}
50% {
background-position: 100% 50%;
}
100% {
background-position: 0% 50%;
}
}
`}
{`
@keyframes float-card-${index} {
0% {
transform: translateZ(0) translateY(0) rotateX(0) rotateY(0);
}
25% {
transform: translateZ(30px) translateY(-15px) rotateX(5deg) rotateY(5deg);
}
50% {
transform: translateZ(50px) translateY(-25px) rotateX(10deg) rotateY(10deg);
}
75% {
transform: translateZ(30px) translateY(-15px) rotateX(5deg) rotateY(5deg);
}
100% {
transform: translateZ(0) translateY(0) rotateX(0) rotateY(0);
}
}
`}
</style>
<div className="p-8 flex flex-col items-center text-center">
<div className={`w-20 h-20 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:scale-110 relative before:content-[''] before:absolute before:w-full before:h-full before:rounded-full before:bg-[${algorithm.color}] before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-20 icon-3d after:content-[''] after:absolute after:w-full after:h-full after:rounded-full after:border-2 after:border-[${algorithm.color}] after:opacity-0 after:transition-opacity after:duration-500 group-hover:after:opacity-50 after:animate-ping`}
style={{
animation: `float-icon-${algorithm.id} 4s ease-in-out infinite, pulse 3s ease-in-out infinite`,
animationDelay: '0.2s'
}}
>
</div>
<style>
{`
@keyframes gradientMove {
0% {
background-position: 0% 50%;
}
50% {
background-position: 100% 50%;
}
100% {
background-position: 0% 50%;
}
}
`}
{`
@keyframes float-icon-${algorithm.id} {
0% {
transform: translateZ(0) rotateY(0) rotateX(0);
}
25% {
transform: translateZ(40px) rotateY(90deg) rotateX(10deg);
}
50% {
transform: translateZ(60px) rotateY(180deg) rotateX(20deg);
}
75% {
transform: translateZ(40px) rotateY(270deg) rotateX(10deg);
}
100% {
transform: translateZ(0) rotateY(360deg) rotateX(0);
}
}
`}
</style>
<i className={`${algorithm.icon} text-4xl text-[${algorithm.color}] transition-all duration-500 group-hover:scale-110`}></i>
</div>
<h3 className="text-2xl font-semibold text-white mb-4 transition-colors duration-500 group-hover:text-[#00FF9D]">
{algorithm.title}
</h3>
<p className="text-gray-400 mb-8 text-sm leading-relaxed">
{algorithm.description}
</p>
<div className="flex gap-4 w-full">
<Button
className={`!rounded-button flex-1 bg-[#1A1A1A] hover:bg-[${algorithm.color}]/20 text-white border border-[#333] hover:border-[${algorithm.color}] whitespace-nowrap text-sm transition-all duration-500 transform hover:scale-105`}
onClick={() => setSelectedAlgorithm(algorithm.title)}
>
Access
</Button>
<Dialog>
<DialogTrigger onTrigger={() => {}}>
<Button
variant="outline"
className="!rounded-button flex-1 bg-transparent border-[#333] text-[#666] hover:bg-[#1A1A1A] hover:text-white whitespace-nowrap text-sm transition-all duration-500 transform hover:scale-105"
onClick={() => {}}
>
Info
</Button>
</DialogTrigger>
<DialogContent onClose={() => {}}>
<DialogHeader>
<DialogTitle>
  <div className={`text-2xl font-bold text-[${algorithm.color}]`}>
	{algorithm.title}
  </div>
</DialogTitle>
<DialogDescription>
{algorithm.description}
</DialogDescription>
</DialogHeader>
</DialogContent>
</Dialog>
</div>
</Card>
</div>
))}
</div>
</div>
</div>
);
};
export default App
