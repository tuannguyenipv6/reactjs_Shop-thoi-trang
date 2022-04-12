import { MouseEventHandler } from 'react';
import styles from '../styles/Auth.module.css';

interface IButton {
    title: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    type?: "button" | "submit" | "reset" | undefined
}

function Button(props: IButton) {

    return (<button {...props} className={`${styles.button} ${props.className ? props.className : ''}`}>
        {props.title}
    </button>)
}

export default Button;