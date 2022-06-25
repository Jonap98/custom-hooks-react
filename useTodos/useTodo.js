import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer";


const initialState = [];

const init = () => {
    // Retornar get item, si es null, retornar arreglo vacío
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodos = () => {
    // useReducer es una alternativa al useState
    // El third (initializer) puede ser utilizado para un proceso pesado 
    // const [state, dispatch] = useReducer(first, second, third)
    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));

    }, [todos])
    

    const handleNewTodo = (todo) => {
        // Accion a mandar al reducer
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        // Mandar la acción mediante dispatch
        dispatch(action);
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        });
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo=>!todo.done).length,
        handleNewTodo,
        handleToggleTodo,
        handleDeleteTodo,
    }
}