import { useField } from "formik";
import styles from './CustomField.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from "react";

interface InputFieldProps {
    name: string;
    label: string;
    placeholder: string;
    type: string;
    maxLength: number;

    classInput?: string;
    classLabel?: string;
    classWrapper?: string;
}

function InputFieldPassword(props: InputFieldProps) {

    const [icon, setIcon] = useState(<FaEyeSlash />)

    const [field, {error, touched}] = useField(props);
    const showError = error && touched;
    const {label, classLabel, classInput, classWrapper, placeholder, type, maxLength} = props;
    const [stateType, setStateType] = useState(type);

    const handleIcon = () => {
        if(stateType === 'password') {
            setStateType('text')
            setIcon(<FaEye />)
        }else {
            setStateType('password')
            setIcon(<FaEyeSlash />)
        }
    }

    return (<div className={classWrapper ? classWrapper : styles.wrapper}>
        {label && <label className={classLabel ? classLabel : styles.label}>{label}</label>}

        <input 
            type={stateType}
            {...field}
            className={classInput ? classInput : `${styles.input} ${showError ? styles.errorInput : ''}`}
            placeholder={placeholder}
            maxLength={maxLength}
        />

        <span onClick={handleIcon} className={styles.iconEye}>{icon}</span>

        {showError && <p className={styles.error}>{error}</p>}
    </div>)
}

export default InputFieldPassword;