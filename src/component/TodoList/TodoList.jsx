import React from 'react';
import { useState } from 'react';
import Todo from '../Todo/Todo';
import AddTodo from '../AddTodo/AddTodo';
import styles from './TodoList.module.css';
import { useEffect } from 'react';

export default function TodoList({filter}) {
    const [todos, setTodos] = useState(()=>readTodosFromLocalStroage());
    const handleAdd = (todo) => setTodos([ ...todos, todo ]);
    const handleUpdate = (updated) => 
        setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
        const handleDelete = (deleted) => 
        setTodos(todos.filter((t) => t.id !==deleted.id));
    
        useEffect(() => {
            localStorage.setItem('todos',JSON.stringify(todos));
        },[todos] );
        
    const filtered =getFilteredItems(todos,filter);
    return(
        <section className={styles.container}>
            <ul className={styles.list}>
                {filtered.map((item) => (
                    <Todo 
                        key={item.id}
                        todo={item}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}              
            </ul>
            <AddTodo onAdd={handleAdd}/>
        </section>
    );
}
function readTodosFromLocalStroage(){
    const todos=localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [] ;   
}
function getFilteredItems(todos,filter){
    if(filter ==='all'){
        return todos;
    }
    return todos.filter(todo => todo.status === filter);
}
