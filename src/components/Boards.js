import BoardItem from "./BoardItem";
import styles from "./Boards.module.css";
import { useBoards } from "../contexts/TaskContext";

function Boards() {
  const {
    data: { boards },
    dispatch,
  } = useBoards();

  return (
    <div className={styles.container}>
      <h4>All boards ({boards?.length})</h4>

      {boards?.map((board, index) => (
        <BoardItem key={index} id={board?.id}>
          {board?.name}
        </BoardItem>
      ))}

      <h2
        onClick={() => {
         
          dispatch({ type: "handleOnClose" });
          dispatch({ type: "openNewBoard" });
        }}
      >
        {" "}
        <span>
          {" "}
          <img src="icon-board.svg" alt="board-icon" />
        </span>
        + Create new Board
      </h2>
    </div>
  );
}

export default Boards;
