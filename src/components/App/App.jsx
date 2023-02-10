import React, {useState} from "react";
import icon from '../../assets/Vector.svg'
import TodoItem from "../TodoItem/TodoItem";
import {useQuery} from "@tanstack/react-query";
import {DataService} from "../../services/dataService";
import Modal from "../Modal/Modal";
import AddTodo from "../AddTodo/AddTodo";
import styles from './App.module.css'
import HorizontText from "../Horizont/HorizontText";

const App = () => {

    const [todos, setTodos] = useState([])

    const [active, setActive] = useState(false)

    const {data} = useQuery(['getAll'], DataService.getAll, {
        onSuccess: ({data}) => {
            setTodos(data)
        }
    })

    return (
        <>
            <div className={styles.app}>
                <header>
                    <div className={styles.header}>
                        <div className={styles.headerTitle}>To do</div>
                        <div onClick={() => setActive(true)} className={styles.headerIcon}>
                            <img src={icon} alt=""/>
                        </div>
                    </div>
                </header>
                <div className={styles.mainBlock}>
                    {todos.map((item) => {
                        return <TodoItem key={item._id} item={item}/>
                    })}
                </div>
                <Modal setActive={setActive} active={active}>
                    <AddTodo setActive={setActive}/>
                </Modal>
                <HorizontText/>
            </div>
        </>
    );
}

export default App;
