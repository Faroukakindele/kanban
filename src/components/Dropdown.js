import { useBoards } from "../contexts/TaskContext";
import styles from "./Dropdown.module.css";
import { useState } from "react";
function Dropdown({ type, editAction, top, right }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const { dispatch } = useBoards();

  const style = {
    top: `${top || 90}%`,
    right: `${right || 1}% `,
  };
  return (
    <>
   {showDropDown&& <div className={styles.overlay} onClick={()=>setShowDropDown(false)}></div>}
    <div className={styles.container} onClick={() => setShowDropDown(!showDropDown)}>
      <img src="icon-vertical-ellipsis.svg" alt="ellipse"></img>
      {showDropDown && (
        <div style={style} className={styles.dropdown}>
          <li onClick={
            ()=>{
              if(type === "Board")
              dispatch({type : "openEditBoard"})
            else if(type === "Task"){
              dispatch({type : "openEditTask"})
            }

            }
          }>Edit {type}</li>
          <li
            onClick={() => {
              
              dispatch({ type: "onDelete" });
              setShowDropDown(()=>!showDropDown);
            }}
          >
            Delete {type}
          </li>
        </div>
      )}
    </div>
    </>

  );
}

export default Dropdown;
