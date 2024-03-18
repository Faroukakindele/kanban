
import styles from "./Button.module.css";
function Button({ onClick, children,  style = {} }) {


  return (
    <button style={style} className={styles.btn} onClick={(e)=>{
        e.preventDefault()
        onClick()
    } }>
 

{children}
  
    </button>
  );
}

export default Button;
