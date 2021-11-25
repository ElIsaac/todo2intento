import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useReducer, useEffect } from 'react';
import { todoReducer } from './reducer/todoReducer';
import { useForm } from './hooks/useForm';

function App() {

  
  const init = () => {
    /* return [{
      "id": new Date().getTime(),
      "desc": 'bolo',
      "done": 'false'
    }] */
    return JSON.parse(localStorage.getItem('todos')) || [] ;
  }
  const [todos, dispatch] = useReducer(todoReducer, [], init)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)) 
  }, [todos])


  
  const [{ description }, handleInputChange, reset] = useForm({
    description: ""
  });

  const handleDelete = (todoId) => {
    const action = {
      type: 'delete',
      payload: todoId
    }

    dispatch(action);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      desc: description,
      done: false,
    }

    const action = {
      type: 'add',
      payload: newTodo
    }

    dispatch(action);
    reset();
  }



  return (
    <div className="App">

      <h1>ToDo's ( {todos.length} ) </h1>

      <div className="row" >
        <div className="col-md-7" >
          <ul className="list-group list-group-flush">
            {
              todos.map(todo => (
                <li key={todo.id}>
                  <p className="text-center" >{todo.desc}</p>
                  <button className="btn btn-danger" onClick={()=>handleDelete(todo.id)} >
                    borrar
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-md-5">
          <form onSubmit={handleSubmit} >
            <input
              type="text"
              name="description"
              className="form-control"
              value={description}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-primary mt-1 btn-block"
              type="submit"
            >
              add
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default App;
