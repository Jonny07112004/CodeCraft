'use client'
import React from 'react'
import QueueVisualizer from './queue_animation'
import CirQueueVisualizer from './circular_queue'
import PriorityQueueVisualizer from './priority_queue'

const Queue = () => {
  return (
    <div>
        <QueueVisualizer/>
        <CirQueueVisualizer/>
        <PriorityQueueVisualizer/>
    </div>
  )
}

export default Queue