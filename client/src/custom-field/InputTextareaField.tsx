import { useField } from "formik";
import styles from './CustomField.module.css';

interface InputTextareaFieldProps {
    name: string;
    label: string;
    placeholder: string;

    classInput?: string;
    classLabel?: string;
    classWrapper?: string;
}

function InputTextareaField(props: InputTextareaFieldProps) {

    const [field, {error, touched}] = useField(props);

    const {label, classLabel, classInput, classWrapper, placeholder} = props;

    const showError = error && touched;

    return (<div className={classWrapper ? classWrapper : styles.wrapper}>
        {label && <label className={classLabel ? classLabel : styles.label}>{label}</label>}

        <textarea 
            {...field}
            className={classInput ? classInput : `${styles.input} ${showError ? styles.errorInput : ''}`}
            placeholder={placeholder}
        />

        {showError && <p className={styles.error}>{error}</p>}
    </div>)
}

export default InputTextareaField;