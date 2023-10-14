import { useState, useEffect,useRef } from 'react'
import './App.css';

function App() {
  const [toDos, setToDos] = useState([])
  const [toDo, setToDo] = useState('')
  const [editId, setEditId] = useState('')

  const [day, setDay] = useState('')
  const inputRef = useRef(null)

  
  const addToDo = () => {
    if (toDo !== '') {
      setToDos([ { id: Date.now(), taskName: toDo, status: false ,addedTime: new Date().toLocaleString()},...toDos])
      setToDo('')
    }
    if (editId) {
      const editToDo = toDos.find((toDo) => toDo.id === editId)
      const updateToDo = toDos.map((eachToDo) => eachToDo.id === editToDo.id ?
        (eachToDo = { id: eachToDo.id, taskName: toDo,addedTime:eachToDo.addedTime }) :
        (eachToDo = { id: eachToDo.id, taskName: eachToDo.taskName }))
      setToDos(updateToDo)
      setEditId(0)
      setToDo('')
    }
  }

  useEffect(() => {
    const currentDate = new Date()
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const currentDayIndex = currentDate.getDay();
    inputRef.current.focus()
    document.title = `To Do ( ${toDos.length} ) - ${currentDate.toLocaleDateString()}`; 
    
    setDay(days[currentDayIndex]);
  }, [toDos]);

  const editTask = ((taskId) => {
    const editToDo = toDos.find((toDo) => toDo.id === taskId)
    setToDo(editToDo.taskName);
    setEditId(editToDo.id)

  })
  const handleDeleteTask = (taskId) => {

    const updatedToDoList = toDos.filter((task) => task.id !== taskId);
    setToDos(updatedToDoList);
  }

  const taskCompleted = {
    color: 'green',
    fontWeight: 'bold',
  }
  const date = {
    color: 'white',
    border: '1px solid gray',
  }
  const divStyle = {
    display: 'flex',
  }


  return (
    <div className="app">
      <div className="mainHeading">
        <h1><u>To Do List</u></h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoo, it's {day}🌝☕</h2>
        <small style={date}>{new Date().toLocaleDateString()}</small>
      </div>
      <div className="input">
        <input ref={inputRef} value={toDo} onChange={(e) => setToDo(e.target.value)} type="text" placeholder="✏️Add task..." />
        <i onClick={() => addToDo()} className="fas fa-plus"></i>
      </div>
      <div className="todos"><br/>
      {toDos.some(task => task.taskName) &&
      <h2 style={{fontSize:'16px'}}><u>MY TASKS</u></h2>
      }
      
        {toDos.map((task) => {
          return (<div className="todo">
            <div className="left">
              <input onChange={(e) => {
                
                setToDos(toDos.filter(eachTask => {
                  if (eachTask.id === task.id) {
                    eachTask.status = e.target.checked
                    eachTask.completedTime = new Date().toLocaleString();
                  }
                  return eachTask;
                }))

              }} value={task.status} type="checkbox" name="" id="" />
              <p style={task.status?{textDecoration:'line-through underline'}:{textDecoration:''}}>{task.taskName}</p>
              <small style={{marginTop:'28px',display:'flex'}}>Added on: {task.addedTime}</small>
            </div>
            <div className="right">
              <i onClick={() => editTask(task.id)} class="fa-solid fa-pen"></i>
              <i onClick={() => handleDeleteTask(task.id)} className="fas fa-times"></i>
            </div>
          </div>)
        })
        }<br />
        {toDos.some((task) => task.status) &&
        <div>
          <h2 style={{fontSize:'16px', textAlign:'center'}}><u>COMPLETED TASKS</u></h2><br />
          {toDos.map((obj, index) => {
            if (obj.status) {
              return (
                <div style={divStyle}>
                  <table>
                    <tbody>
                      <tr >
                        <td key={obj.id}>{index + 1}</td>
                        <td style={taskCompleted}>{obj.taskName} ✓</td>
                        <td><i class="fa-regular fa-clock"></i> {obj.completedTime}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            }
            return null;
          })
          }
        </div>
        }
        
      </div>
    </div>
  );
}

export default App;
