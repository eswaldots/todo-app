import { Button, Card, Divider, Input, TimeInput, Textarea, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import {useState} from 'react'
export default function TaskWin({isActive, setIsActive, Task}) {
      // Animacion para el todo
    const [animation, setAnimation] = useState('animate-fade-in-down')
    // Cierra la ventana
    const closeWindow = async() => {
        setAnimation('animate-fade-out-down')
        setIsActive(false)
    }
    const params = Task.map(param => 
        <>
        <h1 className="text-3xl font-bold">{param.name}</h1>
        <p className="text-3xl">{param.time}</p>
        <p className="text-xl font-extralight">{param.desc}</p>
        </>
    )
    return (
        <Modal isOpen={isActive} onOpenChange={closeWindow} className={' flex flex-col gap-y-2 m-auto left-0 right-0 z-10 p-14 bg-white '+ {animation} +' w-[30rem] h-[30rem]'} >
            <ModalContent>
            {params}
</ModalContent>
        </Modal>
    )
}