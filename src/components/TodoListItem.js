import React from 'react'

export const TodoListItem = ({ todo, handleToggle, handleDelete }) => {
    return (
        <li key={todo.id}>
            <p
                className="text-center"
                onClick={() => handleToggle(todo.id)} >
                {todo.done ? <span class="badge bg-light text-dark">{todo.desc}</span> : <span class="badge bg-warning text-dark">{todo.desc}</span>}
            </p>
            <button 
            className="btn btn-danger" 
            onClick={() => handleDelete(todo.id)} 
            >
                borrar
            </button>
        </li>
    )
}
