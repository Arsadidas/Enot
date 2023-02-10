import React, {useState} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DataService} from "../../services/dataService";
import Button from "../Button/Button";
import styles from './AddTodo.module.css'

const AddTodo = ({setActive}) => {

    const queryClient = useQueryClient()

    const [title, setTitle] = useState('')

    const [body, setBody] = useState('')

    const {mutate} = useMutation(['create'], (todo) => DataService.createTodo(todo), {
        onSuccess: () => queryClient.invalidateQueries(['getAll'])
    })

    const handleAddTodo = () => {
        mutate({title, body, done: false})
        setActive(false)
        setTitle('')
        setBody('')
    }

    const handleClose = () => {
        setActive(false)
        setTitle('')
        setBody('')
    }

    return (
        <div className={styles.modalFunc}>
            <div className={styles.modalFuncBlock}>
                {!title || !body ? <h1>Please fill all inputs</h1> : null}
                <div>
                    <input type="text" placeholder='Введите тему..' value={title}
                           onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <input type="text" placeholder='Введите описание..' value={body}
                           onChange={(e) => setBody(e.target.value)}/>
                </div>
                <Button text={'Add'} func={handleAddTodo}>Add</Button>
                <div className={styles.close} onClick={() => handleClose()}>X</div>
            </div>
        </div>
    );
};

export default AddTodo;