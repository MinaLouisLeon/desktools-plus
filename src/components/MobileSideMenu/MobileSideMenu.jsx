import {
  IonContent,
  IonLabel,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonMenuToggle,
} from "@ionic/react";
import {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionChangeMode, actionMobileOpenApp,actionCloseAllApps } from "../../redux/AppsReducer";
import { actionUserLogOut } from "../../redux/loggedInUserReducer";
import { useHistory } from "react-router";
import {auth} from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
const MobileSideMenu = () => {
  const apps = useSelector((state) => state.AppsReducer.mobileApps);
  const dispatch = useDispatch(null);
  const history = useHistory(null);
  const isLoggedIn = useSelector(
    (state) => state.loggedInUserReducer.isLoggedIn
  );
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
    <IonMenu contentId="mobileMainView">
      <IonHeader mode="ios">
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {apps &&
            apps.map((app) => {
              return (
                <IonMenuToggle>
                  <IonItem
                    button
                    mode="ios"
                    onClick={() => dispatch(actionMobileOpenApp(app))}
                  >
                    <IonLabel>{app}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
            <IonMenuToggle>
                <IonItem mode="ios" button onClick={() => {
                    dispatch(actionChangeMode('desktop'));
                    history.replace('/Home');
                }}>
                    <IonLabel>
                        Desktop mode
                    </IonLabel>
                </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
                <IonItem button onClick={() => handleSignOut()}>
                    <IonLabel color='danger'>
                        Logout
                    </IonLabel>
                </IonItem>
            </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default MobileSideMenu;
