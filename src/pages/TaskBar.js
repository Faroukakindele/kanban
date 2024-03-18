import { useMediaQuery } from "react-responsive";
import Dropdown from "../components/Dropdown";
import { useBoards } from "../contexts/TaskContext";
import styles from "./TaskBar.module.css";
function TaskBar() {
  const { data  , data:{isDark}, dispatch } = useBoards();
  const isMobile = useMediaQuery( {query : "(max-width : 600px)"})

  //  Custom Style for the "Add column Btn"
  const BtnStyle = {
    backgroundColor:  `${isDark ? "#f4f7fd" :"#a9a4ff2a"}`,
    color: "#635FC7",
  };
  return (
    <div className={styles.container}>
      <h1>  <span>
      {data?.currentBoard}
      </span>
      {isMobile && <img onClick={()=>dispatch({type : "mobile/open"})} alt="up" src='icon-chevron-down.svg'/>}
      </h1>

      <button
        onClick={() => {
          if (data.task.columns?.length > 0) {
            dispatch({ type: "showNewTask" });
          }
        }}
      style={BtnStyle}
     className={ data.task.columns?.length && styles.buttonEnabled}
     >
     {isMobile ? "+" : "+ Add new Column"}
   
      </button>

      <Dropdown type={"Board"}></Dropdown>
    </div>
  );
}

export default TaskBar;
