import React, { useEffect } from "react";
import "./Taskbar.css";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { actionCloseAllApps, actionHideApp } from "../../redux/AppsReducer";
import MainMenuComp from "../MainMenuComp/MainMenuComp";
import IconProviderComp from "../shared/IconProviderComp/IconProviderComp";
import logout from "./icons8-logout-58.png";
import {auth} from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { actionUserLogOut } from "../../redux/loggedInUserReducer";
const Taskbar = () => {
  const dispatch = useDispatch(null);
  const history = useHistory();
  const isLoggedIn = useSelector(
    (state) => state.loggedInUserReducer.isLoggedIn
  );
  const appsData = useSelector(state => state.AppsReducer.appsData);
  useEffect(() => {
    if (!isLoggedIn) {
      history.replace("/");
    }
    //eslint-disable-next-line
  }, [isLoggedIn]);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      history.replace('/')
      dispatch(actionCloseAllApps())
      dispatch(actionUserLogOut())
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className="taskbarContainer shadow-1">
      <div style={{display:"flex",alignItems:"center"}}><MainMenuComp />
      {appsData && appsData.map((app) => {
        return(
          <motion.div
            className="taskbarIconContainer ml3"
            whileHover={{scale:1.2,y:-15}}
            transition={{type:"spring",stiffness:400,damping:10}}
            whileTap={{rotateZ:360}}
            onClick={() => dispatch(actionHideApp(app.appKey))}
          >
            <IconProviderComp 
              iconName={app.iconName}
              settings={{size:"2.5rem"}}
            />
          </motion.div>
        )
      })}</div>
      <div className="mr2">
        <motion.div
          className="logoutContainer"
          whileHover={{ scale: 1.2, y: -15 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        whileTap={{ rotateZ: 360 }}
        onClick={() => handleSignOut()}
        >
          <img src={logout} alt="logout"/>
        </motion.div>
      </div>
    </div>
  );
};

export default Taskbar;
