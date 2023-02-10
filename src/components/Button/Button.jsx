import React from 'react';
import styles from './Button.module.css'

const Button = ({text, func}) => {
    return (
        <>
            <button onClick={func}
                    style={{backgroundColor: text === 'Delete' ? '#ef2864' : "#0066ff"}}
                    className={styles.mainButton}>
                {text}
            </button>
        </>
    );
};

export default Button;