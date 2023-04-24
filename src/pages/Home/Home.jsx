import React from "react";
// import "./Home.css";
import Taskbar from "../../components/shared/Taskbar/Taskbar";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { ScreenOrientation } from "@awesome-cordova-plugins/screen-orientation";
import { Responsive, WidthProvider } from "react-grid-layout";
import AppHeader from "../../components/shared/AppHeader/AppHeader";
import styled from "styled-components";
import { useSelector ,useDispatch} from "react-redux";
import { actionUpdateDataGrid, actionUpdateZindex } from "../../redux/AppsReducer";
const BackgroundComp = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  /* background-color: ${(props) => props.backgroundColor};
  background-image: ${(props) => props.backgroundImage}; */
`;
const WorkareaComp = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 3.5rem;
  background-color: transparent;
  z-index: 0;
`;
const GridItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
const WindowComp = styled.div`
  /* display: ${(props) => (props.isMin ? "none" : "block")}; */
  z-index: ${(props) => props.zIndex};
  display: block;
  border-top-left-radius: 0.7rem;
  border-top-right-radius: 0.7rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;
const AppContentContainer = styled.div`
  background-color: #f4f4f4d9;
  width: 100%;
  position: absolute;
  top: 2rem;
  bottom: 0;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;
const Home = () => {
  ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY);
  const dispatch = useDispatch(null);
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const appsData = useSelector((state) => state.AppsReducer.appsData);
  return (
    <BackgroundComp>
      <WorkareaComp>
        <GridItemsContainer>
          <ResponsiveGridLayout
            breakpoints={{ lg: 996 }}
            cols={{ lg: 12 }}
            margin={[10, 10]}
            containerPadding={[1, 1]}
            rowHeight={30}
            compactType={null}
            draggableHandle=".dragHandlerClass"
            isDraggable={true}
            isResizable={true}
            allowOverlap={true}
            preventCollision={false}
            isDroppable={true}
            useCSSTransforms={false}
            onDragStop={(layout) => dispatch(actionUpdateDataGrid(layout))}
            onResizeStop={(layout) => dispatch(actionUpdateDataGrid(layout))}
          >
            {appsData.map((app) => {
              return (
                <WindowComp
                  onClick={() => dispatch(actionUpdateZindex(app.appKey))}
                  className="shadow-2"
                  key={`${app.appKey}`}
                  data-grid={app.dataGrid}
                  zIndex={app.zIndex}
                >
                  <AppHeader appName={app.appName}/>
                  <AppContentContainer />
                </WindowComp>
              );
            })}
          </ResponsiveGridLayout>
        </GridItemsContainer>
        <Taskbar />
      </WorkareaComp>
    </BackgroundComp>
  );
};

export default Home;
