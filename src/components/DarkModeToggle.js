import { useBoards } from "../contexts/TaskContext";
import styles from "./DarkModeToggle.module.css";
function DarkModeToggle() {
  const {
    data: { isDark },
    dispatch,
  } = useBoards();
  return (
    <div
      className={styles.container}
      onClick={() => dispatch({ type: "toggleDarkMode" })}
    >
      <img src="icon-light-theme.svg" alt="light" />
      <div
        className={`${styles.toggle} ${isDark ? styles.dark : styles.light}`}
      >
        <div></div>
      </div>
      <img src="icon-dark-theme.svg" alt="dark" />
    </div>
  );
}

export default DarkModeToggle;
