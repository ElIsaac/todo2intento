import React from 'react'
import { useForm } from '../hooks/useForm';
export const TodoAdd = ({ handleAddTodo}) => {
    const [{ description }, handleInputChange, reset] = useForm({
        description: ""
      });

      const handleSubmit =(e)=>{
        e.preventDefault();

        const newTodo = {
          id: new Date().getTime(),
          desc: description,
          done: false,
        }
    
        
    
        handleAddTodo(newTodo);
        reset();
      }

    return (
        <>
            
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
            
        </>
    )
}
