import {
  IonButton,
  IonPage,
  useIonViewDidEnter,
} from "@ionic/react";
import { Box } from "@mui/system";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { IonHeaderWrapper } from "../../components/ionwrapper/IonHeaderWrapper";
import { View } from "../../components/view/View";
import { UserView } from "../../constants/UserView";
import { getOneUser } from "../../services/users/userServices";
import "../../styles/navbar.css";

document.title = "View User";
type Params = {
  id?: string;
};
export const ViewUser = () => {
  const history = useHistory();
  const params: Params = useParams();
  const [view, setView] = useState({});

  useIonViewDidEnter(() => {
    getOneUser(Number(params?.id))
      .then((res) => {
        setView(res.data.data);
      })
      .catch((err) => {
        history.push("/");
      });
      console.log("VIEW RE-RENDER !")
  }, [params?.id]);

  return (
    <IonPage>
      <IonHeaderWrapper title="View User">
        <View data={view} format={UserView}>
          <Box sx={{ marginTop: "20px", textAlign: "right" }}>
            <IonButton
              fill="outline"
              onClick={() => {
                history.replace(`/user/edit/${params?.id}`);
              }}
            >
              Edit
            </IonButton>
          </Box>
        </View>
      </IonHeaderWrapper>
    </IonPage>
  );
};
