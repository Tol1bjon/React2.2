import React, { useState } from 'react'
import { TodoStore } from '../STORE/MobX'

type AddUserProps = {
    open: boolean
    onClose: () => void
}

export default function AddUser({ open, onClose }: AddUserProps) {

    const Onchange = async(e: any) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)

        try {
            await TodoStore.addTodo(formData)
            form.reset()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <dialog open={open}>
        <form onSubmit={Onchange}>
            <input name='Name' type="text" placeholder='Name' required />
            <input name='Description' type="text" placeholder='Description' required />
            <input type="file" accept="image/*" name='Images' required />
            <button type='submit'>SUBMIT</button>
            <button type='button' onClick={onClose}>CLOSE</button>
        </form>
    </dialog>
  )
}
