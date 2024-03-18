import Overlay from "./Overlay";
import styles from "./Delete.module.css";
import { useBoards } from "../contexts/TaskContext";
function Delete() {
  const {
    dispatch,
    data: { currentSubTask, isboardOrTask, currentBoard, isDark },
  } = useBoards();
  //  Custom Style for the "Add column Btn"
  const BtnStyle = {
    backgroundColor: `${isDark ? "#f4f7fd" : "#a9a4ff2a"}`,
    color: "#635FC7",
  };
  const heading =
    isboardOrTask === "Board"
      ? `Are you sure you want to delete the "${currentBoard}" This action will remove all columns and tasks and cannot be reversed`
      : `Are you sure you want to delete '${currentSubTask.title}' and its subtasks this action cannot be reversed`;
  return (
    <Overlay>
      <div className={styles.container}>
        <h2> Delete this {isboardOrTask} ?</h2>
        <p>{heading} </p>
        <div className={styles.btn}>
          <button
            onClick={() => {
              if (isboardOrTask === "Board")
                dispatch({ type: "boards/deleted" });
              else dispatch({ type: "task/deleted" });
            }}
          >
            Delete
          </button>
          <button
            style={BtnStyle}
            onClick={() => dispatch({ type: "onCancel" })}
          >
            Cancel
          </button>
        </div>
      </div>
    </Overlay>
  );
}

export default Delete;
