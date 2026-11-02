import { useState, type FormEvent } from 'react'
import { TodoStore } from '../STORE/MobX'

type EditUserProps = {
    user: { id: number; name: string; description: string } | null
    onClose: () => void
}

export default function EditUser({ user, onClose }: EditUserProps) {
    const [error, setError] = useState('')

    const Onchange = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!user) return

        const form = e.currentTarget
        const formData = new FormData(form)

        try {
            setError('')
            await TodoStore.editTodo({
                id: user.id,
                name: String(formData.get('name') ?? ''),
                description: String(formData.get('description') ?? ''),
            })
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <dialog open={Boolean(user)}>
        <form onSubmit={Onchange}>
            <input defaultValue={user?.name} name='name' type="text" placeholder='Name' required />
            <input defaultValue={user?.description} name='description' type="text" placeholder='Description' required />
            <button type='submit'>SUBMIT</button>
            <button type='button' onClick={onClose}>CLOSE</button>
        </form>
    </dialog>
  )
}
