import Platform from "./pages/Platform";
import PlatformNav from "./pages/PlatformNav";
import TaskBar from "./pages/TaskBar";
import styles from "./App.module.css";
import { useBoards } from "./contexts/TaskContext";
import ShowSubTask from "./components/ShowSubTask";
import Delete from "./components/Delete";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";

import CreateBoard from "./components/CreateBoard";
import EditBoard from "./components/EditBoard";

 //  Custom Style for the "Add column Btn"

function App() {
  const {data : {isSubTaskShown , deleteInitiator,  createNewTaskInitiator , createNewBoardInitiator, onEditTask ,onEditBoard} } = useBoards()

  
  return (
   <div >
      { isSubTaskShown &&<ShowSubTask/>}
      {
         deleteInitiator && <Delete/>
      }
      {
        createNewTaskInitiator&& <CreateTask/>
      }
      {
        onEditTask && <EditTask/>
      }
      {
        onEditBoard&& <EditBoard/>
      }
    {createNewBoardInitiator && <CreateBoard/>}
      <div className={styles.container}>
        <PlatformNav />
        <TaskBar />
     
        <Platform />
      </div>
      </div>
  );
}

export default App;
