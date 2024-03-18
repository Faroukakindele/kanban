import { useState } from "react";
import Overlay from "./Overlay";
import styles from "./CreateTask.module.css";
import Status from "./Status";
import Button from "./Button";
import { useBoards } from "../contexts/TaskContext";
function EditTask() {
  const {
    data: {
      currentSubTask,
      task: { columns },
      isDark,
    },
    dispatch,
  } = useBoards();

  // Local state for Form Input
  const [nameValue, setNameValue] = useState(currentSubTask.title);
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState(currentSubTask.description);
  const [statusValue, setStatusValue] = useState("Todo");

  const [subtasks, setSubtasks] = useState(
    currentSubTask.subtasks.map((x) => ({
      ...x,
      id: Math.floor(Math.random() * Date.now()),
    }))
  );

  function handleOnChangeSubtask(id, e) {
    setSubtasks((sub) =>
      sub.map((s) => (s.id === id ? { ...s, title: e.target.value } : s))
    );
  }
  function handleAddsubTasks() {
    return setSubtasks((sub, i) => [
      ...sub,
      {
        placeholder: "e.g Take a Nap",
        id: Math.floor(Math.random() * Date.now()),
        title: "",
      },
    ]);
  }
  const getValidSubtask = subtasks
    .filter((subtasks) => subtasks.title?.length > 0)
    .map((x) => {
      return { id: x.id, title: x.title, isCompleted: false };
    });
  console.log(getValidSubtask);
  function validateNameValue(nameValue, statusValue) {
    const isValid = columns
      .find((col) => col.name === statusValue)
      .tasks?.find(
        (tas) =>
          tas.title.trim().toLowerCase() === nameValue.trim().toLowerCase()
      );

    if (isValid && isValid.title !== currentSubTask.title) {
      return true;
    }
    if (isValid?.title === currentSubTask.title) return false;
    else return false;
  }

  function handleDeletesubTasks(id) {
    console.log(id);
    return setSubtasks((sub) => sub.filter((x) => x.id !== id));
  }
  function HandleEditTask() {
    if (!nameValue.trim()) {
      setNameError("Name cannot be empty");
      return;
    }
    if (validateNameValue(nameValue, statusValue)) {
      setNameError(`The ${nameValue} is already found in the ${statusValue}`);
      return;
    }

    const editedTask = {
      description: description,
      status: statusValue,
      title: nameValue,
      subtasks: getValidSubtask,
      id: Math.floor(Date.now() * Math.random()),
    };

    // // Edit Task
    // Remove the current Task
    dispatch({ type: "task/deleted" });
    //  Replace the current
    dispatch({ type: "task/edited", payload: editedTask });
    // // Remove the Overlaying Ui
    dispatch({ type: "handleOnClose" });
  }

  const BtnStyle = {
    backgroundColor: `${isDark ? "#f4f7fd" : "#a9a4ff2a"}`,
    color: "#635FC7",
  };

  return (
    <Overlay closeShowBtn={true}>
      <form className={styles.taskForm}>
        <h2>Edit Task</h2>
        <div>
          <div className={nameError && styles.errorContainer}>
            <label htmlFor="title"> Title</label>
            {nameError && (
              <label className={styles.nameError}> {nameError}</label>
            )}
          </div>

          <input
            placeholder="e.g.Take a break"
            value={nameValue}
            onChange={(e) => {
              setNameValue(e.target.value);
              setNameError("");
            }}
            id="title"
            type="text"
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
          {subtasks.length ? <h2>subtasks</h2> : null}

          {subtasks.length ? (
            subtasks.map((sub, i) => (
              <CreateSubtask
                id={sub.id}
                key={i}
                onDeleteSubTasks={handleDeletesubTasks}
                message={sub.title}
                onChangeSubTask={handleOnChangeSubtask}
              />
            ))
          ) : (
            <p>&#128533; No SubTasks </p>
          )}

          <Button style={BtnStyle} onClick={handleAddsubTasks}>
            + Add New SubTask
          </Button>
        </div>
        <Status
          type={currentSubTask.status}
          message={"Status"}
          setStatus={setStatusValue}
        />
        <Button onClick={() => HandleEditTask()}>Save Changes</Button>
      </form>
    </Overlay>
  );
}

function CreateSubtask({ message, onDeleteSubTasks, id, onChangeSubTask }) {
  return (
    <div className={styles.subtasksItems}>
      <input
        type="text"
        onChange={(e) => {
          onChangeSubTask(id, e);
        }}
        value={message}
      ></input>{" "}
      <span onClick={() => onDeleteSubTasks(id)}> &times;</span>
    </div>
  );
}
export default EditTask;
