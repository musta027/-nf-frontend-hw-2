'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';

class Task {
  constructor(id, text, completed) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }
}

export default function Home() {
  // const tasks = []; // rewrite using states
  const [tasks, setTasks] = useState([]);
  // const filter = 'all'; // rewrite using states
  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState("");
  const [itemsLeft, setItemsLeft] = useState(0);
  let id = 0;

  useEffect(() => {
    const gotTasks = window.localStorage.getItem("tasks");
    if (gotTasks != null) {
      let cnt = 0;
      JSON.parse(gotTasks).map((task) => { if (task.completed === false) { cnt += 1; } })
      setItemsLeft(cnt);
      setTasks(JSON.parse(gotTasks));
    }
    else setTasks([]);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  const handleAddTask = () => {
    // Implement add task logic here
    // console.log(newTask);
    if (newTask.length > 0) {
      setItemsLeft(itemsLeft + 1);
      setTasks([...tasks, new Task(++id, newTask, false)]);
    }
  };


  const handleClearCompleted = () => {
    const newTasks = [];
    tasks.map((task, index) => {
      if (task.completed === false) {
        newTasks.push(task);
      }
    })
    setTasks(newTasks);
    setItemsLeft(newTasks.length);
    window.localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>

      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
          onChange={(e) => { setNewTask(e.target.value) }}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        {/* Medium level: extract todo's listing to TaskList component */}
        {/* Basic level: map through tasks state by using this code: */}
        <TaskList tasks={tasks} setTasks={setTasks} itemsLeft={itemsLeft} setItemsLeft={setItemsLeft} filter={filter} />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span> {itemsLeft} items left</span>  {/* show how many uncompleted items left */}
          <div>
            <button onClick={() => { /*alert("Show all");*/ setFilter("all") }} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => { /*alert("Show active");*/ setFilter("active") }} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => { /*alert("Show completed");*/ setFilter("completed") }} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
            onClick={() => {
              // alert("Clear completed tasks");
              handleClearCompleted();
            }}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}