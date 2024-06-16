import React from 'react';
import TaskItem from '../TaskItem';


const TaskList = ({tasks, setTasks, itemsLeft, setItemsLeft, filter}) => {
  // Render TaskItems using TaskItem component


  const handleToggleTask = (index) => {
    // Implement toggle completed/uncompleted task logic here
    // console.log(index);
    const newTasks = [...tasks];
    if(newTasks[index].completed===false) {
      newTasks[index].completed=true;
      setItemsLeft(itemsLeft - 1);
    } else {
      newTasks[index].completed=false;
      setItemsLeft(itemsLeft + 1);
    }
    setTasks(newTasks);
    window.localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleDeleteTask = (index) => {
    // Implement delete task logic here
    if(tasks[index].completed===false) {
      setItemsLeft(itemsLeft - 1);
    }
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    window.localStorage.setItem("tasks", JSON.stringify(newTasks));
  };
  // Filter tasks by status here
  return (
    <>
    <ul>
          {tasks.map((task, index) => {
            return (filter==="all" || (filter==="active" && task.completed===false) || (filter==="completed" && task.completed===true)) ? (
              <TaskItem key={index} index={index} task={task} handleDeleteTask={handleDeleteTask} handleToggleTask={handleToggleTask} />
            ) : ""
          })}
        </ul>
    </>
  );
};

export default TaskList;