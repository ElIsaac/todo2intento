import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useReducer, useEffect } from 'react';
import { todoReducer } from './reducer/todoReducer';
import { useForm } from './hooks/useForm';
import { TodoList } from './components/TodoList';

function App() {


  const init = () => {
    /* return [{
      "id": new Date().getTime(),
      "desc": 'bolo',
      "done": 'false'
    }] */
    return JSON.parse(localStorage.getItem('todos')) || [];
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

  const handleToggle = (todoId) => {
    dispatch({
      type: 'toggle',
      payload: todoId
    })
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
          <TodoList todos={todos} handleToggle={handleToggle} handleDelete={handleDelete} />
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
