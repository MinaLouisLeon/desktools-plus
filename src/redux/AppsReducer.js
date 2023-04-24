import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastZindex: 0,
  apps: [
    {
      appName: "Settings",
      multiWindowAllowed: false,
      numberOfWindow: 0,
      zIndex: 0,
    },
  ],
  appsData: [],
};

const AppsReducer = createSlice({
  name: "AppsReducer",
  initialState,
  reducers: {
    actionOpenApp: (state, action) => {
      console.log(action.payload.appName)
      console.log(state.apps)
      let indexOfApp = state.apps.findIndex(
        (app) => app.appName === action.payload.appName
      );
      console.log(indexOfApp)
      if (state.apps[indexOfApp].multiWindowAllowed) {
        state.appsData.push({
          appName: action.payload.appName,
          appKey: `${action.payload.appKey}-${state.apps[indexOfApp].numberOfWindow + 1}`,
          zIndex: state.lastZindex + 1,
          dataGrid: {
            i: `${action.payload.appKey}-${state.apps[indexOfApp].numberOfWindow + 1}`,
            x: 0,
            y: 0,
            w: 4,
            h: 4,
            minH: 4,
            maxH: 9,
            minW: 4,
            maxW: 12,
          },
        });
        state.lastZindex = state.lastZindex + 1;
        state.apps[indexOfApp].numberOfWindow = state.apps[indexOfApp].numberOfWindow + 1;
      } else if (state.apps[indexOfApp].numberOfWindow === 0) {
        state.appsData.push({
          appName: action.payload.appName,
          appKey: `${action.payload.appKey}-${state.apps[indexOfApp].numberOfWindow + 1}`,
          zIndex: state.lastZindex + 1,
          dataGrid: {
            i: `${action.payload.appKey}-${state.apps[indexOfApp].numberOfWindow + 1}`,
            x: 0,
            y: 0,
            w: 4,
            h: 4,
            minH: 4,
            maxH: 9,
            minW: 4,
            maxW: 12,
          },
        });
        state.lastZindex = state.lastZindex + 1;
        state.apps[indexOfApp].numberOfWindow = state.apps[indexOfApp].numberOfWindow + 1;
      }
    },
    actionUpdateZindex: (state, action) => {
      let index = state.appsData.findIndex(
        (app) => app.appKey === action.payload
      );
      state.appsData[index].zIndex = state.lastZindex + 1;
      state.lastZindex = state.lastZindex + 1;
    },
    actionUpdateDataGrid: (state, action) => {
      // eslint-disable-next-line
      action.payload.map((item) => {
        let appDataIndex = state.appsData.findIndex(
          (app) => app.appKey === item.i
        );
        state.appsData[appDataIndex].dataGrid = {
          i: item.i,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          minH: 4,
          maxH: 9,
          minW: 4,
          maxW: 12,
        };
      });
    },
  },
});

export const { actionOpenApp, actionUpdateZindex, actionUpdateDataGrid } =
  AppsReducer.actions;
export default AppsReducer.reducer;
