import React from "react";
import { Button, Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { IconContext } from "react-icons";
import { FcList } from "react-icons/fc";
import { motion } from "framer-motion";
import { useSelector,useDispatch } from "react-redux";
import IconProviderComp from "../shared/IconProviderComp/IconProviderComp";
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
        className="taskbarIconContainer shadow-1"
        whileHover={{ scale: 1.2, y: -15 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        whileTap={{ rotateZ: 360 }}
      >
        <IconContext.Provider value={{ size: "2rem" }}>
          <FcList />
        </IconContext.Provider>
      </motion.div>
    </Popover2>
  );
};

export default MainMenuComp;
