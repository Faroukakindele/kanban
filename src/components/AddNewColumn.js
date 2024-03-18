import { useBoards } from '../contexts/TaskContext'
import styles from './AddNewColumn.module.css'
function AddNewColumn() {
    const {dispatch} = useBoards()
    return (
        <div  className={styles.container} onClick={() => dispatch({type : "openEditBoard"})}>
            + New Column 
        </div>
    )
}

export default AddNewColumn
