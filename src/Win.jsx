import { Button, Card, Divider, Input, TimeInput, Textarea, ModalContent, Modal } from "@nextui-org/react";
import { useCallback, useId, useState } from "react";
import {parseAbsoluteToLocal, Time, ZonedDateTime} from "@internationalized/date";
import {todos} from "./Todos.jsx"
// Pantalla para configurar el nuevo todo
// 'set' es la prop utilizada para poder saber si la ventana deberia estar abierta o cerrada
export default function Win({isActive, setIsActive, create}) {
    // Identificando las tareas
    const id = useId()
    // Definiendo la nueva tarea y sus atributos
    const [newTask, setNewTask] = useState({})
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [time, setTime] = useState('')
    // Definiendo si la tarea se puede crear o no
    const [validName, setValidName] = useState(false);
    const [validDesc, setValidDesc] = useState(false);
    const [validTime, setValidTime] = useState(false);
    // Capturando los datos de la tarea
    const captureName = (e) => {
        if (e.target.value.length === 0) {setValidName(true)}
        else {
            setValidName(false)
        }
        setName(e.target.value)
    }
    const captureDesc = (e) => {
        if (e.target.value.length === 0) {setValidDesc(true)}
         else {
            setValidDesc(false)
        }
        setDesc(e.target.value)
    }
    const captureTime = (e) => {
        if (e.target.value.length === 0) {setValidTime(true)}
         else {
            setValidTime(false)
        }
        setTime(e.target.value)
    }
    // Importando funcion desde el render para crear las tareas
    const createTask = async () => {
        if (name.length < 1) {
            setValidName(true)
        }
        if (time.length < 1) {
            setValidTime(true)
        }
        if (desc.length < 1) {
            setValidDesc(true)
        }
        else {
            create(id, name, desc, time)
        setIsActive(false)
        }
    }
    // Definiendo la animacion inicial
    const [animation, setAnimation] = useState('animate-fade-in-down')
    //Cierra la ventana
    const closeWindow = async() => {
        setAnimation('animate-fade-out-down')
        await setIsActive(false)
    }
    //Enviar datos al render
    //Usa el isActive para saber cuando debe renderizar la ventana
    if (isActive) {
    return (
        <Modal hideCloseButton isOpen={isActive} onOpenChange={closeWindow} className={'drop-shadow-2xl flex flex-col gap-y-2 m-auto left-0 right-0 z-10 p-14 bg-white '+ {animation} +' w-[30rem] h-[30rem]'} >
            <ModalContent>
            <Button isIconOnly onPress={closeWindow} className='absolute bg-white right-0 top-0 m-4 opacity-60'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</Button>
            <Input isInvalid={validName}
      errorMessage="Por favor añade un titulo" onChange={captureName} maxLength={20} size={'lg'}variant={'underlined'} label={'Añade un titulo'} className='font-bold'/>
            <Input isInvalid={validTime}
      errorMessage="Por favor añade una hora" type={'time'}variant="underlined" onChange={captureTime} size='lg' className='font-normal' label='Añade una hora'></Input>
            <Textarea isInvalid={validDesc}
      errorMessage="Por favor añade una descripción" variant='underlined' onChange={captureDesc} maxRows={8} size='sm' label='Añade una descripción' className='h-96'></Textarea>
            <Button type='submit' onPress={createTask} className='h-28 drop-shadow-2xl w-full text-white font-bold text-lg bg-emerald-700'>Añadir</Button>
            </ModalContent>
        </Modal>
    )
    }}