import styles from "./CreateBoard.module.css";
import { useState } from "react";
import Overlay from "./Overlay";
import Button from "./Button";
import { useBoards } from "../contexts/TaskContext";



function CreateBoard() {
  const {
    postData,
    dispatch,
    data: { boards,isDark },
  } = useBoards();
  const [BoardName, setBoardName] = useState("");
  const [showError, setShowError] = useState("");
  const [columnError, setColumnError] = useState("");
  // Validate new boards to prevent re entry od
  function validateNewBoardName(name) {
    const data = boards.find((boards) => {
      return boards.name.toLowerCase().trim() === name.toLowerCase().trim();
    });

    if (JSON.stringify(data) === undefined) return true;
    else return false;
  }

  // Initial board Data
  const [columns, setColumns] = useState([
    { placeholder: "Todo", id: 1, value: "Todo" },
    { placeholder: "Doing", id: 2, value: "Doing" },
  ]);
  //  Columns function handlers
  function handleAddColumns() {
    return setColumns((sub, i) => [
      ...sub,
      { placeholder: "Todo", id: Date.now() },
    ]);
  }

  function handleDeleteColumns(id) {
    return setColumns((sub) => sub.filter((x) => x.id !== id));
  }

  // columns function value updater
  function handleOnGetData(e, id) {
    setColumns((col) =>
      col.map((x) => {
        if (x.id === id) return { ...x, value: e.target.value };
        else return { ...x };
      })
    );
  }
  // Extract all columnsName  from data
  const data = columns.map((x) => {
    return { name: x.value || x.placeholder, tasks: [] };
  });

  // Store Data to Global State
  async function createNewBoard() {
    if (!BoardName?.trim()) {
      setShowError("Name Cannot be Empty");
      return;
    }
    if (!validateNewBoardName(BoardName)) {
      setShowError(`${BoardName} has already been added to the list `);
      return
    }
    if (
      new Set(data.map((x) => x.name)).size !== data.map((x) => x.name).length
    ) {
      setColumnError("One or more columns have matching names");
      return
    }

  
   
      const NewBoards = {
        name: BoardName,
        columns: data,
        id : Date.now()
      };
      // Post boards
      await postData(NewBoards  );

      // Remove the Create Board UI
      dispatch({ type: "handleOnClose" });
    
  }
  //  Custom Style for the "Add column Btn"
  const BtnStyle = {
    backgroundColor:  `${isDark ? "#f4f7fd" :"#a9a4ff2a"}`,
    color: "#635FC7",
  };
  return (
    <Overlay closeShowBtn={true}>
      <form className={styles.container}>
        <h2>Add New Board</h2>
        <div className={styles.input}>
          <div className={showError && styles.showErrorContainer}>
            <label htmlFor="Name">Name</label>
            {showError && (
              <label className={styles.showError}> {showError}</label>
            )}
          </div>

          <input
            value={BoardName}
            onChange={(e) => {
              setShowError("");
              setBoardName(e.target.value);
            }}
            type="text"
            placeholder="e.g WebDesign"
          />
        </div>
        <div className={styles.input}>
          <div className={styles.columnErrorContainer}>
            <label> Columns</label>
            {columnError && (
              <label className={styles.columnError}> {columnError}</label>
            )}{" "}
          </div>

          {columns.length ? (
            columns.map((col, i) => (
              <CreateColumns
                key={i}
                message={col.placeholder}
                id={col.id}
                onDeleteSubTasks={handleDeleteColumns}
                handleOnGetData={handleOnGetData}
                value={col.value}
                setColumnError={setColumnError}
              />
            ))
          ) : (
            <p>&#128533; No added Column</p>
          )}
        </div>
        <Button onClick={handleAddColumns} style={BtnStyle}>
          + Add new Column
        </Button>
        <Button
          onClick={() => {
            createNewBoard();
          }}
        >
          Create New Board
        </Button>
      </form>
    </Overlay>
  );
}
function CreateColumns({
  message,
  onDeleteSubTasks,
  id,
  handleOnGetData,
  value,
  setColumnError,
}) {
  return (
    <div className={styles.columnsItems}>
      <input
        type="text"
        value={value}
        placeholder={message}
        onChange={(e) => {
          handleOnGetData(e, id);
          setColumnError("");
        }}
      ></input>{" "}
      <span
        onClick={() => {
          onDeleteSubTasks(id);
          setColumnError("");
        }}
      >
        {" "}
        &times;
      </span>
    </div>
  );
}

export default CreateBoard;
