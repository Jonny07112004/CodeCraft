'use client'
import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';
const App: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (chartRef.current) {
            const chart = echarts.init(chartRef.current);
            const option = {
                animation: false,
                backgroundColor: 'transparent',
                globe: {
                    environment: '#000',
                    baseTexture: '',
                    heightTexture: '',
                    displacementScale: 0.1,
                    shading: 'color',
                    viewControl: {
                        autoRotate: true,
                        autoRotateSpeed: 10,
                        distance: 150
                    },
                    light: {
                        ambient: {
                            intensity: 1
                        },
                        main: {
                            intensity: 1
                        }
                    }
                },
                series: [{
                    type: 'lines3D',
                    coordinateSystem: 'globe',
                    effect: {
                        show: true,
                        period: 2,
                        trailWidth: 2,
                        trailLength: 0.2,
                        trailOpacity: 1,
                        trailColor: '#00F0FF'
                    },
                    blendMode: 'lighter',
                    lineStyle: {
                        width: 1,
                        color: '#9D00FF',
                        opacity: 0.1
                    },
                    data: Array.from({ length: 150 }, () => {
                        return {
                            coords: [
                                [Math.random() * 360 - 180, Math.random() * 180 - 90],
                                [Math.random() * 360 - 180, Math.random() * 180 - 90]
                            ]
                        };
                    })
                }, {
                    type: 'scatter3D',
                    coordinateSystem: 'globe',
                    blendMode: 'lighter',
                    symbolSize: 4,
                    itemStyle: {
                        color: '#00F0FF',
                        opacity: 0.8
                    },
                    data: Array.from({ length: 1000 }, () => ([
                        Math.random() * 360 - 180,
                        Math.random() * 180 - 90,
                        0
                    ]))
                }]
            };
            chart.setOption(option);
        }
    }, []);
    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden w-[100vd] mx-auto">
            {/* Header */}
            <header className="fixed w-full z-50 bg-[#0A0A0F]/80 backdrop-blur-lg border-b border-[#9D00FF]/20">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative transform-style-preserve-3d hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/5 to-[#9D00FF]/5 transform -skew-x-12 translate-z-[-10px] rounded-xl"></div>
                    <div className="absolute inset-0 border-2 border-[#00F0FF]/10 transform translate-z-[-5px] rounded-xl"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00F0FF]/20 to-[#9D00FF]/20 blur-lg rounded-xl"></div>
                    <div className="flex items-center space-x-3 group">
                        <div className="relative">
                            <i className="fas fa-code text-4xl bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] bg-clip-text text-transparent transform hover:scale-110 transition-transform duration-300"></i>
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#00F0FF]/20 to-[#9D00FF]/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative">
                            <span className="text-3xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] bg-clip-text text-transparent font-['Orbitron']">Code Craft</span>
                            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                        </div>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                    <Link href={'./component/Algo_Page'}>  
                        <button className="relative px-6 py-3 overflow-hidden group !rounded-button whitespace-nowrap backdrop-blur-sm">
                            <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#00F0FF]/20 to-[#9D00FF]/20 transition-all duration-500 ease-out group-hover:w-full"></span>
                            <span className="relative flex items-center">
                                <i className="fas fa-project-diagram mr-3 text-[#00F0FF] text-xl"></i>
                                
                                <span className="bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] bg-clip-text text-transparent font-bold text-lg tracking-wide">DSA Visualization</span>
                                
                            </span>
                            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            <div className="absolute inset-0 border border-[#00F0FF]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                        </Link>
                        <Link href={'./ai_algorithm/pages/mainpage'}>
                        <button className="relative px-6 py-3 overflow-hidden group !rounded-button whitespace-nowrap backdrop-blur-sm">
                            <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#00F0FF]/20 to-[#9D00FF]/20 transition-all duration-500 ease-out group-hover:w-full"></span>
                            <span className="relative flex items-center">
                                <i className="fas fa-brain mr-3 text-[#9D00FF] text-xl"></i>
                                <span className="bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] bg-clip-text text-transparent font-bold text-lg tracking-wide">AI Algorithm Visualization</span>
                            </span>
                            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            <div className="absolute inset-0 border border-[#9D00FF]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                        </Link>
                        <Link href={'./login_signup/login'}>
                        <button
                            onClick={() => setShowLoginModal(true)}
                            className="relative px-8 py-3 group !rounded-button whitespace-nowrap backdrop-blur-sm"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] rounded-lg opacity-90"></span>
                            <span className="relative flex items-center space-x-3 text-white font-bold text-lg tracking-wide">
                                <i className="fas fa-user-circle text-xl"></i>
                                <span>Accounts</span>
                            </span>
                            <div className="absolute inset-0 ring-2 ring-[#00F0FF] rounded-lg transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#00F0FF]/40 to-[#9D00FF]/40 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                        </Link>
                    </nav>
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
            </header>
            {/* Hero Section */}
            <section className="h-screen relative perspective-1000">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('https://public.readdy.ai/ai/img_res/8517c22f7e29405afd363cb9d375e910.jpg')] bg-cover bg-center opacity-50"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] to-transparent"></div>
                </div>
                <div className="max-w-7xl mx-auto px-6 h-full grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative z-10">
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] bg-clip-text text-transparent mb-6">
                            Learn by seeing, not just reading. See, learn, code.
                        </h1>
                        <div className="relative mb-8">
                            <div className="flex justify-center items-center space-x-12 py-8 relative">
                                <div className="text-3xl font-bold text-[#00F0FF] transform-style-3d animate-word-3d relative group">
                                    Visualize
                                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#00F0FF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-[#00F0FF] rounded-full animate-ping"></div>
                                </div>
                                <div className="text-3xl font-bold text-[#9D00FF] transform-style-3d animate-word-3d-delay-1 relative group">
                                    Understand
                                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#9D00FF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-[#9D00FF] rounded-full animate-ping delay-300"></div>
                                </div>
                                <div className="text-3xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] bg-clip-text text-transparent transform-style-3d animate-word-3d-delay-2 relative group">
                                    Create
                                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] rounded-full animate-ping delay-600"></div>
                                </div>
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#00F0FF]/10 to-[#9D00FF]/10 blur-xl rounded-full pointer-events-none"></div>
                            </div>
                            <style>{`
.perspective-1000 {
perspective: 1000px;
}
.transform-style-preserve-3d {
transform-style: preserve-3d;
}
.rotate-y-12 {
transform: rotateY(12deg);
}
@keyframes floating {
0%, 100% { transform: translateY(0) translateZ(0); }
50% { transform: translateY(-20px) translateZ(50px); }
}
@keyframes neural-pulse {
0% { transform: scale(1) translateZ(0); opacity: 0.5; }
50% { transform: scale(1.2) translateZ(20px); opacity: 1; }
100% { transform: scale(1) translateZ(0); opacity: 0.5; }
}
@keyframes word-3d {
0% { transform: perspective(1000px) rotateY(0deg) translateZ(0); }
33% { transform: perspective(1000px) rotateY(360deg) translateZ(50px); }
66% { transform: perspective(1000px) rotateY(720deg) translateZ(100px); }
100% { transform: perspective(1000px) rotateY(1080deg) translateZ(0); }
}
.transform-style-3d {
transform-style: preserve-3d;
}
.animate-word-3d {
animation: word-3d 6s ease-in-out infinite;
}
.animate-word-3d-delay-1 {
animation: word-3d 6s ease-in-out infinite;
animation-delay: 2s;
}
.animate-word-3d-delay-2 {
animation: word-3d 6s ease-in-out infinite;
animation-delay: 4s;
}
`}</style>
                        </div>
                        <div className="flex space-x-4">
                           
                        </div>
                    </div>
                </div>
            </section>
            {/* Features Section */}
            {/* Interactive Code Examples */}
            <section className="py-20 bg-[#0A0A0F]/50 relative perspective-1000">
                <div className="absolute inset-0 bg-[url('https://public.readdy.ai/ai/img_res/066beef32379852717edcbad9c0343fc.jpg')] bg-cover bg-center opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-transparent to-[#0A0A0F] w-screen left-[calc(-50vw+50%)]"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] bg-clip-text text-transparent">
                        Learn Through Interactive Examples
                    </h2>
                    <div className="relative">
                        <Swiper
                            effect="cards"
                            grabCursor={true}
                            modules={[EffectCards, Autoplay]}
                            className="w-full max-w-2xl mx-auto"
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                        >
                            {[
                                {
                                    title: 'Binary Search Tree',
                                    code: 'class Node {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n  }\n}',
                                    language: 'JavaScript'
                                },
                                {
                                    title: 'Quick Sort Algorithm',
                                    code: 'def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)',
                                    language: 'Python'
                                },
                                {
                                    title: 'Graph DFS',
                                    code: 'void DFS(int v) {\n    visited[v] = true;\n    for(int i = 0; i < adj[v].size(); i++) {\n        if(!visited[adj[v][i]])\n            DFS(adj[v][i]);\n    }\n}',
                                    language: 'C++'
                                }
                            ].map((example, index) => (
                                <SwiperSlide key={index}>
                                    <div className="bg-[#1A1A1F] p-6 rounded-xl border border-[#9D00FF]/20 transform transition-transform hover:scale-105">
                                        <h3 className="text-xl font-bold mb-4 text-[#00F0FF]">{example.title}</h3>
                                        <div className="bg-[#0A0A0F] p-4 rounded-lg">
                                            <pre className="text-sm text-gray-300 overflow-x-auto">
                                                <code>{example.code}</code>
                                            </pre>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center">
                                            <span className="text-sm text-gray-400">{example.language}</span>
                                            <button className="!rounded-button px-4 py-2 bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] hover:opacity-90 transition-opacity text-sm whitespace-nowrap">
                                                Try it Live
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
            {/* Floating Elements */}
            <div className="fixed top-1/4 left-10 w-4 h-4 bg-[#00F0FF] rounded-full animate-ping opacity-75"></div>
            <div className="fixed top-1/3 right-10 w-6 h-6 bg-[#9D00FF] rounded-full animate-bounce opacity-75"></div>
            <div className="fixed bottom-1/4 left-20 w-3 h-3 bg-[#00F0FF] rounded-full animate-pulse opacity-75"></div>
            <div className="fixed bottom-1/3 right-20 w-5 h-5 bg-[#9D00FF] rounded-full animate-ping opacity-75"></div>
            {/* Login Modal */}
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-[#0A0A0F] z-40 md:hidden">
                    <div className="p-6">
                        <div className="flex justify-end mb-8">
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="text-2xl"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-6">
                            <button className="text-xl !rounded-button whitespace-nowrap">DSA Visualization</button>
                            <button className="text-xl !rounded-button whitespace-nowrap">AI Algorithm Visualization</button>
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setShowLoginModal(true);
                                }}
                                className="!rounded-button px-6 py-2 bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] text-xl whitespace-nowrap"
                            >
                                Accounts
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};
export default App
