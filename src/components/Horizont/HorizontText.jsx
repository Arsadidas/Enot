import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {DataService} from "../../services/dataService";
import styles from './HorizontText.module.css';

const HorizontText = () => {

    const [posts, setPosts] = useState([])

    const {data} = useQuery(['fetchRandom'], DataService.getRandomPost, {
        onSuccess: ({data}) => {
            setPosts(data)
        }
    })

    let random = Math.floor(Math.random() * 100) + 1

    return (
        <div className={styles.marqueeW}>
            <div className={styles.marquee}>
                {posts.map((item) => {
                    if (item.id === random) {
                        return (
                            <span>{item.title} </span>
                        )
                    }
                })}
            </div>
        </div>
        // <nav className="menu">
        //     <div className="menu__item">
        //         <div className="marquee">
        //             <div className="marquee__inner">
        //
        //             </div>
        //         </div>
        //     </div>
        // </nav>
    );
};

export default HorizontText;