type Props = {
  type?: "submit" | "button" | "reset" | undefined;
  label: string;
  onClick: (e: any) => void;
}

export default ({ type = "submit", label, onClick}: Props) => {
  return (
    <div className="button" style={styles.button}>
      <button 
        type={type}
        className="btn btn-primary"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

const styles = {
  button: {
    flex: 1,
    display: 'flex',
    marginTop: 30,
    justifyContent: 'center'
  }
}