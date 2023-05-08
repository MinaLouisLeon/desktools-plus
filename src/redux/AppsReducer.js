import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastZindex: 0,
  mode : 'mobile',
  mobileOpenedApp : 'home',
  mobileApps : ['Maps X,Y Conventer','Tax','Calculator'],
  apps: [
    {
      appName: "Maps X,Y Conventer",
      multiWindowAllowed: false,
      numberOfWindow: 0,
      zIndex: 0,
      iconName: "MapsXYconventer",
      x: 0,
      y: 0,
      w: 4,
      h: 4,
      minH: 4,
      maxH: 9,
      minW: 4,
      maxW: 12,
    },
    {
      appName: "Tax",
      multiWindowAllowed: false,
      numberOfWindow: 0,
      zIndex: 0,
      iconName: "tax",
      x: 0,
      y: 0,
      w: 4,
      h: 4,
      minH: 4,
      maxH: 9,
      minW: 4,
      maxW: 12,
    },
    {
      appName: "Calculator",
      multiWindowAllowed: false,
      numberOfWindow: 0,
      zIndex: 0,
      iconName: "calc",
      x: 0,
      y: 0,
      w: 4,
      h: 7,
      minH: 7,
      maxH: 9,
      minW: 4,
      maxW: 12,
    },
    {
      appName: "Settings",
      multiWindowAllowed: false,
      numberOfWindow: 0,
      zIndex: 0,
      iconName: "settings",
      x: 0,
      y: 0,
      w: 4,
      h: 4,
      minH: 4,
      maxH: 9,
      minW: 4,
      maxW: 12,
    },
  ],
  appsData: [],
};

const AppsReducer = createSlice({
  name: "AppsReducer",
  initialState,
  reducers: {
    actionOpenApp: (state, action) => {
      let indexOfApp = state.apps.findIndex(
        (app) => app.appName === action.payload.appName
      );
      if (state.apps[indexOfApp].multiWindowAllowed) {
        state.appsData.push({
          appName: action.payload.appName,
          appKey: `${action.payload.appName}-${
            state.apps[indexOfApp].numberOfWindow + 1
          }`,
          isFullscreen: false,
          isHidden: false,
          iconName: state.apps[indexOfApp].iconName,
          zIndex: state.lastZindex + 1,
          dataGrid: {
            i: `${action.payload.appName}-${
              state.apps[indexOfApp].numberOfWindow + 1
            }`,
            x: state.apps[indexOfApp].x,
            y: state.apps[indexOfApp].y,
            w: state.apps[indexOfApp].w,
            h: state.apps[indexOfApp].h,
            minH: state.apps[indexOfApp].minH,
            maxH: state.apps[indexOfApp].maxH,
            minW: state.apps[indexOfApp].minW,
            maxW: state.apps[indexOfApp].maxW,
          },
        });
        state.lastZindex = state.lastZindex + 1;
        state.apps[indexOfApp].numberOfWindow =
          state.apps[indexOfApp].numberOfWindow + 1;
      } else if (state.apps[indexOfApp].numberOfWindow === 0) {
        state.appsData.push({
          appName: action.payload.appName,
          appKey: `${action.payload.appName}-${
            state.apps[indexOfApp].numberOfWindow + 1
          }`,
          isFullscreen: false,
          isHidden: false,
          iconName: state.apps[indexOfApp].iconName,
          zIndex: state.lastZindex + 1,
          dataGrid: {
            i: `${action.payload.appName}-${
              state.apps[indexOfApp].numberOfWindow + 1
            }`,
            x: state.apps[indexOfApp].x,
            y: state.apps[indexOfApp].y,
            w: state.apps[indexOfApp].w,
            h: state.apps[indexOfApp].h,
            minH: state.apps[indexOfApp].minH,
            maxH: state.apps[indexOfApp].maxH,
            minW: state.apps[indexOfApp].minW,
            maxW: state.apps[indexOfApp].maxW,
          },
        });
        state.lastZindex = state.lastZindex + 1;
        state.apps[indexOfApp].numberOfWindow =
          state.apps[indexOfApp].numberOfWindow + 1;
      }
    },
    actionUpdateZindex: (state, action) => {
      let index = state.appsData.findIndex(
        (app) => app.appKey === action.payload
      );
      if (index !== -1) {
        state.appsData[index].zIndex = state.lastZindex + 1;
        state.lastZindex = state.lastZindex + 1;
      }
    },
    actionUpdateDataGrid: (state, action) => {
      // eslint-disable-next-line
      action.payload.map((item) => {
        let appDataIndex = state.appsData.findIndex(
          (app) => app.appKey === item.i
        );
        state.appsData[appDataIndex].lastDataGrid = {
          i: state.appsData[appDataIndex].dataGrid.i,
          x: state.appsData[appDataIndex].dataGrid.x,
          y: state.appsData[appDataIndex].dataGrid.y,
          w: state.appsData[appDataIndex].dataGrid.w,
          h: state.appsData[appDataIndex].dataGrid.h,
          minH: state.appsData[appDataIndex].dataGrid.minH,
          maxH: 9,
          minW: state.appsData[appDataIndex].dataGrid.minW,
          maxW: 12,
        };
        state.appsData[appDataIndex].dataGrid = {
          i: item.i,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          minH: item.minH,
          maxH: 9,
          minW: item.minW,
          maxW: 12,
        };
      });
    },
    actionCloseApp: (state, action) => {
      let appDataIndex = state.appsData.findIndex(
        (app) => app.appKey === action.payload.appKey
      );
      state.appsData.splice(appDataIndex, 1);
      let appIndex = state.apps.findIndex(
        (app) => app.appName === action.payload.appName
      );
      state.apps[appIndex].numberOfWindow =
        state.apps[appIndex].numberOfWindow - 1;
    },
    actionMaxApp: (state, action) => {
      let appDataIndex = state.appsData.findIndex(
        (app) => app.appKey === action.payload.appKey
      );
      state.appsData[appDataIndex].lastDataGrid = {
        i: state.appsData[appDataIndex].dataGrid.i,
        x: state.appsData[appDataIndex].dataGrid.x,
        y: state.appsData[appDataIndex].dataGrid.y,
        w: state.appsData[appDataIndex].dataGrid.w,
        h: state.appsData[appDataIndex].dataGrid.h,
        minH: state.appsData[appDataIndex].dataGrid.minH,
        maxH: 9,
        minW: state.appsData[appDataIndex].dataGrid.minW,
        maxW: 12,
      };
      state.appsData[appDataIndex].dataGrid = {
        i: action.payload.appKey,
        x: 0,
        y: 0,
        w: 12,
        h: 9,
        minH: state.appsData[appDataIndex].dataGrid.minH,
        maxH: 9,
        minW: state.appsData[appDataIndex].dataGrid.minW,
        maxW: 12,
      };
      state.appsData[appDataIndex].isFullscreen = true;
    },
    actionMinApp: (state, action) => {
      let appDataIndex = state.appsData.findIndex(
        (app) => app.appKey === action.payload.appKey
      );
      state.appsData[appDataIndex].dataGrid = {
        i: state.appsData[appDataIndex].lastDataGrid.i,
        x: state.appsData[appDataIndex].lastDataGrid.x,
        y: state.appsData[appDataIndex].lastDataGrid.y,
        w: state.appsData[appDataIndex].lastDataGrid.w,
        h: state.appsData[appDataIndex].lastDataGrid.h,
        minH: state.appsData[appDataIndex].lastDataGrid.minH,
        maxH: 9,
        minW: state.appsData[appDataIndex].lastDataGrid.minW,
        maxW: 12,
      };
      state.appsData[appDataIndex].isFullscreen = false;
    },
    actionHideApp: (state, action) => {
      let appDataIndex = state.appsData.findIndex(
        (app) => app.appKey === action.payload
      );
      state.appsData[appDataIndex].isHidden =
        !state.appsData[appDataIndex].isHidden;
    },
    actionCloseAllApps : (state,action) => {
      state.lastZindex = 0;
      state.appsData = [];
      state.apps = [
        {
          appName: "Maps X,Y Conventer",
          multiWindowAllowed: false,
          numberOfWindow: 0,
          zIndex: 0,
          iconName: "MapsXYconventer",
          x: 0,
          y: 0,
          w: 4,
          h: 4,
          minH: 4,
          maxH: 9,
          minW: 4,
          maxW: 12,
        },
        {
          appName: "Tax",
          multiWindowAllowed: false,
          numberOfWindow: 0,
          zIndex: 0,
          iconName: "tax",
          x: 0,
          y: 0,
          w: 4,
          h: 4,
          minH: 4,
          maxH: 9,
          minW: 4,
          maxW: 12,
        },
        {
          appName: "Calculator",
          multiWindowAllowed: false,
          numberOfWindow: 0,
          zIndex: 0,
          iconName: "calc",
          x: 0,
          y: 0,
          w: 4,
          h: 7,
          minH: 7,
          maxH: 9,
          minW: 4,
          maxW: 12,
        },
        {
          appName: "Settings",
          multiWindowAllowed: false,
          numberOfWindow: 0,
          zIndex: 0,
          iconName: "settings",
          x: 0,
          y: 0,
          w: 4,
          h: 4,
          minH: 4,
          maxH: 9,
          minW: 4,
          maxW: 12,
        },
      ]
    },
    actionMobileOpenApp : (state,action) => {
      state.mobileOpenedApp = action.payload
    },
    actionMobileCloseApp : (state,action) => {
      state.mobileOpenedApp = 'home' 
    },
    actionChangeMode : (state,action) => {
      state.mode = action.payload
    }
  },
});

export const {
  actionOpenApp,
  actionChangeMode,
  actionMobileCloseApp,
  actionMobileOpenApp,
  actionUpdateZindex,
  actionUpdateDataGrid,
  actionCloseApp,
  actionMaxApp,
  actionMinApp,
  actionHideApp,
  actionCloseAllApps
} = AppsReducer.actions;
export default AppsReducer.reducer;
