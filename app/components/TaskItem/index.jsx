import React from 'react';
import Image from 'next/image';
import circleCheckedIcon from "../../images/circle-checked.svg";
import circleIcon from "../../images/circle.svg";

const TaskItem = ({task, index, handleToggleTask, handleDeleteTask}) => {
  // Component that shows each TaskItem
  return (
    <>
    <li className="flex justify-between items-center p-2 bg-blue-900 rounded mb-2">
                <div className="flex items-center">
                  <button
                    className="w-6 h-6 my-auto mr-6"
                    onClick={() => {
                      // alert("Toggle the task status")
                      handleToggleTask(index);
                    }}
                  >
                    <Image
                      src={task.completed ? circleCheckedIcon : circleIcon}
                      alt="Task status"
                      width={30}
                      height={30}
                    />
                  </button>
                  <span className={`ml-2 ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.text}</span>
                </div>
                <button onClick={() => {
                  // alert("Delete task");
                  handleDeleteTask(index)
                }} className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
    </>
  );
};

export default TaskItem;