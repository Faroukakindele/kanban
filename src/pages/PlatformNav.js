import DarkModeToggle from "../components/DarkModeToggle";
import Boards from "../components/Boards";
import Logo from "../components/Logo";
import styles from "./platformNav.module.css";
import HideSideBar from "../components/HideSideBar";
import { useBoards } from "../contexts/TaskContext";
import { useMediaQuery } from "react-responsive";
import Overlay from "../components/Overlay";
function PlatformNav() {
  const {
    data: { sideBarOpen , isMobileOpen },
  } = useBoards();
  const overlayStyle = {
 paddingLeft : 0,
 paddingTop : ".5rem"
  };
  
  const isMobileTrue = useMediaQuery({ query: "(max-width:600px)" });
  return (
    <div
      className={`${
        sideBarOpen ? styles.containerOpen : styles.containerClosed
      }`}
    >
      <Logo />
      {sideBarOpen && !isMobileTrue && <IsMobile />}
      {isMobileTrue  && isMobileOpen  && (
        <Overlay style={overlayStyle}>
          <IsMobile isMobileTrue={isMobileTrue} />
        </Overlay>
      )}
    </div>
  );
}

export default PlatformNav;
function IsMobile({ isMobileTrue }) {
  return (
    <div className={styles.boards}>
      <Boards />
      <DarkModeToggle />

      {!isMobileTrue && <HideSideBar />}
    </div>
  );
}
