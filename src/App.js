import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useReducer, useEffect } from 'react';
import { todoReducer } from './reducer/todoReducer';
import { useForm } from './hooks/useForm';
import { TodoList } from './components/TodoList';
import { TodoAdd } from './components/TodoAdd';

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

 
  
  const handleAddTodo=(newTodo)=>{
    dispatch({
      type:"add",
      payload:newTodo
    })
  }


  return (
    <div className="App">

      <h1>ToDo's ( {todos.length} ) </h1>
      <div className="row" >
                <div className="col-md-7" >
                    <TodoList todos={todos} handleToggle={handleToggle} handleDelete={handleDelete} />
                </div>
     < TodoAdd
     handleAddTodo={handleAddTodo}
     todos={todos}
     />
</div>
    </div>
  );
}

export default App;
