"use client"

import { useState, useEffect } from 'react';
import styles from './page.module.css'
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { addTodo, getTodos, removeTodo } from './indexeddb/db';

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);

  const handleAddTodo = async (newTodo: string) => {
    await addTodo(newTodo);
    loadTodos();
  };

  const handleRemoveTodo = async (index: number) => {
    await removeTodo(index);
    loadTodos();
  };

  const loadTodos = async () => {
    const loadedTodos = await getTodos();
    setTodos(loadedTodos);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>Todo List</h1>

        <AddTodo onAdd={handleAddTodo} />

        <TodoList todos={todos} onRemove={handleRemoveTodo} />
      </main>
    </div>
  );
}