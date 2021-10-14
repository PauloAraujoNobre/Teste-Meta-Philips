type Props = {
  value: string;
  onChange?: (e: any) => void;
  type: string;
  id: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

export default ({ value, onChange = () => {}, type, id, label, placeholder = "", disabled = false }: Props) => {
  return (
    <div className="form-group text-left" style={styles.textInput}>
      <label htmlFor={`exampleInput${label}`} style={styles.inputLabel}>{`${label}:`}</label>
      <input type={type}
        className="form-control"
        id={id}
        aria-describedby={`${id}Help`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

const styles = {
  textInput: {
    width: 'auto',
    marginBottom: 10
  },
  inputLabel: {
    marginRight: 8,
  },
}