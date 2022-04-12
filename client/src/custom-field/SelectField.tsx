import { useField } from "formik";
import Select from "react-select";
import { IContactOption } from "../datatypes";
import styles from './CustomField.module.css';

interface SelectFieldProps {
    name: string;
    label: string;
    placeholder: string;
    options: IContactOption[];

    classInput?: string;
    classLabel?: string;
    classWrapper?: string;
}

function SelectField(props: SelectFieldProps) {

    const [field, {error, touched}] = useField(props);
    const {name, value} = field;

    const {label, classLabel, classInput, classWrapper, placeholder, options} = props;

    const selectedOption = options.find(option => option.value === value);

    const showError = error && touched;

    const handleSelectdOptionChange = (selectOptions: any) => {
        const selectdValue = selectOptions ? selectOptions.value : selectOptions;
        
        const changeEvent = {
            target: {
                name: name,
                value: selectdValue,
            }
        };
        field.onChange(changeEvent);
    }

    return (<div className={classWrapper ? classWrapper : styles.wrapper}>
        {label && <label className={classLabel ? classLabel : styles.label}>{label}</label>}

        <Select 
            {...field}
            id={name}
            instanceId={name}
            className={`${showError ? styles.errorInput : ''} ${classInput ? classInput : ''}`}
            placeholder={placeholder}
            options={options}
            value={selectedOption}
            onChange={handleSelectdOptionChange}
        />

        {showError && <p className={styles.error}>{error}</p>}
    </div>)
}

export default SelectField;