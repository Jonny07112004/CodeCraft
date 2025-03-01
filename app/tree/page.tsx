'use client'
import React from 'react'
import App from './tree_intro'
import BinaryTreeVisualizer from './binary_tree'
import BinaryTreeTraversal from './custom_binary_tree'
import AVLTreeVisualizer from './avl_tree'


const Tree = () => {
  return (
    <>
    
    <App/>
    <BinaryTreeVisualizer/>
    <BinaryTreeTraversal/>
    {/* <AVLTreeVisualizer/> */}
    </>
  )
}

export default Tree