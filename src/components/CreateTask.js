import { useState } from "react";
import Overlay from "./Overlay";
import styles from "./CreateTask.module.css";
import Status from "./Status";
import Button from "./Button";
import { useBoards } from "../contexts/TaskContext";
function CreateTask() {
  const [nameValue, setNameValue] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [statusValue, setStatusValue] = useState("Todo");
  const {
    data: {
      task: { columns },
      isDark
    },
    dispatch
  } = useBoards();

  const [subtasks, setSubtasks] = useState([
    { placeholder: " e.g. Make a coffee", id: 1, title: "" },
    { placeholder: "e.g. Drink coffee and smile", id: 2, title: "" },
  ]);

  function validateNameValue(nameValue, statusValue) {
    const isValid = columns
      .find((col) => col.name === statusValue)
      .tasks?.find(
        (tas) =>
          tas.title.trim().toLowerCase() === nameValue.trim().toLowerCase()
      );

    return isValid;
  }

  const getValidSubtask = subtasks
    .filter((subtasks) => subtasks.title.length > 0)
    .map((x) => {
      return { id: x.id, title: x.title, isCompleted: false };
    });

  

  function setSubtaskValue(e, id) {
    setSubtasks((sub) =>
      sub.map((s) => (s.id === id ? { ...s, title: e.target.value } : s))
    );
  }

  function handleAddsubTasks() {
    return setSubtasks((sub, i) => [
      ...sub,
      { placeholder: "e.g Take a Nap", id: Date.now(), title: "" },
    ]);
  }

  function handleDeletesubTasks(id) {
    return setSubtasks((sub) => sub.filter((x) => x.id !== id));
  }

  function HandleCreateTask() {
    if (!nameValue.trim()) {
      setNameError("Name cannot be empty");
      return;
    }
    if (validateNameValue(nameValue, statusValue)) {
      setNameError(`${nameValue} is already found in the ${statusValue} task`);
      return;
    }



    const newTask = {
      description: description,
      status: statusValue,
      title : nameValue,
      subtasks : getValidSubtask
    };

    // Create Task
    dispatch({type : "task/created" , payload  : newTask})
    // Remove the Overlaying Ui 
    dispatch({type : "handleOnClose"})
  }
  const BtnStyle = {
    backgroundColor:  `${isDark ? "#f4f7fd" :"#a9a4ff2a"}`,
    color: "#635FC7",
  };
  
  return (
    <Overlay closeShowBtn={true}>
      <form className={styles.taskForm}>
        <h2>Add new Task</h2>
        <div>
          <div className={nameError && styles.errorContainer}>
          <label htmlFor="title"> Title</label>
     {nameError && <label className={styles.nameError}> {nameError}</label>}  
          </div>
        
          <input
            placeholder="e.g.Take a break"
            id="title"
            type="text"
            value={nameValue}
            onChange={(e) =>{ 
              setNameValue(e.target.value)
              setNameError("")
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            rows={5}
            className="20"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g it is always good to take a break, this 15 mins break will recharge the batteries a little "
          ></textarea>
        </div>
        <div className={styles.subtasks}>
          {subtasks?.length ? <h2>subtasks</h2> : null}

          {subtasks.length ? (
            subtasks.map((sub, i) => (
              <CreateSubtask
                onDeleteSubTasks={handleDeletesubTasks}
                key={i}
                message={sub.placeholder}
                id={sub.id}
                setSubtaskValue={setSubtaskValue}
              />
            ))
          ) : (
            <p>&#128533; No SubTasks </p>
          )}

          <Button style={BtnStyle} onClick={handleAddsubTasks} on>
            + Add New SubTask
          </Button>
        </div>
        <Status type={statusValue} message={"Status"} setStatus={setStatusValue} />
        <Button onClick={() => HandleCreateTask()}>Create Task</Button>
      </form>
    </Overlay>
  );
}

function CreateSubtask({ message, onDeleteSubTasks, id, setSubtaskValue }) {
  return (
    <div className={styles.subtasksItems}>
      <input
        type="text"
        placeholder={message}
        onChange={(e) => setSubtaskValue(e, id)}
      ></input>{" "}
      <span onClick={() => onDeleteSubTasks(id)}> &times;</span>
    </div>
  );
}
export default CreateTask;
