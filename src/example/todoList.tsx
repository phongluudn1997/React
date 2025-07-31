import {type ChangeEventHandler, useState} from "react";

export const TodoList = () => {
    const [todos, setTodos] = useState<string[]>([]);
    const [newTodo, setNewTodo] = useState("")

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewTodo(event.target.value)
    }

    const handleAdd = () => {
        setTodos(todos => [...todos, newTodo])
    }

    const handleRemove = (index: number) => {
        setTodos(todos => todos.filter((_, i) => i === index))
    }

    return <div>
        <input type="text" onChange={handleChange} value={newTodo}/>
        <button onClick={handleAdd}>add</button>
        <ul>
            {todos.map((todo, index) => <li>
                {todo}
                <button onClick={() => handleRemove(index)}>remove</button>
            </li>)}
        </ul>
    </div>
}