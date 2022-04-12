import { useContext } from 'react';
import { MoadalContext } from '../../contexts/ModalContext';
import styles from './Modal.module.css';
import { FaTimesCircle } from 'react-icons/fa';

const Modal = () => {
    const {modalState: {title, showModal, component: Component}, hidenModal} = useContext(MoadalContext);

    return <div className={`${styles.wrapper} ${showModal ? styles.show : styles.hiden}`}>
        <div onClick={hidenModal} className={styles.ouverlay}></div>

        <div className={styles.modal}>
            {/* close */}
            <button className={styles.close} onClick={hidenModal}><FaTimesCircle /></button>

            {/* Title */}
            {
                typeof title === 'string' ? 
                <h3 className={styles.modalTitle}>
                    {title}
                </h3>
                : title
            }
            
            {/* Conten */}
            {Component ? Component : null}
        </div>
    </div>
}

export default Modal;