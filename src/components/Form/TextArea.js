import styles from "./TextArea.module.css";

function TextArea({ text, name, placeholder, handleOnChange, value }) {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}:</label>
      <textarea
        name={name}
        placeholder={placeholder}
        id={name}
        rows="20"
        cols="50"
        onChange={handleOnChange}
        value={value || ""}
        required
      />
    </div>
  );
}

export default TextArea;
