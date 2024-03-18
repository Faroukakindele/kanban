import Overlay from "./Overlay";
import Dropdown from "./Dropdown";
import styles from "./ShowSubTask.module.css";
import Status from "./Status";
import { useBoards } from "../contexts/TaskContext";
import { useEffect, useState } from "react";
import Button from "./Button";

function ShowSubTask() {
  const {
    data: { currentSubTask },
    dispatch,
  } = useBoards();
  const [subtask, setSubtasks] = useState(currentSubTask.subtasks);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState(currentSubTask.status);
  function handleChecked(e, title) {
    setSubtasks((sub) =>
      sub.map((x) => {
        if (x.title === title) return { ...x, isCompleted: e.target.checked };
        else return x;
      })
    );
  }
  useEffect(
    function () {
      if (status !== currentSubTask.status) {
        setActive(true);
      }
    },
    [status, currentSubTask]
  );
  function handleSaveChanges() {
    const data = {
      description: currentSubTask.description,
      status: status,
      title: currentSubTask.title,
      subtasks: subtask,
      id: Math.floor(Date.now() * Math.random()),
    };
    // Delete Task

    dispatch({ type: "task/deleted" });
    // Reinsert Task
    dispatch({ type: "subtask/updated", payload: data });
    // Close Overlay
    dispatch({ type: "handleOnClose" });
  }

  return (
    <Overlay closeShowBtn={true}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{currentSubTask.title}</h2>
        <Dropdown type={"Task"} top={20} right={-30} />
      </div>

      <p>{currentSubTask.description}</p>

      <p className={styles.subheading}>
        subtask {subtask.filter((x) => x.isCompleted === true).length} of{" "}
       ( {currentSubTask.subtasks.length})
      </p>
      {subtask.map((sub, i) => (
        <SubTask
          subtask={sub.title}
          key={i}
          isCompleted={sub.isCompleted}
          handleChecked={handleChecked}
          setActive={setActive}
        />
      ))}
      <Status
        message={"Current Status"}
        setStatus={setStatus}
        type={currentSubTask.status}
      />
      {active && (
        <Button onClick={() => handleSaveChanges()}>Save Changes</Button>
      )}
    </Overlay>
  );
}
function SubTask({ subtask, isCompleted, handleChecked, setActive }) {
  return (
    <div className={styles.subtask}>
      <input
        checked={isCompleted}
        onChange={(e) => {
          handleChecked(e, subtask);
          setActive(true);
        }}
        type="checkbox"
      />{" "}
      <p className={`${isCompleted && styles.strike}`}>{subtask}</p>
    </div>
  );
}

export default ShowSubTask;
