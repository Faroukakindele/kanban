import { useBoards } from "../contexts/TaskContext";
import styles from "./Overlay.module.css";
function Overlay({style, children ,closeShowBtn = false}) {
  const { dispatch } = useBoards();

  return (
    <div className={styles.overlay}
    
     >
      <div className={styles.container} style={style}>
      {closeShowBtn &&  <h1
          onClick={(e) => {
            dispatch({ type: "handleOnClose" });
          }}
        >
          {" "}
          &times;{" "}
        </h1>}
        {children}
      </div>
    </div>
  );
}

export default Overlay;
