'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import LinkedListVisualization from './animation'
import LinkedListVisualizer from './animation2'
import LinkedListVisualizerC from './circular_linkedlist'
const Linked_List = () => {
  return (
    <>
    <LinkedListVisualization/>
    <LinkedListVisualizer/>
    <LinkedListVisualizerC/>
      

    </>

  )
}

export default Linked_List