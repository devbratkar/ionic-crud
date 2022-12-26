import {
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  arrowBackSharp,
  personAddOutline,
  peopleOutline,
} from "ionicons/icons";

type Wrapper = {
  children: JSX.Element;
  title: string;
};
export const IonHeaderWrapper: React.FC<Wrapper> = (props) => {
  const history = useHistory();
  function goBackHandler() {
    history.go(-1);
  }
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonItem slot="start">
            <IonIcon icon={arrowBackSharp} onClick={goBackHandler} />
          </IonItem>
          <IonTitle >{props?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{props?.children}</IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButtons className="navbar-links">
            <NavLink
              to="/"
              className={({ isActive }: any) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
            >
              <IonIcon
                icon={peopleOutline}
                size="large"
              />
            </NavLink>
            <NavLink
              to="/user/add"
              className={({ isActive }: any) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
            >
              <IonIcon
                icon={personAddOutline}
                size="large"
              />
            </NavLink>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </>
  );
};
