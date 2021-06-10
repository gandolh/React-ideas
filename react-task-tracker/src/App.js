import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(()=>{   
    const getTasks = async ()=>{
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }
    getTasks();
  },[])

  //fetch tasks
  const fetchTasks = async ()=>{
    const res = await fetch('http://localhost:5000/tasks')
    const data =await res.json();
    return data;
  }
  //fetch task
  const fetchTask = async (id)=>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data =await res.json();
    return data;
  }

  //Add Task
  const addTask = async(task) => {
    const res =await fetch('http://localhost:5000/tasks',{
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(task)
    })
    const data= await res.json();
    setTasks([...tasks,data])
    // const id= Math.floor(Math.random()*10000)+1;
    // const id = tasks.length + 1;

    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);


  };

  //delete task
  const deleteTask = async(id) => {

    await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id));
  };
  //toggle Reminder
  const toggleReminder = async(id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = {...taskToToggle,reminder: !taskToToggle.reminder}
    const res= await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json'

      },
      body: JSON.stringify(updTask)
    })
    const data= await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  return (
    <div className="container">
      <Header
        title="Task Tracker"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "no tasks for today :D"
      )}
    </div>
  );
}

export default App;