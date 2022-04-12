import { useField, useFormikContext } from "formik";
import { ChangeEvent, useEffect } from "react";
import { getShipmentDetails } from "../lib";
import styles from './CustomField.module.css';

interface InputFieldProps {
    name: string;
    label: string;
    placeholder: string;
    type: string;
    maxLength: number;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void

    classInput?: string;
    classLabel?: string;
    classWrapper?: string;
}

function InputField(props: InputFieldProps) {

    const [field, {error, touched}] = useField(props);

    // trong file gồm có những cái này... đem rãi hết vào input
    // const {name, value, onChange, onBlur} = field;
    
    const {label, classLabel, classInput, classWrapper, placeholder, type, maxLength} = props;

    const { setValues } = useFormikContext();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getShipmentDetails();

            if(response.success) {
                setValues(response.data)
            }
        }

        fetchData()
    }, [])

    const showError = error && touched;

    return (
    <div className={classWrapper ? classWrapper : styles.wrapper}>
        {label && <label className={classLabel ? classLabel : styles.label}>{label}</label>}

        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
            <input 
                type={type}
                {...field}
                className={classInput ? classInput : `${styles.input} ${showError ? styles.errorInput : ''}`}
                placeholder={placeholder}
                maxLength={maxLength}
            />

            {showError && <p className={styles.error}>{error}</p>}
        </div>
    </div>)
}

export default InputField;