import React from "react";
import { Menu, MenuItem } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import IconProviderComp from "../shared/IconProviderComp/IconProviderComp";
import logo from "./apps.png";
import { actionChangeMode, actionOpenApp } from "../../redux/AppsReducer";
import { useHistory } from "react-router";
const MainMenuComp = () => {
  const dispatch = useDispatch(null);
  const history = useHistory(null);
  const apps = useSelector((state) => state.AppsReducer.apps);
  const MainMenuContent = (
    <Menu>
      {apps &&
        apps.map((app) => {
          return (
            <>
              <MenuItem
                text={app.appName}
                icon={
                  <IconProviderComp
                    iconName={app.iconName}
                    settings={{ size: "2rem" }}
                  />
                }
                onClick={() =>
                  dispatch(actionOpenApp({ appName: app.appName }))
                }
              />
            </>
          );
        })}
      <MenuItem
        text='Mobile Mode'
        icon={
          <IconProviderComp
            iconName='FcPhoneAndroid'
            settings={{ size: "2rem" }}
          />
        }
        onClick={() => {
          dispatch(actionChangeMode('mobile'));
          history.replace('/mobile')
        }}
      />
    </Menu>
  );
  return (
    <Popover2 placement="top-start" content={MainMenuContent}>
      <motion.div
        className="logoContainer"
        whileHover={{ scale: 1.2, y: -15 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        whileTap={{ rotateZ: 360 }}
      >
        <img src={logo} alt="logo" />
      </motion.div>
    </Popover2>
  );
};

export default MainMenuComp;
