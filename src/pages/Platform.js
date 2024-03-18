import { useMediaQuery } from "react-responsive";
import AddNewColumn from "../components/AddNewColumn";
import Button from "../components/Button";
import ShowSideBar from "../components/ShowSideBar";
import Spinner from "../components/Spinner";
import Taskcontainer from "../components/Taskcontainer";
import { useBoards } from "../contexts/TaskContext";

import styles from "./Platform.module.css";
function Platform() {
  const {
    data: {
      sideBarOpen,
      task: { columns },
      isLoading,
      currentID,
    }

  } = useBoards();
  function getRandomColor() {
    // Generate a random number between 0 and 255 for each color component
    const red = Math.floor(Math.random() * 256); // 256 because Math.random() is [0, 1)
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Convert each color component into a hexadecimal string and concatenate them
    const color =
      "#" +
      red.toString(16).padStart(2, "0") +
      green.toString(16).padStart(2, "0") +
      blue.toString(16).padStart(2, "0");

    return color;
  }
  const query = useMediaQuery({query : "(max-width :600px"})
  // refined the column with the new color property
  const refinedColumn = columns?.map((col) => {
    if (col.name === "Todo") {
      return { ...col, color: "rgb(127, 227, 255)" };
    } else if (col.name === "Doing") return { ...col, color: "#635FC7" };
    else if (col.name === "Done") return { ...col, color: "aquamarine" };
    else return { ...col, color: getRandomColor() };
  });

  if (isLoading) return <Spinner />;
  return (
    <div
      className={`${sideBarOpen ? styles.container : styles.containerClosed}`}
    >
      {columns?.length && currentID ? (
        refinedColumn?.map((column, i) => (
          <Taskcontainer data={column} key={i} status={column.name} />
        ))
      ) : !currentID ? (
        <AddNewColumnComp
          message="Get Started by Adding a new Board"
          action="+ Add New Board"
        />
      ) : (
        <AddNewColumnComp
          action="+ Add New Column"
          message="This board is empty. Create a new column to get started"
        />
      )}

      {columns?.length ? <AddNewColumn /> : null}

      {!sideBarOpen && !query && <ShowSideBar />}
    </div>
  );
}

function AddNewColumnComp({ message, action }) {
  const { dispatch } = useBoards();
  return (
    <div className={styles.addColumnComp}>
      <p> {message}</p>

      <Button
        onClick={() =>
          action === "+ Add New Board"
            ? dispatch({ type: "openNewBoard" })
            : dispatch({ type: "openEditBoard" })
        }
      >
        {action}
      </Button>
    </div>
  );
}
export default Platform;
