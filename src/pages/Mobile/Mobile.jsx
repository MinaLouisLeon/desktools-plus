import React from 'react'
import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import MobileSideMenu from '../../components/MobileSideMenu/MobileSideMenu'
import { useSelector } from 'react-redux'
import Calculator from '../../Apps/Calculator/Calculator'
import Tax from '../../Apps/Tax/Tax'
import MapsXYconventer from '../../Apps/Maps/MapsXYconventer'
const Mobile = () => {
    const openedAppName = useSelector(state => state.AppsReducer.mobileOpenedApp);
    const handleView = () => {
        switch (openedAppName) {
            case 'home':
                return <></>
            case 'Calculator':
              return <Calculator />
            case 'Tax':
              return <Tax />
            case 'Maps X,Y Conventer':
              return <MapsXYconventer />
            default:
                break;
        }
    }
  return (
    <IonPage>
        <MobileSideMenu />
      <IonHeader>
        <IonToolbar mode="ios">
            <IonMenuButton slot='start' />
            <IonTitle>
                Desk Tools Plus
            </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id='mobileMainView'>
        {handleView()}
      </IonContent>
    </IonPage>
  )
}

export default Mobile
