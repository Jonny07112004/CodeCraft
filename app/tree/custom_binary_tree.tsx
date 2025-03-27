import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const App: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [traversalType, setTraversalType] = useState<'preorder' | 'inorder' | 'postorder'>('preorder');
  const [speed, setSpeed] = useState([50]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isContent,setIsContent] = useState('preorder');
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  // Fixed Binary Tree Structure
  const treeData: TreeNode = {
    name: '8',
    children: [
      {
        name: '3',
        children: [
          { name: '1' },
          {
            name: '6',
            children: [
              { name: '4' },
              { name: '7' }
            ]
          }
        ]
      },
      {
        name: '10',
        children: [
          { name: '9' },
          {
            name: '14',
            children: [{ name: '13' }]
          }
        ]
      }
    ]
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      animation: false,
      series: [{
        type: 'tree',
        data: [treeData],
        top: '5%',
        left: '15%',
        bottom: '5%',
        right: '15%',
        orient: 'vertical',
        symbol: 'circle',
        symbolSize: 45,
        label: {
          position: 'inside',
          fontSize: 16,
          color: '#fff',
          fontWeight: 'bold',
        },
        itemStyle: {
          color: '#4338ca',
          borderWidth: 2,
          borderColor: '#fff',
        },
        lineStyle: {
          color: '#94a3b8',
          width: 2,
        },
        emphasis: {
          itemStyle: {
            color: '#dc2626'
          }
        },
        expandAndCollapse: false,
        initialTreeDepth: -1,
      }]
    };

    chart.setOption(option);

    return () => chart.dispose();
  }, []);

  const traverseTree = (type: 'preorder' | 'inorder' | 'postorder'): string[] => {
    const path: string[] = [];

    const traverse = (node: TreeNode | undefined) => {
      if (!node) return;
      if (type === 'preorder') {
        path.push(node.name);
        node.children?.forEach(traverse);
      } else if (type === 'inorder') {
        node.children?.[0] && traverse(node.children[0]);
        path.push(node.name);
        node.children?.[1] && traverse(node.children[1]);
      } else {
        node.children?.forEach(traverse);
        path.push(node.name);
      }
      
    };
    
    traverse(treeData);
    return path;
  };

  const handleTraversal = () => {
    setCurrentPath(traverseTree(traversalType));
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 w-100v">
      <div className="max-w-[1440px] mx-auto px-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">Binary Tree Traversal Visualization</h1>
          <p className="text-lg text-gray-400">Explore and understand different tree traversal algorithms through interactive visualization.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card className="h-full bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Tree Visualization</CardTitle>
                <CardDescription className="text-gray-400">Interactive binary tree representation</CardDescription>
              </CardHeader>
              <CardContent>
                <div ref={chartRef} className="w-full h-[500px]" />

                <div className="space-y-6 mt-6">
                  <div className="flex gap-4">
                    <Button
                      variant={traversalType === 'preorder' ? 'default' : 'outline'}
                      onClick={() => {setTraversalType('preorder'),setIsContent('preorder')}}
                    >
                      Pre-order
                    </Button>
                    <Button
                      variant={traversalType === 'inorder' ? 'default' : 'outline'}
                      onClick={() => {setTraversalType('inorder'),setIsContent('inorder')}}
                    >
                      In-order
                    </Button>
                    <Button
                      variant={traversalType === 'postorder' ? 'default' : 'outline'}
                      onClick={() => {setTraversalType('postorder'),setIsContent('postorder')}}
                    >
                      Post-order
                    </Button>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={handleTraversal}>
                      {isPlaying ? 'Pause' : 'Start'} Traversal
                    </Button>
                    <Button variant="outline" onClick={() => setCurrentPath([])}>
                      Reset
                    </Button>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg text-white">
                    <p className="text-sm font-medium mb-2">Current Path:</p>
                    <p className="text-lg">{currentPath.join(' → ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">Understanding Tree Traversal</CardTitle>
                <CardDescription className="text-gray-400">Learn about different traversal methods</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="preorder">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="preorder">Pre-order</TabsTrigger>
                    <TabsTrigger value="inorder">In-order</TabsTrigger>
                    <TabsTrigger value="postorder">Post-order</TabsTrigger>
                  </TabsList>

                  <ScrollArea className="h-[600px] w-full rounded-md">
                    <TabsContent value="preorder" className="space-y-6 text-white">
                      <h3 className="text-xl font-semibold">Pre-order Traversal (Root → Left → Right)</h3>
                      <p>Pre-order traversal visits the root node first, then traverses the left subtree, and finally the right subtree.</p>
                      <div className="bg-gray-100 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-black">Algorithm Steps:</h4>
                          <ol className="list-decimal list-inside space-y-2 text-black">
                            <li>Visit the root node</li>
                            <li>Traverse the left subtree recursively</li>
                            <li>Traverse the right subtree recursively</li>
                          </ol>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">
                            Common Use Cases:
                          </h4>
                          <ul className="list-disc list-inside space-y-2">
                            <li>Creating a copy of the tree</li>
                            <li>Serializing or deserializing a tree</li>
                            <li>
                              Getting prefix expression of an expression tree
                            </li>
                          </ul>
                        </div>
                    </TabsContent>

                    <TabsContent value="inorder" className="space-y-6 text-white">
                      <h3 className="text-xl font-semibold">In-order Traversal (Left → Root → Right)</h3>
                      <p>In-order traversal visits the left subtree first, then the root node, and finally the right subtree.</p>
                      <div className="bg-gray-100 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-black">Algorithm Steps:</h4>
                          <ol className="list-decimal list-inside space-y-2 text-black">
                            <li>Traverse the left subtree recursively</li>
                            <li>Visit the root node</li>
                            <li>Traverse the right subtree recursively</li>
                          </ol>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">
                            Common Use Cases:
                          </h4>
                          <ul className="list-disc list-inside space-y-2 ">
                            <li>Binary Search Tree operations</li>
                            <li>Getting sorted elements in BST</li>
                            <li>
                              Getting infix expression from expression tree
                            </li>
                          </ul>
                        </div>

                    </TabsContent>

                    <TabsContent value="postorder" className="space-y-6 text-white">
                      <h3 className="text-xl font-semibold">Post-order Traversal (Left → Right → Root)</h3>
                      <p>Post-order traversal visits the left subtree first, then the right subtree, and finally the root node.</p>

                       <div className="bg-gray-100 p-4 rounded-lg">
                          <h4 className="font-medium mb-2 text-black">Algorithm Steps:</h4>
                          <ol className="list-decimal list-inside space-y-2 text-black">
                            <li>Traverse the left subtree recursively</li>
                            <li>Traverse the right subtree recursively</li>
                            <li>Visit the root node</li>
                          </ol>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">
                            Common Use Cases:
                          </h4>
                          <ul className="list-disc list-inside space-y-2">
                            <li>Deleting a tree</li>
                            <li>
                              Getting postfix expression from expression tree
                            </li>
                            <li>Space efficient tree traversal</li>
                          </ul>
                        </div>
                    </TabsContent>
                  </ScrollArea>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
