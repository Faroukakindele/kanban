import { useBoards } from '../contexts/TaskContext';
import styles from './ShowSideBar.module.css';
function ShowSideBar() {
    const {dispatch} = useBoards()

    return (
        <div className={styles.container} onClick={()=> dispatch({type : "handleHideSideBar"})}>
            <img src='icon-show-sidebar.svg' alt='show sidebar'></img>
        </div>
    )
}

export default ShowSideBar
