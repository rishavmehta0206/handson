import React, { useEffect, useState } from 'react'
import styles from './todo.module.css'
const Todo = () => {
    const [query, setQuery] = useState('');
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(null)
    function addTask() {
        if (!editId) {
            let newTask = {
                id: Date.now(),
                task: query,
                isCompleted: false
            }
            setTodos(prev => [...prev, newTask])
        } else {
            setTodos(prev => prev.map(todo => todo.id === editId ? { ...todo, task: query } : todo))
        }
        setQuery('')
        setEditId(null)
    }


    useEffect(() => {
        console.log(editId)
        setQuery(todos?.find(todo => todo?.id === editId)?.task)
    }, [editId])

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.inputContainer}>
                    <input onChange={(e) => setQuery(e.target.value)} value={query} type="text" placeholder='Enter your tasks for the day' />
                    <span onClick={addTask} className={styles.formBtn}>{!editId ? "Add" : "Edit"}</span>
                </div>
                <div className={styles.todoContainer}>
                    {todos?.map(todo => <div className={styles.todo}>
                        <p>{todo?.task}</p>
                        <div className={styles.btns}>
                            <span onClick={() => setEditId(todo?.id)} className={styles.edit}>Edit</span>
                            <span onClick={() => setTodos(prev => prev.filter(tod => tod?.id != todo?.id))} className={styles.delete}>Delete</span>
                        </div>
                    </div>)}
                </div>
            </div>
        </div >
    )
}

export default Todo