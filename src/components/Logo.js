import { useMediaQuery } from "react-responsive";
import { useBoards } from "../contexts/TaskContext";
import styles from "./Logo.module.css";

function Logo() {
  const isMobile = useMediaQuery({ query: "(max-width:600px)" });
  const {
    data: { isDark },
  } = useBoards();
  return (
    <>
      {isMobile ? (
        <h1 className={styles.logo}>
          {" "}
          <img alt="logo/mobile" src="logo-mobile.svg" />

         
        </h1>
      ) : (
        <h1 className={styles.logo}>
          {isDark ? (
            <img src="logo-light.svg" alt="logo" />
          ) : (
            <img src="logo-dark.svg" alt="logo" />
          )}
        </h1>
      )}
    </>
  );
}

export default Logo;
