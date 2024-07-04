import React, { useState } from "react";
import { Button, Card } from "@nextui-org/react";
import Task from "./Task.tsx"
import TaskList from "./TaskList.jsx"
import {todos as ids} from "./Todos.jsx"
import Win from "./Win.jsx"
import TaskWin from "./TaskWin.jsx";
import TaskEdit from "./TaskEdit.jsx";
// Componente principal
function App() {
  // Vista de los todos actuales
  const [todos, setTodos] = useState(ids)
  const [isWindow, setisWindow] = useState(false)
  const [isShowing, setIsShowing] = useState(false)
  const [isShowingEdit, setIsShowingEdit] = useState(false)
  // Mostrar ventana para la creacion de los todo
  function newTodo(e) {
    setisWindow(true)
    console.log('pressed')
  }
  // Crear el todo
  const createTask = (ident, title, description, hour) => {
    setTodos([ ...todos,{id: ident, name:title, desc: description, time: hour}])
    console.log(todos)
  }
  //Editar todo
  const eTask = (ident, title, description, hour) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === ident? { ...todo, id: ident, name:title, desc: description, time: hour} : todo
      ))
    console.log(todos)}
  // Escoge cual tarea se va visualizar
  const [TaskShowing, setTaskShowing] = useState([])
  // Muestra la informacion de la tarea
  const showTask = (ident) => {
    const showingTask = todos.filter(todo => todo.id === ident)
    setTaskShowing(showingTask)
        setIsShowing(true)
  }
  //Editando tarea
  const editTask = (ident) => {
  const editingTask = todos.filter(todo => todo.id === ident)
    setTaskShowing(editingTask)
        setIsShowingEdit(true)
  }
  //Elimina la tarea
  const deleteTask = (ident) => {
    const deletingTask = todos.filter(todo => todo.id === ident)
    setTaskShowing(deletingTask)
    todos.splice(TaskShowing)
  }
  // Enviar estado de completación
    const completeTask = (ident, e) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === ident? { ...todo, complete: e} : todo
    ))}
  return (
    <>
    {isWindow && (<Win create={createTask} isActive={isWindow} setIsActive={setisWindow}></Win>)}
    {isShowing && (<TaskWin isActive={isShowing} Task={TaskShowing} setIsActive={setIsShowing}></TaskWin>)}
    {isShowingEdit && (<TaskEdit sendEdit={eTask} isActive={isShowingEdit} Task={TaskShowing} setIsActive={setIsShowingEdit}></TaskEdit>)}
      <Card className=" flex flex-col drop-shadow-lg rounded-2xl bg-white w-96 h-[32rem]">
        <Card className="bg-emerald-600 w-vh h-14 drop-shadow-xl rounded-t-xl rounded-b-none mb-5"></Card>
        <TaskList complete={completeTask} deletes={deleteTask} edit={editTask} open={showTask} tasks={todos}></TaskList>
        <Button isIconOnly onPress={newTodo} className="absolute drop-shadow-2xl bottom-0 right-0 mx-4 my-4 rounded-full border-emerald-700 border-spacing-1 bg-emerald-600 h-14 w-14 shadow-2xl text-4xl font-extralight text-white">{'+'}</Button>
      </Card>
      </>
  )
}
export default App;
