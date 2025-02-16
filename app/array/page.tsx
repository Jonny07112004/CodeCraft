"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { motion } from "framer-motion"; // For animations
import { div } from "framer-motion/client";

const MainPage = () => {
  let [arr, setarr] = useState([34, 22, 13, 66, 32, 50, 56, 88]);
  let [trackj, settrackj] = useState([-1]);
  let [tracki, settracki] = useState([-1]);
  let [trackk, settrackk] = useState([-1]);
  const [isInsert, setInsert] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [click, setclick] = useState(false);
  const [isBinary, setBinary] = useState(false);

  async function sortArray() {
    let sortedArray = [...arr]; // Create a copy of the array
    let i = 0,
      j = 0,
      temp = 0;
    setclick(true);
    for (i = 0; i < sortedArray.length; i++) {
      settracki([i]);
      await delay(1000);
      for (j = i + 1; j < sortedArray.length; j++) {
        settrackj([j]);
        await delay(1000);
        if (sortedArray[i] > sortedArray[j]) {
          temp = sortedArray[i];
          sortedArray[i] = sortedArray[j];
          sortedArray[j] = temp;
          setarr(sortedArray);
          await delay(1000);
        }
      }
    }
    settrackj([-1]);
    settracki([-1]);
    setclick(false);
  }

  async function arraySelectionSort() {
    let sortedArray = [...arr];
    let n = sortedArray.length;
    setclick(true);
    for (let i = 0; i < n - 1; i++) {
      // Assume the current position holds
      // the minimum element
      let min_idx = i;
      settracki([i]);
      await delay(1000);
      // Iterate through the unsorted portion
      // to find the actual minimum
      for (let j = i + 1; j < n; j++) {
        if (sortedArray[j] < sortedArray[min_idx]) {
          // Update min_idx if a smaller element is found
          min_idx = j;
          settrackj([j]);
          await delay(1000);
        }
      }

      // Move minimum element to its
      // correct position
      let temp = sortedArray[i];
      sortedArray[i] = sortedArray[min_idx];
      sortedArray[min_idx] = temp;
      await delay(1000);
      setarr(sortedArray);
      setclick(false);
    }
    settrackj([-1]);
    settracki([-1]);
  }

  function insertionSort() {
    let sortedArray = [...arr];
    for (let i = 1; i < sortedArray.length; i++) {
      let key = sortedArray[i];
      let j = i - 1;

      /* Move elements of arr[0..i-1], that are
         greater than key, to one position ahead
         of their current position */
      while (j >= 0 && sortedArray[j] > key) {
        sortedArray[j + 1] = sortedArray[j];
        j = j - 1;
      }
      sortedArray[j + 1] = key;
    }
  }
  const delay = (duration: number | undefined) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  };

  const resetArray = () => {
    const reArray = [];
    setInsert(false);
    setSearch(false);
    settrackk([-1]);
    settracki([-1]);
    settrackj([-1]);
    setBinary(false);
    for (let i = 0; i < 8; i++) {
      reArray.push(Math.floor(Math.random() * (95 - 10 + 1)) + 10);
    }

    setarr(reArray);
  };

  const addElement = () => {
    const inputElement = document.getElementById(
      "arrayelement"
    ) as HTMLInputElement;

    const inputValue = Number(inputElement.value); // Convert input to a number

    if (arr.length < 10 && inputValue !== 0) {
      // Limit to 10 elements and check for non-zero values
      setarr([...arr, inputValue]); // Append the new value
      console.log(arr);
    } else {
      alert("Array can only hold 10 elements or non-zero input is required.");
    }
    inputElement.value = ""; // Clear input after adding
  };

  const inputFunc = () => {
    const inputElement = document.getElementById(
      "arrayelement"
    ) as HTMLInputElement;
    const inputValue = Number(inputElement.value); // Convert input to a number
    inputElement.value = "";
    return inputValue;
  };

  async function searchingArray() {
    let i, j;
    let data = inputFunc();
    let sortedArray = [...arr];
    if (isSearch) {
      for (i = 0; i < sortedArray.length; i++) {
        settracki([i]);
        await delay(1000);
        if (data === sortedArray[i]) {
          settrackk([i]);
          await delay(1000);
          j = 1;
          break;
        }
        if (j === 1) alert("Not Found The Element");
      }
      settracki([-1]);
    }
  }

  async function binarySearch() {
    let sortedArray = [...arr]; // Ensure the array is sorted
    let left = 0;
    let right = sortedArray.length - 1;
    let target = inputFunc(); // Get the target value
    settracki([left]);
    settrackj([right]);
    await delay(500);
    while (left <= right) {
      // Calculate the middle index
      const middle = Math.floor((left + right) / 2);
      settrackk([middle]);
      await delay(2000);
      // Check if the target is found
      if (sortedArray[middle] === target) {
        settrackk([middle]); // Highlight the index visually
        alert(`Target found at index: ${middle}`);
        return; // Exit the function after finding the target
      }

      // Decide whether to search in the left or right half
      if (sortedArray[middle] < target) {
        left = middle + 1; // Search in the right half
        settracki([left]);
        await delay(2000);
      } else {
        right = middle - 1; // Search in the left half
        settrackj([right]);
        await delay(2000);
      }
    }

    // If the loop ends without finding the target
    alert("Target not found in the array.");
    settracki([-1]);
    settrackj([-1]);
  }

  return (
    <div className="w-full h-screen text-white flex">
      <div className="w-1/2 h-screen flex-col justify-between ">
        <h1 className="text-[3vw] pt-[5vh] px-[5vw] leading-none">
          Array Data Structure
        </h1>
        <div className="mt-[5vh] mx-[5vw] text-4xl">
          <DropdownMenu>
            <DropdownMenuTrigger>Sort</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sorting in Array</DropdownMenuLabel>
              <DropdownMenuItem>
                <button onClick={sortArray}>Bubble Sort</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={arraySelectionSort}>Selection Sort</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={insertionSort}>Insertion Sort</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>Insert at the Between</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-[5vh] mx-[5vw] text-4xl">
          <DropdownMenu>
            <DropdownMenuTrigger>Insert</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Insertion in Array</DropdownMenuLabel>
              <DropdownMenuItem>
                <button
                  onClick={() => {
                    setarr([]);
                    setInsert(true);
                    setSearch(false);
                  }}
                >
                  Insert Data
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>Insert at the Beginning</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>Insert at the End</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>Insert at the Between</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-[5vh] mx-[5vw] text-4xl">
          <DropdownMenu>
            <DropdownMenuTrigger>Search</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Searching in Array</DropdownMenuLabel>
              <DropdownMenuItem>
                <button
                  onClick={() => {
                    resetArray;
                    setSearch(true);
                    setInsert(false);
                    setBinary(false);
                  }}
                >
                  Traversing in Array
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button
                  onClick={() => {
                    setSearch(true);
                    setInsert(false);
                    setBinary(true);
                    setarr(arr.sort());
                  }}
                >
                  Binary Search
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>Insert at the End</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button>Insert at the Between</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-[5vh] mx-[5vw] text-4xl">
          <button
            onClick={resetArray}
            className={` ${click && "cursor-not-allowed"} `}
          >
            Reset
          </button>
        </div>
        {/*<div className='flex border-2 border-white w-[40vw] h-1/3 ml-[5vw] mt-[5vh] bg-zinc-900'>
          <p className='overflow-scroll p-[1vw]'>
            1. Start with an unsorted array.<br></br>
            2. Iterate through the array multiple times. Each time, you will compare adjacent elements.<br></br>
            3. For each pair of adjacent elements:<br></br>
            3.1 If the first element is larger than the second one, swap them so the smaller element comes first.<br></br>
            3.2 If the first element is smaller than or equal to the second one, leave them as they are.<br></br>
            4. Repeat this process for the entire array. After each full pass through the array, the largest unsorted element will "bubble up" to its correct position at the end.<br></br>
            5. Reduce the range of elements being compared in each pass, as the last elements of the array will already be sorted after each full pass.<br></br>
            6. If no swaps were made in a full pass, it means the array is fully sorted, and you can stop early.<br></br>
            7. Continue until the entire array is sorted.<br></br>
          </p>
        </div>*/}
      </div>
      <div className="flex-col items-center justify-center">
        <div className="flex mx-[5vh] mt-[8vh] border-2 border-white w-[50vw] rounded-sm h-[60vh] items-end justify-center">
          {!isBinary &&
            arr.map((item, index) => {
              return (
                <div className="">
                  <div className="flex-col items-center justify-center px-[2vw]">
                    {index === tracki[0] ? "i" : ""}
                    {index === trackj[0] ? "j" : ""}
                  </div>
                  <div
                    className={`flex m-1 w-[3.5vw] items-center justify-center rounded-sm ${
                      index === tracki[0]
                        ? "bg-green-600" // Highlight for tracki
                        : index === trackj[0]
                        ? "bg-blue-600" // Highlight for trackj
                        : index === trackk[0]
                        ? "bg-red-600" // Highlight for trackk (new condition)
                        : "bg-gray-400"
                    }`}
                    key={index}
                    style={{ height: `${item * 2}px` }}
                  >
                    {item}
                  </div>

                  <div className="px-8">{index}</div>
                </div>
              );
            })}

          {isBinary &&
            arr.map((item, index) => {
              return (
                <div className="">
                  <div className="flex-col items-center justify-center px-[1vw]">
                    {index === tracki[0] ? "Min" : ""}
                    {index === trackj[0] ? "Max" : ""}
                    {index === trackk[0] ? "Mid" : ""}
                  </div>
                  <div
                    className={`flex m-1 w-[3.5vw] items-center justify-center rounded-sm ${
                      index === tracki[0]
                        ? "bg-green-600" // Highlight for tracki
                        : index === trackj[0]
                        ? "bg-blue-600" // Highlight for trackj
                        : index === trackk[0]
                        ? "bg-red-600" // Highlight for trackk (new condition)
                        : "bg-gray-400"
                    }`}
                    key={index}
                    style={{ height: `${item * 2}px` }}
                  >
                    {item}
                  </div>
                  <div className="px-8">{index}</div>
                </div>
              );
            })}
        </div>
        <div>
          {isInsert && (
            <div className="border-2 border-white w-[50vw] h-[13vh] ml-[2.2vw] rounded-sm mt-[5vh] flex items-center">
              <p className="mx-2 text-xl">Enter Data</p>
              <input
                type="number"
                placeholder="Number Only"
                className="input input-bordered mt-1 mx-1 mb-1 text-black"
                id="arrayelement"
                name="value"
              />
              {isInsert && (
                <button
                  className="text-xl mx-2 bg-blue-600 rounded-sm p-2"
                  onClick={addElement}
                >
                  Add
                </button>
              )}
            </div>
          )}
          {isSearch && (
            <div className="border-2 border-white w-[50vw] h-[13vh] ml-[2.2vw] rounded-sm mt-[5vh] flex items-center">
              <p className="mx-2 text-xl">Enter Data</p>
              <input
                type="number"
                placeholder="Number Only"
                className="input input-bordered mt-1 mx-1 mb-1 text-black"
                id="arrayelement"
                name="value"
              />
              {!isBinary && (
                <button
                  className="text-xl mx-2 bg-blue-600 rounded-sm p-2"
                  onClick={searchingArray}
                >
                  Search
                </button>
              )}

              {isBinary && (
                <>
                  <button
                    className="text-xl mx-2 bg-blue-600 rounded-sm p-2"
                    onClick={binarySearch}
                  >
                    Search
                  </button>
                  {/* <button className="text-xl mx-2 bg-blue-600 rounded-sm p-2" onClick={()=>{
                    setarr([]);
                    let reArray = arr;
                    for (let i = 0; i < 8; i++) {
                      reArray.push(Math.floor(Math.random() * (95 - 10 + 1)) + 10);
                    }
                    setarr(reArray.sort((a, b) => a - b));
                  }}>
                    Reset
                  </button> */}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
//  // Required for Next.js 13 to use client-side interactivity

// import { motion } from 'framer-motion'; // For animations

// const SwapDivsArray = () => {
//   // Initial array of elements
//   const [arr, setArr] = useState([1, 2, 3, 4, 5]); // You can use any elements

//   // Function to handle swapping elements
//   const handleSwap = (index1, index2) => {
//     const newArr = [...arr]; // Create a copy of the array
//     // Swap logic
//     const temp = newArr[index1];
//     newArr[index1] = newArr[index2];
//     newArr[index2] = temp;
//     setArr(newArr); // Update the state with the new array
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <div className="flex justify-center">
//         {arr.map((item, index) => (
//           <motion.div
//             key={index}
//             className={`w-32 h-${item} ${index%2 == 0 ? 'bg-blue-500':'bg-red-500'} text-white flex items-center justify-center m-2 transition-transform duration-500`}
//             style={{
//               transform: `translateX(${index * 120}px)`, // Position based on index
//             }}
//           >
//             {item}
//           </motion.div>
//         ))}
//       </div>

//       <button
//         onClick={() => handleSwap(0, 3)} // Swap elements at index 1 and 3
//         className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Swap
//       </button>
//     </div>
//   );
// };

// export default SwapDivsArray;
