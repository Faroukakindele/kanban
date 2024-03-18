import styles from "./CreateBoard.module.css";
import { useState } from "react";
import Overlay from "./Overlay";
import Button from "./Button";
import { useBoards } from "../contexts/TaskContext";

function EditBoard() {
  //  Imported State
  const {
    data: { task, boards , currentID,isDark },
    dispatch
  } = useBoards();

  // Local state
  const [columns, setColumns] = useState(
    task?.columns?.map((t) => ({
      ...t,
      id: Math.floor(Math.random() * Date.now()),
    }))
  );



  const [editName, setEditName] = useState(task.name);
  const [showError, setShowError] = useState("");
  const [columnError, setColumnError] = useState("");
  // Setter functions
  function handleAddColumns() {
    return setColumns((sub, i) => [...sub, { name: "Todo", id: Date.now(),tasks : [] } ]);
  }

  function handleDeleteColumns(id) {
    return setColumns((sub) => sub.filter((x) => x.id !== id));
  }
  // Validate new boards to prevent re entry od
  function validateNewBoardName(name) {
    const data = boards.find((boards) => {
      return boards.name.toLowerCase().trim() === name.toLowerCase().trim();
    });

    if (JSON.stringify(data) === undefined) return true;
    if (data.name.toLowerCase().trim() === task.name.toLowerCase().trim())
      return true;
    else return false;
  }
  function valideColumnName () {
    const data = columns?.filter ( c => c.name.trim() === "")
    if(data?.length) return false
    else return true
  }
  function handleUpdateColumnName(id, e) {
    setColumns((column) =>
      column?.map((col) =>
        col.id === id ? { ...col, name: e.target.value } : { ...col }
      )
    );
    setColumnError("")
  }

   // Extract all columnsName  from data\

  function editChanges() {
    if (!editName) {
      setShowError("name Cannot be Empty");
      return;
    }
    if (!validateNewBoardName(editName)) {
      setShowError(`${editName} has already been added to the list`);
      return;
    }
    if(!valideColumnName()){
      setColumnError("Column name Empty")
      return;
    }
    if(new Set (columns?.map(col => col.name.toLowerCase().trim())).size !== columns?.length && columns?.length > 1) {
      setColumnError("One or more columns found with matching names")
      return;
    }

    const NewBoards = {
      name: editName.trim(),
      columns: columns?.map( col => ({...col , name : col.name.trim()})),
      id : currentID
    };
    
      dispatch({type : "boards/Edit" , payload : NewBoards})

      // Remove the Create Board UI
      dispatch({ type: "handleOnClose" });
    
  }

  const BtnStyle = {
    backgroundColor:  `${isDark ? "#f4f7fd" :"#a9a4ff2a"}`,
    color: "#635FC7",
  };
  
  return (
    <Overlay closeShowBtn={true}>
      <form className={styles.container}>
        <h2>Edit Board</h2>
        <div className={styles.input}>
          <div className={showError && styles.showErrorContainer}>
          <label htmlFor="Name">Name</label>
     { showError &&<label className={styles.showError}>{showError}</label>}
          </div>
        
          <input
            type="text"
            onChange={(e) => {
              setEditName(e.target.value);
              setShowError("")
            }}
            value={editName}
          />
        </div>
        <div className={styles.input}>
          <div className={styles.columnErrorContainer} >
          <label> Columns</label>
          <label className={styles.columnError}>{columnError}</label>
          </div>
         
          {columns?.length ? (
            columns.map((col, i) => (
              <CreateColumns
                key={i}
                message={col.name}
                id={col.id}
                onDeleteSubTasks={handleDeleteColumns}
                taskNameUpdater={handleUpdateColumnName}
              />
            ))
          ) : (
            <p>&#128533; No added Column</p>
          )}
        </div>
        <Button onClick={handleAddColumns} style={BtnStyle}>
          + Add new Column
        </Button>
        <Button onClick={editChanges}>Save Changes</Button>
      </form>
    </Overlay>
  );
}
function CreateColumns({ message, onDeleteSubTasks, id, taskNameUpdater }) {
  return (
    <div className={styles.columnsItems}>
      <input
        type="text"
        onChange={(e) => {
          taskNameUpdater(id, e);
        }}
        value={message}
      ></input>{" "}
      <span onClick={() => onDeleteSubTasks(id)}> &times;</span>
    </div>
  );
}

export default EditBoard;
