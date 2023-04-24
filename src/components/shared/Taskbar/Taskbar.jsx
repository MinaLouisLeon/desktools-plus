import React,{useEffect} from "react";
import { IconContext } from "react-icons";
import { FcEngineering } from "react-icons/fc";
import "./Taskbar.css";
import { motion } from "framer-motion";
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { actionOpenApp } from "../../../redux/AppsReducer";
const Taskbar = () => {
  const dispatch = useDispatch(null);
  const history = useHistory();
 const isLoggedIn = useSelector(state => state.loggedInUserReducer.isLoggedIn);
  useEffect(()=>{
    if(!isLoggedIn){
      history.replace('/');
    }
    //eslint-disable-next-line
  },[isLoggedIn])
  const handleAppClick = (appName) => {
    // TODO: handle app popover
    switch (appName) {
      case "settings":
        dispatch(actionOpenApp({
          appName : 'Settings',
          appKey : 'settings'
        }))
        break;

      default:
        break;
    }
  };
  return (
    <div className="taskbarContainer shadow-1">
      <motion.div
        className="taskbarIconContainer shadow-1"
        whileHover={{scale: 1.2,y:-15}}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        whileTap={{rotateZ:360}}
        onClick={() => handleAppClick("settings")}
      >
        <IconContext.Provider value={{ size: "2.5rem" }}>
          <FcEngineering />
        </IconContext.Provider>
      </motion.div>
    </div>
  );
};

export default Taskbar;
