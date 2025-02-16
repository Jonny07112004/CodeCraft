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
const Linked_List = () => {
  return (
    <>
    <LinkedListVisualization/>
      {/*<div>
        
        <div className="w-full h-screen text-white flex flex-col items-center">
          
          <h1 className="text-center text-[2vw] md:text-[2.5vw] sm:text-[5vw] pt-[2vh] leading-none">
            Linked List
          </h1>
          
          <div className="mt-[3.5vh] mx-[5vw] border-2 border-white w-[95vw] rounded-sm h-[50vh] flex items-center justify-center">
            
            
          </div>
         
          <div className="mt-[4vh] justify-start w-[95vw] mx-[5vw] text-4xl">
            <DropdownMenu>
              <DropdownMenuTrigger>Insert</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Inserting In Linked-List</DropdownMenuLabel>
                <DropdownMenuItem>Insert In The Beginning</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
            <div className='mt-[4vh] justify-start w-[95vw] mx-[5vw] text-4xl'>
            <DropdownMenu>
              <DropdownMenuTrigger>Delete</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Deleting In Linked-List</DropdownMenuLabel>
                <DropdownMenuItem>Delete From The End</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>


        </div>
      </div>*/}

    </>

  )
}

export default Linked_List