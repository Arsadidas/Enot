import axios from "axios";


export const DataService = {
    async getAll() {
        return await axios.get('http://localhost:3007/getAll')
    },
    async getRandomPost() {
        return await axios.get('https://jsonplaceholder.typicode.com/posts')
    },
    async createTodo(todo) {
        return await axios.post('http://localhost:3007/create', todo)
    },
    async removeTodo(id) {
        return await axios.delete(`http://localhost:3007/delete/${id}`)
    },
    async changeTodo(id, todo) {
        return await axios.patch(`http://localhost:3007/change/${id}`)
    }
}