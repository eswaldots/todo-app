import { useEffect } from "react"
import Task from "./Task"
export default function TaskList({edit, deletes, open,tasks}) {
    const List = tasks.map(task => <Task deleting={deletes} editing={edit} info={open} id={task.id} name={task.name}></Task>)
    return (
        <ul>{List}</ul>
    )}