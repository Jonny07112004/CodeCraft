import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';

const App: React.FC = () => {
  const modules = [
    {
      title: 'Array Visualizer',
      description: 'Interactive visualization of array operations including sorting, searching, and manipulation.',
      features: ['Sorting Animations', 'Binary Search', 'Array Operations'],
      complexity: 'O(n)',
      category: 'Linear',
      icon: 'fa-table-cells',
      link:'/array'
    },
    {
      title: 'Linked List Builder',
      description: 'Dynamic visualization of linked list operations with node traversal animations.',
      features: ['Node Insertion', 'Deletion', 'Traversal'],
      complexity: 'O(n)',
      category: 'Linear',
      icon: 'fa-link',
      link:'/linked-list'
    },
    {
      title: 'Stack Explorer',
      description: 'Real-time visualization of push and pop operations in stack data structure.',
      features: ['Push/Pop Animation', 'Stack Trace', 'Applications'],
      complexity: 'O(1)',
      category: 'Linear',
      icon: 'fa-layer-group',
      link:'/stack'
    },
    {
      title: 'Queue Simulator',
      description: 'Interactive queue operations visualization with enqueue and dequeue animations.',
      features: ['Enqueue/Dequeue', 'Priority Queue', 'Circular Queue'],
      complexity: 'O(1)',
      category: 'Linear',
      icon: 'fa-people-line',
      link:'/queue'
    },
    {
      title: 'Tree Visualizer',
      description: 'Dynamic tree structure visualization with traversal and balancing animations.',
      features: ['Tree Traversal', 'AVL Rotation', 'Path Finding'],
      complexity: 'O(log n)',
      category: 'Non-linear',
      icon: 'fa-tree',
      link:'/tree'
    },
    {
      title: 'Graph Explorer',
      description: 'Interactive graph visualization with pathfinding and traversal algorithms.',
      features: ['DFS/BFS', 'Shortest Path', 'MST'],
      complexity: 'O(V+E)',
      category: 'Non-linear',
      icon: 'fa-circle-nodes',
      link:'/graph'
    },
    // {
    //   title: 'Heap Constructor',
    //   description: 'Visual representation of heap operations with priority queue implementation.',
    //   features: ['Heapify', 'Extract Min/Max', 'Priority Queue'],
    //   complexity: 'O(log n)',
    //   category: 'Non-linear',
    //   icon: 'fa-pyramid',
    //   link:'/heap'
    // }
  ];
  const stats = {
    totalVisualizations: 6,
    totalAlgorithms: 35,
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <i className="fas fa-code text-2xl text-blue-600"></i>
            <h1 className="text-xl font-bold text-white">Codecraft</h1>
          </div>
          <div className="flex items-center space-x-6">
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight">
                Visualize Data Structures & Algorithms in Action
              </h1>
              <p className="text-xl text-blue-100">
                Experience interactive visualizations of complex data structures and algorithms in real-time.
              </p>
              <div className="flex space-x-12 pt-4">
                <div>
                  <div className="text-3xl font-bold">{stats.totalVisualizations}</div>
                  <div className="text-blue-200">Visualizations</div>
                </div>
                {/*<div>
                  <div className="text-3xl font-bold">{stats.totalAlgorithms}</div>
                  <div className="text-blue-200">Algorithms</div>
                </div>*/}
              </div>
              {/*<Button size="lg" className="!rounded-button bg-white text-blue-600 hover:bg-blue-50">
                Try Visualizer
              </Button>*/}
            </div>
            <div className="relative h-96">
              <img
                src="https://public.readdy.ai/ai/img_res/b4504925a02ce3deaab6d5198bd15154.jpg"
                alt="DSA Visualization"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">Visualization Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer bg-gray-800 border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center">
                    <i className={`fas ${module.icon} text-blue-400 text-xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{module.title}</h3>
                    <Badge variant="secondary" className="mt-1">
                      {module.complexity}
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-4 h-12">{module.description}</p>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-400">
                  <span><i className="fas fa-chart-line mr-2"></i>Complexity: {module.complexity}</span>
                  <span><i className="fas fa-folder mr-2"></i>{module.category}</span>
                </div>
                <div className="flex flex-wrap gap-2 my-3">
                  {module.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="bg-blue-50">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <Link  key={index} href={module.link}>
                  <Button variant="outline" size="sm" className="!rounded-button border-gray-600 text-gray-500 hover:bg-gray-600">
                    Try Now
                  </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App
