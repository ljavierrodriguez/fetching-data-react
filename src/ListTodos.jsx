import React, { useEffect, useState } from 'react'

const ListTodos = () => {
  const [url] = useState('http://localhost:3001/todos');
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");


  useEffect(() => {
    getTodos(url);
  }, [])

  const getTodos = async (url) => {
    try {
      console.log(url);
      const response = await fetch(url)
      const data = await response.json();
      console.log(data);
      setTodos(data);

    } catch (error) {
      console.log(error);
    }
  }

  const createTodos = async (url) => {
    try {

      const options = {
        method: 'POST',
        body: JSON.stringify({ title: title, done: false }),
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const response = await fetch(url, options)

      const data = await response.json();

      console.log(data);
      if (data.id) {
        getTodos(url);
      }

    } catch (error) {
      console.log(error)
    }

  }


  const deleteTodos = async (url, id) => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch(`${url}/${id}`, options)
      console.log(response);
      if (response.ok) {
        getTodos(url);
      }

    } catch (error) {
      console.log(error)
    }

  }


  const handleSubmit = e => {
    e.preventDefault();

    createTodos(url);
    e.target.title.value = "";
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="w-50">
            <form onSubmit={handleSubmit}>
              <input type="text" name="title" id="title" placeholder='Insert titulo' className='form-control w-50 mb-3' onChange={e => setTitle(e.target.value)} />
              <button className="btn btn-primary">Enviar</button>
            </form>
          </div>
        </div>
        <div className="col-md 12">
          <ul className="list-group my-2">
            {
              todos.length > 0 &&
              todos.map((task, i) => {
                return (
                  <li key={i} className='list-group-item d-flex justify-content-between'>
                    <span>{task.title}</span>
                    <button className='btn btn-danger btn-sm' onClick={() => deleteTodos(url, task.id)}>Delete</button>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ListTodos