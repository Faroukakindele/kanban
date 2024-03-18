import { useBoards } from "../contexts/TaskContext";
import styles from "./TaskItem.module.css";
function TaskItem({ task ,color, status}) {
  const { subtasks } = task;
  const isComplete = subtasks.filter((sub) => sub.isCompleted === true);
  const { dispatch } = useBoards();


  return (
    <div
      className={styles.container}
      onClick={() =>
        dispatch({
          type: "handleOpenSubTask",
          payload: {
            title: task.title,
            status: task.status,
            description: task.description,
            subtasks,
            isComplete,
          },
        })
      }
    >
      <h2>{task.title}</h2>

      <p>
        {isComplete.length} of {subtasks.length} subtasks
        
      </p>
      <p className={`${styles.status}`} style={{backgroundColor : color}}> {status}</p>
    </div>
  );
}

export default TaskItem;
