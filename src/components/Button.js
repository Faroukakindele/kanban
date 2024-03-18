import { useBoards } from "../contexts/TaskContext";
import styles from "./Button.module.css";
function Button({ onClick, children,  style = {} }) {
  const {
    data: { task },
  } = useBoards();

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
