import { useState } from "react";
import styles from "./Status.module.css";
import { useBoards } from "../contexts/TaskContext";
function Status({ type, message, setStatus }) {
  const [isActive, setIsActive] = useState(false);
  const [newStatus , setNewStatus ] = useState("")
  const {
    data: { task },
  } = useBoards();

  return (
    <div className={styles.container}>
      <label htmlFor="status">{message}</label>
      <p
        className={`${isActive ? styles.isactive : ""} `}
        onClick={() => setIsActive((active) => !active)}
      >
        <span>{newStatus || type}</span>
        <img src="icon-chevron-down.svg" alt="drop down" />
      </p>
      {isActive && (
        <ul>
          {task.columns.map((status, i) => (
            <li
              key={i}
              onClick={() => {
                setIsActive(false);
                setNewStatus(status.name)
              if(!setStatus) return;
              
                setStatus(status.name);
              }}
            >
              {status.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Status;
