import { createContext, useContext, useEffect, useReducer } from "react";
import { dataObject } from "../data/task";
/////////////////////////////////////////////////////////////////////////
const initialState = {
  currentBoard: dataObject.at(0).name,
  currentID: dataObject.at(0).id,
  sideBarOpen: true,
  isSubTaskShown: false,
  currentSubTask: {},
  boards: JSON.parse(localStorage.getItem("board")) || dataObject,
  task: [],
  isLoading: false,
  deleteInitiator: false,
  isboardOrTask: "Board",
  createNewTaskInitiator: false,
  onEditTask: false,
  onEditBoard: false,
  createNewBoardInitiator: false,
  createBoardData: {},
  isDark: false,
  isMobileOpen : false,
};
//////////////////////////////////////////
function reducer(state, action) {
  function UpdateBoardsAndTask(newTask) {
    const updatedBoards = state.boards.map((board) => {
      if (board.id === state.currentID) {
        return {
          ...board,
          columns: board.columns.map((col) => {
            if (col.name === newTask.status) {
              return { ...col, tasks: [...col.tasks, newTask] };
            } else return col;
          }),
        };
      } else return board;
    });
    const updatedTask = updatedBoards.find(
      (board) => board.id === state.currentID
    );

    return { updatedBoards, updatedTask };
  }

  function deleteBeforeUpdate(task) {
    const updatedBoards = state.boards.map((board) => {
      if (board.id === state.currentID) {
        return {
          ...board,
          columns: board.columns.map((col) => {
            if (col.name === task.status) {
              return {
                ...col,
                tasks: col.tasks.filter((t) => t.title !== task.title),
              };
            } else return col;
          }),
        };
      } else return board;
    });
    const updatedTask = updatedBoards.find(
      (board) => board.id === state.currentID
    );

    return { updatedBoards, updatedTask };
  }

  switch (action.type) {
    case "setTask":
      return { ...state, task: action.payload };
    case "isLoading":
      return { ...state, isLoading: true };
    case "stopLoading":
      return { ...state, isLoading: false };
    case "uploadAndGetBoard":
      return {
        ...state,
        currentBoard: action.payload.children,
        currentID: action.payload.id,
      };
    case "onDelete":
      return {
        ...state,
        deleteInitiator: true,
        isSubTaskShown: false,
        isboardOrTask: state.isSubTaskShown ? "Task" : "Board",
      };
    case "onCancel":
      return { ...state, deleteInitiator: false, isboardOrTask: "Board" };
    case "handleHideSideBar":
      return { ...state, sideBarOpen: !state.sideBarOpen };
    case "handleShowModal":
      return { ...state, showModal: !state.showModal };
    case "handleOpenSubTask":
      return {
        ...state,
        isSubTaskShown: true,
        currentSubTask: action.payload ? action.payload : state.currentSubTask,
      };
    case "handleOnClose":
      return {
        ...state,
        isSubTaskShown: false,
        deleteInitiator: false,
        isboardOrTask: "Board",
        createNewTaskInitiator: false,
        onEditTask: false,
        onEditBoard: false,
        createNewBoardInitiator: false,
        currentSubTask: {},
        isMobileOpen : false
      };
    case "showNewTask":
      return {
        ...state,
        createNewTaskInitiator: true,
      };
    case "openEditBoard":
      return { ...state, onEditBoard: true };
    case "openEditTask":
      return { ...state, onEditTask: true, isSubTaskShown: false };
    case "openNewBoard":
      return { ...state, createNewBoardInitiator: true };
    case "storeNewBoard":
      return { ...state, createBoardData: action.payload };
    case "boardPosted":
      return {
        ...state,
        boards: [...state.boards, action.payload],
        task: action.payload,
        currentID: action.payload.id,
        currentBoard: action.payload.name,
      };
    case "boards/Edit":
      const indexToreplace = state.boards.findIndex(
        (obj) => obj.id === state.currentID
      );
      state.boards.splice(indexToreplace, 1, action.payload);
      return {
        ...state,
        task: action.payload,
        currentBoard: action.payload.name,
      };
    case "boards/deleted":
      const Newindex = state.boards.findIndex(
        (obj) => obj.id === state.currentID
      );
      const getNewIDafterDelete = () => {
        if (Newindex < 1) {
          return state.boards.at(1);
        }
        if (Newindex === state.boards.length - 1 && state.boards.length !== 1) {
          return state.boards.at(-2);
        }
        if (Newindex === state.length - 1 && state.boards === 1) {
          return null;
        } else return state.boards.at(Newindex - 1);
      };

      return {
        ...state,

        boards: state.boards.filter((b) => b.id !== state.currentID),
        deleteInitiator: false,
        task: [],
        currentBoard: getNewIDafterDelete()?.name || "",
        currentID: getNewIDafterDelete()?.id || null,
      };

    case "task/created":
      return {
        ...state,

        boards: UpdateBoardsAndTask(action.payload).updatedBoards,
        task: UpdateBoardsAndTask(action.payload).updatedTask,
      };
    case "task/deleted":
      return {
        ...state,
        boards: deleteBeforeUpdate(state.currentSubTask).updatedBoards,
        task: deleteBeforeUpdate(state.currentSubTask).updatedTask,
        deleteInitiator: false,
      };
    case "task/edited":
      return {
        ...state,
        boards: UpdateBoardsAndTask(action.payload).updatedBoards,
        task: UpdateBoardsAndTask(action.payload).updatedTask,
      };
    case "subtask/updated":
      return {
        ...state,
        boards: UpdateBoardsAndTask(action.payload).updatedBoards,
        task: UpdateBoardsAndTask(action.payload).updatedTask,
      };
    case "toggleDarkMode":
      return { ...state, isDark: !state.isDark };
    case "mobile/open":
      return { ...state , isMobileOpen : true};
    default:
      throw new Error("unknown action");
  }
}
////////////////////////////////////////////////////////
// Create context
const TaskContext = createContext();
function TaskProvider({ children }) {
  const [data, dispatch] = useReducer(reducer, initialState);

  // light and darkmode authentication
  useEffect(
    function () {
      if (data.isDark) document.body.classList.add("dark");
      else document.body.classList.remove("dark");
    },
    [data.isDark]
  );

  useEffect(
    function () {
      async function getBoards(id) {
        try {
          const activeData = await data.boards.find((data) => data.id === id);
          if (activeData) dispatch({ type: "setTask", payload: activeData });
        } catch (e) {
          console.log(e);
        }
      }
      getBoards(data.currentID)
    },
    [data.currentID, data.boards]
  );

  useEffect(
    function () {
      localStorage.setItem("board", JSON.stringify(data.boards));
    },
    [data]
  );
  // Fetching data on Click
  
  // Posting Data
  function postData(board) {
    dispatch({ type: "boardPosted", payload: board });
  }

  return (
    <TaskContext.Provider value={{ data, dispatch,  postData }}>
      {children}
    </TaskContext.Provider>
  );
}
function useBoards() {
  const context = useContext(TaskContext);
  if (context === undefined)
    throw new Error("Boards context used outside the board provider");
  return context;
}
export { useBoards, TaskProvider };
