import React from 'react';
import styles from '@/app/page.module.css'

interface TodoListProps {
  todos: string[];
  onRemove: (index: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onRemove }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li className={styles['todo-item']} key={index}>
          {todo}
          <button className={styles['todo-item']} onClick={() => onRemove(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
