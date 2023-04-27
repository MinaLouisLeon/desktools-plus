import React, { useEffect } from "react";
import "./Taskbar.css";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { actionHideApp } from "../../redux/AppsReducer";
import MainMenuComp from "../MainMenuComp/MainMenuComp";
import IconProviderComp from "../shared/IconProviderComp/IconProviderComp";
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
  return (
    <div className="taskbarContainer shadow-1">
      <MainMenuComp />
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
      })}
    </div>
  );
};

export default Taskbar;
