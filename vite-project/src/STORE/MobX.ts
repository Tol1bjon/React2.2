import { API } from './../../API/API';
import axios from "axios"
import { observable, runInAction } from "mobx"

interface Todo {
    id: number,
    name: string,
    description: string,
    isCompleted: boolean
}

export const TodoStore = observable({
    todos: [] as Todo[],

    async getTodos(){
        try {
            const {data} = await axios.get(API)
            runInAction(() => {
                this.todos = data.data
            })
            return data.data
        } catch (error) {
            console.log(error)
        }
    },

    async deleteTodo(id: any){
        try {
            await axios.delete(`${API}?id=${id}`)
            this.getTodos()
        } catch (error) {
            console.log(error)
        }
    },

    async addTodo(formData: any){
        try {
            await axios.post(API, formData)
            this.getTodos()
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    async editTodo(user: { id: number; name: string; description: string }){
        try {
            await axios.put(API, user)
            await this.getTodos()
        } catch (error) {
            console.error(error)
            throw error
        }
    }
})