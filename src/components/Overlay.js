import { useBoards } from "../contexts/TaskContext";
import styles from "./Overlay.module.css";
function Overlay({ style, children, closeShowBtn = false }) {
  const { dispatch } = useBoards();

  return (
    <>
      <div className={styles.overlay} onClick={ (e)=> dispatch({type : "handleOnClose"})}></div>
      <div className={styles.container} style={style}>
        {closeShowBtn && (
          <h1
            onClick={(e) => {
              dispatch({ type: "handleOnClose" });
            }}
          >
            {" "}
            &times;{" "}
          </h1>
        )}
        {children}
      </div>
    </>
  );
}

export default Overlay;
