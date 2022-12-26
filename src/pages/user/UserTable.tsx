import { IonPage, useIonViewDidLeave, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { Table } from "../../components/datatable/Table";
import { IonHeaderWrapper } from "../../components/ionwrapper/IonHeaderWrapper";
import { deleteUser, getAllUser } from "../../services/users/userServices";
import { User } from "../../types/userTypes";

export function UserTable() {
  document.title = "All Users";
  const [users, setUsers] = useState<User[]>();

  async function fetchAllUser() {
    await getAllUser()
      .then((res) => {
        const userData = res.data.data.map(
          (user: User & { hobbies: string }, index: number) => {
            user.sno = index + 1;
            user.hobbies.split(",");
            return user;
          }
        );
        setUsers(userData);
      })
      .catch((err) => setUsers([]));
  }

  useIonViewWillEnter(() => {
    console.log("FETCHING DATA");
    fetchAllUser();
  }, []);

  useIonViewDidLeave(() => {
    console.log("ALL USERS LEAVER !!");
  });

  async function handleDelete(this: any) {
    console.log("DELETING ...");
    await deleteUser(this.id)
      .then((res) => {
        fetchAllUser();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <IonPage>
      <IonHeaderWrapper title="All Users">
        <Table rows={users} delete={handleDelete} />
      </IonHeaderWrapper>
    </IonPage>
  );
}
