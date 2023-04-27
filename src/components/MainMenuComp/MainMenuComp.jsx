import React from "react";
import {  Menu, MenuItem } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { motion } from "framer-motion";
import { useSelector,useDispatch } from "react-redux";
import IconProviderComp from "../shared/IconProviderComp/IconProviderComp";
import logo from './apps.png';
import { actionOpenApp } from "../../redux/AppsReducer";
const MainMenuComp = () => {
    const dispatch = useDispatch(null);
    const apps = useSelector(state => state.AppsReducer.apps);
    const MainMenuContent = (
        <Menu>
            {apps && apps.map((app) => {
                return(
                    <>
                        <MenuItem 
                            text={app.appName}
                            icon={
                                <IconProviderComp 
                                    iconName={app.iconName}
                                    settings={{size:"2rem"}}
                                />
                            }
                            onClick={() => dispatch(actionOpenApp({appName:app.appName}))}
                        />
                    </>
                )
            })}
        </Menu>
    )
  return (
    <Popover2 placement="top-start" content={MainMenuContent}>
      <motion.div
        className="logoContainer"
        whileHover={{ scale: 1.2, y: -15 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        whileTap={{ rotateZ: 360 }}
      >
        <img src={logo} alt="logo"/>
      </motion.div>
    </Popover2>
  );
};

export default MainMenuComp;
