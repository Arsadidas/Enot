import React from 'react';
import styles from './Modal.module.css'

const Modal = ({children, active, setActive}) => {
    return (
        <div className={active ? styles.modalActive : styles.modal}>
            <div
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;