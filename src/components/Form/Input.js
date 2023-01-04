import styles from './Input.module.css';

function Input({ type, text, name, placeholder, handleOnChange, value}) {
    return (
        <div className={styles.formControl}>
            <label htmlFor={name}>{text}:</label>
            <input type={type} name={name} placeholder={placeholder} id={name} onChange={handleOnChange} value={value || ''} required />
        </div>
    )
}

export default Input;