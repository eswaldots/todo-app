import { Button, Card, Divider, Input, TimeInput, Textarea, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import {useState} from 'react'
import {todos} from './Todos.jsx'
export default function TaskEdit({isActive, setIsActive, Task, sendEdit}) {
      // Animacion para el todo
    const [animation, setAnimation] = useState('animate-fade-in-down')
    // Nuevos parametros
    const [name, setName] = useState(Task[0].name)
    const [desc, setDesc] = useState(Task[0].desc)
    const [time, setTime] = useState(Task[0].time)
    // Define si la tarea se puede crear o no
    const [isValid, setIsValid] = useState(false)
    // Capturando los datos de la tarea
    const captureName = (e) => {
        setName(e.target.value)
    }
    const captureDesc = (e) => {
        setDesc(e.target.value)
    }
    const captureTime = (e) => {
        setTime(e.target.value)
    }
    // Parametros actuales de la tarea
    const params = Task.map(param => 
        <>
        <textarea maxLength={20} onChange={captureName}className="text-3xl font-bold resize-none h-10">{param.name}</textarea>
        <textarea maxLength={5} type='number' onChange={captureTime} className="text-3xl resize-none h-10">{param.time}</textarea>
        <textarea onChange={captureDesc} className="text-xl resize-none h-52 font-extralight">{param.desc}</textarea>
        </>
    )
    // Envia los nuevos parametros al render
    const editParams = () => {
        if (name.length, desc.length, time.length >= 1) {
        sendEdit(Task[0].id, name, desc, time)
        setIsActive(false)}
        else {setIsValid(true)}
    }
        const closeWindow = async() => {
        setAnimation('animate-fade-out-down')
        await setIsActive(false)
    }
    return (
        <Modal isOpen={isActive} onOpenChange={closeWindow} className={'drop-shadow-lg flex flex-col gap-y-2 m-auto text-center left-0 right-0 z-10 p-14 bg-white '+ {animation} +' w-[30rem] h-[30rem]'} >
            <ModalContent>
            {params}
            <Button type='submit' onPress={editParams} className='h-14 drop-shadow-2xl w-full text-white font-bold text-lg bg-emerald-700'>Añadir cambios</Button>
            {isValid && (<p className="text-red-600">No puedes crear una tarea vacía</p>)}
</ModalContent>
        </Modal>
    )
}