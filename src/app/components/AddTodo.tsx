import React, { useState } from 'react';
import styles from '@/app/page.module.css'

interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      onAdd(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div>
      <input 
        className={styles['todo-input']}
        type="text"
        placeholder="Enter a new todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button className={styles['todo-addButton']} onClick={addTodo}>Add</button>
    </div>
  );
};

export default AddTodo;
