import React, { useEffect, useState } from 'react';
import { TodoStore } from './STORE/MobX';
import { observer } from 'mobx-react-lite/src/observer.js';
import AddUser from './Components/AddUser';
import EditUser from './Components/EditUser';

const App = observer(() => {
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(null)

  useEffect(() => {
    TodoStore.getTodos()
  }, [])

  return (
    <div>
      <button onClick={() => setAddOpen(true)}>ADD</button>
      {TodoStore.todos.map((todo: any) => (
        <div key={todo.id}>
          <h1>{todo.name}</h1>
          <p>{todo.description}</p>
          <p>{todo.isCompleted ? "ACTIVE" : "INACTIVE"}</p>
          <button onClick={() => TodoStore.deleteTodo(todo.id)}>DELETE</button>
          <button onClick={() => setEditOpen(todo)}>EDIT</button>
        </div>
      ))}

      <AddUser open={addOpen} onClose={() => setAddOpen(false)}/>  
      <EditUser user={editOpen} onClose={() => setEditOpen(null)}/>  
    </div>
  );
})

export default App;
