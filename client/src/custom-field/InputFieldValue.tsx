import { useField } from "formik";
import { ChangeEvent } from "react";
import styles from './CustomField.module.css';

interface InputFieldValueProps {
    name: string;
    label: string;
    placeholder: string;
    type: string;
    maxLength: number;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void

    classInput: string;
    classLabel: string;
    classWrapper: string;
}

function InputFieldValue(props: InputFieldValueProps) {

    const [field, {error, touched}] = useField(props);

    const {
        label, 
        classLabel, 
        classInput, 
        classWrapper, 
        placeholder, 
        type, 
        maxLength,
        value,
        onChange
    } = props;

    const showError = error && touched;

    return (
    <div className={classWrapper}>
        {label && <label className={classLabel}>{label}</label>}

        <input 
            type={type}
            {...field}
            className={classInput}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
        />

        {showError && <p className={styles.error}>{error}</p>}
    </div>)
}

export default InputFieldValue;