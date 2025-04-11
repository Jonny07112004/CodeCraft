"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const MainPage = () => {
  const [arr, setarr] = useState([34, 22, 13, 66, 32, 50, 56, 88]);
  const [trackj, settrackj] = useState([-1]);
  const [tracki, settracki] = useState([-1]);
  const [trackk, settrackk] = useState([-1]);
  const [isInsert, setInsert] = useState(false);
  const [isIndex, setIndex] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [click, setclick] = useState(false);
  const [isBinary, setBinary] = useState(false);
  const [pseudoCode, setPseudoCode] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);

  async function sortArray() {
    let sortedArray = [...arr];
    let i = 0, j = 0, temp = 0;
    setclick(true);
    setPseudoCode([
      "for i = 0 to length(arr) - 1",
      "  for j = i + 1 to length(arr) - 1",
      "    if arr[i] > arr[j]",
      "      swap arr[i] and arr[j]",
      "end for",
      "end for",
      "Time Complexity: O(n²) - Worst and Average case"
    ]);
    setCurrentStep(0);
    for (i = 0; i < sortedArray.length; i++) {
      settracki([i]);
      await delay(1000);
      setCurrentStep(1);
      for (j = i + 1; j < sortedArray.length; j++) {
        settrackj([j]);
        await delay(1000);
        setCurrentStep(2);
        if (sortedArray[i] > sortedArray[j]) {
          temp = sortedArray[i];
          sortedArray[i] = sortedArray[j];
          sortedArray[j] = temp;
          setarr([...sortedArray]);
          await delay(1000);
          setCurrentStep(3);
        }
      }
      setCurrentStep(4);
    }
    settrackj([-1]);
    settracki([-1]);
    setCurrentStep(5);
    setclick(false);
  }

  async function arraySelectionSort() {
    let sortedArray = [...arr];
    let n = sortedArray.length;
    setclick(true);
    setPseudoCode([
      "for i = 0 to length(arr) - 2",
      "  min_idx = i",
      "  for j = i + 1 to length(arr) - 1",
      "    if arr[j] < arr[min_idx]",
      "      min_idx = j",
      "  end for",
      "  swap arr[i] and arr[min_idx]",
      "end for",
      "Time Complexity: O(n²) - Worst, Average, and Best case"
    ]);
    setCurrentStep(0);
    for (let i = 0; i < n - 1; i++) {
      let min_idx = i;
      settracki([i]);
      await delay(1000);
      setCurrentStep(1);
      for (let j = i + 1; j < n; j++) {
        if (sortedArray[j] < sortedArray[min_idx]) {
          min_idx = j;
          settrackj([j]);
          await delay(1000);
          setCurrentStep(2);
        }
      }
      setCurrentStep(3);
      let temp = sortedArray[i];
      sortedArray[i] = sortedArray[min_idx];
      sortedArray[min_idx] = temp;
      await delay(1000);
      setarr([...sortedArray]);
      setCurrentStep(4);
    }
    settrackj([-1]);
    settracki([-1]);
    setCurrentStep(5);
    setclick(false);
  }

  async function insertionSort() {
    let sortedArray = [...arr];
    setPseudoCode([
      "for i = 1 to length(arr) - 1",
      "  key = arr[i]",
      "  j = i - 1",
      "  while j >= 0 and arr[j] > key",
      "    arr[j + 1] = arr[j]",
      "    j = j - 1",
      "  end while",
      "  arr[j + 1] = key",
      "end for",
      "Time Complexity: O(n²) - Worst and Average case, O(n) - Best case"
    ]);
    setCurrentStep(0);
    for (let i = 1; i < sortedArray.length; i++) {
      let key = sortedArray[i];
      settracki([i]);
      await delay(1000);
      setCurrentStep(1);
      let j = i - 1;
      setCurrentStep(2);
      while (j >= 0 && sortedArray[j] > key) {
        settrackj([j]);
        await delay(1000);
        setCurrentStep(3);
        sortedArray[j + 1] = sortedArray[j];
        j = j - 1;
      }
      sortedArray[j + 1] = key;
      setarr([...sortedArray]);
      setCurrentStep(4);
    }
    settrackj([-1]);
    settracki([-1]);
    setCurrentStep(5);
    setclick(false);
  }

  const delay = (duration: number | undefined) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  };

  const resetArray = () => {
    const reArray = [12, 23, 34, 45, 21, 32, 43, 54];
    setInsert(false);
    setSearch(false);
    settrackk([-1]);
    settracki([-1]);
    settrackj([-1]);
    setPseudoCode([""]);
    setBinary(false);
    setarr(reArray);
    setclick(false);
  };

  const addElement = () => {
    const inputElement = document.getElementById("arrayelement") as HTMLInputElement;
    const inputValue = Number(inputElement.value);
    setPseudoCode([
      "if length(arr) < 8 and value != 0",
      "  append value to arr",
      "end if",
      "Time Complexity: O(1) - Amortized (array resizing may be O(n))"
    ]);
    setCurrentStep(0);
    if (arr.length < 8 && inputValue !== 0) {
      setCurrentStep(1);
      setarr([...arr, inputValue]);
    } else {
      alert("Array can only hold 8 elements or non-zero input is required.");
    }
    inputElement.value = "";
    setCurrentStep(3); // Highlight time complexity
  };

  const insertAtIndex = () => {
    const valueElement = document.getElementById("arrayelement") as HTMLInputElement;
    const indexElement = document.getElementById("arrayindex") as HTMLInputElement;
    const value = Number(valueElement.value);
    const index = Number(indexElement.value);
    setPseudoCode([
      "if length(arr) < 8 and index >= 0 and index <= length(arr) and value != 0",
      "  shift elements from index to right",
      "  arr[index] = value",
      "end if",
      "Time Complexity: O(n) - Due to shifting elements"
    ]);
    setCurrentStep(0);
    if (arr.length < 8 && index >= 0 && index <= arr.length && value !== 0) {
      setCurrentStep(1);
      const newArray = [...arr];
      newArray.splice(index, 0, value);
      setCurrentStep(2);
      setarr(newArray);
    } else {
      alert("Array limited to 8 elements, or invalid index/value.");
    }
    valueElement.value = "";
    indexElement.value = "";
    setCurrentStep(4); // Highlight time complexity
  };

  const inputFunc = () => {
    const inputElement = document.getElementById("arrayelement") as HTMLInputElement;
    const inputValue = Number(inputElement.value);
    inputElement.value = "";
    return inputValue;
  };

  async function searchingArray() {
    let i, j;
    let data = inputFunc();
    let sortedArray = [...arr];
    setPseudoCode([
      "for i = 0 to length(arr) - 1",
      "  if arr[i] == data",
      "    return i",
      "  end if",
      "end for",
      "return -1",
      "Time Complexity: O(n) - Worst and Average case"
    ]);
    setCurrentStep(0);
    if (isSearch) {
      for (i = 0; i < sortedArray.length; i++) {
        settracki([i]);
        await delay(1000);
        setCurrentStep(1);
        if (data === sortedArray[i]) {
          settrackk([i]);
          await delay(1000);
          j = 1;
          break;
        }
        setCurrentStep(2);
        if (j !== 1 && i === sortedArray.length - 1) alert("Not Found The Element");
      }
      settracki([-1]);
      setCurrentStep(3);
    }
  }

  async function binarySearch() {
    let sortedArray = [...arr].sort((a, b) => a - b);
    let left = 0;
    let right = sortedArray.length - 1;
    let target = inputFunc();
    setPseudoCode([
      "left = 0, right = length(arr) - 1",
      "while left <= right",
      "  mid = (left + right) / 2",
      "  if arr[mid] == target",
      "    return mid",
      "  else if arr[mid] < target",
      "    left = mid + 1",
      "  else",
      "    right = mid - 1",
      "  end if",
      "end while",
      "return -1",
      "Time Complexity: O(log n) - Worst and Average case (sorted array)"
    ]);
    setCurrentStep(0);
    settracki([left]);
    settrackj([right]);
    await delay(500);
    setCurrentStep(1);
    while (left <= right) {
      const middle = Math.floor((left + right) / 2);
      settrackk([middle]);
      await delay(2000);
      setCurrentStep(2);
      if (sortedArray[middle] === target) {
        settrackk([middle]);
        alert(`Target found at index: ${middle}`);
        setCurrentStep(3);
        return;
      }
      setCurrentStep(4);
      if (sortedArray[middle] < target) {
        left = middle + 1;
        settracki([left]);
        await delay(2000);
        setCurrentStep(5);
      } else {
        right = middle - 1;
        settrackj([right]);
        await delay(2000);
        setCurrentStep(6);
      }
      setCurrentStep(7);
    }
    alert("Target not found in the array.");
    settracki([-1]);
    settrackj(["-1"]);
    setCurrentStep(8);
  }

  return (
    <div className="w-full h-screen text-white flex overflow-auto bg-gray-900 p-6">
      <div className="w-[45vw] h-full flex flex-col justify-start">
        <h2 className="text-2xl font-semibold mb-4">Pseudo-code</h2>
        <div className="p-4 bg-gray-700 rounded-lg h-full overflow-auto">
          <code className="text-gray-300 font-mono whitespace-pre-wrap">
            {pseudoCode.map((step, index) => (
              <div
                key={index}
                className={
                  currentStep === index
                    ? "text-yellow-300"
                    : index === pseudoCode.length - 1
                    ? "text-green-400"
                    : ""
                }
              >
                {step}
              </div>
            ))}
          </code>
        </div>
      </div>
      <div className="w-3/4 h-full flex flex-col justify-between">
        <h1 className="text-4xl font-bold mb-4">Array Data Structure</h1>
        <div className="flex flex-row justify-between h-full">
          <div className="flex flex-col items-center justify-start">
            <div className="mt-4 mx-4 text-2xl">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-gray-800 text-white px-4 py-2 rounded">Sort</DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 text-white">
                  <DropdownMenuLabel>Sorting in Array</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <button onClick={sortArray} className="w-full text-left px-4 py-2 hover:bg-gray-700">Bubble Sort</button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={arraySelectionSort} className="w-full text-left px-4 py-2 hover:bg-gray-700">Selection Sort</button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={insertionSort} className="w-full text-left px-4 py-2 hover:bg-gray-700">Insertion Sort</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-4 mx-4 text-2xl">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-gray-800 text-white px-4 py-2 rounded">Insert</DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 text-white">
                  <DropdownMenuLabel>Insertion in Array</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <button onClick={() => { setarr([]); setInsert(true); setSearch(false); setIndex(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-700">Insert Data</button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={() => { setSearch(false); resetArray(); setIndex(true); setarr([12,23,65,54])}} className="w-full text-left px-4 py-2 hover:bg-gray-700">Insert at Specified Index</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-4 mx-4 text-2xl">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-gray-800 text-white px-4 py-2 rounded">Search</DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 text-white">
                  <DropdownMenuLabel>Searching in Array</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <button onClick={() => { resetArray(); setSearch(true); setInsert(false); setBinary(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-700">Linear Search</button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={() => { setSearch(true); setInsert(false); setBinary(true); setarr(arr.sort((a, b) => a - b)); }} className="w-full text-left px-4 py-2 hover:bg-gray-700">Binary Search</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-4 mx-4 text-2xl">
              <button onClick={resetArray} className={`bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 ${click && "cursor-not-allowed"}`}>Reset</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col items-center justify-center">
        <div className="flex mx-[5vh] mt-[8vh] border-2 border-white w-[50vw] rounded-sm h-[60vh] items-end justify-center">
          {!isBinary && arr.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center mx-1">
              <div className="flex-col items-center justify-center px-[2vw]">
                {index === tracki[0] ? "i" : ""}
                {index === trackj[0] ? "j" : ""}
              </div>
              <div className={`flex m-1 w-[3.5vw] items-center justify-center rounded-sm ${
                index === tracki[0] ? "bg-green-600" :
                index === trackj[0] ? "bg-blue-600" :
                index === trackk[0] ? "bg-red-600" :
                "bg-gray-400"}`}
                style={{ height: `${item * 2}px` }}>
                {item}
              </div>
              <div className="px-8">{index}</div>
            </div>
          ))}
          {isBinary && arr.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center mx-1">
              <div className="flex-col items-center justify-center px-[1vw]">
                {index === tracki[0] ? "Min" : ""}
                {index === trackj[0] ? "Max" : ""}
                {index === trackk[0] ? "Mid" : ""}
              </div>
              <div className={`flex m-1 w-[3.5vw] items-center justify-center rounded-sm ${
                index === tracki[0] ? "bg-green-600" :
                index === trackj[0] ? "bg-blue-600" :
                index === trackk[0] ? "bg-red-600" :
                "bg-gray-400"}`}
                style={{ height: `${item * 2}px` }}>
                {item}
              </div>
              <div className="px-8">{index}</div>
            </div>
          ))}
        </div>
        <div>
          {isInsert && (
            <div className="border-2 border-white w-[50vw] h-[13vh] ml-[2.2vw] rounded-sm mt-[5vh] flex items-center">
              <p className="mx-2 text-xl">Enter Data</p>
              <input type="number" placeholder="Number Only" className="input input-bordered mt-1 mx-1 mb-1 text-black" id="arrayelement" name="value" />
              <button className="text-xl mx-2 bg-blue-600 rounded-sm p-2" onClick={addElement}>Add</button>
            </div>
          )}
          {isIndex && (
            <div className="border-2 border-white w-[50vw] h-[13vh] ml-[2.2vw] rounded-sm mt-[5vh] flex items-center">
              <p className="mx-2 text-xl">Enter Data</p>
              <input type="number" placeholder="Number Only" className="input input-bordered mt-1 mx-1 mb-1 text-black" id="arrayelement" name="value" />
              <p className="mx-2 text-xl">Enter Index</p>
              <input type="number" placeholder="Index" className="input input-bordered mt-1 mx-1 mb-1 text-black" id="arrayindex" name="index" />
              <button className="text-xl mx-2 bg-blue-600 rounded-sm p-2" onClick={insertAtIndex}>Insert</button>
            </div>
          )}
          {isSearch && (
            <div className="border-2 border-white w-[50vw] h-[13vh] ml-[2.2vw] rounded-sm mt-[5vh] flex items-center">
              <p className="mx-2 text-xl">Enter Data</p>
              <input type="number" placeholder="Number Only" className="input input-bordered mt-1 mx-1 mb-1 text-black" id="arrayelement" name="value" />
              {!isBinary && (
                <button className="text-xl mx-2 bg-blue-600 rounded-sm p-2" onClick={searchingArray}>Search</button>
              )}
              {isBinary && (
                <button className="text-xl mx-2 bg-blue-600 rounded-sm p-2" onClick={binarySearch}>Search</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;